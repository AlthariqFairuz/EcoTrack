import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Recommendation } from '@/services/recommendationService';
import { Image } from 'expo-image';
import Toast from 'react-native-toast-message';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onActionTaken: (id: string) => void;
}

export function RecommendationCard({ recommendation, onActionTaken }: RecommendationCardProps) {
  const handleActionPress = () => {
    Toast.show({
      type: 'success',
      text1: 'Aksi Dicatat! 🎉',
      text2: `Kamu berkomitmen ${recommendation.impact.toLowerCase()}`,
    });
    onActionTaken(recommendation.id);
  };

  const getIconBackground = (type: string) => {
    switch (type) {
      case 'transport':
        return 'bg-blue-50';
      case 'food':
        return 'bg-orange-50';
      case 'energy':
        return 'bg-yellow-50';
      case 'waste':
        return 'bg-green-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getIconSource = (type: string) => {
    switch (type) {
      case 'transport':
        return require('@/assets/images/icon_bus.png');
      case 'food':
        return require('@/assets/images/icon_food.png');
      case 'energy':
        return require('@/assets/images/icon_api.png'); // Assuming this is energy icon
      case 'waste':
        return require('@/assets/images/icon_tanaman.png');
      default:
        return require('@/assets/images/icon_api.png');
    }
  };

  return (
    <View className="bg-white rounded-xl p-4 mb-3" style={{
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    }}>
      <View className="flex-row items-start">
        <View className={`w-12 h-12 rounded-xl ${getIconBackground(recommendation.type)} justify-center items-center mr-4`}>
          <Image
            source={getIconSource(recommendation.type)}
            style={{ width: 32, height: 32 }}
            contentFit="contain"
          />
        </View>
        
        <View className="flex-1">
          <Text className="text-sm font-poppins-semibold text-gray-800 mb-2">
            {recommendation.title}
          </Text>
          <Text className="text-xs text-gray-600 leading-4 mb-2 font-poppins">
            {recommendation.description}
          </Text>
          <Text className="text-xs font-poppins-semibold" style={{ color: '#537D5D' }}>
            {recommendation.impact}
          </Text>
        </View>
        
        {recommendation.actionable && (
          <TouchableOpacity 
            className="px-3 py-2 rounded-lg"
            style={{ backgroundColor: '#CEDD99' }}
            onPress={handleActionPress}
          >
            <Text className="text-xs font-poppins-semibold" style={{ color: '#2E5538' }}>
              Ambil Aksi
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}