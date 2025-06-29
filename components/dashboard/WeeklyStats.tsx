import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

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
    if (isToday) return 'bg-green-400';
    if (emission <= target) return 'bg-green-500';
    if (emission <= target * 1.2) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  const getBarHeight = (emission: number) => {
    const maxHeight = 60;
    const maxEmission = 12; // Assuming max emission for scaling
    return Math.max((emission / maxEmission) * maxHeight, 8);
  };

  return (
    <View className="bg-white rounded-2xl p-5 shadow-sm">
      <ThemedText className="text-lg font-bold text-gray-800 mb-4">
        Minggu Ini
      </ThemedText>

      {/* Weekly Chart */}
      <View className="bg-gray-50 rounded-xl p-4 mb-4">
        <View className="flex-row justify-between items-end mb-3" style={{ height: 80 }}>
          {weekData.map((day, index) => (
            <View key={index} className="items-center flex-1">
              <View 
                className={`w-6 rounded-t-md ${getBarColor(day.emission, day.target, day.isToday)}`}
                style={{ height: getBarHeight(day.emission) }}
              />
              <ThemedText className="text-xs text-gray-600 mt-1 font-medium">
                {day.day}
              </ThemedText>
            </View>
          ))}
        </View>
        
        <View className="flex-row justify-between items-center">
          {weekData.map((day, index) => (
            <View key={index} className="items-center flex-1">
              <ThemedText className="text-xs text-gray-800 font-medium">
                {day.emission}
              </ThemedText>
            </View>
          ))}
        </View>
        
        <View className="mt-2 items-center">
          <ThemedText className="text-xs text-gray-500">
            Kamu hebat! 3 hari di bawah target
          </ThemedText>
        </View>
      </View>

      {/* Stats Grid */}
      <View className="flex-row justify-between mb-4">
        <View className="bg-orange-50 rounded-xl p-3 items-center flex-1 mr-2">
          <ThemedText className="text-2xl mb-1">🔥</ThemedText>
          <ThemedText className="text-xl font-bold text-gray-800">{streakDays}</ThemedText>
          <ThemedText className="text-xs text-gray-600 text-center">Hari Beruntun</ThemedText>
        </View>
        
        <View className="bg-green-50 rounded-xl p-3 items-center flex-1 mx-1">
          <ThemedText className="text-2xl mb-1">🌱</ThemedText>
          <ThemedText className="text-xl font-bold text-green-600">{totalSaved} kg</ThemedText>
          <ThemedText className="text-xs text-gray-600 text-center">Dihemat</ThemedText>
        </View>
        
        <View className="bg-blue-50 rounded-xl p-3 items-center flex-1 ml-2">
          <ThemedText className="text-2xl mb-1">🎯</ThemedText>
          <ThemedText className="text-xl font-bold text-blue-600">#{ranking}</ThemedText>
          <ThemedText className="text-xs text-gray-600 text-center">Di Jakarta</ThemedText>
        </View>
      </View>

      {/* Achievement Banner */}
      <View className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-4">
        <View className="flex-row items-center">
          <ThemedText className="text-2xl mr-3">🏆</ThemedText>
          <View className="flex-1">
            <ThemedText className="text-sm font-semibold text-gray-800 mb-1">
              Pencapaian Terbuka!
            </ThemedText>
            <ThemedText className="text-xs text-gray-600">
              Pejuang Lingkungan - 45 hari beruntun
            </ThemedText>
          </View>
          <TouchableOpacity className="bg-orange-200 px-3 py-1.5 rounded-lg">
            <ThemedText className="text-xs text-orange-700 font-medium">
              Bagikan
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}