import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Badge {
  text: string;
  backgroundColor: string;
  textColor: string;
}

interface ChallengeRecCardProps {
  title: string;
  description: string;
  badges: Badge[];
  onAdd?: () => void;
}

export function ChallengeRecCard({
  title,
  description,
  badges,
  onAdd,
}: ChallengeRecCardProps) {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      {/* Content */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>
          {title}
        </Text>
        <Text style={{ color: '#333', marginBottom: 12 }}>{description}</Text>

        {/* Badges */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {badges.map((badge, index) => (
            <View
              key={index}
              style={{
                backgroundColor: badge.backgroundColor,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 12,
                marginRight: 8,
                marginBottom: 8,
              }}
            >
              <Text style={{ color: badge.textColor, fontWeight: '600' }}>
                {badge.text}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Add Button */}
      <TouchableOpacity
        onPress={onAdd}
      >
        <Text style={{ color: '#67836C', fontWeight: '500' }}>Tambah</Text>
      </TouchableOpacity>
    </View>
  );
}

// Usage

// <ChallengeRecCard
//   title="Tantangan Bersepeda ke Kantor"
//   description="Naik sepeda ke tempat kerja 3 kali minggu ini"
//   badges={[
//     {
//       text: 'Hemat 8kg CO₂e',
//       backgroundColor: '#C9D99E',
//       textColor: '#3F6342',
//     },
//     {
//       text: 'Sedang',
//       backgroundColor: '#FBEAB6',
//       textColor: '#A06C00',
//     },
//   ]}
//   onAdd={() => {
//     console.log('Tambah clicked');
//   }}
// />