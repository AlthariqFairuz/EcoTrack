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
                <View style={{
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    borderRadius: 12,
                    }}>
                    <TouchableOpacity
                        onPress={() => {}}
                        style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 }}
                    >
                        <ThemedText style={{ fontSize: 16, color: '#333' }}>Target Karbon</ThemedText>
                    </TouchableOpacity>
                    <View style={{ height: 1, backgroundColor: '#e0e0e0', marginLeft: 0 }} />

                    <TouchableOpacity
                        onPress={() => {}}
                        style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 }}
                    >
                        <ThemedText style={{ fontSize: 16, color: '#333' }}>Pengaturan</ThemedText>
                    </TouchableOpacity>
                    <View style={{ height: 1, backgroundColor: '#e0e0e0', marginLeft: 0 }} />

                    <TouchableOpacity
                        onPress={() => {}}
                        style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 }}
                    >
                        <ThemedText style={{ fontSize: 16, color: '#333' }}>Bantuan & FAQ</ThemedText>
                    </TouchableOpacity>
                    <View style={{ height: 1, backgroundColor: '#e0e0e0', marginLeft: 0 }} />

                    <TouchableOpacity
                        onPress={() => handleLogout()}
                        style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 }}
                    >
                        <ThemedText style={{ fontSize: 16, color: '#333' }}>Keluar</ThemedText>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    )
}