import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Toast from 'react-native-toast-message';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !location) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Mohon isi semua field',
        });
      return;
    }
    
    if (!agreeToTerms) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Mohon setujui syarat layanan dan kebijakan privasi',
        });
      return;
    }

    // dummy signup
    await AsyncStorage.setItem('isLoggedIn', 'true');
    await AsyncStorage.setItem('userEmail', email);
    await AsyncStorage.setItem('userName', name);
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

        <ThemedText style={styles.title}>Gabung dengan EcoTrack</ThemedText>
        <ThemedText style={styles.subtitle}>
          Mulai perjalananmu menolak jejak karbon
        </ThemedText>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Nama Lengkap*</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Masukkan nama lengkapmu"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Email*</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Masukkan email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Kata Sandi*</ThemedText>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Masukkan kata sandi"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <ThemedText style={styles.eyeIcon}>👁</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Lokasi*</ThemedText>
            <TouchableOpacity style={styles.dropdown}>
              <TextInput
                style={styles.dropdownText}
                placeholder="Pilih kota tempat tinggalmu"
                value={location}
                onChangeText={setLocation}
              />
              <ThemedText style={styles.dropdownIcon}>▼</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.checkboxContainer}>
            <TouchableOpacity 
              style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}
              onPress={() => setAgreeToTerms(!agreeToTerms)}
            >
              {agreeToTerms && <ThemedText style={styles.checkmark}>✓</ThemedText>}
            </TouchableOpacity>
            <ThemedText style={styles.checkboxText}>
              Saya menyetujui syarat layanan dan kebijakan privasi
            </ThemedText>
          </View>

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <ThemedText style={styles.signupButtonText}>Daftar</ThemedText>
          </TouchableOpacity>

          <ThemedText style={styles.orText}>Atau daftar dengan</ThemedText>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <ThemedText style={styles.socialButtonText}>G Google</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <ThemedText style={styles.socialButtonText}>🍎 Apple</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <ThemedText style={styles.loginText}>Sudah punya akun? </ThemedText>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <ThemedText style={styles.loginLink}>Masuk di sini</ThemedText>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 24,
    color: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 32,
    lineHeight: 20,
  },
  formContainer: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeIcon: {
    paddingHorizontal: 16,
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#22c55e',
    borderRadius: 25,
    paddingVertical: 16,
    marginBottom: 24,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  orText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  socialButtonText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#374151',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#6b7280',
    fontSize: 14,
  },
  loginLink: {
    color: '#22c55e',
    fontSize: 14,
    fontWeight: '500',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#6b7280',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxText: {
    flex: 1,
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
  },
});