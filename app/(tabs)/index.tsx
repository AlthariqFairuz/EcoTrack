import { View, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { AIRecommendations } from '@/components/dashboard/AIRecommendations';
import { GreetingCard } from '@/components/dashboard/GreetingCard';
import { WeeklyStats } from '@/components/dashboard/WeeklyStats';
import { UserData } from '@/services/recommendationService';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { NotificationBadge } from '@/components/notification/NotificationBadge';
import Header from '@/components/header/header';

export default function DashboardScreen() {
  
  const [userData, setUserData] = useState<UserData>({
    dailyEmissions: 6.2,
    location: 'Jakarta, Indonesia',
    preferences: ['transport', 'food'],
    transportMode: 'car',
    dietType: 'mixed'
  });
  
  const [unreadCount, setUnreadCount] = useState<number>(4);

  const userName = "Adinda";
  const dailyTarget = "< 8.5 kg CO₂e";
  const currentEmission = 6.2;
  const targetEmission = 8.5;
  const percentageChange = 15;
  const isIncrease = false;

  // Weekly data for chart
  const weekData = [
    { day: 'Sen', emission: 10.1, target: 8.5 },
    { day: 'Sel', emission: 6.5, target: 8.5 },
    { day: 'Rab', emission: 11.8, target: 8.5 },
    { day: 'Kam', emission: 7.2, target: 8.5 },
    { day: 'Jum', emission: 11.5, target: 8.5 },
    { day: 'Sab', emission: 9.7, target: 8.5 },
    { day: 'Min', emission: 6.2, target: 8.5, isToday: true },
  ];

  useEffect(() => {
    loadUserPreferences();
  }, []);

  const loadUserPreferences = async () => {
    try {
      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) {
        setUserData(prev => ({
          ...prev,
        }));
      }
    } catch (error) {
      console.error('Error loading user preferences:', error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('userEmail');
    await AsyncStorage.removeItem('userName');
    
    Toast.show({
      type: 'success',
      text1: 'Logout berhasil',
      text2: 'Sampai jumpa! 👋'
    });
    
    setTimeout(() => {
      router.replace('/(auth)/login');
    }, 1000);
  };

  const openChatbot = () => {
    router.push('/chatbot');
  };

  const openNotifications = () => {
    router.push('/notification');
  };

  return (
    <View className="flex-1" style={{ backgroundColor: '#FAF6E9' }}>
      {/* Header */}
      <Header title ="Dashboard" isOnDashboard={true} />

      <ScrollView className="flex-1 p-5" showsVerticalScrollIndicator={false}>
        {/* Greeting Card */}
        <GreetingCard
          userName={userName}
          dailyTarget={dailyTarget}
          currentEmission={currentEmission}
          targetEmission={targetEmission}
          percentageChange={percentageChange}
          isIncrease={isIncrease}
        />

        {/* AI Recommendations */}
        <View className="mb-5">
          <Text className="text-lg font-poppins-bold text-gray-800 mb-4">
            Rekomendasi AI
          </Text>
          <AIRecommendations userData={userData} />
        </View>

        {/* Weekly Stats */}
        <WeeklyStats
          weekData={weekData}
          streakDays={45}
          totalSaved={156}
          ranking={23}
        />
      </ScrollView>

      {/* Floating Chat Button */}
      <TouchableOpacity 
        className="absolute bottom-20 right-5 w-14 h-14 rounded-full items-center justify-center"
        style={{ 
          backgroundColor: '#537D5D',
          elevation: 8,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        }}
        onPress={openChatbot}
        activeOpacity={0.8}
      >
        <Ionicons name="chatbubble-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}