import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Image } from 'expo-image';
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Mohon isi semua field',
      });
      return;
    }

    // dummy doang
    await AsyncStorage.setItem('isLoggedIn', 'true');
    await AsyncStorage.setItem('userEmail', email);
    router.replace('/(tabs)');
  };

  const handleRegister = async () => {
    router.replace('/(auth)/signup');
  }
  const forgotPassword = async () => {
    router.replace('/(onboarding)/start');
  }

  function handleLoginAuth(){
    router.replace('/(tabs)');
  }
  return (
    <View className="flex-1 bg-[#FAF6E9]">
      <View className="items-center pt-[60px]">
        <View style={{ marginTop: '10%' }} className="w-full justify-center items-center">
          <Image
            source={require('@/assets/images/logo.png')}
            style={{ width: 174, height: 100 }}
            contentFit="contain"
          />
        </View>
        <Text className="font-poppins-medium text-[20px] mt-10 text-black">Selamat Datang</Text>
        <Text className="font-poppins text-[15px] text-center leading-6 text-[#575757] px-6">
          Yuk lanjutkan perjalanan ramah lingkunganmu bareng EcoTrack
        </Text>

        <View className="w-full px-8 mt-10">
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
              className="bg-white border border-[#9EBC8A] rounded-[10px] p-4 pr-12 text-black font-poppins text-[14px]"
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

          <TouchableOpacity
            onPress={forgotPassword}
          >
            <View className="flex-row justify-end mt-2">
              <Text className="text-black font-poppins underline text-[12px]">Lupa kata sandi?</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#537D5D] mt-6 rounded-[15px] p-4 items-center"
            onPress={handleLogin}
          >
            <Text className="text-white font-poppins-medium text-[17px]">Masuk</Text>
          </TouchableOpacity>
        </View>

        <Text className="font-poppins text-[12px] text-center leading-6 text-[#6A6A6A] px-6 mt-4">
          Atau lanjutkan dengan
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
            Baru pakai <Text className="text-[#537D5D]">Eco</Text>Track?{' '}
          </Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text className="text-[#537D5D] underline font-poppins text-[12px]">Daftar disini</Text>
          </TouchableOpacity>
        </View>


      </View>
    </View>
  );
}
