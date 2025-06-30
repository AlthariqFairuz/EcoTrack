import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

// Components
import ProfileHeader from '@/components/profile/ProfileHeader';
import { ProfileBanner } from '@/components/profile/ProfileBanner';
import { BadgeCard } from '@/components/profile/BadgeCard';
import { AchievementCard } from '@/components/profile/AchievementCard';
import { ThemedText } from '@/components/ThemedText';

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
        <View className='bg-[#FAF6E9]'>
            
            <ProfileHeader title='Profil' isOnProfile={true} />

            <ScrollView className='flex p-4 px-8'>

                <ProfileBanner/>

                {/* Achievements */}
                <View className='flex-row items-center mb-2 mt-4 justify-center ml-4'>
                    <View className='flex mr-4'>
                        <AchievementCard
                            image='@/assets/images/profile.png'
                            totalAch={10}
                            description='Pencapaian'
                        />
                        <AchievementCard
                            image='@/assets/images/profile.png'
                            totalAch={7}
                            description='Streak Saat ini'
                        />
                    </View>
                    <View className='flex mr-4'>
                        <AchievementCard
                            image='@/assets/images/profile.png'
                            totalAch={23}
                            description='Di Jakarta'
                        />
                        <AchievementCard
                            image='@/assets/images/profile.png'
                            totalAch={156}
                            description='Dihemat Bulan ini'
                        />
                    </View>
                </View>

                {/* Penacapaian */}
                <View className='flex flex-col mb-6'>
                    <Text className='text-xl text-black mb-4 mt-4'>
                        Pencapaian Terbaru
                    </Text>
                    <View className='flex flex-row flex-wrap justify-between'>
                        <BadgeCard
                            image='@/assets/images/profile.png'
                            description='Pejuang'
                        />
                        <BadgeCard
                            image='@/assets/images/profile.png'
                            description='Pro Scanner'
                        />
                        <BadgeCard
                            image='@/assets/images/profile.png'
                            description='Hemat Energi'
                        />
                        <BadgeCard
                            image='@/assets/images/profile.png'
                            description='Reuse Warrior'
                        />
                    </View>
                </View>


                {/* Buttons */}
                {/* onPress tiap button belum dihandle */}
                <View className='flex flex-col bg-white rounded-xl m-4'>
                    <TouchableOpacity
                        onPress={() => {}}
                        className="flex-row items-center px-5 py-4 active:bg-gray-100"
                    >
                        <ThemedText className="text-base text-gray-800">Target Karbon</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {}}
                        className="flex-row items-center px-5 py-4 active:bg-gray-100"
                    >
                        <ThemedText className="text-base text-gray-800">Pengaturan</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {}}
                        className="flex-row items-center px-5 py-4 active:bg-gray-100"
                    >
                        <ThemedText className="text-base text-gray-800">Bantuan & FAQ</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleLogout()}
                        className="flex-row items-center px-5 py-4 active:bg-gray-100"
                    >
                        <ThemedText className="text-base text-gray-800">Keluar</ThemedText>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}