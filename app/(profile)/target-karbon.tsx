import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

// Components
import ProfileHeader from '@/components/profile/ProfileHeader';
import { TargetCard } from '@/components/profile/TargetCard';
import { ProgressCard } from '@/components/profile/ProgressCard';
import { ChallengeRecCard } from '@/components/profile/ChallengeRecCard';

export default function TargetKarbonPage() {

    return (
        <View className='bg-[#FAF6E9]'>

            <ProfileHeader title='Target Karbon' isOnProfile={false} />

            <ScrollView className='flex p-4 px-8'>

                {/* Target Aktif */}
                <View className='flex flex-col mb-6'>
                    <Text className='text-xl mb-3'>
                        Target Aktif
                    </Text>
                    <View>
                        <TargetCard
                            title="Pengurangan Karbon Bulanan"
                            month="Maret 2024"
                            status="Lancar"
                            daysLeft={5}
                            progress={18.2 / 25}
                            currentValue={18.2}
                            targetValue={25}
                            feedback="Kemajuan luar biasa! Teruskan!"
                        />
                        <TargetCard
                            title="Pengurangan Karbon Bulanan"
                            month="Maret 2024"
                            status="Lancar"
                            daysLeft={5}
                            progress={18.2 / 25}
                            currentValue={18.2}
                            targetValue={25}
                            feedback="Kemajuan luar biasa! Teruskan!"
                        />
                        <TargetCard
                            title="Pengurangan Karbon Bulanan"
                            month="Maret 2024"
                            status="Lancar"
                            daysLeft={5}
                            progress={18.2 / 25}
                            currentValue={18.2}
                            targetValue={25}
                            feedback="Kemajuan luar biasa! Teruskan!"
                        />
                    </View>
                </View>


                {/* Tentukan Target Bulanan Baru */}
                <View className='flex flex-col mb-6'>
                    <Text className='text-xl mb-3'>
                        Tentukan Target Bulanan Baru
                    </Text>
                    <View className='rounded-xl shadow-md items-center justify-center'>
                        <Text className='text-xl'>
                            25%
                        </Text>
                        <Text className='text-xl'>
                            Target pengurangan jejak karbon 
                        </Text>

                        {/* Progress bar */}


                        <TouchableOpacity>
                            Tetapkan Target untuk April 2025
                        </TouchableOpacity>
                    </View>
                    {/* Prediksi AI */}
                    <View className='rounded-xl bg-[#C3DAF8] text-black'>
                        <View>
                            {/* Image */}
                            <Text>
                                Prediksi AI
                            </Text>
                        </View>
                        <Text>
                            Berdasarkan kebiasaanmu saat ini, target ini bisa dicapai. Dengan usaha yang konsisten, kamu bisa mencapainya dalam waktu 2-3 bulan.
                        </Text>
                    </View>
                </View>

                {/* Tantangan yang disarankan */}
                <View className='flex flex-col mb-6'>
                    <ChallengeRecCard
                        title="Tantangan Bersepeda ke Kantor"
                        description="Naik sepeda ke tempat kerja 3 kali minggu ini"
                        badges={[
                            {
                            text: 'Hemat 8kg CO₂e',
                            backgroundColor: '#C9D99E',
                            textColor: '#3F6342',
                            },
                            {
                            text: 'Sedang',
                            backgroundColor: '#FBEAB6',
                            textColor: '#A06C00',
                            },
                        ]}
                        onAdd={() => {}} // fungsi untuk nambahin
                    />
                    <ChallengeRecCard
                        title="Penghemat Energi"
                        description="Mengurangi penggunaan energi rumah tangga 20%"
                        badges={[
                            {
                            text: 'Hemat 15kg CO₂e',
                            backgroundColor: '#C9D99E',
                            textColor: '#3F6342',
                            },
                            {
                            text: 'Sedang',
                            backgroundColor: '#FBEAB6',
                            textColor: '#A06C00',
                            },
                        ]}
                        onAdd={() => {}} // fungsi untuk nambahin
                    />
                </View>

            </ScrollView>
        </View>
    )
}