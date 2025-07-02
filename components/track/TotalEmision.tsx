import { View, Text } from "react-native";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";

type TotalEmisionProps = {
    totalEmision: {
        value: string;
        changesValue: string;
        isIncrease: boolean;
    };
};

export default function TotalEmision({ totalEmision }: TotalEmisionProps) {
    const { value, changesValue, isIncrease } = totalEmision;
    return (
        <View
            className="flex-1 p-4 flex-row items-center bg-white rounded-[10px] w-full"
            style={{
                width: "100%",
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
                elevation: 2
            }}
        >
            <View className="flex-1 flex-col">
                <Text className="font-poppins-medium text-[12px] text-black">
                    Total Emisi Karbon
                </Text>

                <View className="flex-row items-center">
                    <Text className="font-poppins-semibold text-[30px] text-black mr-2">
                        {value}
                    </Text>
                    <Text className="font-poppins text-[15px] text-black">
                        kg CO2e
                    </Text>
                </View>

                <View className="flex-row items-center">
                    <MaterialIcons
                        name={isIncrease ? "trending-up" : "trending-down"}
                        size={16}
                        color={isIncrease ? "#ef4444" : "#537D5D"}
                    />
                    <Text className="font-poppins text-[12px] text-black ml-2">
                        {changesValue}% di {isIncrease ? 'atas' : 'bawah'} kemarin
                    </Text>
                </View>
            </View>

            <View className="ml-4">
                <Image
                    source={require('@/assets/images/track/sapi.jpg')}
                    style={{ width: 60, height: 90 }}
                    contentFit="contain"
                />
            </View>
        </View>

    );
}
