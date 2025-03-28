import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const MainMenu = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.appName}>Whats Cookin</Text>
      <Pressable style={styles.profileIcon}>
        <Text style={styles.profileText}>🔍</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  profileIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderRadius: 20,
  },
  profileText: {
    fontSize: 18,
  },
});

export default MainMenu;