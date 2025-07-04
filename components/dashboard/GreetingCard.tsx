import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

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
    <View className="bg-white rounded-2xl p-5 mb-5 shadow-sm">
      <View className="flex-row">
        <View className="flex-1">
          <ThemedText className="text-lg font-bold text-gray-800 mb-1">
            {getGreeting()}, {userName}!
          </ThemedText>
          <ThemedText className="text-xs text-gray-500 mb-4">
            Target hari ini: {dailyTarget}
          </ThemedText>
          
          <View className="mb-4">
            <ThemedText className="text-sm text-gray-600 mb-1">
              Dampak Hari Ini
            </ThemedText>
            <ThemedText className="text-2xl font-bold text-gray-800 mb-1">
              {currentEmission} <ThemedText className="text-sm font-normal text-gray-500">kg CO₂e</ThemedText>
            </ThemedText>
            
            <View className="flex-row items-center mb-4">
              <ThemedText className={`text-xs font-medium ${isIncrease ? 'text-red-500' : 'text-green-500'}`}>
                {isIncrease ? '↗' : '↘'} {percentageChange}% {isIncrease ? 'di atas' : 'di bawah'} kemarin
              </ThemedText>
            </View>
            
            {/* Progress Bar */}
            <View className="mb-4">
              <View className="h-2 bg-gray-200 rounded-full mb-2">
                <View 
                  className={`h-full rounded-full ${isOnTrack ? 'bg-green-500' : 'bg-yellow-400'}`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </View>
              <View className="flex-row justify-between">
                <ThemedText className="text-xs text-gray-500">0 kg</ThemedText>
                <ThemedText className={`text-xs font-medium ${isOnTrack ? 'text-green-600' : 'text-yellow-600'}`}>
                  {isOnTrack ? 'Sesuai target!' : 'Mendekati target'}
                </ThemedText>
                <ThemedText className="text-xs text-gray-500">{targetEmission} kg</ThemedText>
              </View>
            </View>

            <TouchableOpacity className="bg-green-100 px-4 py-2 rounded-lg self-start">
              <View className="flex-row items-center">
                <ThemedText className="text-green-600 text-xs font-medium mr-1">📊</ThemedText>
                <ThemedText className="text-green-600 text-xs font-medium">
                  Lihat Analisis
                </ThemedText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Character Illustration */}
        <View className="justify-center items-center ml-4">
          <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center">
            <ThemedText className="text-3xl">🌱</ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
}