import { TouchableOpacity, View, Text } from "react-native";
import { Image } from "expo-image";

type ActivityTypeProps = {
    activityType: {
        name: string;
        photo: any;
    };
    onPress: () => void;
};

export default function ActivityType({ activityType, onPress }: ActivityTypeProps) {
    const { name, photo } = activityType;
    return (
        <TouchableOpacity className="flex-col justify-center items-center p-4 mb-4" onPress={onPress}>
            <View className="">
                <Image
                    source={photo}
                    style={{ width: 36, height: 36 }}
                    contentFit="contain"
                />
            </View>
            <Text className="font-poppins text-[12px] text-black">
                {name}
            </Text>
        </TouchableOpacity>
    );
}
