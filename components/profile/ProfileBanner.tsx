import { View, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';

export function ProfileBanner() {
    return (
        <View className='flex'>
            <Image
                source={'@/assets/images/profile.png'}
                style={{ width: 24, height: 24 }}
                contentFit="contain"
            />

            <View className='flex flex-col'>
                <Text className="font-poppins-medium text-[14px] font-bold text-gray-800 mb-1">
                    Adinda
                </Text>
                <Text className="font-poppins-medium text-[12px] text-gray-800">
                    Jakarta, Indonesia
                </Text>
                <Text className="font-poppins-medium text-[12px] text-gray-800">
                    EcoTracker sejak Januari 2025
                </Text>
            </View>
        </View>
    )
}