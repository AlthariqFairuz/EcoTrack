import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

// Components
import ProfileHeader from '@/components/profile/ProfileHeader';
import { StatusCard } from '@/components/profile/StatusCard';
import { ProgressCard } from '@/components/profile/ProgressCard';

export default function AnalisisPage() {

    return (
        <View className='bg-[#FAF6E9]'>

            <ProfileHeader title='Penghargaan' isOnProfile={false} />

            <ScrollView className='flex p-4 px-8'>
                {/* status card */}
                <View className='flex-row items-center mb-2 mt-4 justify-center'>
                    <StatusCard
                        image='@/assets/images/profile.png'
                        totalAch={10}
                        description='Pencapaian'
                    />
                    <StatusCard
                        image='@/assets/images/profile.png'
                        totalAch={10}
                        description='Pencapaian'
                    />
                    <StatusCard
                        image='@/assets/images/profile.png'
                        totalAch={10}
                        description='Pencapaian'
                    />
                </View>

                {/* Ahli Track */}
                <View className='flex flex-col mb-6'>
                    <Text className='text-xl mb-3'>
                        Ahli Track
                    </Text>
                    <View className=''>
                        <ProgressCard
                            icon={<Text style={{ fontSize: 28 }}>🔥</Text>}
                            title="Pejuang Mingguan"
                            description="Catat aktivitas selama 7 hari berturut-turut"
                            badgeText="Tidak Biasa"
                            badgeColor="#F4EEDC"
                            achievedDate="3 Maret 2025"
                            />
                        
                        <ProgressCard
                            icon={<Text style={{ fontSize: 28 }}>🔥</Text>}
                            title="Pejuang Mingguan"
                            description="Catat aktivitas selama 7 hari berturut-turut"
                            badgeText="Tidak Biasa"
                            badgeColor="#F4EEDC"
                            achievedDate="3 Maret 2025"
                            />

                        <ProgressCard
                            icon={<Text style={{ fontSize: 28 }}>🔒</Text>}
                            title="Master Bulanan"
                            description="Catat aktivitas selama 30 hari berturut-turut"
                            badgeText="Langka"
                            badgeColor="#F4EEDC"
                            progress={25 / 30}
                            currentValue={25}
                            targetValue={30}
                            />
                    </View>

                    {/* Penyelamat Karbon */}
                    <View className='flex flex-col mb-6'>
                        <Text className='text-xl mb-3'>
                            Penyelamat Karbon
                        </Text>
                        <View className=''>
                            <ProgressCard
                                icon={<Text style={{ fontSize: 28 }}>🔥</Text>}
                                title="Pejuang Mingguan"
                                description="Catat aktivitas selama 7 hari berturut-turut"
                                badgeText="Tidak Biasa"
                                badgeColor="#F4EEDC"
                                achievedDate="3 Maret 2025"
                                />
                            
                            <ProgressCard
                                icon={<Text style={{ fontSize: 28 }}>🔥</Text>}
                                title="Pejuang Mingguan"
                                description="Catat aktivitas selama 7 hari berturut-turut"
                                badgeText="Tidak Biasa"
                                badgeColor="#F4EEDC"
                                achievedDate="3 Maret 2025"
                                />

                            <ProgressCard
                                icon={<Text style={{ fontSize: 28 }}>🔒</Text>}
                                title="Master Bulanan"
                                description="Catat aktivitas selama 30 hari berturut-turut"
                                badgeText="Langka"
                                badgeColor="#F4EEDC"
                                progress={25 / 30}
                                currentValue={25}
                                targetValue={30}
                                />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}