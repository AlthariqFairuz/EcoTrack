import React from 'react';
import { Text, View } from 'react-native';
import { Image } from 'expo-image';

type CommentItem = {
  name: string;
  images: string;
  time: string;
  description: string;
  achievement: string;
  likes: number;
  comments: number;
};

export function CommunityComments({
  name,
  images,
  time,
  description,
  achievement,
  likes,
  comments,
}: CommentItem) {
  return (
    <View className="flex-row items-start gap-2 px-2 py-4">
      {/* Profile */}
      <Image
        source={images}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
        }} contentFit="contain"
      />

      {/* Konten kanan */}
      <View className="flex-1 mx-2">
        {/* Header: Nama & Waktu */}
        <View className="flex-row items-center mb-1 flex-wrap">
          <Text className="font-poppins-medium text-[14px] text-black">{name}</Text>
          <Text className="font-poppins text-[11px] text-[#757575] mx-2">•</Text>
          <Text className="font-poppins text-[11px] text-[#757575]">{time} jam yang lalu</Text>
        </View>

        {/* Deskripsi */}
        <Text className="font-poppins text-[11px] text-black">{description}</Text>

        {/* Badge */}
        <View className="bg-[#CEDD99] rounded-[10px] px-3 py-1 mt-2 self-start">
          <Text className="font-poppins text-[10px] text-[#2E5538]">{achievement}</Text>
        </View>

        {/* Aksi: Likes, Comments, Share */}
        <View className="flex-row gap-6 items-center mt-3">
          {/* Like */}
          <View className="flex-row items-center gap-1">
            <Image
              source={require('@/assets/images/community/like.svg')}
              style={{ width: 18, height: 18 }}
              contentFit="contain"
            />
            <Text className="font-poppins text-[11px] text-black mt-1">{likes}</Text>
          </View>

          {/* Comment */}
          <View className="flex-row items-center gap-1">
            <Image
              source={require('@/assets/images/community/chat.svg')}
              style={{ width: 18, height: 18 }}
              contentFit="contain"
            />
            <Text className="font-poppins text-[11px] text-black mt-1">{comments}</Text>
          </View>

          {/* Share */}
          <View className="flex-row items-center gap-1">
            <Image
              source={require('@/assets/images/community/share.svg')}
              style={{ width: 18, height: 18 }}
              contentFit="contain"
            />
          </View>
        </View>

      </View>
    </View>
  );
}
