import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { ThemedText } from '@/components/ThemedText';

export default function DashboardScreen() {
  const userName = "Mas Randy";
  const todayTarget = "8.5 kg CO2e";
  const currentEmission = 6.2;
  const targetEmission = 8.5;
  const progressPercentage = (currentEmission / targetEmission) * 100;

  const handleLogout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('userEmail');
    await AsyncStorage.removeItem('userName');
    
    Toast.show({
      type: 'success',
      text1: 'Logout berhasil',
      text2: 'Sampai jumpa! 👋'
    });
    
    setTimeout(() => {
      router.replace('/(auth)/login');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#22c55e', '#16a34a']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.locationContainer}>
            <ThemedText style={styles.locationIcon}>📍</ThemedText>
            <ThemedText style={styles.locationText}>Jakarta, Indonesia</ThemedText>
          </View>
          <TouchableOpacity style={styles.profileButton} onPress={handleLogout}>
            <ThemedText style={styles.profileIcon}>🚪</ThemedText>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.greetingCard}>
          <View style={styles.greetingContent}>
            <ThemedText style={styles.greetingText}>Selamat malam, {userName}!</ThemedText>
            <ThemedText style={styles.targetText}>Target hari ini: {todayTarget}</ThemedText>
            
            <View style={styles.emissionContainer}>
              <ThemedText style={styles.emissionValue}>{currentEmission} kg CO2e</ThemedText>
              <ThemedText style={styles.emissionSubtext}>35% di bawah kemarin</ThemedText>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
                </View>
                <View style={styles.progressLabels}>
                  <ThemedText style={styles.progressLabel}>0 kg</ThemedText>
                  <ThemedText style={styles.progressLabel}>Semua target</ThemedText>
                  <ThemedText style={styles.progressLabel}>{targetEmission} kg</ThemedText>
                </View>
              </View>

              <TouchableOpacity style={styles.analyticsButton}>
                <ThemedText style={styles.analyticsText}>📊 Lihat Analisis</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.illustrationContainer}>
            <ThemedText style={styles.illustration}>🌱</ThemedText>
          </View>
        </View>

        <View style={styles.recommendationsCard}>
          <ThemedText style={styles.sectionTitle}>Rekomendasi AI</ThemedText>
          
          <View style={styles.recommendationItem}>
            <View style={styles.recommendationIcon}>
              <ThemedText style={styles.iconText}>🚌</ThemedText>
            </View>
            <View style={styles.recommendationContent}>
              <ThemedText style={styles.recommendationTitle}>
                Gunakan transportasi umum hari ini!
              </ThemedText>
              <ThemedText style={styles.recommendationDesc}>
                Transportasi bensin: normal 3.2 kg CO2e dibanding naik mobil
              </ThemedText>
              <ThemedText style={styles.recommendationSaving}>Hemat: 2.1 kg CO2e</ThemedText>
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <ThemedText style={styles.actionButtonText}>Ambil Aksi</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.recommendationItem}>
            <View style={styles.recommendationIcon}>
              <ThemedText style={styles.iconText}>🥗</ThemedText>
            </View>
            <View style={styles.recommendationContent}>
              <ThemedText style={styles.recommendationTitle}>
                Coba menu vegan untuk makan siang
              </ThemedText>
              <ThemedText style={styles.recommendationDesc}>
                Makan plant-based menurunkan jejak karbon hingga
              </ThemedText>
              <ThemedText style={styles.recommendationSaving}>Hemat: 1.8 kg CO2e</ThemedText>
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <ThemedText style={styles.actionButtonText}>Ambil Aksi</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.todayCard}>
          <ThemedText style={styles.sectionTitle}>Minggu Ini</ThemedText>
          <View style={styles.weeklyStats}>
            <ThemedText style={styles.weeklyText}>📊 Lihat statistik minggu ini</ThemedText>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  locationText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  greetingCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  greetingContent: {
    flex: 1,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  targetText: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 16,
  },
  emissionContainer: {
    marginBottom: 16,
  },
  emissionValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 4,
  },
  emissionSubtext: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 10,
    color: '#6b7280',
  },
  analyticsButton: {
    alignSelf: 'flex-start',
  },
  analyticsText: {
    fontSize: 12,
    color: '#22c55e',
    fontWeight: '500',
  },
  illustrationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
  illustration: {
    fontSize: 40,
  },
  recommendationsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
  },
  recommendationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  recommendationDesc: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  recommendationSaving: {
    fontSize: 12,
    color: '#22c55e',
    fontWeight: '500',
  },
  actionButton: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  actionButtonText: {
    fontSize: 10,
    color: '#16a34a',
    fontWeight: '500',
  },
  todayCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weeklyStats: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  weeklyText: {
    fontSize: 14,
    color: '#6b7280',
  },
});