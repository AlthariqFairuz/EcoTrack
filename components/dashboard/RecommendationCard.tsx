import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Recommendation } from '@/services/recommendationService';
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

  return (
    <View className="bg-gray-50 rounded-xl p-4 mb-3">
      <View className="flex-row items-start">
        <View className={`w-12 h-12 rounded-xl ${getIconBackground(recommendation.type)} justify-center items-center mr-4`}>
          <ThemedText className="text-2xl">{recommendation.icon}</ThemedText>
        </View>
        
        <View className="flex-1">
          <ThemedText className="text-sm font-semibold text-gray-800 mb-2">
            {recommendation.title}
          </ThemedText>
          <ThemedText className="text-xs text-gray-600 leading-4 mb-2">
            {recommendation.description}
          </ThemedText>
          <ThemedText className="text-xs text-green-600 font-semibold">
            {recommendation.impact}
          </ThemedText>
        </View>
        
        {recommendation.actionable && (
          <TouchableOpacity 
            className="bg-green-200 px-3 py-2 rounded-lg"
            onPress={handleActionPress}
          >
            <ThemedText className="text-xs text-green-700 font-semibold">
              Ambil Aksi
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}