import { View, Text } from 'react-native';
import { Image } from 'expo-image';

export function ProfileBanner() {
    return (
        <View className='flex mt-2'>
            <View className='flex-row'>
                <Image
                    source={require('@/assets/images/profile.svg')}
                    style={{ width: 56, height: 56 }}
                    contentFit="contain"
                />
                <View className='flex flex-col ml-4'>
                    <Text className="font-poppins-medium text-[14px] font-bold text-black">
                        Adinda
                    </Text>
                    <View className="flex-row items-center">
                        <Image
                            source={require('@/assets/images/location.svg')}
                            style={{ width: 14, height: 14, marginRight: 4, tintColor: 'black' }}
                            contentFit="contain"
                        />
                        <Text className="font-poppins-medium text-[12px] text-black">
                            Jakarta, Indonesia
                        </Text>
                    </View>
                    <Text className="font-poppins-medium text-[12px] text-black">
                        EcoTracker sejak Januari 2025
                    </Text>
                </View>
            </View>



        </View>
    )
}