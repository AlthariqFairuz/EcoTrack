import { ScrollView, Text, View } from 'react-native';

// Components
import { ChallengeRecCard } from '@/components/profile/ChallengeRecCard';
import { TargetCard } from '@/components/profile/TargetCard';
import { Image } from 'expo-image';
import Header from '@/components/header/header';

export default function TargetKarbonPage() {

  return (
    <View className='flex-1 bg-[#FAF6E9]'>

      <Header title='Target Karbon' prevPage='/(profile)' isOnDashboard={false} />

      <ScrollView className='flex p-4 px-8'>

        {/* Target Aktif */}
        <View className='flex flex-col mb-6'>

          <View className='flex-row items-center mb-2'>
            <Image
              source={require('@/assets/images/profile/target.svg')}
              style={{ width: 40, height: 40 }}
              contentFit="contain"
            />
            <Text className='font-poppins-medium text-[20px] ml-1'>
              Target Aktif
            </Text>

          </View>
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
                isGreen={true}
              />
            </View>
            <View className='mb-4'>
              <TargetCard
                title="Target Transportasi Mingguan"
                month="Januari 2025"
                status="Terlewat"
                daysLeft={2}
                progress={17.5 / 15}
                currentValue={17.5}
                targetValue={15}
                feedback="Target terlampaui, perlu kurangi 2.5 kg CO₂e lagi"
                isGreen={false}
              />
            </View>
            <View className='mb-4'>
              <TargetCard
                title="Pencatatan Aktivitas Harian"
                month="Streak saat ini: 7 hari berturut-turut"
                status="Lancar"
                daysLeft={7}
                progress={23 / 30}
                currentValue={23}
                targetValue={30}
                feedback="Kemajuan luar biasa! Teruskan!"
                isGreen={true}
              />
            </View>
          </View>
        </View>


        {/* Tentukan Target Bulanan Baru */}
        <View className='flex flex-col mb-6'>
          <Text className='font-poppins-medium text-[18px] text-black text-xl mb-3'>
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
                <Text className='font-poppins-medium text-[30px] text-[#2E5538]'>25%</Text>
                <Text className='font-poppins text-black text-[12px]'>Target pengurangan jejak karbon</Text>
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
              <Text className='font-poppins text-[11px] text-center text-[#2E5538]'>Tetapkan Target untuk Juli 2025</Text>
            </View>
          </View>
          {/* Prediksi AI */}
          <View className="bg-[#C3DAF8] rounded-2xl p-4 shadow mt-4">
            <View>
              {/* Image */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('@/assets/images/profile/ai.svg')}
                  style={{ width: 24, height: 24 }}
                  contentFit="contain"
                />
                <View>
                  <Text className='font-poppins-medium text-[14px] text-black ml-2'>Prediksi AI</Text>
                </View>
              </View>
            </View>
            <Text className='font-poppins text-[12px] text-black mt-2'>
              Berdasarkan kebiasaanmu saat ini, target ini bisa dicapai. Dengan usaha yang konsisten, kamu bisa mencapainya dalam waktu 2-3 bulan.
            </Text>
          </View>
        </View>

        {/* Tantangan yang disarankan */}
        <View className='flex flex-col mb-12'>
          <Text className='font-poppins-medium text-[18px] text-black mb-3'>
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
            onAdd={() => { }} // fungsi untuk nambahin
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
            onAdd={() => { }} // fungsi untuk nambahin
          />
        </View>

      </ScrollView>
    </View>
  )
}