import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
      className="bg-white rounded-2xl p-4 mb-3 flex-row items-center shadow-sm"
      style={{
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
      }}
    >
      {/* Content */}
      <View className='flex-1 mr-4'>
        <Text className='font-poppins-medium text-[12px] text-black'>
          {title}
        </Text>
        <Text className='font-poppins text-[11px] text-black'>{description}</Text>

        {/* Badges */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 , marginTop: 8 }}>
          {badges.map((badge, index) => (
            <View
              key={index}
              className="px-3 py-1.5 rounded-xl mr-2 mb-2"
              style={{ backgroundColor: badge.backgroundColor }}
            >
              <Text
              className="font-poppins-medium text-[11px]"
              style={{ color: badge.textColor }}
              >
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
        <Text className='font-poppins-medium text-[12px] text-[#537D5D]'>Tambah</Text>
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