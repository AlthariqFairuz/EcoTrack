import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface ShareActionCardProps {
  onPressLink: () => void,
  onPressImage: () => void,
  onPressSend: () => void,
}

function ShareActionCard({
  onPressLink,
  onPressImage,
  onPressSend,
}: ShareActionCardProps) {
  return (
    <View className="bg-white rounded-2xl p-4 shadow mt-2">
      {/* Top Row */}
      <View className="flex-row items-center">
        <Image
          source={require('../../assets/images/profile.png')}
          className="w-8 h-8 rounded-full mr-2"
        />
        <Text className="text-gray-500">Bagikan aksi hijaumu...</Text>
      </View>

      {/* Divider */}
      <View className="h-px bg-gray-200 my-3" />

      {/* Bottom Row */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row space-x-4">
          <TouchableOpacity onPress={onPressLink}>
            <Image
              source={require('../../assets/images/profile.png')} 
              className="w-6 h-6"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressImage}>
            <Image
              source={require('../../assets/images/profile.png')} 
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="bg-[#F9E8C9] p-2 rounded-xl"
          onPress={onPressSend}
        >
          <Image
            source={require('../../assets/images/profile.png')} 
            className="w-5 h-5"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ShareActionCard;
