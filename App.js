import { StyleSheet} from 'react-native';
import RecordAttendance from './Components/Attendance/RecordAttendance';
import Login from './Components/Login/Login'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from "react";
import Topbar from './Components/Topbar/Topbar';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    window.localStorage.getItem("loggedIn")
  );

  useEffect(() => {
    setIsLoggedIn(window.localStorage.getItem("loggedIn"));
  }, []);
  return (
       <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="RecordAttendance" component={RecordAttendance} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

