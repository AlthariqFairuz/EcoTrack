import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';

interface DayData {
  day: string;
  emission: number;
  target: number;
  isToday?: boolean;
}

interface WeeklyStatsProps {
  weekData: DayData[];
  streakDays: number;
  totalSaved: number;
  ranking: number;
}

export function WeeklyStats({ weekData, streakDays, totalSaved, ranking }: WeeklyStatsProps) {
  const getBarColor = (emission: number, target: number, isToday: boolean = false) => {
    if (emission <= target) return '#65A30D'; // green-600
    if (emission <= target * 1.2) return '#F59E0B'; // yellow-500
    return '#DC2626'; // red-600
  };

  const getBarHeight = (emission: number) => {
    const maxHeight = 50;
    const maxEmission = 12; // Assuming max emission for scaling
    return Math.max((emission / maxEmission) * maxHeight, 8);
  };

  return (
    <View className="bg-white rounded-2xl p-5 mb-5" style={{
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    }}>
      <ThemedText className="text-lg font-poppins-bold text-gray-800 mb-4">
        Minggu Ini
      </ThemedText>

      {/* Weekly Chart */}
      <View className="bg-gray-50 rounded-xl p-4 mb-4">
        <View className="flex-row justify-between items-end mb-3" style={{ height: 70 }}>
          {weekData.map((day, index) => (
            <View key={index} className="items-center flex-1">
              <View 
                className="w-6 rounded-t-md"
                style={{ 
                  height: getBarHeight(day.emission),
                  backgroundColor: getBarColor(day.emission, day.target, day.isToday)
                }}
              />
              <ThemedText className="text-xs text-gray-600 mt-1 font-poppins">
                {day.day}
              </ThemedText>
            </View>
          ))}
        </View>
        
        <View className="flex-row justify-between items-center">
          {weekData.map((day, index) => (
            <View key={index} className="items-center flex-1">
              <ThemedText className="text-xs text-gray-800 font-poppins-medium">
                {day.emission}
              </ThemedText>
            </View>
          ))}
        </View>
        
        <View className="mt-2 items-center">
          <ThemedText className="text-xs text-gray-500 font-poppins">
            Kamu hebat! 3 hari di bawah target
          </ThemedText>
        </View>
      </View>

      {/* Stats Grid */}
      <View className="flex-row justify-between mb-4">
        <View className="bg-orange-50 rounded-xl p-3 items-center flex-1 mr-2">
          <MaterialIcons name="local-fire-department" size={24} color="#f97316" />
          <ThemedText className="text-xl font-poppins-bold text-gray-800 mt-1">{streakDays}</ThemedText>
          <ThemedText className="text-xs text-gray-600 text-center font-poppins">Hari Beruntun</ThemedText>
        </View>
        
        <View className="bg-green-50 rounded-xl p-3 items-center flex-1 mx-1">
          <Image
            source={require('@/assets/images/icon_tanaman.png')}
            style={{ width: 24, height: 24 }}
            contentFit="contain"
          />
          <ThemedText className="text-xl font-poppins-bold text-green-600 mt-1">{totalSaved} kg</ThemedText>
          <ThemedText className="text-xs text-gray-600 text-center font-poppins">Dihemat</ThemedText>
        </View>
        
        <View className="bg-blue-50 rounded-xl p-3 items-center flex-1 ml-2">
          <Image
            source={require('@/assets/images/icon_target.png')}
            style={{ width: 24, height: 24 }}
            contentFit="contain"
          />
          <ThemedText className="text-xl font-poppins-bold text-blue-600 mt-1">#{ranking}</ThemedText>
          <ThemedText className="text-xs text-gray-600 text-center font-poppins">Di Jakarta</ThemedText>
        </View>
      </View>

      {/* Achievement Banner */}
      <View className="rounded-xl p-4" style={{ backgroundColor: '#fef3c7' }}>
        <View className="flex-row items-center">
          <Image
            source={require('@/assets/images/icon_piala.png')}
            style={{ width: 32, height: 32 }}
            contentFit="contain"
          />
          <View className="flex-1 ml-3">
            <ThemedText className="text-sm font-poppins-semibold text-gray-800 mb-1">
              Pencapaian Terbuka!
            </ThemedText>
            <ThemedText className="text-xs text-gray-600 font-poppins">
              Pejuang Lingkungan - {streakDays} hari beruntun
            </ThemedText>
          </View>
          <TouchableOpacity className="bg-orange-200 px-3 py-1.5 rounded-lg">
            <ThemedText className="text-xs text-orange-700 font-poppins-medium">
              Bagikan
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}