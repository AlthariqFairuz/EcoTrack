import { View, Text, Dimensions } from "react-native";
import { ThemedText } from '@/components/ThemedText';
import { Image } from 'expo-image'; 

interface StatusCardProps {
    image: string;
    totalAch: number;
    description: string;
}

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 3 - 32; 

export function StatusCard({
    image,
    totalAch,
    description
}: StatusCardProps) {
    return (
        <View className="bg-white rounded-xl p-3 mb-3 shadow-lg"
            style={{ width: cardWidth }}
        >
            <View className="flex-col">

                {/* Image */}
                <Image
                    source={image}
                    style={{ width: 20, height: 20 }}
                    contentFit="contain"
                />
                
                <Text className="text-xl font-bold text-center">
                    {totalAch}
                </Text>

                <Text className="font-poppins-medium text-[12px] text-center">
                    {description}
                </Text>
            </View>
        </View>
    )
}