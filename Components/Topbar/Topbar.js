import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function TopBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigation = useNavigation();

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {

      window.localStorage.clear();
      window.location.reload(true);
  };

  return (
    <View style={styles.container}>

      <View style={styles.right}>
        <TouchableOpacity onPress={handleToggleDarkMode}>
          <Ionicons
            name={isDarkMode ? 'ios-sunny' : 'ios-moon'}
            size={24}
            color="#FFF"
            style={styles.button}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.button}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    height: 60,
    paddingHorizontal: 10,
  },
  left: {
    flex: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});
