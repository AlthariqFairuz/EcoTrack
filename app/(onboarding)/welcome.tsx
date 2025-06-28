import { View, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';

export default function WelcomeScreen() {
  const handleNext = () => {
    router.push('/welcome-2');
  };

  const handleSkip = () => {
    router.replace('/start');
  };

  return (
    <View className="flex-1 bg-[#FAF6E9]">
      <View className="items-end pt-[60px] pr-5">
        <TouchableOpacity onPress={handleSkip}>
          <Text className="font-poppins text-[15px] text-[#575757]">Lewati</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center items-center px-10">
        <View className="mb-6">
          <View className="w-[100px] h-[100px] rounded-full justify-center items-center">
            <Image
              source={require('@/assets/images/logo.png')}
              style={{ width: 90, height: 100 }}
              contentFit="contain"
            />
          </View>
        </View>
        
        <View className="items-center mb-12">
          <Text className="font-poppins-semibold text-[25px] text-center text-black">
            Selamat Datang di
          </Text>
          <Text className="font-poppins-semibold text-[25px] text-black mt-2 mb-4">
            <Text className="text-[#537D5D]">Eco</Text>Track
          </Text>
          
          <Text className="font-poppins text-[15px] text-center leading-6 text-[#575757]">
            Pelacak jejak karbon berbasis AI yang menjadikan hidup ramah lingkungan terasa mudah dan menyenangkan
          </Text>
        </View>

        <View className="flex-row justify-center items-center mb-10 space-x-2">
          <View className="w-[31px] h-2 mx-2 rounded-full bg-[#9EBC8A]" />
          <View className="w-[8px] h-2 mx-2 rounded-full bg-[#D2D0A0]" />
          <View className="w-[8px] h-2 mx-2 rounded-full bg-[#D2D0A0]" />
          <View className="w-[8px] h-2 mx-2 rounded-full bg-[#D2D0A0]" />
        </View>

        <TouchableOpacity 
          className="bg-[#537D5D] py-4 px-[60px] rounded-[25px] w-full max-w-[300px]"
          onPress={handleNext}
        >
          <Text className="font-poppins text-[17px] text-white text-center">Selanjutnya</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}