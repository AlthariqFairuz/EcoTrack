import { View, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


// Anggapannya kalau ga di dashboard, berarti bisa balik ke halaman sebelumnya (Contoh: Profil)
type HeaderProps = {
    title: string;
    prevPage?: string;
    isOnDashboard: boolean
}


export default function Header({ title, prevPage, isOnDashboard }: HeaderProps) {

  const handleLogout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('userEmail');
    await AsyncStorage.removeItem('userName');
    
    Toast.show({
      type: 'success',
      text1: 'Logout berhasil',
      text2: 'Sampai jumpa! 👋'
    });
    
    setTimeout(() => {
      router.replace('/(auth)/login');
    }, 1000);
  };
    return (
        <View className="bg-[#3F6342] flex-row items-end justify-between rounded-b-[10px] px-4 py-2 h-[100px]">
            {!isOnDashboard && (
                <>
                    <View className="w-[40px] items-start pb-2">
                        <TouchableOpacity
                            onPress={() => {
                                if (prevPage) {
                                    router.replace(prevPage as any);
                                } else {
                                    router.back();
                                }
                            }}
                        >
                            <Image
                                source={require('@/assets/images/leftarrow.svg')}
                                style={{ width: 24, height: 24 }}
                                contentFit="contain"
                            />
                        </TouchableOpacity>

                    </View>

                    <View className="flex-1 items-center pb-2">
                        <Text className="text-white font-poppins-medium text-[18px]">{title}</Text>
                    </View>

                    <View className="w-[40px] items-end pb-2">
                        <TouchableOpacity
                            onPress={() => {
                                if (prevPage) {
                                    router.replace(prevPage as any);
                                } else {
                                    router.back();
                                }
                            }}
                        >
                            <Image
                                source={require('@/assets/images/profile.svg')}
                                style={{ width: 24, height: 24 }}
                                contentFit="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </>
            )}

            {isOnDashboard && (
                <>
                    <View className="flex-1 pb-1">
                        <Text className="text-white font-poppins-medium text-[18px]">{title}</Text>
                    </View>

                    <View className="w-auto flex-row items-end gap-x-3 pb-2">
                        {/* @TODO: UBAH KE PAGE NOTIFIKASI */}
                        <TouchableOpacity
                            onPress={() => {router.replace('/(tabs)');}}
                        >
                            <Image
                                source={require('@/assets/images/notification.svg')}
                                style={{ width: 24, height: 24 }}
                                contentFit="contain"
                            />
                        </TouchableOpacity>

                        {/* @TODO: UBAH KE PAGE PROFILE */}
                        <TouchableOpacity
                            onPress={() => {router.replace('/(profile)/profile');}}
                        >
                            <Image
                                source={require('@/assets/images/profile.png')}
                                style={{ width: 24, height: 24 }}
                                contentFit="contain"
                            />
                        </TouchableOpacity>
                    </View>

                </>
            )}

        </View>

    );
}