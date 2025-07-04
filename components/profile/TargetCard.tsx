import React from 'react';
import { View, Text } from 'react-native';

interface TargetCardProps {
  title: string;
  month: string;
  status: string;
  daysLeft: number;
  progress: number; // example: 0.73 for 73%
  currentValue: number;
  targetValue: number;
  feedback: string;
}

export function TargetCard({
  title,
  month,
  status,
  daysLeft,
  progress,
  currentValue,
  targetValue,
  feedback,
}: TargetCardProps) {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
          <Text style={{ marginTop: 2, color: '#555' }}>{month}</Text>
        </View>
        <View
          style={{
            backgroundColor: '#C8DB9D',
            borderRadius: 16,
            paddingHorizontal: 12,
            paddingVertical: 4,
          }}
        >
          <Text style={{ color: '#3F6342', fontWeight: '600' }}>{status}</Text>
        </View>
      </View>

      {/* Middle row */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
        <Text style={{ color: '#000' }}>Proses</Text>
        <Text style={{ color: '#000' }}>Sisa waktu: {daysLeft} hari</Text>
      </View>

      {/* Progress text */}
      <Text style={{ marginTop: 4, alignSelf: 'flex-end', color: '#000' }}>
        {currentValue}/{targetValue} kg CO₂e
      </Text>

      {/* Progress bar */}
      <View
        style={{
          height: 16,
          backgroundColor: '#EFE9DD',
          borderRadius: 8,
          overflow: 'hidden',
          marginTop: 4,
        }}
      >
        <View
          style={{
            height: '100%',
            width: `${progress * 100}%`,
            backgroundColor: '#3F6342',
            borderRadius: 8,
          }}
        />
      </View>

      {/* Feedback */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
        <Text style={{ fontSize: 14, color: '#3F6342', marginRight: 4 }}>↘</Text>
        <Text style={{ fontSize: 14, color: '#000' }}>{feedback}</Text>
      </View>
    </View>
  );
}
