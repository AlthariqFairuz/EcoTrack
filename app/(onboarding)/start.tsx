import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function StartScreen() {
  const handleLogin = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    router.replace('/(tabs)');
  };

  const handleRegister = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    router.replace('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <ThemedText style={styles.logoIcon}>📍</ThemedText>
          </View>
        </View>

        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>
            Mulai Langkah Hijau{'\n'}Bersama EcoTrack
          </ThemedText>
          
          <ThemedText style={styles.description}>
            Pantau jejak karbonmu dan ubah kebiasaan kecil jadi dampak besar untuk bumi
          </ThemedText>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <ThemedText style={styles.loginButtonText}>Masuk</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <ThemedText style={styles.registerButtonText}>Daftar</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 50,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4ade80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 32,
    color: 'white',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1f2937',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#6b7280',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 16,
  },
  loginButton: {
    backgroundColor: '#a7f3d0',
    paddingVertical: 16,
    borderRadius: 25,
  },
  loginButtonText: {
    color: '#047857',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    borderRadius: 25,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
