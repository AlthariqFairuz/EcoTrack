import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import Header from '@/components/header/header';
import { ThemedView } from '@/components/ThemedView';
import PageWrapper from '@/components/PageWrapper';
import { MaterialIcons } from '@expo/vector-icons';

interface EmissionData {
  day: string;
  current: number;
  target: number;
}

interface CategoryData {
  name: string;
  percentage: number;
  color: string;
}

interface PeriodData {
  current: number;
  target: number;
  unit: string;
  chartData: EmissionData[];
  categoryData: CategoryData[];
  progressData: {
    percentage: number;
    achieved: number;
    total: number;
    timeLeft: string;
  };
}

export default function AnalisisPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('Minggu');
  
  // Data untuk berbagai periode
  const periodDataMap: Record<string, PeriodData> = {
    'Hari Ini': {
      current: 6.2,
      target: 8.5,
      unit: 'kg CO₂e',
      chartData: [
        { day: '06:00', current: 0.2, target: 8.5 },
        { day: '09:00', current: 2.1, target: 8.5 },
        { day: '12:00', current: 3.8, target: 8.5 },
        { day: '15:00', current: 4.5, target: 8.5 },
        { day: '18:00', current: 5.8, target: 8.5 },
        { day: '21:00', current: 6.2, target: 8.5 },
      ],
      categoryData: [
        { name: 'Transportasi', percentage: 55, color: '#FF8A65' },
        { name: 'Makanan', percentage: 25, color: '#66BB6A' },
        { name: 'Energi', percentage: 15, color: '#42A5F5' },
        { name: 'Lainnya', percentage: 5, color: '#BDBDBD' },
      ],
      progressData: {
        percentage: 73,
        achieved: 6.2,
        total: 8.5,
        timeLeft: '3 jam tersisa'
      }
    },
    'Minggu': {
      current: 65.7,
      target: 9,
      unit: 'kg CO₂e',
      chartData: [
        { day: 'Sen', current: 10.1, target: 9.4 },
        { day: 'Sel', current: 6.5, target: 9.4 },
        { day: 'Rab', current: 11.8, target: 9.4 },
        { day: 'Kam', current: 7.2, target: 9.4 },
        { day: 'Jum', current: 11.5, target: 9.4 },
        { day: 'Sab', current: 9.7, target: 9.4 },
        { day: 'Min', current: 6.2, target: 9.4 },
      ],
      categoryData: [
        { name: 'Transportasi', percentage: 45, color: '#FF8A65' },
        { name: 'Makanan', percentage: 30, color: '#66BB6A' },
        { name: 'Energi', percentage: 20, color: '#42A5F5' },
        { name: 'Lainnya', percentage: 5, color: '#BDBDBD' },
      ],
      progressData: {
        percentage: 72,
        achieved: 18.2,
        total: 25,
        timeLeft: '5 hari tersisa'
      }
    },
    'Bulan': {
      current: 285.4,
      target: 71.4,
      unit: 'kg CO₂e',
      chartData: [
        { day: '1-7 Jul', current: 68.2, target: 70 },
        { day: '8-14 Jul', current: 72.1, target: 70 },
        { day: '15-21 Jul', current: 69.8, target: 70 },
        { day: '22-28 Jul', current: 75.3, target: 70 },
      ],
      categoryData: [
        { name: 'Transportasi', percentage: 42, color: '#FF8A65' },
        { name: 'Makanan', percentage: 28, color: '#66BB6A' },
        { name: 'Energi', percentage: 25, color: '#42A5F5' },
        { name: 'Lainnya', percentage: 5, color: '#BDBDBD' },
      ],
      progressData: {
        percentage: 85,
        achieved: 85,
        total: 100,
        timeLeft: '6 hari tersisa'
      }
    },
    'Tahunan': {
      current: 3420,
      target: 287,
      unit: 'kg CO₂e',
      chartData: [
        { day: 'Jan', current: 295, target: 280 },
        { day: 'Feb', current: 278, target: 280 },
        { day: 'Mar', current: 302, target: 280 },
        { day: 'Apr', current: 285, target: 280 },
        { day: 'Mei', current: 290, target: 280 },
        { day: 'Jun', current: 288, target: 280 },
        { day: 'Jul', current: 285, target: 280 },
        { day: 'Agu', current: 292, target: 280 },
        { day: 'Sep', current: 275, target: 280 },
        { day: 'Okt', current: 282, target: 280 },
        { day: 'Nov', current: 290, target: 280 },
        { day: 'Des', current: 285, target: 280 },
      ],
      categoryData: [
        { name: 'Transportasi', percentage: 40, color: '#FF8A65' },
        { name: 'Makanan', percentage: 32, color: '#66BB6A' },
        { name: 'Energi', percentage: 23, color: '#42A5F5' },
        { name: 'Lainnya', percentage: 5, color: '#BDBDBD' },
      ],
      progressData: {
        percentage: 92,
        achieved: 156,
        total: 170,
        timeLeft: '1 bulan tersisa'
      }
    }
  };

  const periods = ['Hari Ini', 'Minggu', 'Bulan', 'Tahunan'];

  const getCurrentData = (): PeriodData => periodDataMap[selectedPeriod];
  
  const getStatsLabels = () => {
    switch(selectedPeriod) {
      case 'Hari Ini': 
        return {
          first: 'Hari Ini',
          second: 'Target Harian'
        };
      case 'Minggu':
        return {
          first: 'Minggu Ini', 
          second: 'Rata-rata Harian'
        };
      case 'Bulan':
        return {
          first: 'Bulan Ini',
          second: 'Rata-rata Mingguan'
        };
      case 'Tahunan':
        return {
          first: 'Tahun Ini',
          second: 'Rata-rata Bulanan'
        };
      default:
        return {
          first: 'Minggu Ini',
          second: 'Rata-rata Harian'
        };
    }
  };

  const getStatsIcons = () => {
    switch(selectedPeriod) {
      case 'Hari Ini': 
        return {
          first: 'trending-down',
          second: 'track-changes'
        };
      case 'Minggu':
        return {
          first: 'trending-down', 
          second: 'track-changes'
        };
      case 'Bulan':
        return {
          first: 'trending-up',
          second: 'track-changes'
        };
      case 'Tahunan':
        return {
          first: 'trending-down',
          second: 'track-changes'
        };
      default:
        return {
          first: 'trending-down',
          second: 'track-changes'
        };
    }
  };

  const getStatsComparison = () => {
    switch(selectedPeriod) {
      case 'Hari Ini': 
        return {
          first: '16% di bawah kemarin',
          second: 'Target: 8.5 kg',
          firstIsPositive: true
        };
      case 'Minggu':
        return {
          first: '7% di bawah minggu lalu', 
          second: 'Target: 8.5 kg',
          firstIsPositive: true
        };
      case 'Bulan':
        return {
          first: '8% di atas bulan lalu',
          second: 'Target: 75 kg',
          firstIsPositive: false
        };
      case 'Tahunan':
        return {
          first: '10% di bawah tahun lalu',
          second: 'Target: 250 kg',
          firstIsPositive: true
        };
      default:
        return {
          first: '16% di bawah kemarin',
          second: 'Target: 8.5 kg',
          firstIsPositive: true
        };
    }
  };

  const getChartTitle = () => {
    switch(selectedPeriod) {
      case 'Hari Ini': return 'Emisi Per 3 Jam';
      case 'Minggu': return 'Emisi Harian';
      case 'Bulan': return 'Emisi Mingguan';
      case 'Tahunan': return 'Emisi Bulanan';
      default: return 'Emisi Harian';
    }
  };

  const getAverageText = () => {
    const currentData = getCurrentData();
    const average = currentData.chartData.reduce((sum, item) => sum + item.current, 0) / currentData.chartData.length;
    
    switch(selectedPeriod) {
      case 'Hari Ini': return `Rata-rata: ${average.toFixed(1)} kg CO₂e / 3 jam`;
      case 'Minggu': return `Rata-rata: ${average.toFixed(1)} kg CO₂e / hari`;
      case 'Bulan': return `Rata-rata: ${average.toFixed(1)} kg CO₂e / minggu`;
      case 'Tahunan': return `Rata-rata: ${average.toFixed(0)} kg CO₂e / bulan`;
      default: return `Rata-rata: ${average.toFixed(1)} kg CO₂e / hari`;
    }
  };

  const getKemajuanMessage = () => {
    switch(selectedPeriod) {
      case 'Hari Ini':
        return "Hari ini kamu berhasil mengurangi emisi dengan naik transportasi umum ke kantor. Pertahankan kebiasaan baik ini!";
      case 'Minggu':
        return "Kamu telah mengurangi emisi transportasi sebesar 25% minggu ini. Terus gunakan transportasi umum dan sepeda!";
      case 'Bulan':
        return "Pencapaian luar biasa! Kamu berhasil menghemat 15% emisi bulanan dengan mengurangi konsumsi daging dan menggunakan sepeda.";
      case 'Tahunan':
        return "Target tahunan hampir tercapai! Kamu telah mengurangi jejak karbon sebesar 12% dibanding tahun lalu melalui gaya hidup berkelanjutan.";
      default:
        return "Kamu telah mengurangi emisi transportasi sebesar 25% minggu ini. Terus gunakan transportasi umum dan sepeda!";
    }
  };

  const getTargetTitle = () => {
    switch(selectedPeriod) {
      case 'Hari Ini': return 'Target Harian';
      case 'Minggu': return 'Target Mingguan'; 
      case 'Bulan': return 'Target Bulanan';
      case 'Tahunan': return 'Target Tahunan';
      default: return 'Target Bulanan';
    }
  };

  const getTargetData = () => {
    const currentData = getCurrentData();
    return {
      percentage: currentData.progressData.percentage,
      timeLeft: currentData.progressData.timeLeft,
      achieved: currentData.progressData.achieved,
      total: currentData.progressData.total
    };
  };
  
  const getBarHeight = (emission: number) => {
    const maxHeight = 80;
    const currentData = getCurrentData();
    const maxEmission = Math.max(...currentData.chartData.map(d => Math.max(d.current, d.target))) * 1.1;
    return Math.max((emission / maxEmission) * maxHeight, 8);
  };

  const getBarColor = (current: number, target: number, day: string) => {
    const isCurrentPeriod = (selectedPeriod === 'Hari Ini' && day === '21:00') ||
                           (selectedPeriod === 'Minggu' && day === 'Min') ||
                           (selectedPeriod === 'Bulan' && day === '22-28 Jul') ||
                           (selectedPeriod === 'Tahunan' && day === 'Des');
    
    if (isCurrentPeriod) return '#65A30D'; // Current period - dark green
    if (current <= target) return '#65A30D'; // Under target - green
    if (current <= target * 0.8) return '#EAB308'; // Slightly over - yellow  
    return '#DC2626'; // Over target - red
  };

  return (
    <ThemedView className="flex-1" style={{ backgroundColor: '#FAF6E9' }}>
      <Header title="Analisis" prevPage="/(tabs)/" isOnDashboard={false} />
      
      <PageWrapper className="px-4 pt-4">
        {/* Header dengan periode */}
        <View className="flex-row bg-white rounded-xl p-1 mb-6">
          {periods.map((period) => (
            <TouchableOpacity
              key={period}
              onPress={() => setSelectedPeriod(period)}
              className={`flex-1 py-3 px-2 rounded-lg ${
                selectedPeriod === period ? 'bg-[#C8DB9D]' : ''
              }`}
            >
              <Text className={`font-poppins text-xs text-center ${
                selectedPeriod === period ? 'text-[#2E5538] font-poppins-medium' : 'text-gray-600'
              }`}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Cards */}
        <View className="flex-row mb-6">
          {/* First Card */}
          <View className="flex-1 bg-white rounded-xl p-4 mr-2" style={{
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
          }}>
            <View className="flex-row justify-between items-start mb-1">
              <Text className="font-poppins text-xs text-gray-500">{getStatsLabels().first}</Text>
              <MaterialIcons name={getStatsIcons().first as any} size={16} color="#9CA3AF" />
            </View>
            <Text className="font-poppins-bold text-xl text-black">
              {getCurrentData().current} <Text className="text-sm">kg CO₂e</Text>
            </Text>
            <View className="flex-row items-center mt-1">
              <MaterialIcons 
                name={getStatsComparison().firstIsPositive ? "trending-down" : "trending-up"} 
                size={14} 
                color={getStatsComparison().firstIsPositive ? "#66BB6A" : "#F44336"} 
              />
              <Text className={`font-poppins text-xs ml-1 ${
                getStatsComparison().firstIsPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {getStatsComparison().first}
              </Text>
            </View>
          </View>

          {/* Second Card */}
          <View className="flex-1 bg-white rounded-xl p-4 ml-2" style={{
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
          }}>
            <View className="flex-row justify-between items-start mb-1">
              <Text className="font-poppins text-xs text-gray-500">{getStatsLabels().second}</Text>
              <MaterialIcons name={getStatsIcons().second as any} size={16} color="#9CA3AF" />
            </View>
            <Text className="font-poppins-bold text-xl text-black">
              {getCurrentData().target} <Text className="text-sm">kg CO₂e</Text>
            </Text>
            <Text className="font-poppins text-xs text-gray-600 mt-1">
              {getStatsComparison().second}
            </Text>
          </View>
        </View>

        {/* Chart Section */}
        <View className="mb-6">
          <Text className="font-poppins-semibold text-lg text-black mb-4">
            {getChartTitle()}
          </Text>
          
          <View className="bg-white rounded-xl p-4" style={{
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
          }}>
            <View className="flex-row justify-between items-end mb-3" style={{ height: 100 }}>
              {getCurrentData().chartData.map((day, index) => (
                <View key={index} className="items-center" style={{ 
                  flex: selectedPeriod === 'Tahunan' ? 0.08 : 1,
                  marginHorizontal: selectedPeriod === 'Tahunan' ? 1 : 0
                }}>
                  <View 
                    className="rounded-t-md"
                    style={{ 
                      width: selectedPeriod === 'Tahunan' ? 12 : 32,
                      height: getBarHeight(day.current),
                      backgroundColor: getBarColor(day.current, day.target, day.day)
                    }}
                  />
                  <Text className="text-xs text-gray-600 mt-2 font-poppins" style={{
                    fontSize: selectedPeriod === 'Tahunan' ? 10 : 12,
                    textAlign: 'center'
                  }}>
                    {day.day}
                  </Text>
                  <Text className="text-xs text-gray-800 font-poppins-medium" style={{
                    fontSize: selectedPeriod === 'Tahunan' ? 10 : 12,
                    textAlign: 'center'
                  }}>
                    {day.current}
                  </Text>
                </View>
              ))}
            </View>
            
            <View className="border-t border-gray-200 pt-3 flex-row justify-between items-center">
              <Text className="text-xs text-gray-500 font-poppins">
                {getAverageText()}
              </Text>
              <TouchableOpacity>
                <MaterialIcons name="refresh" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Kategori Emisi */}
        <View className="mb-6">
          <Text className="font-poppins-semibold text-lg text-black mb-4">
            Kategori Emisi
          </Text>
          
          <View className="bg-white rounded-xl p-4" style={{
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
          }}>
            {getCurrentData().categoryData.map((category, index) => (
              <View key={index} className="flex-row items-center justify-between py-2">
                <View className="flex-row items-center flex-1">
                  <View 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: category.color }}
                  />
                  <Text className="font-poppins text-sm text-black">
                    {category.name}
                  </Text>
                </View>
                <Text className="font-poppins-medium text-sm text-black">
                  {category.percentage}%
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Kemajuan Hebat Card */}
        <View className="mb-6">
          <View className="bg-[#FFF3CD] rounded-xl p-4 border border-[#FFEAA7]" style={{
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
          }}>
            <View className="flex-row items-start">
              <View className="mr-3 mt-1">
                <Text className="text-lg">🏆</Text>
              </View>
              <View className="flex-1">
                <Text className="font-poppins-bold text-sm text-[#856404] mb-1">
                  Kemajuan Hebat!
                </Text>
                <Text className="font-poppins text-xs text-[#856404] leading-4">
                  {getKemajuanMessage()}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Target Section */}
        <View className="mb-6">
          <Text className="font-poppins-semibold text-lg text-black mb-4">
            {getTargetTitle()}
          </Text>
          
          <View className="bg-white rounded-xl p-4" style={{
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
          }}>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="font-poppins-bold text-lg text-[#537D5D]">
                {getTargetData().percentage}% selesai
              </Text>
              <Text className="font-poppins text-sm text-gray-600">
                {getTargetData().timeLeft}
              </Text>
            </View>
            
            <Text className="font-poppins text-sm text-gray-600 mb-3">
              {getTargetData().achieved}/{getTargetData().total} kg dihemat
            </Text>
            
            {/* Progress Bar */}
            <View className="h-2 bg-[#E5E7EB] rounded-full mb-3">
              <View 
                className="h-full bg-[#537D5D] rounded-full"
                style={{ width: `${getTargetData().percentage}%` }}
              />
            </View>
          </View>
        </View>
      </PageWrapper>
    </ThemedView>
  );
}