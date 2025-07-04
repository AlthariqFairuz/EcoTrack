import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { Image } from 'expo-image';

interface MenuItem {
  image: string;
  name: string;
  route?: string;
}

interface MenuButtonListProps {
  items: MenuItem[];
}

export function MenuButtonList({ items }: MenuButtonListProps) {
  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 12,
        margin: 0,
      }}
    >
      {items.map((item, index) => (
        <React.Fragment key={item.name}>
          <TouchableOpacity
            onPress={() => router.push(item.route as any || '')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 16,
            }}
          >
            <Image
              source={item.image}
              style={{ width: 22, height: 22, marginRight: 8, tintColor: 'black' }}
              contentFit="contain"
            />
            <Text className="text-[12px] font-poppins-medium text-[#323232]">
              {item.name}
            </Text>
          </TouchableOpacity>

          {index !== items.length - 1 && (
            <View
              style={{
                height: 1,
                backgroundColor: '#e0e0e0',
                marginLeft: 20,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
}
