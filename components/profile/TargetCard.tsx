import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';

interface TargetCardProps {
  title: string;
  month: string;
  status: string;
  daysLeft: number;
  progress: number; // example: 0.73 for 73%
  currentValue: number;
  targetValue: number;
  feedback: string;
  isGreen: boolean;
}

export function TargetCard({
  title,
  month,
  status,
  daysLeft,
  progress,
  currentValue,
  targetValue,
  feedback,
  isGreen,
}: TargetCardProps) {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center">

        <View className='flex-col'>
          <View className='flex-row justify-between items-center w-full'>
            <View className='flex-col'>
              <Text className='font-poppins-medium text-[12px] text-black '>{title}</Text>
              <Text className='font-poppins text-[11px] text-black '>{month}</Text>
            </View>

            <View
              style={{
              backgroundColor: isGreen ? '#C8DB9D' : '#D9534F',
              borderRadius: 16,
              paddingHorizontal: 12,
              paddingVertical: 4,
              }}
            >
              <Text
              className='font-poppins text-[11px]'
              style={{ color: isGreen ? '#2E5538' : '#ffffff' }}
              >
              {status}
              </Text>
            </View>
          </View>

          <View className="items-end mt-2">
            <Text className="text-black text-end font-poppins text-[10px]">Sisa waktu: {daysLeft} hari</Text>
          </View>

        </View>


      </View>

      {/* Progress text */}
      <View className="flex-row justify-between items-center mt-2">
        <Text className="mt-1 self-end text-black font-poppins text-[12px]">
          Proses
        </Text>
        <Text className="mt-1 self-end text-black font-poppins text-[12px]">
          {currentValue}/{targetValue} kg CO₂e
        </Text>
      </View>


      {/* Progress bar */}
      <View
        style={{
          height: 16,
          backgroundColor: '#EFE9DD',
          borderRadius: 8,
          overflow: 'hidden',
          marginTop: 2,
        }}
      >
        <View
          style={{
        height: '100%',
        width: `${progress * 100}%`,
        backgroundColor: isGreen ? '#3F6342' : '#D9534F',
        borderRadius: 8,
          }}
        />
      </View>

      {/* Feedback */}
      <View className="flex-row items-center mt-1">
        <MaterialIcons
          name={"trending-up"}
          size={16}
          color={"#537D5D"}
          style={{ marginRight: 6 }}
        />
        <Text className="text-black font-poppins text-[11px]">{feedback}</Text>
      </View>
    </View>
  );
}
