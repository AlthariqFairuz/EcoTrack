import { ScrollView, Text, View, SafeAreaView } from 'react-native';
// Components
import { ActiveChallenge } from '@/components/dashboard/ActiveChallenge';
import { CommunityComments } from '@/components/dashboard/CommunityComments';
import ShareActionCard from '@/components/dashboard/ShareAction';
import Header from '@/components/header/header';
import Toast from 'react-native-toast-message';
import PageWrapper from '@/components/PageWrapper';
import { ThemedView } from '@/components/ThemedView';

export default function Community() {

    function handleShowToast() {
        Toast.show({
            type: 'success',
            text1: 'Berhasil mengikuti tantangan',
        });
    }
    const communityContents = [
        {
            name: 'Putri',
            images: require('@/assets/images/community/profile-picture/nezuko.jpg'),
            description: 'Hari ini ga ke mana-mana, nonton anime seharian. Tanpa transportasi, tanpa AC besar, hanya kipas angin dan mie instan.',
            time: '5',
            achievement: '2.1 kg CO₂e berhasil dihemat hari ini',
            likes: 34,
            comments: 14,
        },
        {
            name: 'Radhi',
            images: require('@/assets/images/community/profile-picture/gojo.jpg'),
            description: 'Minggu ke-3 bersepeda ke ITB selesai! Aku berhasil menghemat 23kg CO₂e dan menemukan kedai matcha di sepanjang rute.',
            time: '2',
            achievement: '23kg CO₂e berhasil dihemat minggu ini',
            likes: 18,
            comments: 3,
        },
        {
            name: 'Barru',
            images: require('@/assets/images/community/profile-picture/sanji.jpg'),
            description: 'Senangnya menjadi vegetarian~',
            time: '24',
            achievement: '492 kg CO₂e berhasil dihemaset tahun ini',
            likes: 5,
            comments: 2,
        },
    ]
    return (
    <ThemedView className="flex-1" style={{ backgroundColor: '#FAF6E9' }}>
      {/* Header */}
      <Header title='Komunitas' isOnDashboard={false}/>

      <PageWrapper className="px-4 pt-8">
                {/* Tantangan Aktif */}
                <View style={{ marginBottom: 24 }}>
                    <Text className='font-poppins-medium text-[20px] text-black'>
                        Tantangan Aktif
                    </Text>
                    <ActiveChallenge
                        imageSource={require('@/assets/images/community/sepeda.svg')}
                        title='Pekan Bersepeda ke Kantor'
                        description='Bersepeda ke tempat kerja setiap hari minggu ini'
                        joinText='1247 telah bergabung'
                        buttonText='Ikuti'
                        onPress={() => {handleShowToast()}}
                    />
                    <ActiveChallenge
                        imageSource={require('@/assets/images/community/tanpadaging.svg')}
                        title='Senin Tanpa Daging'
                        description='Tidak makan daging setiap hari Senin bulan ini'
                        joinText='892 telah bergabung'
                        buttonText='Ikuti'
                        onPress={() => {handleShowToast()}}

                    />
                </View>

                {/* Cerita Komunitas */}
                <View>
                    <Text className="font-poppins-medium text-[20px] text-black">
                        Cerita Komunitas
                    </Text>

                    <ShareActionCard
                        onPressLink={() => { }}
                        onPressImage={() => { }}
                        onPressSend={() => { }}
                    />

                    <View
                        className="mt-12 rounded-[10px] bg-white"
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.15,
                            shadowRadius: 6,
                            elevation: 6,
                        }}
                    >
                        {communityContents.map((content, idx) => (
                            <View key={idx}>
                                <CommunityComments
                                    name={content.name}
                                    images={content.images}
                                    description={content.description}
                                    time={content.time}
                                    achievement={content.achievement}
                                    likes={content.likes}
                                    comments={content.comments}
                                />
                                {idx < communityContents.length - 1 && (
                                    <View className="h-[1px] bg-[#D7D7D7] mx-3" />
                                )}
                            </View>
                        ))}
                    </View>
                </View>

            </PageWrapper>
        </ThemedView>
    );
}
