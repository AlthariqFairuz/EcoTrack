import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
// Components
import { StatusCard } from '@/components/profile/StatusCard';
import { ProgressCard } from '@/components/profile/ProgressCard';
import Header from '@/components/header/header';

export default function AnalisisPage() {

    return (
        <View className='flex-1 bg-[#FAF6E9]'>

            <Header title='Penghargaan' prevPage='/(profile)/profile' isOnDashboard={false} />

            <ScrollView className='flex-1 p-4 px-8'>
                {/* status card */}
                <View className='flex-row items-center mb-2 mt-4 justify-center'>
                    <StatusCard
                        image={require('@/assets/images/profile/pencapaian.svg')}
                        totalAch={6}
                        description='Dicapai'
                    />
                    <StatusCard
                        image={require('@/assets/images/profile/penghargaan/tanaman.svg')}
                        totalAch={10}
                        description='On Going'
                    />
                    <StatusCard
                        image={require('@/assets/images/profile/star.svg')}
                        totalAch={10}
                        description='Progress'
                    />
                </View>

                {/* Ahli Track */}
                <View className='flex flex-col mb-6'>
                    <Text className='font-poppins-medium text-[18px] mb-3'>
                        Ahli Track
                    </Text>
                    <View className=''>
                        <ProgressCard
                            image={require('@/assets/images/profile/daun.svg')}
                            title="Langkah Pertama"
                            description="Catat aktivitas pertamamu"
                            badgeText="Biasa"
                            badgeColor="#F4EEDC"
                            achievedDate="22 Februari 2025"
                            isFinisihed={true}
                        />

                        <ProgressCard
                            image={require('@/assets/images/profile/streak.svg')}
                            title="Pejuang Mingguan"
                            description="Catat aktivitas selama 7 hari berturut-turut"
                            badgeText="Tidak Biasa"
                            badgeColor="#F4EEDC"
                            achievedDate="3 Maret 2025"
                            isFinisihed={true}
                        />

                        <ProgressCard
                            image={require('@/assets/images/profile/penghargaan/locked.svg')}
                            title="Master Bulanan"
                            description="Catat aktivitas selama 30 hari berturut-turut"
                            badgeText="Langka"
                            badgeColor="#F4EEDC"
                            progress={25 / 30}
                            currentValue={25}
                            targetValue={30}
                            isFinisihed={false}
                        />
                    </View>

                    {/* Penyelamat Karbon */}
                    <View className='flex flex-col mb-4'>
                        <Text className='font-poppins-medium text-[18px] mb-3'>
                            Penyelamat Karbon
                        </Text>
                        <View className=''>
                            <ProgressCard
                                image={require('@/assets/images/profile/penghargaan/petir.svg')}
                                title="Pahlawan Energi"
                                description="Hemat 100 kg CO₂e"
                                badgeText="Biasa"
                                badgeColor="#F4EEDC"
                                achievedDate="3 Februari 2025"
                                isFinisihed={true}
                            />

                            <ProgressCard
                                image={require('@/assets/images/profile/penghargaan/bumi.svg')}
                                title="Juara Iklim"
                                description="Hemat 1000 kg CO₂e"
                                badgeText="Langka"
                                badgeColor="#F4EEDC"
                                achievedDate="19 Maret 2025"
                                isFinisihed={true}
                            />

                            <ProgressCard
                                image={require('@/assets/images/profile/penghargaan/locked.svg')}
                                title="Pelindung Planet"
                                description="Hemat 5000 kg CO₂e"
                                badgeText="Epik"
                                badgeColor="#F4EEDC"
                                progress={25 / 30}
                                currentValue={25}
                                targetValue={30}
                                isFinisihed={false}
                            />
                        </View>
                    </View>
                </View>
                <View className='flex items-center mb-6'>
                    <Text className='font-poppins-medium text-[18px] mb-3 text-center'>
                        Bagikan Prosesmu
                    </Text>
                    <Text className='font-poppins text-[14px] mb-3 text-center'>
                        Tunjukkan kepada temanmu bahwa kamu ikut berkontribusi untuk bumi!
                    </Text>
                    <TouchableOpacity
                        className="bg-[#537D5D] py-4 px-[60px] rounded-[25px] w-full max-w-[300px] mb-6"
                        style={{ backgroundColor: '#537D5D' }}
                        onPress={() => { }}
                    >
                        <View className='flex-row items-center justify-center'>
                            <Image
                                source={require('@/assets/images/community/share.svg')}
                                style={{ width: 16, height: 16, marginRight: 8, tintColor: 'white' }}
                                contentFit="contain"
                            />
                            <Text className="font-poppins-medium text-[16px] text-white text-center mt-1">Bagikan Pencapaian</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}