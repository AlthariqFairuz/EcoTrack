import Header from '@/components/header/header';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, TextInput } from 'react-native';
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

const recyclingOptions = [
  { label: 'Kertas', value: 'Paper' },
  { label: 'Plastik', value: 'Plastic' },
  { label: 'Kaca', value: 'Glass' },
  { label: 'Logam', value: 'Metal' }
];

const cookingMethodOptions = [
  { label: 'Kompor', value: 'Stove' },
  { label: 'Oven', value: 'Oven' },
  { label: 'Microwave', value: 'Microwave' },
  { label: 'Pemanggang', value: 'Grill' },
  { label: 'Air Fryer', value: 'Airfryer' }
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
              Jenis Bahan Bakar Kendaraan
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
              Jenis Kendaraan Bulanan
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

            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Frekuensi Perjalanan Udara
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
              Jumlah Kantong Sampah per Minggu
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

            <Text className="text-sm font-poppins-semibold text-gray-700 mb-2">
              Jenis Sampah yang Didaur Ulang
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