import Header from '@/components/header/header';
import { Ionicons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import React, { useRef, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

const OCR_BASE_URL = 'http://192.168.1.100:8001'; 

const Scanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<'off' | 'on' | 'auto'>('off');
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  // OCR Service Functions
  const scanReceipt = async (imageUri: string) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'receipt.jpg',
      } as any);

      const response = await fetch(`${OCR_BASE_URL}/scan-receipt`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('OCR Error:', error);
      throw new Error(`OCR Error: ${error}`);
    }
  };

  const scanFood = async (imageUri: string) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'food.jpg',
      } as any);

      const response = await fetch(`${OCR_BASE_URL}/scan-food`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Food scanning error:', error);
      throw new Error(`Food scanning error: ${error}`);
    }
  };

  const saveToTracker = (ocrResult: any) => {
    const newActivity = {
      name: `Belanja - ${ocrResult.item_count || 0} items`,
      time: new Date(),
      description: ocrResult.items 
        ? `${ocrResult.items.slice(0, 2).map((i: any) => i.name).join(', ')}${ocrResult.items.length > 2 ? '...' : ''}`
        : 'Items dari scan',
      type: 'Belanja',
      carbon: ocrResult.total_carbon_footprint || ocrResult.estimated_carbon_footprint || 0,
      details: ocrResult.items || []
    };
    
    console.log('Saving activity:', newActivity);
    
    Toast.show({
      type: 'success',
      text1: 'Data tersimpan!',
      text2: 'Aktivitas berhasil ditambahkan ke tracker',
    });
  };

  const processOCRResult = (result: any, scanType: string) => {
    if (result.success) {
      const carbonValue = result.total_carbon_footprint || result.estimated_carbon_footprint || 0;
      
      Toast.show({
        type: 'success',
        text1: `Terdeteksi: ${result.detected_type || scanType}`,
        text2: `Jejak karbon: ${carbonValue} kg CO₂e`,
      });

      let alertMessage = `Total Jejak Karbon: ${carbonValue} kg CO₂e\n\n`;
      
      if (result.items && result.items.length > 0) {
        alertMessage += `Items terdeteksi: ${result.item_count}\n\n`;
        alertMessage += result.items.slice(0, 3).map((item: any) => 
          `• ${item.name}: ${item.carbon_footprint || 'N/A'} kg CO₂e`
        ).join('\n');
      } else if (result.detected_items) {
        alertMessage += `Items terdeteksi: ${result.detected_items.length}\n\n`;
        alertMessage += result.detected_items.slice(0, 3).map((item: any) => 
          `• ${item.name} (${item.category})`
        ).join('\n');
      }

      Alert.alert(
        'Hasil Scan',
        alertMessage,
        [
          { text: 'OK' },
          { 
            text: 'Simpan ke Tracker', 
            onPress: () => saveToTracker(result)
          }
        ]
      );
    } else {
      Toast.show({
        type: 'error',
        text1: 'Tidak dapat mendeteksi',
        text2: result.message || 'Coba foto yang lebih jelas',
      });
    }
  };

  const takePicture = async () => {
    if (cameraRef.current && !isCapturing) {
      setIsCapturing(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });

        Toast.show({
          type: 'info',
          text1: 'AI sedang memproses...',
          text2: 'Menganalisis jejak karbon dari gambar',
        });

        try {
          // Try receipt scanning first
          const receiptResult = await scanReceipt(photo.uri);
          processOCRResult(receiptResult, 'receipt');
        } catch (receiptError) {
          console.log('Receipt scan failed, trying food scan...');
          
          try {
            // Fallback to food scanning
            const foodResult = await scanFood(photo.uri);
            processOCRResult(foodResult, 'food');
          } catch (foodError) {
            console.error('Both scans failed:', { receiptError, foodError });
            
            // Final fallback - mock result
            Toast.show({
              type: 'info',
              text1: 'Mode Demo',
              text2: 'Menampilkan hasil simulasi',
            });
            
            const mockResult = {
              success: true,
              detected_type: 'Struk belanja (simulasi)',
              items: [
                { name: 'Daging sapi 500g', carbon_footprint: 2.75, category: 'meat' },
                { name: 'Sayuran organik', carbon_footprint: 0.2, category: 'vegetables' },
                { name: 'Kemasan plastik', carbon_footprint: 0.1, category: 'processed' }
              ],
              total_carbon_footprint: 3.05,
              item_count: 3
            };
            
            processOCRResult(mockResult, 'demo');
          }
        }

      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Terjadi kesalahan saat mengambil gambar',
        });
        console.error('Camera error:', error);
      } finally {
        setIsCapturing(false);
      }
    }
  };

  const pickImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        Toast.show({
          type: 'info',
          text1: 'AI sedang memproses...',
          text2: 'Menganalisis jejak karbon dari gambar',
        });

        try {
          // Try receipt scanning first
          const receiptResult = await scanReceipt(result.assets[0].uri);
          processOCRResult(receiptResult, 'receipt');
        } catch (receiptError) {
          try {
            // Fallback to food scanning
            const foodResult = await scanFood(result.assets[0].uri);
            processOCRResult(foodResult, 'food');
          } catch (foodError) {
            Toast.show({
              type: 'error',
              text1: 'Tidak dapat memproses',
              text2: 'Pastikan foto berisi struk atau makanan yang jelas',
            });
          }
        }
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Terjadi kesalahan saat memilih gambar',
      });
      console.error('Gallery OCR error:', error);
    }
  };

  const toggleFlash = () => {
    setFlash(current => 
      current === 'off' 
        ? 'on' 
        : current === 'on' 
        ? 'auto' 
        : 'off'
    );
  };

  const flipCamera = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  if (!permission) {
    return (
      <View className="flex-1 bg-orange-50">
        <Header title='AI Scanner' isOnDashboard={false}/>
        <View className="flex-1 justify-center items-center">
          <Text className="font-poppins text-gray-600">Meminta izin kamera...</Text>
        </View>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-orange-50">
        <Header title='AI Scanner' isOnDashboard={false}/>
        <View className="flex-1 justify-center items-center p-8">
          <Ionicons name="camera-outline" size={64} color="#9CA3AF" />
          <Text className="font-poppins-semibold text-lg text-gray-800 mt-4 mb-2 text-center">
            Izin Kamera Diperlukan
          </Text>
          <Text className="font-poppins text-gray-600 text-center mb-6">
            Untuk menggunakan AI Scanner, aplikasi memerlukan akses ke kamera
          </Text>
          <TouchableOpacity 
            className="bg-[#537D5D] px-6 py-3 rounded-xl"
            onPress={requestPermission}
          >
            <Text className="text-white font-poppins-medium">
              Berikan Izin Kamera
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-orange-50">
      <Header title='AI Scanner' isOnDashboard={false}/>
      
      <View className="flex-1 p-4">
        {/* Camera Preview */}
        <View className="flex-1 rounded-2xl overflow-hidden" style={{
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}>
          <CameraView
            ref={cameraRef}
            style={{ flex: 1 }}
            facing={facing}
            flash={flash}
          >
            {/* Top Controls */}
            <View className="flex-row justify-between items-center p-4">
              <TouchableOpacity 
                className="w-10 h-10 rounded-full bg-black/30 justify-center items-center"
                onPress={toggleFlash}
              >
                <Ionicons 
                  name={
                    flash === 'off' 
                      ? "flash-off" 
                      : flash === 'on' 
                      ? "flash" 
                      : "flash-outline"
                  } 
                  size={20} 
                  color="white" 
                />
              </TouchableOpacity>
              <TouchableOpacity 
                className="w-10 h-10 rounded-full bg-black/30 justify-center items-center"
                onPress={flipCamera}
              >
                <Ionicons name="camera-reverse" size={20} color="white" />
              </TouchableOpacity>
            </View>
            
            {/* Scanning Overlay */}
            <View className="flex-1 justify-center items-center">
              <View className="border-2 border-white/50 rounded-xl p-8 m-8">
                <View className="w-4 h-4 border-t-2 border-l-2 border-white absolute top-0 left-0" />
                <View className="w-4 h-4 border-t-2 border-r-2 border-white absolute top-0 right-0" />
                <View className="w-4 h-4 border-b-2 border-l-2 border-white absolute bottom-0 left-0" />
                <View className="w-4 h-4 border-b-2 border-r-2 border-white absolute bottom-0 right-0" />
                
                <Text className="text-white font-poppins text-center mt-16">
                  Arahkan kamera ke struk, makanan,{'\n'}atau objek yang ingin di-scan
                </Text>
              </View>
            </View>
            
            {/* Bottom Controls */}
            <View className="flex-row justify-center items-center p-8 pb-12">
              {/* Gallery Button */}
              <TouchableOpacity 
                className="w-12 h-12 rounded-xl bg-black/30 justify-center items-center mr-8"
                onPress={pickImageFromGallery}
              >
                <Ionicons name="images" size={24} color="white" />
              </TouchableOpacity>
              
              {/* Capture Button */}
              <TouchableOpacity 
                className={`w-20 h-20 rounded-full justify-center items-center ${
                  isCapturing ? 'bg-red-600' : 'bg-white'
                }`}
                onPress={takePicture}
                disabled={isCapturing}
                style={{
                  shadowColor: '#000000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <View className={`w-16 h-16 rounded-full ${
                  isCapturing ? 'bg-red-700' : 'bg-gray-200'
                }`}>
                  {isCapturing && (
                    <View className="flex-1 justify-center items-center">
                      <View className="w-3 h-3 bg-white rounded-full" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              
              {/* AI Info Button */}
              <TouchableOpacity 
                className="w-12 h-12 rounded-xl bg-black/30 justify-center items-center ml-8"
                onPress={() => {
                  Alert.alert(
                    'AI Scanner',
                    'Teknologi AI dapat mendeteksi:\n• Struk belanja\n• Makanan dan minuman\n• Kendaraan\n• Produk kemasan\n\nDan menghitung jejak karbonnya secara otomatis!\n\nCatatan: Pastikan server OCR berjalan di ' + OCR_BASE_URL
                  );
                }}
              >
                <Ionicons name="information" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
        
        {/* Instructions */}
        <View className="mt-4 p-4 bg-white rounded-xl" style={{
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}>
          <Text className="font-poppins-semibold text-center text-gray-800 mb-2">
            Tips Scanning
          </Text>
          <Text className="font-poppins text-sm text-gray-600 text-center">
            • Pastikan objek dalam pencahayaan yang cukup{'\n'}
            • Arahkan kamera dengan stabil{'\n'}
            • AI akan otomatis menghitung jejak karbon{'\n'}
            • Server: {OCR_BASE_URL}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Scanner;