import { View, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image'; 


export default function StartScreen() {
  const handleLogin = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    router.replace('/(auth)/login')
  };

  const handleRegister = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    router.replace('/(auth)/signup');
  };

  return (
    <View className="flex-1 bg-[#FAF6E9]">
      <View className="flex-1 justify-center items-center px-10">
          <View style={{ marginTop: '10%' }} className="w-full justify-center items-center">
            <Image
              source={require('@/assets/images/logo.png')}
              style={{ width: 350, height: 250 }}
              contentFit="contain"
            />
        </View>

        <View className="items-center mb-[60px]">
            <Text className="font-poppins-semibold text-[25px] text-center mb-5 text-black">
            Mulai Langkah Hijau{'\n'}
            Bersama <Text className="text-[#537D5D]">Eco</Text>Track
            </Text>
          
          <Text className="font-poppins text-[15px] text-center leading-6 text-[#575757]">
            Pantau jejak karbonmu dan ubah kebiasaan kecil jadi dampak besar untuk bumi
          </Text>
        </View>

        <View className="w-full max-w-[300px] mt-10">
          <TouchableOpacity 
            className="bg-[#CEDD99] py-4 my-2 rounded-[15px]"
            onPress={handleLogin}
          >
            <Text className="font-poppins-medium text-[#2E5538] text-[17px] text-center">Masuk</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-[#537D5D] py-4 my-2 rounded-[15px]"
            onPress={handleRegister}
          >
            <Text className="font-poppins-medium text-white text-[17px] text-center">Daftar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}