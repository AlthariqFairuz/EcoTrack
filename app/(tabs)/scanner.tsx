import Header from '@/components/header/header';
import { Ionicons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';


const Scanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<'off' | 'on' | 'auto'>('off');
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const scanImage = async (imageUri: string) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'scan.jpg',
      } as any);

      const response = await fetch(`https://scanner-ocr-195352650485.asia-southeast2.run.app/scan-receipt`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('OCR Error:', error);
      throw new Error(`OCR scanning failed: ${error}`);
    }
  };

  const processOCRResult = (result: any) => {
    if (result.success) {
      const carbonValue = result.total_carbon_footprint || 0;
      
      Toast.show({
        type: 'success',
        text1: `Berhasil! Jenis: ${result.detected_type || 'Unknown'}`,
        text2: `Jejak karbon: ${carbonValue} kg CO₂e`,
      });

      router.push({
        pathname: '/scanner-results' as any,
        params: {
          results: JSON.stringify(result)
        }
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
          const result = await scanImage(photo.uri);
          processOCRResult(result);
        } catch (error) {
          console.error('Scan failed:', error);
          
          Toast.show({
            type: 'error',
            text1: 'Gagal memproses gambar',
            text2: 'Pastikan gambar berisi struk atau makanan yang jelas',
          });
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
          const scanResult = await scanImage(result.assets[0].uri);
          processOCRResult(scanResult);
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Tidak dapat memproses',
            text2: 'Pastikan foto berisi struk atau makanan yang jelas',
          });
          console.error('Gallery scan error:', error);
        }
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Terjadi kesalahan saat memilih gambar',
      });
      console.error('Gallery error:', error);
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
      <Header title='AI Scanner' isOnDashboard={true}/>
      
      <View className="flex-1 p-4">
        {/* Camera Preview */}
        <View className="flex-1 rounded-2xl overflow-hidden mb-8" style={{
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
                    'Teknologi AI dapat mendeteksi:\n• Struk belanja\n• Makanan dan minuman\\n• Produk kemasan\n\nDan menghitung jejak karbonnya secara otomatis',
                  );
                }}
              >
                <Ionicons name="information" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
        
      </View>
    </View>
  );
};

export default Scanner;