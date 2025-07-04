import React from 'react';
import { View, Text } from 'react-native';

interface NotificationBadgeProps {
  count: number;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export function NotificationBadge({ 
  count, 
  size = 'medium', 
  color = '#ef4444' 
}: NotificationBadgeProps) {
  if (count === 0) return null;

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: 'w-4 h-4',
          text: 'text-xs'
        };
      case 'large':
        return {
          container: 'w-6 h-6',
          text: 'text-sm'
        };
      default: // medium
        return {
          container: 'w-5 h-5',
          text: 'text-xs'
        };
    }
  };

  const styles = getSizeStyles();
  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <View 
      className={`${styles.container} rounded-full items-center justify-center absolute -top-1 -right-1 z-10`}
      style={{ backgroundColor: color }}
    >
      <Text 
        className={`${styles.text} font-poppins-bold text-white`}
        style={{ 
          fontSize: size === 'small' ? 10 : size === 'large' ? 12 : 11,
          lineHeight: size === 'small' ? 12 : size === 'large' ? 14 : 13
        }}
      >
        {displayCount}
      </Text>
    </View>
  );
}