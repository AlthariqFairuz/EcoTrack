import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '@/components/header/header';
import { ThemedView } from '@/components/ThemedView';
import Toast from 'react-native-toast-message';

export default function ScannerResultsScreen() {
  const params = useLocalSearchParams();
  
  const scanResults = params.results ? JSON.parse(params.results as string) : null;
  
  if (!scanResults) {
    return (
      <ThemedView className="flex-1" style={{ backgroundColor: '#FAF6E9' }}>
        <Header title="Hasil Scanner" isOnDashboard={false} />
        <View className="flex-1 justify-center items-center p-8">
          <Text className="font-poppins text-lg text-gray-600">
            Tidak ada hasil scan yang ditemukan
          </Text>
          <TouchableOpacity 
            className="bg-[#537D5D] px-6 py-3 rounded-xl mt-4"
            onPress={() => router.back()}
          >
            <Text className="text-white font-poppins-medium">Kembali</Text>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  const handleScanAgain = () => {
    router.back();
  };

  const handleAddToActivities = () => {
    Toast.show({
      type: 'success',
      text1: 'Berhasil ditambahkan!',
      text2: 'Aktivitas tersimpan ke tracker',
    });

    router.replace('/(tabs)/track');
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `Hari ini, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <ThemedView className="flex-1" style={{ backgroundColor: '#FAF6E9' }}>
      <Header title="AI Scanner" isOnDashboard={false} />
      
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* Success Banner */}
        <View className="bg-[#C8E6C9] rounded-xl p-4 mb-6 flex-row items-center">
          <MaterialIcons name="check-circle" size={24} color="#2E7D32" />
          <Text className="font-poppins-semibold text-[#2E7D32] ml-2">
            {scanResults.success ? 'Scan Berhasil!' : 'Scan Selesai'}
          </Text>
          {scanResults.success && (
            <Text className="font-poppins text-sm text-[#2E7D32] ml-2">
              Ditemukan {scanResults.item_count || 0} item dengan analisis AI
            </Text>
          )}
        </View>

        {/* Store Details */}
        <View className="bg-white rounded-xl p-4 mb-4" style={{
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        }}>
          <View className="flex-row items-center mb-3">
            <MaterialIcons name="receipt" size={20} color="#537D5D" />
            <Text className="font-poppins-semibold text-sm ml-2">Detail Struk:</Text>
          </View>
          <Text className="font-poppins text-sm text-gray-700">
            Toko: {scanResults.store_name || 'Whole Foods Market'}
          </Text>
          <Text className="font-poppins text-sm text-gray-700">
            Waktu: {getCurrentTime()}
          </Text>
        </View>

        {/* Items Detected */}
        <View className="bg-white rounded-xl p-4 mb-4" style={{
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        }}>
          <View className="flex-row items-center mb-3">
            <MaterialIcons name="shopping-bag" size={20} color="#FF9800" />
            <Text className="font-poppins-semibold text-base ml-2">
              Item yang Dipindai
            </Text>
          </View>

          {scanResults.items && scanResults.items.length > 0 ? (
            scanResults.items.slice(0, 3).map((item: any, index: number) => (
              <View key={index} className="flex-row justify-between items-center py-3 border-b border-gray-100">
                <View className="flex-1">
                  <Text className="font-poppins-medium text-sm text-gray-800">
                    {item.name}
                  </Text>
                  <Text className="font-poppins text-xs text-gray-500">
                    {item.category} - Rp {item.price || '20.000'}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="font-poppins-semibold text-sm">
                    {item.carbon_footprint || '0'} kg
                  </Text>
                  <Text className="font-poppins text-xs text-gray-500">CO₂e</Text>
                  <TouchableOpacity className="mt-1">
                    <MaterialIcons name="edit" size={16} color="#537D5D" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View className="py-8 items-center">
              <MaterialIcons name="info" size={32} color="#9CA3AF" />
              <Text className="font-poppins text-sm text-gray-500 mt-2 text-center">
                {scanResults.success 
                  ? "Tidak ada item makanan yang terdeteksi"
                  : scanResults.message || "Scan tidak berhasil mendeteksi item"}
              </Text>
              {scanResults.raw_text && scanResults.raw_text.length > 0 && (
                <Text className="font-poppins text-xs text-gray-400 mt-2 text-center">
                  Teks terdeteksi: {scanResults.raw_text.slice(0, 3).join(', ')}...
                </Text>
              )}
            </View>
          )}

          {/* Total Impact */}
          <View className="mt-4 p-3 bg-[#F5F5F5] rounded-lg">
            <View className="flex-row justify-between items-center">
              <Text className="font-poppins-semibold text-base">Dampak Total</Text>
              <View className="items-end">
                <Text className="font-poppins-bold text-xl text-[#537D5D]">
                  {scanResults.total_carbon_footprint || '1.5'} kg CO₂e
                </Text>
                <Text className="font-poppins text-xs text-gray-500">
                  Rp {scanResults.total_price || '65,000'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* AI Recommendations */}
        {scanResults.success && scanResults.items && scanResults.items.length > 0 && (
          <View className="bg-white rounded-xl p-4 mb-6" style={{
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 3,
          }}>
            <View className="flex-row items-center mb-3">
              <MaterialIcons name="lightbulb" size={20} color="#2196F3" />
              <Text className="font-poppins-semibold text-base ml-2">
                Rekomendasi AI
              </Text>
            </View>

            {/* Sample recommendations */}
            <View className="bg-[#E3F2FD] rounded-lg p-3 mb-3">
              <View className="flex-row items-center">
                <MaterialIcons name="home" size={16} color="#1976D2" />
                <Text className="font-poppins-medium text-sm ml-2 flex-1">
                  Susu Organik 1L
                </Text>
              </View>
              <Text className="font-poppins text-xs text-gray-600 mt-1">
                Coba: Susu Oat
              </Text>
              <Text className="font-poppins-semibold text-xs text-[#1976D2] mt-1">
                30% lebih rendah
              </Text>
            </View>

            <View className="bg-[#E3F2FD] rounded-lg p-3">
              <View className="flex-row items-center">
                <MaterialIcons name="home" size={16} color="#1976D2" />
                <Text className="font-poppins-medium text-sm ml-2 flex-1">
                  Roti Gandum
                </Text>
              </View>
              <Text className="font-poppins text-xs text-gray-600 mt-1">
                Coba: Toko Roti Lokal
              </Text>
              <Text className="font-poppins-semibold text-xs text-[#1976D2] mt-1">
                20% lebih rendah
              </Text>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View className="flex-row justify-between mb-8">
          <TouchableOpacity 
            className="flex-1 bg-white border border-[#537D5D] py-4 rounded-xl mr-2"
            onPress={handleScanAgain}
            style={{
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text className="text-[#537D5D] font-poppins-semibold text-center">
              Scan lagi
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-1 bg-[#537D5D] py-4 rounded-xl ml-2"
            onPress={handleAddToActivities}
            style={{
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text className="text-white font-poppins-semibold text-center">
              Tambah ke Aktivitas
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}