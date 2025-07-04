import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

// Components
import { MenuButtonList } from '@/components/profile/ButtonGroup';
import { Image } from 'expo-image';
import Header from '@/components/header/header';

export default function PengaturanPage() {
    return (
        <View className='flex-1 bg-[#FAF6E9]'>
            <Header title='Pengaturan' prevPage='/(profile)' isOnDashboard={false} />

            <ScrollView className='flex-1 p-4 px-8'>

                {/* Pemberitahuan */}
                <View className='flex flex-col mb-6'>
                    <Text className='font-poppins-medium text-[20px] text-black mb-2'>  
                        Pemberitahuan
                    </Text>
                    <MenuButtonList
                        items={[
                            { name: 'Notifikasi', image:require('@/assets/images/profile/settings/bell.svg'),  },
                            { name: 'Pengingat Harian', image:require('@/assets/images/profile/settings/pengingat.svg'), },
                            { name: 'Notifikasi Pencapaian', image:require('@/assets/images/profile/settings/pencapaian.svg'), },
                        ]}
                    />
                </View>

                {/* Privasi dan Keamanan */}
                <View className='flex flex-col mb-6'>
                    <Text className='font-poppins-medium text-[20px] text-black mb-2'>  
                        Privasi dan Keamanan
                    </Text>
                    <MenuButtonList
                        items={[
                            { name: 'Pengaturan Privasi', image:require('@/assets/images/profile/settings/shield.svg') },
                            { name: 'Ekspor Data', image:require('@/assets/images/profile/settings/export.svg') },
                            { name: 'Kemananan Akun', image:require('@/assets/images/profile/settings/security.svg') },
                        ]}
                    />
                </View>

                {/* Preferensi */}
                <View className='flex flex-col mb-6'>
                    <Text className='font-poppins-medium text-[20px] text-black mb-2'>  
                        Preferensi
                    </Text>
                    <MenuButtonList
                        items={[
                            { name: 'Tema', image:require('@/assets/images/profile/settings/shield.svg') },
                            { name: 'Bahasa', image:require('@/assets/images/profile/settings/export.svg')  },
                        ]}
                    />
                </View>

                {/* Tentang */}
                <View className='flex flex-col mb-6'>
                    <Text className='font-poppins-medium text-[20px] text-black mb-2'>  
                        Tentang
                    </Text>
                    <MenuButtonList
                        items={[
                            { name: 'Versi Aplikasi', image:require('@/assets/images/profile/settings/info.svg') },
                            { name: 'Syarat dan Ketentuan', image:require('@/assets/images/profile/settings/info.svg') },
                            { name: 'Kebiajakan Privasi', image:require('@/assets/images/profile/settings/info.svg') },
                        ]}
                    />
                </View>

                {/* Zona bahaya */}
                <View className='flex flex-col mb-4'>
                    <View className='flex flex-row items-center mb-2'>
                        <Image
                        source={require('@/assets/images/profile/settings/bahaya.svg')}
                        style={{ width: 40, height: 40, marginRight: 8 }}
                        contentFit="contain"
                        />
                        <Text className='font-poppins-medium text-[20px] text-black mt-1'>  
                            Zona Bahaya
                        </Text>
                    </View>
                    <Text className='font-poppins text-[12px] mb-3 ml-2'>
                        Langkah ini bersifat permanen dan tidak dapat dibatalkan. Harap pastikan keputusanmu.
                    </Text>
                    <View className="items-center">
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
                </View>

            </ScrollView>
        </View>
    )
}