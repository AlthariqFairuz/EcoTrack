import React from 'react';
import {Text, TouchableOpacity, View , TextInput} from 'react-native';
import { Image } from 'expo-image';

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
          source={require('@/assets/images/profile.svg')}
          style={{ width: 40, height: 40 }}
          contentFit="contain"
        />
        <TextInput
          className="font-poppins text-[12px] text-[#4D4D4D] ml-2 flex-1"
          placeholder="Bagikan aksi hijaumu..."
          placeholderTextColor="#4D4D4D"
        />
      </View>

      {/* Divider */}
      <View className="h-px bg-gray-200 my-3" />

      {/* Bottom Row */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row space-x-4">
          <TouchableOpacity onPress={onPressLink}>
            <Image
              source={require('../../assets/images/link.png')} 
              style={{ width: 16, height: 16, marginRight: 16 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressImage}>
            <Image
              source={require('../../assets/images/iamge.png')} 
              style={{ width: 16, height: 16 }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="bg-[#F9E8C9] p-2 rounded-xl"
          onPress={onPressSend}
        >
          <Image
            source={require('@/assets/images/community/send.svg')} 
            style={{ width: 18, height: 18 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ShareActionCard;
