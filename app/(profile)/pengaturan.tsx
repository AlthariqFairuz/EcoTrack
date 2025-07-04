import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

// Components
import ProfileHeader from '@/components/profile/ProfileHeader';
import { MenuButtonList } from '@/components/profile/ButtonGroup';

export default function PengaturanPage() {
    return (
        <View className='flex-1 bg-[#FAF6E9]'>

            <ProfileHeader title='Pengaturan' isOnProfile={false} />

            <ScrollView className='p-4 px-8'>

                {/* Pemberitahuan */}
                <View className='flex flex-col mb-6'>
                    <Text className='text-xl mb-3'>  
                        Pemberitahuan
                    </Text>
                    <MenuButtonList
                        items={[
                            { name: 'Notifikasi', route: '/target-karbon' },
                            { name: 'Pengingat Harian', route: '/pengaturan' },
                            { name: 'Notifikasi Pencapaian', route: '/faq' },
                        ]}
                    />
                </View>

                {/* Privasi dan Keamanan */}
                <View className='flex flex-col mb-6'>
                    <Text className='text-xl mb-3'>  
                        Privasi dan Keamanan
                    </Text>
                    <MenuButtonList
                        items={[
                            { name: 'Pengaturan Privasi', route: '/target-karbon' },
                            { name: 'Ekspor Data', route: '/pengaturan' },
                            { name: 'Kemananan Akun', route: '/faq' },
                        ]}
                    />
                </View>

                {/* Preferensi */}
                <View className='flex flex-col mb-6'>
                    <Text className='text-xl mb-3'>  
                        Preferensi
                    </Text>
                    <MenuButtonList
                        items={[
                            { name: 'Tema', route: '/target-karbon' },
                            { name: 'Bahasa', route: '/pengaturan' },
                        ]}
                    />
                </View>

                {/* Tentang */}
                <View className='flex flex-col mb-6'>
                    <Text className='text-xl mb-3'>  
                        Tentang
                    </Text>
                    <MenuButtonList
                        items={[
                            { name: 'Versi Aplikasi', route: '/target-karbon' },
                            { name: 'Syarat dan Ketentuan', route: '/pengaturan' },
                            { name: 'Kebiajakan Privasi', route: '/faq' },
                        ]}
                    />
                </View>

                {/* Zona bahaya */}
                <View className='flex flex-col mb-2'>
                    <Text className='text-xl mb-3'>
                        Zona Bahaya
                    </Text>
                    <Text className='mb-3'>
                        Langkah ini bersifat permanen dan tidak dapat dibatalkan. Harap pastikan keputusanmu.
                    </Text>
                    <TouchableOpacity 
                        className="bg-transparent border border-[#892424] py-4 px-[60px] rounded-[25px] w-full max-w-[300px] mb-4"
                        onPress={() => {}}
                    >
                        <Text className="font-poppins-medium text-[16px] text-[#892424] text-center">Reset Semua Data</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        className="bg-[#892424] py-4 px-[60px] rounded-[25px] w-full max-w-[300px] mb-6"
                        style={{backgroundColor: '#892424'}}
                        onPress={() => {}}
                    >
                        <Text className="font-poppins-medium text-[16px] text-white text-center">Hapus Akun</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    )
}