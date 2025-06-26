import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function WelcomeScreen() {
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
            Selamat Datang di{'\n'}
            <ThemedText style={styles.brandText}>EcoTrack</ThemedText>
          </ThemedText>
          
          <ThemedText style={styles.description}>
            Pantau jejak karbon bersama AI yang mengajarkan hidup ramah lingkungan terbaik untuk kamu dan lingkungan
          </ThemedText>
        </View>

        <TouchableOpacity 
          style={styles.nextButton}
          onPress={() => router.push('/start')}
        >
          <ThemedText style={styles.nextButtonText}>Selanjutnya</ThemedText>
        </TouchableOpacity>
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
    marginBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1f2937',
  },
  brandText: {
    color: '#22c55e',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#6b7280',
  },
  nextButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 25,
    width: '100%',
    maxWidth: 300,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
