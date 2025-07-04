import React from 'react';
import { ScrollView, ScrollViewProps, View, ViewProps, StyleSheet } from 'react-native';

export default function PageWrapper({ children, contentContainerStyle, ...props }: ScrollViewProps & { children: React.ReactNode }) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={StyleSheet.flatten([
        { paddingBottom: 70 },
        contentContainerStyle,
      ])}
      {...props}
    >
      {children}
    </ScrollView>
  );
}