import React from 'react';
import { View, Text, FlatList } from 'react-native';

export default function UsersScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Users</Text>
      <FlatList data={[]} renderItem={() => null} ListEmptyComponent={<Text>No users</Text>} />
    </View>
  );
}
