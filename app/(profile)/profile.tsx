import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Image } from 'expo-image';


// Components
import { ProfileBanner } from '@/components/profile/ProfileBanner';
import { BadgeCard } from '@/components/profile/BadgeCard';
import { AchievementCard } from '@/components/profile/AchievementCard';
import Header from '@/components/header/header';

export default function ProfilePage() {


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
        <View className=' flex-1 bg-[#FAF6E9]'>

            <Header title='Profil' prevPage='/(tabs)' isOnDashboard={false} />

            <ScrollView className='flex-1 p-4 px-8'>

                <ProfileBanner/>

                {/* Achievements */}
                <View className='flex-row items-center mb-2 mt-4 justify-center ml-4'>
                    <View className='flex mr-4'>
                        <AchievementCard
                            image={require('@/assets/images/profile/pencapaian.svg')}
                            totalAch={10}
                            description='Pencapaian'
                        />
                        <AchievementCard
                            image={require('@/assets/images/profile/streak.svg')}
                            totalAch={7}
                            description='Streak Saat ini'
                        />
                    </View>
                    <View className='flex mr-4'>
                        <AchievementCard
                            image={require('@/assets/images/profile/target.svg')}
                            totalAch='#23'
                            description='Di Jakarta'
                        />
                        <AchievementCard
                            image={require('@/assets/images/profile/hemat.svg')}
                            totalAch='156 kg'
                            description='Dihemat Bulan ini'
                        />
                    </View>
                </View>

                {/* Penacapaian */}
                <View className='flex flex-col mb-6'>
                    <View className='flex flex-row justify-between items-center'>
                        <Text className='font-poppins-medium text-[16px] text-black mb-4 mt-4'>
                            Pencapaian Terbaru
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.replace('/(profile)/analisis')}
                            className='flex flex-row items-center'
                        >
                            <Text className='font-poppins-medium text-[12px] text-black mb-4 mt-4'>
                                Lihat semua
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className='flex flex-row flex-wrap justify-between'>
                        <BadgeCard
                            image={require('@/assets/images/profile/star.svg')}
                            description='Pejuang Eco'
                        />
                        <BadgeCard
                            image={require('@/assets/images/profile/camera.svg')}
                            description='Pro Scanner'
                        />
                        <BadgeCard
                            image={require('@/assets/images/profile/daun.svg')}
                            description='Hemat Energi'
                        />
                        <BadgeCard
                            image={require('@/assets/images/profile/recycle.svg')}
                            description='Reuse Warrior'
                        />
                    </View>
                </View>


                {/* Buttons */}
                {/* onPress tiap button belum dihandle */}
                <View className="flex flex-col bg-white rounded-xl mb-20">
                    <TouchableOpacity
                        onPress={() => router.replace('/(profile)/target-karbon')}
                        style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 }}
                    >
                        <View className='flex-row items-center'>
                            <Image
                                source={require('@/assets/images/profile/tagetkarbon.svg')}
                                style={{ width: 16, height: 16, marginRight: 8, tintColor: 'black' }}
                                contentFit="contain"
                            />
                            <Text className="text-[14px] font-poppins-medium text-[#323232]">Target Karbon</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: 1, backgroundColor: '#e0e0e0', marginLeft: 0 }} />

                    <TouchableOpacity
                        onPress={() => router.replace('/(profile)/pengaturan')}
                        style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 }}
                    >
                        <View className='flex-row items-center'>
                            <Image
                                source={require('@/assets/images/profile/settings.svg')}
                                style={{ width: 16, height: 16, marginRight: 8, tintColor: 'black' }}
                                contentFit="contain"
                            />
                            <Text className="text-[14px] font-poppins-medium text-[#323232]">Pengaturan</Text>
                        </View>                    
                    </TouchableOpacity>
                    <View style={{ height: 1, backgroundColor: '#e0e0e0', marginLeft: 0 }} />

                    <TouchableOpacity
                        // onPress={() => router.replace('/(profile)/faq')}
                        style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 }}
                    >
                        <View className='flex-row items-center'>
                            <Image
                                source={require('@/assets/images/profile/faq.svg')}
                                style={{ width: 16, height: 16, marginRight: 8, tintColor: 'black' }}
                                contentFit="contain"
                            />
                            <Text className="text-[14px] font-poppins-medium text-[#323232]">Bantuan & FAQ</Text>
                        </View>                    
                    </TouchableOpacity>
                    <View style={{ height: 1, backgroundColor: '#e0e0e0', marginLeft: 0 }} />

                    <TouchableOpacity
                        onPress={() => handleLogout()}
                        style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 }}
                    >
                        <View className='flex-row items-center'>
                            <Image
                                source={require('@/assets/images/profile/logout.svg')}
                                style={{ width: 16, height: 16, marginRight: 8, tintColor: 'black' }}
                                contentFit="contain"
                            />
                            <Text className="text-[14px] font-poppins-medium text-[#323232]">Keluar</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    )
}