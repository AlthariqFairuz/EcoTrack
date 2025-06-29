import { View, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image'; 
import { useDebouncedPress } from '@/hooks/useDebounce';

export default function Welcome2() {
  const debouncedNext = useDebouncedPress(() => {
    router.push('/welcome-3');
  }, 2000);

  const debouncedSkip = useDebouncedPress(() => {
    router.dismissAll();
    router.replace('/start');
  }, 2000);

  return (
    <View className="flex-1 bg-[#FAF6E9]">
      <View className="items-end pt-[60px] pr-5">
        <TouchableOpacity onPress={debouncedSkip}>
          <Text className="font-poppins text-[15px] text-[#575757]">Lewati</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center items-center px-10">
        <View className="h-[250px] w-full justify-center items-center">
          <Image
            source={require('@/assets/images/welcome-2.png')}
            style={{ width: 350, height: 250 }}
            contentFit="contain"
          />
        </View>

        <View className="items-center mb-12">
          <Text className="font-poppins-semibold text-[25px]  text-center mb-5 text-gray-800">
            Pindai & Lacak
          </Text>
          
          <Text className="font-poppins text-[15px] text-center leading-6 text-[#575757]">
            Arahkan kamera ke struk, makanan, atau transportasi. AI kami akan langsung menghitung dampak karbonnya
          </Text>
        </View>

        <View className="flex-row justify-center items-center mb-10 space-x-2">
          <View className="w-[8px] h-2 mx-2 rounded-full bg-[#D2D0A0]" />
          <View className="w-[31px] h-2 mx-2 rounded-full bg-[#9EBC8A]" />
          <View className="w-[8px] h-2 mx-2 rounded-full bg-[#D2D0A0]" />
          <View className="w-[8px] h-2 mx-2 rounded-full bg-[#D2D0A0]" />
        </View>

        <TouchableOpacity 
          className="bg-[#537D5D] py-4 px-[60px] rounded-[25px] w-full max-w-[300px]"
          onPress={debouncedNext}
        >
          <Text className="font-poppins-medium text-[17px] text-white text-center">Selanjutnya</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}