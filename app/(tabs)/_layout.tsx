import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
 
  const CustomTabBarButton = ({ children, onPress, ...props }: any) => {
    return (
      <View style={{
        top: -25,
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        marginBottom: 20,
      }}>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#537D5D',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
            position: 'relative',
          }}
          onPress={onPress}
        >
          <View style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [
              { translateX: -16 },
              { translateY: -12 }
            ],
          }}>
            {children}
          </View>
        </TouchableOpacity>
        {/* Text di bawah lingkaran */}
        <Text style={{
          fontSize: 12,
          fontWeight: '500',
          color: '#3C3C3C',
          marginTop: 12,
          textAlign: 'center',
        }}>
          Track
        </Text>
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#8F7352',
        tabBarInactiveTintColor: '#3C3C3C',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          height: 80,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 10,
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          ...Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
      }}>
     
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
     
      <Tabs.Screen
        name="scanner"
        options={{
          title: 'AI Scanner',
          tabBarIcon: ({ color }) => <Feather name="camera" size={24} color={color} />,
        }}
      />
     
      <Tabs.Screen
        name="track"
        options={{
          title: '',
          tabBarButton: CustomTabBarButton,
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="plus-square-o" size={28} color="white" />
          ),
        }}
      />
     
      <Tabs.Screen
        name="calculator"
        options={{
          title: 'Kalkulator',
          tabBarIcon: ({ color }) => <Ionicons name="calculator-outline" size={24} color={color} />,
        }}
      />
     
      <Tabs.Screen
        name="community"
        options={{
          title: 'Komunitas',
          tabBarIcon: ({ color }) => <Ionicons name="people-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}