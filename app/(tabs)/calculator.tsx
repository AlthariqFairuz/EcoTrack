import Header from '@/components/header/header';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function Calculator() {
  const [bodyType, setBodyType] = useState('');
  const [gender, setGender] = useState('');
  const [dietType, setDietType] = useState('');
  const [showerFrequency, setShowerFrequency] = useState('');
  const [monthlyGrocery, setMonthlyGrocery] = useState<number | undefined>(undefined);
  const [socialActivity, setSocialActivity] = useState('');
  const [heatingEnergy, setHeatingEnergy] = useState('');
  const [energyEfficiency, setEnergyEfficiency] = useState('');
  const [distanceTraveled, setDistanceTraveled] = useState<number | undefined>(undefined);
  const [transportPreference, setTransportPreference] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [airTravelFrequency, setAirTravelFrequency] = useState('');
  const [wasteBagSize, setWasteBagSize] = useState('');
  const [totalBags, setTotalBags] = useState<number | undefined>(undefined);
  const [recyclingType, setRecyclingType] = useState('');
  const [tvUsage, setTvUsage] = useState<number | undefined>(undefined);
  const [internetUsage, setInternetUsage] = useState<number | undefined>(undefined);
  const [clothingPurchases, setClothingPurchases] = useState<number | undefined>(undefined);
  const [cookingMethod, setCookingMethod] = useState('');


const bodyTypeOptions = [
  { label: 'Kurus', value: 'underweight' },
  { label: 'Normal', value: 'normal' },
  { label: 'Gemuk', value: 'overweight' },
  { label: 'Obesitas', value: 'obese' }
];

const genderOptions = [
  { label: 'Laki-laki', value: 'male' },
  { label: 'Perempuan', value: 'female' }
];

const dietOptions = [
  { label: 'Omnivora (Segala)', value: 'omnivore' },
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Vegan', value: 'vegan' },
  { label: 'Pescatarian (Ikan)', value: 'pescatarian' }
];

const showerFrequencyOptions = [
  { label: '1x sehari', value: 'daily' },
  { label: '2x sehari', value: 'twice a day' },
  { label: 'Lebih sering', value: 'more frequently' },
  { label: 'Lebih jarang', value: 'less frequently' }
];

const socialActivityOptions = [
  { label: 'Sering', value: 'often' },
  { label: 'Kadang-kadang', value: 'sometimes' },
  { label: 'Tidak Pernah', value: 'never' }
];

const heatingEnergyOptions = [
  { label: 'Listrik', value: 'electricity' },
  { label: 'Gas Alam', value: 'natural gas' },
  { label: 'Batubara', value: 'coal' },
  { label: 'Kayu', value: 'wood' }
];

const energyEfficiencyOptions = [
  { label: 'Ya', value: 'Yes' },
  { label: 'Kadang-kadang', value: 'Sometimes' },
  { label: 'Tidak', value: 'No' }
];

const transportOptions = [
  { label: 'Transportasi Umum', value: 'public' },
  { label: 'Kendaraan Pribadi', value: 'private' },
  { label: 'Jalan Kaki/Sepeda', value: 'walk/bicycle' }
];

const vehicleTypeOptions = [
  { label: 'Tidak Ada', value: null },
  { label: 'Bensin', value: 'petrol' },
  { label: 'Diesel', value: 'diesel' },
  { label: 'Hybrid', value: 'hybrid' },
  { label: 'LPG', value: 'lpg' },
  { label: 'Listrik', value: 'electric' }
];

const airTravelFrequencyOptions = [
  { label: 'Tidak Pernah', value: 'never' },
  { label: 'Jarang', value: 'rarely' },
  { label: 'Sering', value: 'frequently' },
  { label: 'Sangat Sering', value: 'very frequently' }
];

const wasteBagSizeOptions = [
  { label: 'Kecil', value: 'small' },
  { label: 'Sedang', value: 'medium' },
  { label: 'Besar', value: 'large' },
  { label: 'Sangat Besar', value: 'extra large' }
];

const cookingMethodOptions = [
  { label: 'Tidak Ada Alat Masak', value: [] },
  { label: 'Kompor', value: ['Stove'] },
  { label: 'Oven', value: ['Oven'] },
  { label: 'Microwave', value: ['Microwave'] },
  { label: 'Kompor + Oven', value: ['Stove', 'Oven'] },
  { label: 'Kompor + Microwave', value: ['Stove', 'Microwave'] },
  { label: 'Oven + Microwave', value: ['Oven', 'Microwave'] },
  { label: 'Grill + Airfryer', value: ['Grill', 'Airfryer'] },
  { label: 'Microwave + Grill + Airfryer', value: ['Microwave', 'Grill', 'Airfryer'] },
  { label: 'Kompor + Oven + Microwave', value: ['Stove', 'Oven', 'Microwave'] },
  { label: 'Oven + Microwave + Grill + Airfryer', value: ['Oven', 'Microwave', 'Grill', 'Airfryer'] },
  { label: 'Kompor + Grill + Airfryer', value: ['Stove', 'Grill', 'Airfryer'] },
  { label: 'Oven + Grill + Airfryer', value: ['Oven', 'Grill', 'Airfryer'] },
  { label: 'Kompor + Oven + Grill + Airfryer', value: ['Stove', 'Oven', 'Grill', 'Airfryer'] },
  { label: 'Kompor + Microwave + Grill + Airfryer', value: ['Stove', 'Microwave', 'Grill', 'Airfryer'] },
  { label: 'Lengkap (Semua Alat)', value: ['Stove', 'Oven', 'Microwave', 'Grill', 'Airfryer'] }
];

const recyclingOptions = [
  { label: 'Tidak Recycle', value: [] },
  { label: 'Logam', value: ['Metal'] },
  { label: 'Kertas', value: ['Paper'] },
  { label: 'Kaca', value: ['Glass'] },
  { label: 'Plastik', value: ['Plastic'] },
  { label: 'Kertas + Plastik', value: ['Paper', 'Plastic'] },
  { label: 'Kertas + Kaca', value: ['Paper', 'Glass'] },
  { label: 'Kertas + Logam', value: ['Paper', 'Metal'] },
  { label: 'Plastik + Kaca', value: ['Plastic', 'Glass'] },
  { label: 'Plastik + Logam', value: ['Plastic', 'Metal'] },
  { label: 'Kaca + Logam', value: ['Glass', 'Metal'] },
  { label: 'Kertas + Plastik + Kaca', value: ['Paper', 'Plastic', 'Glass'] },
  { label: 'Kertas + Plastik + Logam', value: ['Paper', 'Plastic', 'Metal'] },
  { label: 'Kertas + Kaca + Logam', value: ['Paper', 'Glass', 'Metal'] },
  { label: 'Plastik + Kaca + Logam', value: ['Plastic', 'Glass', 'Metal'] },
  { label: 'Lengkap (Semua Jenis)', value: ['Paper', 'Plastic', 'Glass', 'Metal'] }
];

  return (
    <ThemedView className="flex-1" style={{ backgroundColor: '#FAF3DA' }}>
      {/* Header */}
      <Header title='Kalkulator Karbon' isOnDashboard={false}/>

      <ScrollView className="flex-1 px-4 pt-8" showsVerticalScrollIndicator={false}>
        {/* Info Card */}
        <View className="bg-[#FFFFFF] rounded-xl p-4 flex-row" style={{
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 3,
            }}>
          <View className="w-10 h-10 rounded-lg items-center justify-center mr-3">
            <Image
              source={require('@/assets/images/calculator.png')}
              style={{ width: 45, height: 45, marginTop: 10, marginLeft: 30, borderRadius: 10  }}
              contentFit="contain"
            />
          </View>
          <View className="flex-1 ml-8">
            <Text className="text-lg font-poppins-bold text-gray-800 mb-1">
              Isi data berikut dengan benar!
            </Text>
            <Text className="text-sm text-gray-600">
              Untuk memperoleh hasil yang akurat
            </Text>
          </View>
        </View>

        {/* Form Section */}
        <View className="mb-6 p-2">

          {/* Data Pribadi Section */}  
          <View className="flex-row items-center mb-4 pt-8">
            <Image
              source={require('@/assets/images/data-diri.png')}
              style={{ width: 32, height: 32,  borderRadius: 16, marginRight: 8 }}
              contentFit="contain"
            />
            <Text className="font-poppins-bold text-xl text-gray-800">
              Data Pribadi
            </Text>
          </View>

          <View>
            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Tipe Tubuh
            </Text>
            <Dropdown
              data={bodyTypeOptions}
              labelField="label"
              valueField="value"
              placeholder="Pilih tipe tubuh"
              value={bodyType}
              onChange={item => setBodyType(item.value)}
              style={{
                backgroundColor: 'white',
                borderColor: '#9EBC8A',
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
              placeholderStyle={{
                fontSize: 14,
                color: '#9CA3AF',
              }}
              selectedTextStyle={{
                fontSize: 14,
                color: '#1F2937',
              }}
            />

            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Jenis Kelamin
            </Text>
            <Dropdown
              data={genderOptions}
              labelField="label"
              valueField="value"
              placeholder="Pilih jenis kelamin"
              value={gender}
              onChange={item => setGender(item.value)}
              style={{
                backgroundColor: 'white',
                borderColor: '#9EBC8A',
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
              placeholderStyle={{
                fontSize: 14,
                color: '#9CA3AF',
              }}
              selectedTextStyle={{
                fontSize: 14,
                color: '#1F2937',
              }}
            />

            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Frekuensi Mandi
            </Text>
            <Dropdown
              data={showerFrequencyOptions}
              labelField="label"
              valueField="value"
              placeholder="Pilih frekuensi mandi"
              value={showerFrequency}
              onChange={item => setShowerFrequency(item.value)}
              style={{
                backgroundColor: 'white',
                borderColor: '#9EBC8A',
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
              placeholderStyle={{
                fontSize: 14,
                color: '#9CA3AF',
              }}
              selectedTextStyle={{
                fontSize: 14,
                color: '#1F2937',
              }}
            />
          </View>
            
          {/* Makanan dan Gaya Hidup Section */}
          <View className="flex-row items-center mb-4 pt-8">
            <Image
              source={require('@/assets/images/makanan.png')}
              style={{ width: 32, height: 32,  borderRadius: 16, marginRight: 8 }}
              contentFit="contain"
            />
            <Text className="font-poppins-bold text-xl text-gray-800">
              Makanan dan Gaya Hidup
            </Text>
          </View>

          <View>
            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Jenis Diet
            </Text>
            <Dropdown
              data={dietOptions}
              labelField="label"
              valueField="value"
              placeholder="Pilih jenis diet"
              value={dietType}
              onChange={item => setDietType(item.value)}
              style={{
                backgroundColor: 'white',
                borderColor: '#9EBC8A',
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
              placeholderStyle={{
                fontSize: 14,
                color: '#9CA3AF',
              }}
              selectedTextStyle={{
                fontSize: 14,
                color: '#1F2937',
              }}
            />

            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Tagihan Belanja Bulanan
            </Text>
            <TextInput
              placeholder="Masukkan tagihan belanja bulanan"
              value={monthlyGrocery?.toString() || ''}
              onChangeText={(text) => {
                const value = text.replace(/[^0-9.]/g, '');
                setMonthlyGrocery(value ? parseFloat(value) : undefined);
              }}
              keyboardType="numeric"
              style={{
                backgroundColor: 'white',
                borderColor: '#9EBC8A',
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                fontSize: 14,
                color: '#1F2937',
              }}
            />

            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Aktivitas Sosial
            </Text>
            <Dropdown
              data={socialActivityOptions}
              labelField="label"
              valueField="value"
              placeholder="Pilih aktivitas sosial"
              value={socialActivity}
              onChange={item => setSocialActivity(item.value)}
              style={{
                backgroundColor: 'white',
                borderColor: '#9EBC8A',
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
              placeholderStyle={{
                fontSize: 14,
                color: '#9CA3AF',
              }}
              selectedTextStyle={{
                fontSize: 14,
                color: '#1F2937',
              }}
            />

            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Alat Memasak
            </Text>
            <Dropdown
              data={cookingMethodOptions}
              labelField="label"
              valueField="value"
              placeholder="Pilih alat memasak"
              value={cookingMethod}
              onChange={item => setCookingMethod(item.value)}
              style={{
                backgroundColor: 'white',
                borderColor: '#9EBC8A',
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
              placeholderStyle={{
                fontSize: 14,
                color: '#9CA3AF',
              }}
              selectedTextStyle={{
                fontSize: 14,
                color: '#1F2937',
              }}
            />

          </View>

          {/* Rumah dan Energi */}
          <View className="flex-row items-center mb-4 pt-8">
            <Image
              source={require('@/assets/images/rumah.png')}
              style={{ width: 32, height: 32,  borderRadius: 16, marginRight: 8 }}
              contentFit="contain"
            />
            <Text className="font-poppins-bold text-xl text-gray-800">
              Rumah dan Energi
            </Text>
          </View>

          <View>
            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Sumber Energi Pemanas
            </Text>
            <Dropdown
              data={heatingEnergyOptions}
              labelField="label"
              valueField="value"
              placeholder="Pilih sumber energi pemanas"
              value={heatingEnergy}
              onChange={item => setHeatingEnergy(item.value)}
              style={{
                backgroundColor: 'white',
                borderColor: '#9EBC8A',
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
              placeholderStyle={{
                fontSize: 14,
                color: '#9CA3AF',
              }}
              selectedTextStyle={{
                fontSize: 14,
                color: '#1F2937',
              }}
            />

            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Efisiensi Energi
            </Text>
            <Dropdown
              data={energyEfficiencyOptions}
              labelField="label"
              valueField="value"
              placeholder="Apakah anda peduli dengan efisiensi energi?"
              value={energyEfficiency}
              onChange={item => setEnergyEfficiency(item.value)}
              style={{
                backgroundColor: 'white',
                borderColor: '#9EBC8A',
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
              placeholderStyle={{
                fontSize: 14,
                color: '#9CA3AF',
              }}
              selectedTextStyle={{
                fontSize: 14,
                color: '#1F2937',
              }}
            />
          </View>

          {/* Transportasi Section */}  
          <View className="flex-row items-center mb-4 pt-8">
            <Image
              source={require('@/assets/images/transportasi.png')}
              style={{ width: 32, height: 32,  borderRadius: 16, marginRight: 8 }}
              contentFit="contain"
            />
            <Text className="font-poppins-bold text-xl text-gray-800">
              Transportasi
            </Text>
          </View>

          <View>
            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Preferensi Transportasi
            </Text>
            <Dropdown
              data={transportOptions}
              labelField="label"
              valueField="value"
              placeholder="Pilih transportasi utama"
              value={transportPreference}
              onChange={item => setTransportPreference(item.value)}
              style={{
                backgroundColor: 'white',
                borderColor: '#9EBC8A',
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
              placeholderStyle={{
                fontSize: 14,
                color: '#9CA3AF',
              }}
              selectedTextStyle={{
                fontSize: 14,
                color: '#1F2937',
              }}
            />

            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Jenis Bahan Bakar Kendaraan
            </Text>
            <Dropdown
              data={vehicleTypeOptions}
              labelField="label"
              valueField="value"
              placeholder="Pilih jenis bahan bakar"
              value={vehicleType}
              onChange={item => setVehicleType(item.value)}
              style={{
                backgroundColor: 'white',
                borderColor: '#9EBC8A',
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
              placeholderStyle={{
                fontSize: 14,
                color: '#9CA3AF',
              }}
              selectedTextStyle={{
                fontSize: 14,
                color: '#1F2937',
              }}
            />

            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Jarak Kendaraan Bulanan
            </Text>
           <TextInput
              placeholder="Masukkan jarak dalam KM"
              value={distanceTraveled?.toString() || ''}
              onChangeText={(text) => {
                const value = text.replace(/[^0-9.]/g, '');
                setDistanceTraveled(value ? parseFloat(value) : undefined);
              }}
              keyboardType="numeric"
              style={{
                backgroundColor: 'white',
                borderColor: '#9EBC8A',
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                fontSize: 14,
                color: '#1F2937',
              }}
            />

            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Frekuensi Perjalanan Udara
            </Text>
            <Dropdown
              data={airTravelFrequencyOptions}
              labelField="label"
              valueField="value"
              placeholder="Pilih frekuensi naik pesawat"
              value={airTravelFrequency}
              onChange={item => setAirTravelFrequency(item.value)}
              style={{
                backgroundColor: 'white',
                borderColor: '#9EBC8A',
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
              placeholderStyle={{
                fontSize: 14,
                color: '#9CA3AF',
              }}
              selectedTextStyle={{
                fontSize: 14,
                color: '#1F2937',
              }}
            />
          </View>

        
          {/* Sampah dan Daur Ulang Section */} 
          <View className="flex-row items-center mb-4 pt-8">
            <Image
              source={require('@/assets/images/sampah.png')}
              style={{ width: 32, height: 32,  borderRadius: 16, marginRight: 8 }}
              contentFit="contain"
            />
            <Text className="font-poppins-bold text-xl text-gray-800">
              Sampah dan Daur Ulang
            </Text>
          </View>

          <View>
            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Ukuran Kantong Sampah
            </Text>
            <Dropdown
              data={wasteBagSizeOptions}
              labelField="label"
              valueField="value"
              placeholder="Pilih ukuran kantong sampah"
              value={wasteBagSize}
              onChange={item => setWasteBagSize(item.value)}
              style={{
                backgroundColor: 'white',
                borderColor: '#9EBC8A',
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
              placeholderStyle={{
                fontSize: 14,
                color: '#9CA3AF',
              }}
              selectedTextStyle={{
                fontSize: 14,
                color: '#1F2937',
              }}
            />

            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Jumlah Kantong Sampah per Minggu
            </Text>
            <TextInput
              placeholder="Masukkan jumlah kantong sampah"
              value={totalBags?.toString() || ''}
              onChangeText={(text) => {
                const value = text.replace(/[^0-9.]/g, '');
                setTotalBags(value ? parseFloat(value) : undefined);
              }}
              keyboardType="numeric"
              style={{
                backgroundColor: 'white',
                borderColor: '#9EBC8A',
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                fontSize: 14,
                color: '#1F2937',
              }}
            />

            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Jenis Sampah yang Didaur Ulang
            </Text>
            <Dropdown
              data={recyclingOptions}
              labelField="label"
              valueField="value"
              placeholder="Pilih jenis daur ulang"
              value={recyclingType}
              onChange={item => setRecyclingType(item.value)}
              style={{
                backgroundColor: 'white',
                borderColor: '#9EBC8A',
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
              placeholderStyle={{
                fontSize: 14,
                color: '#9CA3AF',
              }}
              selectedTextStyle={{
                fontSize: 14,
                color: '#1F2937',
              }}
            />
          </View>

          {/* Elektronik dan Digital Section */}
          <View className="flex-row items-center mb-4 pt-8">
            <Image
              source={require('@/assets/images/elektronik.png')}
              style={{ width: 32, height: 32,  borderRadius: 16, marginRight: 8 }}
              contentFit="contain"
            />
            <Text className="font-poppins-bold text-xl text-gray-800">
              Elektronik dan Digital
            </Text>
          </View>

          <View>
            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Waktu TV/PC Harian (Jam)
            </Text>
            <TextInput
              placeholder="Masukkan jam per hari"
              value={tvUsage?.toString() || ''}
              onChangeText={(text) => {
                const value = text.replace(/[^0-9.]/g, '');
                setTvUsage(value ? parseFloat(value) : undefined);
              }}
              keyboardType="numeric"
              style={{
                backgroundColor: 'white',
                borderColor: '#9EBC8A',
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                fontSize: 14,
                color: '#1F2937',
              }}
            />
            
            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Waktu Internet Harian (Jam)
            </Text>
            <TextInput
              placeholder="Masukkan jam per hari"
              value={internetUsage?.toString() || ''}
              onChangeText={(text) => {
                const value = text.replace(/[^0-9.]/g, '');
                setInternetUsage(value ? parseFloat(value) : undefined);
              }}
              keyboardType="numeric"
              style={{
                backgroundColor: 'white',
                borderColor: '#9EBC8A',
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                fontSize: 14,
                color: '#1F2937',
              }}
            />
          </View>

          {/* Pakaian Section */}
          <View className="flex-row items-center mb-4 pt-8">
            <Image
              source={require('@/assets/images/pakaian.png')}
              style={{ width: 32, height: 32,  borderRadius: 16, marginRight: 8 }}
              contentFit="contain"
            />
            <Text className="font-poppins-bold text-xl text-gray-800">
             Pakaian
            </Text>
          </View>

          <View>
            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Jumlah Pakaian Baru per Bulan
            </Text>
            <TextInput
              placeholder="Masukkan jumlah pakaian baru"
              value={clothingPurchases?.toString() || ''}
              onChangeText={(text) => {
                const value = text.replace(/[^0-9.]/g, '');
                setClothingPurchases(value ? parseFloat(value) : undefined);
              }}
              keyboardType="numeric"
              style={{
                backgroundColor: 'white',
                borderColor: '#9EBC8A',
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                fontSize: 14,
                color: '#1F2937',
              }}
            />
          </View>
        </View>

        {/* Calculate Button */}
        <TouchableOpacity 
          className="bg-[#537D5D] py-4 rounded-xl mx-2 mb-20"
        >
          <Text  style={{ color: 'white' }} className="text-white text-center font-poppins text-base">
            Hitung Jejak Karbon
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}