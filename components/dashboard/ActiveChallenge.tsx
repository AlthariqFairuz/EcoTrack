import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

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
      {/* <View className="w-12 h-12 rounded-full bg-[#F5F5F5] justify-center items-center mr-4">
        <Image
          source={imageSource}
          className="w-8 h-8"
          resizeMode="contain"
        />
      </View> */}

      {/* Text Section */}
      <View className="flex-1">
        <Text className="font-bold text-base">
          {title}
        </Text>
        <Text className="text-sm mt-1 text-gray-600">
          {description}
        </Text>
        <Text className="text-green-700 text-sm mt-1">
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
