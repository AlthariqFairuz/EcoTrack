import { Stack } from 'expo-router';

export default function ProfileLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="profile" />
            <Stack.Screen name="target-karbon" />
            <Stack.Screen name="pengaturan" />
            <Stack.Screen name="analisis" />
        </Stack>
    )
}