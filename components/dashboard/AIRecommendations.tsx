import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { RecommendationCard } from '@/components/dashboard/RecommendationCard';
import { recommendationService, Recommendation, UserData } from '@/services/recommendationService';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

interface AIRecommendationsProps {
  userData: UserData;
}

export function AIRecommendations({ userData }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadRecommendations();
  }, [userData, refreshKey]);

  const loadRecommendations = async () => {
    setIsLoading(true);
    try {
      // Simulasi loading AI processing
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newRecommendations = recommendationService.generateRecommendations(userData);
      setRecommendations(newRecommendations);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Gagal memuat rekomendasi AI',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionTaken = async (recommendationId: string) => {
    try {
      await recommendationService.trackAction(recommendationId);
      // Refresh recommendations after action
      setTimeout(() => {
        setRefreshKey(prev => prev + 1);
      }, 2000);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Gagal mencatat aksi',
      });
    }
  };

  if (isLoading) {
    return (
      <View>
        <View className="bg-gray-50 rounded-xl p-4 mb-3">
          <View className="flex-row items-center justify-center py-8">
            <MaterialIcons name="smart-toy" size={32} color="#6b7280" />
            <ThemedText className="text-sm text-gray-500 font-poppins ml-2">AI sedang menganalisis...</ThemedText>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View>
      {recommendations.length === 0 ? (
        <View className="bg-gray-50 rounded-xl p-4 mb-3">
          <View className="items-center py-8">
            <MaterialIcons name="eco" size={32} color="#16a34a" />
            <ThemedText className="text-sm text-gray-500 text-center font-poppins mt-2">
              Kamu sudah sangat ramah lingkungan hari ini!
            </ThemedText>
          </View>
        </View>
      ) : (
        <View>
          {recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
              onActionTaken={handleActionTaken}
            />
          ))}
        </View>
      )}
    </View>
  );
}