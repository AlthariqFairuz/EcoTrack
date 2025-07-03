import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const OPENROUTER_API_KEY = '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';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export default function ChatbotScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Halo! Saya EcoBot, asisten AI untuk EcoTrack. Saya siap membantu Anda dengan pertanyaan tentang jejak karbon, tips ramah lingkungan, dan cara mengurangi emisi CO₂. Ada yang bisa saya bantu?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText.trim();
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://ecotrack.app',
          'X-Title': 'EcoTrack Chatbot',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat-v3-0324:free',
          messages: [
            {
              role: 'system',
              content: `Kamu adalah EcoBot, asisten AI untuk aplikasi EcoTrack yang membantu pengguna mengurangi jejak karbon mereka. 

Konteks aplikasi:
- EcoTrack adalah aplikasi pelacak jejak karbon berbasis AI
- Pengguna dapat memindai struk, makanan, dan transportasi untuk menghitung emisi CO₂
- Aplikasi memberikan rekomendasi AI untuk mengurangi emisi
- Target harian pengguna adalah < 8.5 kg CO₂e
- Lokasi pengguna: Jakarta, Indonesia

Tugasmu:
1. Berikan saran praktis untuk mengurangi jejak karbon
2. Jelaskan dampak lingkungan dari aktivitas sehari-hari
3. Berikan tips transportasi ramah lingkungan di Jakarta
4. Sarankan makanan rendah karbon
5. Bantu pengguna memahami data emisi mereka
6. Berikan motivasi untuk gaya hidup berkelanjutan

Gaya komunikasi:
- Ramah dan supportive
- Gunakan bahasa Indonesia
- Berikan jawaban praktis dan actionable
- Sebutkan data CO₂ dalam kg ketika relevan
- Fokus pada solusi yang realistis untuk Jakarta
- JANGAN gunakan format markdown seperti ** atau __ atau #
- Gunakan text biasa tanpa formatting khusus
- Berikan response yang lengkap dan tidak terpotong
- Maksimal 250 kata per response tetapi pastikan kalimat lengkap`
            },
            {
              role: 'user',
              content: currentInput
            }
          ],
        //   temperature: 0.7,
        //   max_tokens: 400, // Increased from 300
        //   top_p: 1,
        //   frequency_penalty: 0,
        //   presence_penalty: 0,
        //   stream: false, // Ensure we get complete response
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        let responseText = data.choices[0].message.content;
        
        // Clean up response and ensure it's complete
        if (responseText) {
          responseText = responseText.trim();
          
          // Check if response seems incomplete (ends mid-sentence)
          if (responseText && !responseText.match(/[.!?]$/)) {
            // Try to complete the sentence or add proper ending
            const lastSentence = responseText.split(/[.!?]/).pop()?.trim();
            if (lastSentence && lastSentence.length > 10) {
              // If last part is substantial, add period
              responseText += '.';
            } else if (lastSentence && lastSentence.length > 0) {
              // If last part is incomplete, remove it
              responseText = responseText.substring(0, responseText.lastIndexOf(lastSentence)).trim();
              if (responseText && !responseText.match(/[.!?]$/)) {
                responseText += '.';
              }
            }
          }
        }
        
        if (!responseText || responseText.trim().length === 0) {
          throw new Error('Empty response from AI');
        }

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      let errorText = 'Maaf, terjadi kesalahan. Silakan coba lagi dalam beberapa saat.';
      
      if (error instanceof Error) {
        if (error.message.includes('fetch')) {
          errorText = 'Koneksi internet bermasalah. Periksa koneksi Anda dan coba lagi.';
        } else if (error.message.includes('Empty response')) {
          errorText = 'Maaf, saya tidak dapat memberikan jawaban saat ini. Coba tanyakan dengan cara yang berbeda.';
        } else if (error.message.includes('HTTP error')) {
          errorText = 'Server sedang sibuk. Tunggu sebentar dan coba lagi.';
        }
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const clearChat = () => {
    Alert.alert(
      'Hapus Percakapan',
      'Apakah Anda yakin ingin menghapus semua percakapan?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            setMessages([
              {
                id: '1',
                text: 'Percakapan telah dihapus. Ada yang bisa saya bantu lagi?',
                isUser: false,
                timestamp: new Date(),
              },
            ]);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAF6E9' }}>
      {/* Header */}
      <View className="bg-white px-4 py-3 flex-row items-center justify-between" style={{
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
      }}>
        <View className="flex-row items-center flex-1">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mr-3"
          >
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          
          <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: '#537D5D' }}>
            <MaterialIcons name="eco" size={20} color="white" />
          </View>
          
          <View className="flex-1">
            <Text className="font-poppins-semibold text-gray-800 text-base">EcoBot</Text>
            <Text className="font-poppins text-gray-500 text-xs">Asisten AI EcoTrack</Text>
          </View>
        </View>
        
        <TouchableOpacity onPress={clearChat}>
          <MaterialIcons name="delete-outline" size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-4 py-4"
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            className={`mb-4 ${message.isUser ? 'items-end' : 'items-start'}`}
          >
            <View className={`flex-row items-start ${message.isUser ? 'flex-row-reverse' : ''}`}>
              {/* Avatar */}
              <View className={`w-8 h-8 rounded-full items-center justify-center ${message.isUser ? 'ml-2' : 'mr-2'} flex-shrink-0`} 
                    style={{ backgroundColor: message.isUser ? '#CEDD99' : '#537D5D' }}>
                <MaterialIcons 
                  name={message.isUser ? "person" : "eco"} 
                  size={16} 
                  color={message.isUser ? "#2E5538" : "white"} 
                />
              </View>
              
              {/* Message Bubble - Fixed sizing */}
              <View
                className="px-4 py-3 rounded-2xl border border-gray-200"
                style={{
                  backgroundColor: message.isUser ? '#537D5D' : 'white',
                  maxWidth: '80%', // Limit maximum width
                  minWidth: '20%', // Ensure minimum width
                  alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                }}
              >
                <Text
                  className={`font-poppins text-sm leading-5 ${
                    message.isUser ? 'text-white' : 'text-gray-800'
                  }`}
                  style={{
                    textAlign: 'left', // Consistent text alignment
                  }}
                >
                  {message.text}
                </Text>
              </View>
            </View>
            
            {/* Timestamp */}
            <Text 
              className="font-poppins text-xs text-gray-400 mt-1"
              style={{
                alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                marginRight: message.isUser ? 40 : 0,
                marginLeft: message.isUser ? 0 : 40,
              }}
            >
              {formatTime(message.timestamp)}
            </Text>
          </View>
        ))}
        
        {isLoading && (
          <View className="items-start mb-4">
            <View className="flex-row items-start">
              <View className="w-8 h-8 rounded-full items-center justify-center mr-2 flex-shrink-0" style={{ backgroundColor: '#537D5D' }}>
                <MaterialIcons name="eco" size={16} color="white" />
              </View>
              
              <View 
                className="bg-white px-4 py-3 rounded-2xl border border-gray-200"
                style={{
                  maxWidth: '80%',
                  minWidth: '40%',
                }}
              >
                <View className="flex-row items-center">
                  <ActivityIndicator size="small" color="#537D5D" />
                  <Text className="font-poppins text-sm text-gray-500 ml-2">EcoBot sedang mengetik...</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View className="-bottom-8 bg-white px-4 py-4" style={{
          paddingBottom: Platform.OS === 'ios' ? 34 : 20,
        }}>
          <View className="flex-row items-end">
            <View className="flex-1 mr-3">
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                placeholder="Tanyakan tentang jejak karbon..."
                multiline
                maxLength={500}
                className="bg-gray-50 rounded-2xl px-4 py-3 font-poppins text-sm border border-gray-200"
                style={{ 
                  maxHeight: 100,
                  minHeight: 44,
                  textAlignVertical: 'top'
                }}
                placeholderTextColor="#9CA3AF"
                returnKeyType="send"
                onSubmitEditing={sendMessage}
                blurOnSubmit={false}
              />
            </View>
            
            <TouchableOpacity
              onPress={sendMessage}
              disabled={!inputText.trim() || isLoading}
              className={`w-12 h-12 rounded-2xl items-center justify-center ${
                inputText.trim() && !isLoading ? '' : 'opacity-50'
              }`}
              style={{ backgroundColor: '#537D5D' }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Ionicons name="send" size={20} color="white" />
              )}
            </TouchableOpacity>
          </View>
          
          {/* Character counter */}
          {inputText.length > 400 && (
            <Text className="text-xs text-gray-400 mt-2 text-right font-poppins">
              {inputText.length}/500
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}