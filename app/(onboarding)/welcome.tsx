import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';

export default function WelcomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logoImage}
              contentFit="contain"
            />
          </View>
        </View>

        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>
            Selamat Datang di{'\n'}
            <ThemedText style={styles.brandText}>EcoTrack</ThemedText>
          </ThemedText>
          
          <ThemedText style={styles.description}>
            Pelacak jejak karbon berbasis AI yang menjadikan hidup ramah lingkungan terasa mudah dan menyenangkan
          </ThemedText>
        </View>

        <View style={styles.paginationContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
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
    backgroundColor: '#FAF6E9',
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
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 90,
    height: 100,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1f2937',
  },
  brandText: {
    color: '#000000',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#575757',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D2D0A0',
  },
  activeDot: {
    backgroundColor: '#9EBC8A',
    width: 24,
  },
  nextButton: {
    backgroundColor: '#537D5D',
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