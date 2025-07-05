import { Image } from 'expo-image';
import { Dimensions, Text, View } from "react-native";

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
        <View className="bg-white rounded-xl p-3 mb-3 shadow-lg mx-2"
            style={{ width: cardWidth }}
        >
            <View className="flex-col items-center">

                {/* Image */}
                <Image
                    source={image}
                    style={{ width: 40, height: 40 }}
                    contentFit="contain"
                />
                
                <Text className="font-poppins-medium text-[14px] text-center">
                    {totalAch}
                </Text>

                <Text className="font-poppins text-[11px] text-center">
                    {description}
                </Text>
            </View>
        </View>
    )
}