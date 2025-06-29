import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Welcome4() {
    const handleNext = () => {
        router.dismissAll();
        router.replace('/start');
    };

    const handleSkip = () => {
        router.dismissAll();
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
            <View className="h-[250px] w-full justify-center items-center">
                <Image
                    source={require('@/assets/images/welcome-4.png')}
                    style={{ width: 350, height: 250 }}
                    contentFit="contain"
                />
            </View>

            <View className="items-center mb-12">
                <Text className="font-poppins-semibold text-[25px]  text-center mt-4 mb-5 text-black">
                    Gabung Komunitas
                </Text>

                <Text className="font-poppins text-[15px] text-center leading-6 text-[#575757]">
                    Terhubung dengan pejuang lingkungan dan ikuti tantangan untuk memperbesar dampak positifmu
                </Text>
            </View>

            <View className="flex-row justify-center items-center mb-10 space-x-2">
                <View className="w-[8px] h-2 mx-2 rounded-full bg-[#D2D0A0]" />
                <View className="w-[8px] h-2 mx-2 rounded-full bg-[#D2D0A0]" />
                <View className="w-[8px] h-2 mx-2 rounded-full bg-[#D2D0A0]" />
                <View className="w-[31px] h-2 mx-2 rounded-full bg-[#9EBC8A]" />
            </View>

            <TouchableOpacity
                className="bg-[#537D5D] py-4 px-[60px] rounded-[25px] w-full max-w-[300px]"
                onPress={handleNext}
            >
                <Text className="font-poppins-medium text-[17px] text-white text-center">Selanjutnya</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
}