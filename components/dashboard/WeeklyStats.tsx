import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
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
    if (isToday) return '#65A30D'; // green for today
    if (emission <= target) return '#65A30D'; // green-600
    if (emission <= target * 0.8) return '#EAB308'; // yellow-500
    return '#DC2626'; // red-600
  };

  const getBarHeight = (emission: number) => {
    const maxHeight = 80;
    const maxEmission = 12; // Assuming max emission for scaling
    return Math.max((emission / maxEmission) * maxHeight, 8);
  };

  return (
    <View className="mb-16">
      {/* Title - Outside */}
      <Text className="text-lg font-poppins-bold text-gray-800 mb-4">
        Minggu Ini
      </Text>

      {/* Weekly Chart - Separate White Box */}
      <View className="bg-white rounded-xl p-4 mb-4" style={{
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
      }}>
        <View className="flex-row justify-between items-end mb-3" style={{ height: 100 }}>
          {weekData.map((day, index) => (
            <View key={index} className="items-center flex-1">
              <View 
                className="w-10 rounded-t-md"
                style={{ 
                  height: getBarHeight(day.emission),
                  backgroundColor: getBarColor(day.emission, day.target, day.isToday)
                }}
              />
              <Text className="text-xs text-gray-600 mt-1 font-poppins">
                {day.day}
              </Text>
            </View>
          ))}
        </View>
        
        <View className="flex-row justify-between items-center">
          {weekData.map((day, index) => (
            <View key={index} className="items-center flex-1">
              <Text className="text-xs text-gray-800 font-poppins-medium">
                {day.emission}
              </Text>
            </View>
          ))}
        </View>
        
        <View className="mt-2 items-center">
          <Text className="text-xs text-gray-500 font-poppins">
            Kamu hebat! 3 hari di bawah target
          </Text>
        </View>
      </View>

      {/* Stats Grid - Separate White Boxes */}
      <View className="flex-row justify-between mb-4">
        {/* Hari Beruntun - Separate Box */}
        <View className="bg-white rounded-xl p-3 items-center flex-1 mr-2" style={{
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        }}>
          <MaterialIcons name="local-fire-department" size={24} color="#f97316" />
          <Text className="text-xl font-poppins-bold text-gray-800 mt-1">{streakDays}</Text>
          <Text className="text-xs text-gray-600 text-center font-poppins">Hari Beruntun</Text>
        </View>
        
        {/* Dihemat - Separate Box */}
        <View className="bg-white rounded-xl p-3 items-center flex-1 mx-1" style={{
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        }}>
          <Image
            source={require('@/assets/images/icon_tanaman.png')}
            style={{ width: 24, height: 24 }}
            contentFit="contain"
          />
          <Text className="text-xl font-poppins-bold mt-1">{totalSaved} kg</Text>
          <Text className="text-xs text-gray-600 text-center font-poppins">Dihemat</Text>
        </View>
        
        {/* Ranking - Separate Box */}
        <View className="bg-white rounded-xl p-3 items-center flex-1 ml-2" style={{
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        }}>
          <Image
            source={require('@/assets/images/icon_target.png')}
            style={{ width: 24, height: 24 }}
            contentFit="contain"
          />
          <Text className="text-xl font-poppins-bold mt-1">#{ranking}</Text>
          <Text className="text-xs text-gray-600 text-center font-poppins">Di Jakarta</Text>
        </View>
      </View>

      {/* Achievement Banner - Separate White Box */}
      <View className="bg-white rounded-xl p-4" style={{
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
      }}>
        <View className="flex-row items-center">
          <Image
            source={require('@/assets/images/icon_piala.png')}
            style={{ width: 32, height: 32 }}
            contentFit="contain"
          />
          <View className="flex-1 ml-3">
            <Text className="text-sm font-poppins-semibold text-gray-800 mb-1">
              Pencapaian Terbuka!
            </Text>
            <Text className="text-sm text-gray-600 font-poppins">
              Pejuang Lingkungan - {streakDays} hari beruntun
            </Text>
          </View>
          <TouchableOpacity className="px-3 py-1.5 rounded-lg" style={{ backgroundColor: '#CEDD99' }}>
            <Text className="text-sm font-poppins-medium" style={{ color: '#2E5538' }}>
              Bagikan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}