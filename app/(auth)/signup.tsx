import { View, TouchableOpacity, Text, TextInput, ScrollView } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Image } from 'expo-image';
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [location, setLocation] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  async function handleRegister(){
    if (!name || !email || !password || !location){
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Mohon isi semua field',
      })
      return;
    }
    if (!acceptTerms) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Mohon setujui syarat layanan dan kebijakan privasi',
      });
      return;
    }
    router.replace('/(tabs)');
  }

  async function handleLoginAuth(){
    router.replace('/(tabs)');
  }

  async function handleLogin() {
    router.replace('/(auth)/login');
  }


  return (
    <View className="flex-1 bg-[#FAF6E9]">
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}showsVerticalScrollIndicator={false}>
      <View className="items-center pt-[60px]">
        <View style={{ marginTop: '10%' }} className="w-full justify-center items-center">
          <Image
            source={require('@/assets/images/logo.png')}
            style={{ width: 174, height: 100 }}
            contentFit="contain"
          />
        </View>
        <Text className="font-poppins-medium text-[20px] mt-10 text-black">
          Gabung dengan <Text className="text-[#537D5D]">Eco</Text>Track
        </Text>
        <Text className="font-poppins text-[15px] text-center leading-6 text-[#575757] px-6">
          Mulai perjalananmu melacak jejak karbon
        </Text>

        <View className="w-full px-8 mt-10">

          <Text className="text-black font-poppins-medium text-[14px] mb-1">Nama Lengkap*</Text>
          <TextInput
            className="bg-white border border-[#9EBC8A] rounded-[10px] p-4 mb-4 text-black font-poppins text-[14px]"
            placeholder="Masukkan nama lengkapmu"
            placeholderTextColor="#515151"
            keyboardType="email-address"
            autoCapitalize="none"
            value={name}
            onChangeText={setName}
          />

          <Text className="text-black font-poppins-medium text-[14px] mb-1">Email*</Text>
          <TextInput
            className="bg-white border border-[#9EBC8A] rounded-[10px] p-4 mb-4 text-black font-poppins text-[14px]"
            placeholder="Masukkan email kamu"
            placeholderTextColor="#515151"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text className="text-black font-poppins-medium text-[14px] mb-1">Password*</Text>
          <View className="relative">
            <TextInput
              className="bg-white border border-[#9EBC8A] rounded-[10px] p-4 mb-4 pr-12 text-black font-poppins text-[14px]"
              placeholder="Masukkan password kamu"
              placeholderTextColor="#515151"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              className="absolute right-4 top-4"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text className="text-[#888] font-poppins">
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>

          </View>

          <Text className="text-black font-poppins-medium text-[14px] mb-1">Lokasi*</Text>
          <TextInput
            className="bg-white border border-[#9EBC8A] rounded-[10px] p-4 mb-4 text-black font-poppins text-[14px]"
            placeholder="Pilih kota tempat tinggalmu"
            placeholderTextColor="#515151"
            keyboardType="email-address"
            autoCapitalize="none"
            value={location}
            onChangeText={setLocation}
          />
          <View className="flex-row items-center mb-4">
            <TouchableOpacity
              className="w-5 h-5 border border-[#9EBC8A] rounded-[4px] mr-2 justify-center items-center bg-white"
              onPress={() => setAcceptTerms(!acceptTerms)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: acceptTerms }}
            >
              {acceptTerms && (
                <View className="w-3 h-3 bg-[#537D5D] rounded-[2px]" />
              )}
            </TouchableOpacity>
            <Text className="text-[#1C1C1C] font-poppins text-[10px]">
              Saya menyetujui{' '}
              <Text className="text-[#537D5D]">Syarat Layanan</Text>
              {' '}dan{' '}
              <Text className="text-[#537D5D] ">Kebijakan Privasi</Text>
            </Text>
          </View>
          <TouchableOpacity
            className="bg-[#537D5D] mt-6 rounded-[15px] p-4 items-center"
            onPress={handleRegister}
          >
            <Text className="text-white font-poppins-medium text-[17px]">Daftar</Text>
          </TouchableOpacity>
        </View>

        <Text className="font-poppins text-[12px] text-center leading-6 text-[#6A6A6A] px-6 mt-4">
          Atau daftar dengan
        </Text>

        <View className="flex-row justify-center mt-4 space-x-4">
          <TouchableOpacity
            className="bg-white border flex-row border-[#9EBC8A] rounded-[10px] p-3 mx-2"
            onPress={handleLoginAuth}
          >
            <Image
              source={require('@/assets/images/google.svg')}
              style={{ width: 28, height: 28 }}
              contentFit="contain"
            />
            <Text className="text-[#537D5D] font-poppins text-[12px] text-center ml-4 mt-1">Google</Text>

          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white border flex-row border-[#9EBC8A] rounded-[10px] p-3 mx-2"
            onPress={handleLoginAuth}
          >
            <Image
              source={require('@/assets/images/apple.svg')}
              style={{ width: 28, height: 28 }}
              contentFit="contain"
            />
            <Text className="text-[#537D5D] font-poppins text-[12px] text-center ml-4 mt-1">Apple</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center items-center mt-4 px-6">
          <Text className="font-poppins text-[12px] text-center leading-6 text-black">
            Sudah punya akun?
          </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text className="text-[#537D5D] underline font-poppins ml-1 text-[12px]">Masuk disini</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </View>
  );
}
