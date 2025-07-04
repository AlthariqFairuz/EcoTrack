import { ScrollView, Text, View } from 'react-native';

// Components
import { ActiveChallenge } from '@/components/dashboard/ActiveChallenge';
import { CommunityComments } from '@/components/dashboard/CommunityComments';
import ShareActionCard from '@/components/dashboard/ShareAction';

export default function Community() {


    return (
        <View className='bg-[#FAF6E9]'>
            <ScrollView className='flex p-4 px-8'>

                {/* Tantangan Aktif */}
                <View className='flex flex-col mb-6'>
                    <Text className='text-xl mb-3'>
                        Tantangan Aktif
                    </Text>
                    <View className=''>
                        <ActiveChallenge
                            imageSource=''
                            title='Pekan Bersepeda ke Kantor'
                            description='Bersepeda ke tempat kerja setiap hari minggu ini'
                            joinText='1247 telah bergabung'
                            buttonText='Ikuti'
                            onPress={() => {}}
                        />
                        <ActiveChallenge
                            imageSource=''
                            title='Senin Tanpa Daging'
                            description='Tidak makan daging setiap hari Senin bulan ini'
                            joinText='892 telah bergabung'
                            buttonText='Ikuti'
                            onPress={() => {}}
                        />
                    </View>
                </View>

                <View>
                    <Text className='text-xl mb-3'>
                        Cerita Komunitas
                    </Text>
                    <ShareActionCard
                        onPressLink={() => {}}
                        onPressImage={() => {}}
                        onPressSend={() => {}}
                    />
                    <View className='mt-4'>
                        <CommunityComments
                            items={[
                            { 
                                name: 'Dinda', 
                                description: 'Minggu ke-3 bersepeda ke ITB selesai! Aku berhasil menghemat 23kg CO₂e dan menemukan kedai matcha di sepanjang rute.', 
                                time: '2 jam yang lalu',
                                achievement: '23kg CO₂e berhasil dihemat minggu ini',
                                likes: 18,
                                comments: 3,
                            },
                            { 
                                name: 'Radhi', 
                                description: 'Hari ini ga ke mana-mana, nonton anime seharian. Tanpa transportasi, tanpa AC besar, hanya kipas angin dan mie instan.', 
                                time: '5 jam yang lalu',
                                achievement: '2.1 kg CO₂e berhasil dihemat hari ini',
                                likes: 34,
                                comments: 14,
                            },
                            {
                                name: 'Barru', 
                                description: 'Senangnya menjadi vegetarian~', 
                                time: '1 hari yang lalu',
                                achievement: '492 kg CO₂e berhasil dihemat tahun ini',
                                likes: 5,
                                comments: 2,
                            },
                        ]}
                        />
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}