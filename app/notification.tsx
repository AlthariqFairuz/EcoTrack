import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import Header from '@/components/header/header';
import { ThemedView } from '@/components/ThemedView';

interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'achievement' | 'reminder' | 'tip' | 'warning';
  timestamp: Date;
  isRead: boolean;
  icon?: string;
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Pencapaian Baru Diraih!',
      description: 'Selamat! Kamu mencapai target Pejuang Lingkungan dengan streak 45 hari beruntun',
      type: 'achievement',
      timestamp: new Date(Date.now() - 9 * 60 * 1000), // 9 menit yang lalu
      isRead: false,
      icon: '🏆'
    },
    {
      id: '2',
      title: 'Pengingat Catatan Harian',
      description: 'Jangan lupa catat aktivitasmu hari ini! Kamu sudah dalam streak 22 hari, pertahankan terus ya!',
      type: 'reminder',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 jam yang lalu
      isRead: false,
      icon: '📝'
    },
    {
      id: '3',
      title: 'Tips Hemat Energi',
      description: 'Matikan perangkat elektronik yang tidak digunakan untuk menghemat hingga 0.8 kg CO₂e per hari',
      type: 'tip',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 jam yang lalu
      isRead: true,
      icon: '💡'
    },
    {
      id: '4',
      title: 'Target Hampir Terlewat',
      description: 'Emisi hari ini sudah 7.8 kg CO₂e. Cobalah gunakan transportasi umum untuk aktivitas selanjutnya',
      type: 'warning',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 hari yang lalu
      isRead: true,
      icon: '⚠️'
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return require('@/assets/images/icon_piala.png');
      case 'reminder':
        return require('@/assets/images/icon_api.png');
      case 'tip':
        return require('@/assets/images/icon_tanaman.png');
      case 'warning':
        return require('@/assets/images/icon_target.png');
      default:
        return require('@/assets/images/icon_api.png');
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} menit yang lalu`;
    } else if (hours < 24) {
      return `${hours} jam yang lalu`;
    } else {
      return `${days} hari yang lalu`;
    }
  };

  const unreadCount = notifications.filter(notif => !notif.isRead).length;
  const allRead = unreadCount === 0;

  return (
    <ThemedView className="flex-1" style={{ backgroundColor: '#FAF6E9' }}>
      {/* Header */}
      <Header title="Notifikasi" isOnDashboard={false} />   
      
      {/* Header Section with Clear All Button */}
      {notifications.length > 0 && (
        <View className="flex-row justify-between items-center px-4 pt-4 pb-2">
          <Text className="font-poppins-semibold text-lg text-gray-800">
            Notifikasi ({notifications.length})
          </Text>
          <TouchableOpacity
            onPress={() => setNotifications([])}
            className="px-3 py-1 rounded-lg"
            style={{ backgroundColor: '#ef4444' }}
          >
            <Text className="font-poppins-medium text-sm text-white">
              Hapus Semua
            </Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Notifications List */}
      <ScrollView className="flex-1 px-4 py-2" showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          <View className="flex-1 justify-center items-center py-20">
            <MaterialIcons name="notifications-none" size={64} color="#9ca3af" />
            <Text className="font-poppins text-lg text-gray-500 mt-4 text-center">
              Belum ada notifikasi
            </Text>
            <Text className="font-poppins text-sm text-gray-400 mt-2 text-center">
              Notifikasi akan muncul di sini ketika ada update
            </Text>
          </View>
        ) : (
          notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              onPress={() => markAsRead(notification.id)}
              className="mb-3"
            >
              <View 
                className="bg-white rounded-xl p-4"
                style={{
                  shadowColor: '#000000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 2,
                }}
              >
                <View className="flex-row items-start">
                  {/* Icon */}
                  <View className="w-12 h-12 rounded-full justify-center items-center mr-3">
                    <Image
                      source={getNotificationIcon(notification.type)}
                      style={{ width: 24, height: 24 }}
                      contentFit="contain"
                    />
                  </View>
                  
                  {/* Content */}
                  <View className="flex-1">
                    <View className="flex-row items-start justify-between mb-2">
                      <Text 
                        className={`font-poppins-semibold text-sm flex-1 ${
                          !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        {notification.title}
                      </Text>
                    </View>
                    
                    <Text 
                      className={`font-poppins text-xs leading-4 mb-2 ${
                        !notification.isRead ? 'text-gray-700' : 'text-gray-600'
                      }`}
                    >
                      {notification.description}
                    </Text>
                    
                    <View className="flex-row items-center justify-between">
                      <Text className="font-poppins text-xs text-gray-400">
                        {formatTime(notification.timestamp)}
                      </Text>
                      
                      <TouchableOpacity
                        onPress={() => deleteNotification(notification.id)}
                        className="p-1"
                      >
                        <MaterialIcons name="delete-outline" size={16} color="#9ca3af" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </ThemedView>
  );
}