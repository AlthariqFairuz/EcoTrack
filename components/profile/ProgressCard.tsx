import React from 'react';
import { View, Text } from 'react-native';

interface ProgressCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badgeText: string;
  badgeColor: string;
  achievedDate?: string; 
  progress?: number; 
  currentValue?: number;
  targetValue?: number;
}

export function ProgressCard({
  icon,
  title,
  description,
  badgeText,
  badgeColor,
  achievedDate,
  progress = 0,
  currentValue = 0,
  targetValue = 0,
}: ProgressCardProps) {
  const isAchieved = !!achievedDate;

  return (
    <View
      style={{
        backgroundColor: isAchieved ? '#C8E6A0' : 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
        flexDirection: 'row',
      }}
    >
      {/* Icon */}
      <View style={{ marginRight: 12 }}>{icon}</View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
          <View
            style={{
              backgroundColor: badgeColor,
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 12,
            }}
          >
            <Text style={{ fontWeight: '600' }}>{badgeText}</Text>
          </View>
        </View>

        <Text style={{ marginTop: 4 }}>{description}</Text>

        {isAchieved ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Text style={{ fontSize: 16, marginRight: 4 }}>✅</Text>
            <Text style={{ color: '#333' }}>Diraih pada {achievedDate}</Text>
          </View>
        ) : (
          <>
            <Text style={{ marginTop: 8, fontWeight: 'bold' }}>Proses</Text>
            <Text style={{ alignSelf: 'flex-end', marginTop: 2 }}>
              {currentValue}/{targetValue}
            </Text>
            <View
              style={{
                height: 12,
                backgroundColor: '#EFE9DD',
                borderRadius: 6,
                overflow: 'hidden',
                marginTop: 2,
              }}
            >
              <View
                style={{
                  height: '100%',
                  width: `${progress * 100}%`,
                  backgroundColor: '#3F6342',
                }}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
}
