import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface CommentItem {
  name: string;
  time: string;
  description: string;
  achievement: string;
  likes: number;
  comments: number;
}

interface CommunityCommentsProps {
  items: CommentItem[];
}

export function CommunityComments({ items }: CommunityCommentsProps) {
  return (
    <View style={{ flexDirection: 'column', backgroundColor: '#f9f7f1', }}>
      {items.map((item, index) => (
        <View
          key={index}
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 12,
            marginBottom: 12,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Image
              source={require('../../assets/images/profile.png')} 
              style={{ width: 40, height: 40, borderRadius: 20, marginRight: 8 }}
            />
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{item.name}</Text>
              <Text style={{ color: '#888', fontSize: 12 }}>{item.time}</Text>
            </View>
          </View>

          <Text style={{ marginBottom: 8, fontSize: 14 }}>{item.description}</Text>

          <View
            style={{
              backgroundColor: '#E3EDCD',
              borderRadius: 16,
              paddingVertical: 4,
              paddingHorizontal: 10,
              alignSelf: 'flex-start',
              marginBottom: 8,
            }}
          >
            <Text style={{ color: '#3F6342', fontWeight: '600', fontSize: 12 }}>{item.achievement}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
            <TouchableOpacity
              onPress={() => {}}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >

                <Image
              source={require('../../assets/images/likes.png')} 
              style={{ width: 20, height: 20, marginRight: 8 }}
			  resizeMode="contain"
            />
              <Text>{item.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >

              <Image
              source={require('../../assets/images/comments.png')} 
              style={{ width: 20, height: 20, marginRight: 8 }}
			  resizeMode="contain"
            />
              <Text>{item.comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >

                <Image
              source={require('../../assets/images/share.png')} 
              style={{ width: 20, height: 20, marginRight: 8 }}
			  resizeMode="contain"
            />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}
