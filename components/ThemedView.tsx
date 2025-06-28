// components/ThemedView.tsx
import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  // Tambahkan prop className di sini
  className?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  // Ambil prop className dari rest props
  className,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    // Teruskan prop className ke komponen View dasar
    <View className={className} style={[{ backgroundColor }, style]} {...otherProps} />
  );
}