import Header from '@/components/header/header';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function Calculator() {
  const [bodyType, setBodyType] = useState('');
  const [gender, setGender] = useState('');
  const [bathingFrequency, setBathingFrequency] = useState('');

  const bodyTypeOptions = [
    { label: 'Kurus', value: 'Kurus' },
    { label: 'Normal', value: 'Normal' },
    { label: 'Gemuk', value: 'Gemuk' },
    { label: 'Obesitas', value: 'Obesitas' }
  ];
  
  const genderOptions = [
    { label: 'Laki-laki', value: 'Laki-laki' },
    { label: 'Perempuan', value: 'Perempuan' }
  ];
  
  const bathingOptions = [
    { label: '1x sehari', value: '1x sehari' },
    { label: '2x sehari', value: '2x sehari' },
    { label: '3x sehari', value: '3x sehari' },
    { label: 'Lebih dari 3x', value: 'Lebih dari 3x' }
  ];

  return (
    <ThemedView className="flex-1" style={{ backgroundColor: '#FAF3DA' }}>
      {/* Header */}
      <Header title='Kalkulator Karbon' isOnDashboard={false}/>

      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        {/* Info Card */}
        <View className="bg-[#FFFFFF] rounded-xl p-4 mb-6 flex-row" style={{
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

        {/* Data Pribadi Section */}
        <View className="mb-6 p-2">
          <View className="flex-row items-center mb-4">
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
              data={bathingOptions}
              labelField="label"
              valueField="value"
              placeholder="Pilih frekuensi mandi"
              value={bathingFrequency}
              onChange={item => setBathingFrequency(item.value)}
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
          className="bg-[#537D5D] py-4 rounded-xl mx-2 mb-8"
        >
          <Text  style={{ color: 'white' }} className="text-white text-center font-poppins text-base">
            Hitung Jejak Karbon
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}