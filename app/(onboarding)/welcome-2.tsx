import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image'; 

export default function Welcome2() {
  const handleNext = () => {
    router.push('/welcome-3');
  };

  const handleSkip = () => {
    router.replace('/start');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={handleSkip}>
          <ThemedText style={styles.skipText}>Lewati</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require('@/assets/images/welcome-2.png')}
            style={styles.illustration}
            contentFit="contain"
          />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>Pindai & Lacak</ThemedText>
          
          <ThemedText style={styles.description}>
            Arahkan kamera ke struk, makanan, atau transportasi. AI kami akan langsung menghitung dampak karbonnya
          </ThemedText>
        </View>

        {/* Pagination */}
        <View style={styles.paginationContainer}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>

        {/* Next Button */}
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
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
  skipContainer: {
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 20,
  },
  skipText: {
    fontSize: 15,
    color: '#575757',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
   illustrationContainer: {
    height: 250,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: 350,
    height: 250,
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