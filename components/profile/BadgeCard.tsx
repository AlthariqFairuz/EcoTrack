import { View, Text, Dimensions } from "react-native";
import { Image } from 'expo-image'; 
import { ThemedText } from '@/components/ThemedText';

interface BadgeCardProps {
  image: string;
  description: string;
}

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 4 - 20; 

export function BadgeCard({
  image,
  description
}: BadgeCardProps) {
  return (
    <View
      className="bg-white rounded-2xl p-3 shadow-lg items-center justify-center"
      style={{ width: cardWidth }}
    >
      <Image
        source={image}
        style={{ width: 40, height: 40 }}
        contentFit="contain"
      />
      <Text
        className="font-poppins-medium text-[12px] text-center mt-2"
        numberOfLines={2} 
        adjustsFontSizeToFit
      >
        {description}
      </Text>
    </View>
  );
}
