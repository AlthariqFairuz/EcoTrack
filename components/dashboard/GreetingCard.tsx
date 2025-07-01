import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';

interface GreetingCardProps {
  userName: string;
  dailyTarget: string;
  currentEmission: number;
  targetEmission: number;
  percentageChange: number;
  isIncrease: boolean;
}

export function GreetingCard({ 
  userName, 
  dailyTarget, 
  currentEmission, 
  targetEmission, 
  percentageChange,
  isIncrease 
}: GreetingCardProps) {
  const progressPercentage = Math.min((currentEmission / targetEmission) * 100, 100);
  const isOnTrack = currentEmission <= targetEmission;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat pagi';
    if (hour < 15) return 'Selamat siang'; 
    if (hour < 18) return 'Selamat sore';
    return 'Selamat malam';
  };

  return (
    <View className="mb-5">
      {/* Greeting and Target - Outside the card */}
      <View className="mb-4">
        <Text className="text-lg font-poppins-semibold text-gray-800 mb-1">
          {getGreeting()}, {userName}!
        </Text>
        <Text className="text-xs text-gray-500 font-poppins">
          Target hari ini {dailyTarget}
        </Text>
      </View>

      {/* White Card */}
      <View className="bg-white rounded-2xl p-5" style={{
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
      }}>
        <View className="flex-row">
          <View className="flex-1">
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-1 font-poppins">
                Dampak Hari Ini
              </Text>
              <Text className="font-poppins-bold text-gray-800 mb-1">
                {currentEmission} <Text className="text-sm font-poppins text-gray-500">kg CO₂e</Text>
              </Text>
              
              <View className="flex-row items-center mb-4">
                <MaterialIcons 
                  name={isIncrease ? "trending-up" : "trending-down"} 
                  size={16} 
                  color={isIncrease ? "#ef4444" : "#537D5D"} 
                />
                <Text className={`text-xs font-poppins ml-1 ${isIncrease ? 'text-red-500' : 'text-green-500'}`}>
                  {percentageChange}% {isIncrease ? 'di atas' : 'di bawah'} kemarin
                </Text>
              </View>
            </View>
          </View>
          
          {/* Character Illustration */}
          <View className="justify-center items-center ml-4">
            <Image
              source={require('@/assets/images/sapi_jempol_1.png')}
              style={{ width: 100, height: 100 }}
              contentFit="contain"
            />
          </View>
        </View>

        {/* Progress Bar */}
        <View className="mb-4">
          <View className="h-2 bg-gray-200 rounded-full mb-2">
            <View 
              className="h-full rounded-full"
              style={{ 
                width: `${progressPercentage}%`,
                backgroundColor: '#2E5538'
              }}
            />
          </View>
          <View className="flex-row justify-between">
            <Text className="text-xs text-gray-500 font-poppins">0 kg</Text>
            <Text className="text-xs font-poppins" style={{ color: '#2E5538' }}>
              {isOnTrack ? 'Sesuai target!' : 'Mendekati target'}
            </Text>
            <Text className="text-xs text-gray-500 font-poppins">{targetEmission} kg</Text>
          </View>
        </View>

        {/* Center Button */}
        <View className="items-center">
          <TouchableOpacity className="px-4 py-2 rounded-xl" style={{ backgroundColor: '#CEDD99' }}>
            <View className="flex-row items-center">
              <MaterialIcons name="bar-chart" size={16} color="#2E5538" />
              <Text className="text-xs font-poppins ml-1" style={{ color: '#2E5538' }}>
                Lihat Analisis
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}