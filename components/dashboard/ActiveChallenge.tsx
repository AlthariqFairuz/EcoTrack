import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

interface ActiveChallengeProps {
  imageSource: string,
  title: string,
  description: string,
  joinText: string,
  buttonText: string,
  onPress : () => void,
}

export function ActiveChallenge({
  imageSource,
  title,
  description,
  joinText,
  buttonText,
  onPress,
}: ActiveChallengeProps) {
  return (
    <View className="flex-row items-center bg-white rounded-2xl p-4 shadow mt-2">
      {/* Icon */}
      <View className="w-12 h-12 rounded-full bg-[#F5F5F5] justify-center items-center mr-4">
      <Image
        source={imageSource}
        style={{ width: 40, height: 40 }}
        contentFit="contain"
      />
      </View>

      {/* Text Section */}
      <View className="flex-1">
        <Text className="font-poppins-medium text-[12px] text-black">
          {title}
        </Text>
        <Text className="font-poppins text-[11px] text-black">
          {description}
        </Text>
        <Text className="font-poppins text-[11px] text-[#2E5538]">
          {joinText}
        </Text>
      </View>

      {/* Button */}
      <TouchableOpacity
        className="bg-[#C7DCA7] rounded-full px-4 py-2 ml-2"
        onPress={onPress}
      >
        <Text className="text-green-900 font-medium">{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}
