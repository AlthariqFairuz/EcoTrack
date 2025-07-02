import { TouchableOpacity, View, Text } from "react-native";
import { Image } from "expo-image";

type ActivityTypeProps = {
    activity: {
        name: string;
        time: Date;
        description: string;
        type: string;
    };
    handleEdit: () => void;
    handleDelete: () => void;
};


const activityTypePhoto = [
    { name: 'Transportasi', photo: require('@/assets/images/track/transportasi.svg') },
    { name: 'Makanan', photo: require('@/assets/images/track/makanan.svg') },
    { name: 'Energi', photo: require('@/assets/images/track/energy.svg') },
    { name: 'Belanja', photo: require('@/assets/images/track/belanja.svg') },
]
export default function Activity({ activity, handleEdit, handleDelete }: ActivityTypeProps) {
    const { name, time, description, type } = activity;
    const photo = activityTypePhoto.find(item => item.name.toLowerCase() === type.toLowerCase())?.photo;
    return (
        <View className="flex-1 flex-row items-center" >
            <Image
                source={photo}
                style={{ width: 36, height: 36 }}
                contentFit="contain"
            />

            <View className="flex-1 flex-col mx-2">
                <View className="flex-row items-center">
                    <Text className="font-poppins text-[12px] text-[#5D5D5D]">
                        {time.getHours().toString().padStart(2, '0')}:
                        {time.getMinutes().toString().padStart(2, '0')}
                    </Text>

                    <Text className="font-poppins-medium text-[14px] text[#1E1E1E] ml-1">
                        {name}
                    </Text>
                </View>

                <Text className="font-poppins text-[12px] text-[#5D5D5D] mt-1">
                    {description}
                </Text>

            </View>

            <TouchableOpacity onPress={handleEdit} className="mx-2">
                <Image
                    source={require('@/assets/images/track/edit.svg')}
                    style={{ width: 17, height: 17 }}
                    contentFit="contain"
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleDelete}>
                <Image
                    source={require('@/assets/images/track/delete.svg')}
                    style={{ width: 19, height: 19 }}
                    contentFit="contain"
                />
            </TouchableOpacity>

        </View>

    );
}
