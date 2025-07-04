import { View, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';


// Anggapannya kalau ga di dashboard, berarti bisa balik ke halaman sebelumnya (Contoh: Profil)
type ProfileHeaderProps = {
    title: string;
    isOnProfile: boolean
}


export default function ProfileHeader({ 
    title, 
    isOnProfile 
}: ProfileHeaderProps) {
    return (
        <View className="flex-row items-end justify-between rounded-b-[10px] px-4 py-2 h-[100px]"
            style={{ backgroundColor: '#3F6342',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    paddingHorizontal: 16, // px-4 → 4 * 4 = 16
                    paddingVertical: 8,    // py-2 → 2 * 4 = 8
                    height: 100,
                }}
        >
            <View className="w-[40px] items-start pb-2">
                <TouchableOpacity
                    onPress={() => {
                        if (isOnProfile) {
                            router.replace('/(tabs)');
                        } else {
                            router.replace('/(profile)/profile');
                        }
                    }}
                >
                    <Image
                        source={'@/assets/images/leftarrow.svg'}
                        style={{ width: 24, height: 24 }}
                        contentFit="contain"
                    />
                </TouchableOpacity>
            </View>
            <View className="flex-1 items-center mb-2">
                <Text className="text-white font-poppins-medium text-2xl">{title}</Text>
            </View>
        </View>
    );
}