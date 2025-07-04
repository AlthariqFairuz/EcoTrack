import { ScrollView, Text, View } from 'react-native';

// Components
import { ChallengeRecCard } from '@/components/profile/ChallengeRecCard';
import ProfileHeader from '@/components/profile/ProfileHeader';
import { TargetCard } from '@/components/profile/TargetCard';

export default function TargetKarbonPage() {

    return (
        <View className='bg-[#FAF6E9]'>

            <ProfileHeader title='Target Karbon' isOnProfile={false} />

            <ScrollView className='flex p-4 px-8'>

                {/* Target Aktif */}
                <View className='flex flex-col mb-6'>
                    <Text className='text-2xl mb-3'>
                        Target Aktif
                    </Text>
                    <View className='flex-col'>
                        <View className='mb-4'>
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
                        <View className='mb-4'>
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
                        <View className='mb-4'>
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
                </View>


                {/* Tentukan Target Bulanan Baru */}
                <View className='flex flex-col mb-6'>
                    <Text className='text-xl mb-3'>
                        Tentukan Target Bulanan Baru
                    </Text>
                    <View
                          style={{
                            backgroundColor: 'white',
                            borderRadius: 16,
                            padding: 16,
                            shadowColor: '#000',
                            shadowOpacity: 0.1,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 4,
                            elevation: 3,
                          }}
                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>25%</Text>
                                <Text style={{ marginTop: 2, color: '#555' }}>Target pengurangan jejak karbon</Text>
                            </View>
                            </View>

                    
                          {/* Progress bar */}
                          <View
                            style={{
                              height: 16,
                              backgroundColor: '#EFE9DD',
                              borderRadius: 8,
                              overflow: 'hidden',
                              marginVertical: 20
                            }}
                          >
                            <View
                              style={{
                                height: '100%',
                                width: `${40}%`,
                                backgroundColor: '#3F6342',
                                borderRadius: 8,
                              }}
                            />
                          </View>
                    
                          {/* Feedback */}
                                  <View
                                    style={{
                                      backgroundColor: '#C8DB9D',
                                      borderRadius: 16,
                                      paddingHorizontal: 12,
                                      paddingVertical: 4,
                                    }}
                                  >
                                    <Text style={{ color: '#3F6342', fontWeight: '600' }}>Tetapkan Target untuk April 2025</Text>
                                  </View>
                        </View>
                    {/* Prediksi AI */}
                    <View className="bg-[#C3DAF8] rounded-2xl p-4 shadow mt-4">
                        <View>
                            {/* Image */}
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View>
                              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Prediksi AI</Text>
                            </View>
                          </View>
                        </View>
                        <Text>
                            Berdasarkan kebiasaanmu saat ini, target ini bisa dicapai. Dengan usaha yang konsisten, kamu bisa mencapainya dalam waktu 2-3 bulan.
                        </Text>
                    </View>
                </View>

                {/* Tantangan yang disarankan */}
                <View className='flex flex-col mb-6'>
                    <Text className='text-xl mb-3'>
                        Tantangan yang disarankan
                    </Text>
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