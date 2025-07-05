import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';

interface ProgressCardProps {
  image: string;
  title: string;
  description: string;
  badgeText: string;
  badgeColor: string;
  achievedDate?: string;
  progress?: number;
  currentValue?: number;
  targetValue?: number;
  isFinisihed?: boolean;
}

export function ProgressCard({
  image,
  title,
  description,
  badgeText,
  badgeColor,
  achievedDate,
  progress = 0,
  currentValue = 0,
  targetValue = 0,
  isFinisihed,
}: ProgressCardProps) {

  return (
    <View className={`flex-row rounded-2xl p-4 mb-4 items-center shadow-sm ${isFinisihed ? 'bg-[#C7E5A8]' : 'bg-white'}`}>
      {/* Icon */}
      <Image
        source={image}
        style={{ width: 40, height: 40 }}
        contentFit="contain"
      />

      {/* Content */}
      <View className="flex-1 ml-4">
        <View className="flex-row justify-between items-center">
          <Text className="font-poppins-medium text-[12px]">{title}</Text>
          <View
            style={{ backgroundColor: badgeColor }}
            className="px-3 py-1 rounded-full"
          >
            <Text className="font-poppins-medium text-[11px]">{badgeText}</Text>
          </View>
        </View>

        <Text className="font-poppins text-[11px] mt-1">{description}</Text>

        {isFinisihed ? (
          <View className="flex-row items-center mt-2">
            <Image
              source={require('@/assets/images/profile/logout.svg')}
              style={{ width: 16, height: 16, marginRight: 8, tintColor: 'black' }}
              contentFit="contain"
            />       
           <Text className="font-poppins text-[11px] text-black">Diraih pada {achievedDate}</Text>
          </View>
        ) : (
          <>
          <View className='flex-row justify-between items-center mt-1'>
            <Text className="font-poppins-medium text-[11px] mt-2">Proses</Text>
            <Text className="font-poppins-medium text-[11px] self-end mt-0.5">
              {currentValue}/{targetValue}
            </Text>
          </View>
            <View className="h-3 bg-neutral-200 rounded-full overflow-hidden mt-2">
              <View
                style={{
                  width: `${progress * 100}%`,
                  backgroundColor: '#2E5538',
                }}
                className="h-full"
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
}
