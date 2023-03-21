import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
// import { ToastAndroid } from 'react-native';
import { showMessage } from "react-native-flash-message";
import { Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import React, { useState, useEffect } from "react";

const theme = createTheme();

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    
    if (!email || !password) {
      // toast.error('Please enter your email and password', { autoClose: 2000 });
      // ToastAndroid.show('Please enter your email and password', ToastAndroid.SHORT);
      showMessage({
        message: 'Please enter your email and password',
        type: "danger",
        duration: 3000,
      });

      return;
    }
    console.log(email, password);
    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          // toast.success('Logged in', { autoClose: 2000 });
          showMessage({
            message: 'Logged in',
            type: "success",
            duration: 3000,
          });
          // ToastAndroid.show('Logged in', ToastAndroid.SHORT);

          console.log(data, 'Logged in');
          window.localStorage.setItem('token', data.token);
          window.localStorage.setItem('loggedIn', true);
          window.localStorage.setItem('role', data.role);
    window.location.reload(true);
                } else {
          // toast.error('Invalid email or password', { autoClose: 2000 });
          // ToastAndroid.show('Invalid email or password', ToastAndroid.SHORT);
          showMessage({
            message: 'Invalid email or password',
            type: "danger",
            duration: 3000,
          });

        }
      })
      .catch((error) => {
        // toast.error('An error occurred. Please try again later.', {
        //   autoClose: 2000,
        // });
        // ToastAndroid.show('An error occurred. Please try again later.', ToastAndroid.SHORT);
        showMessage({
          message: 'An error occurred. Please try again later.',
          type: "danger",
          duration: 3000,
        });
        console.error('Error:', error);
      });
  }

  return (
     <ThemeProvider theme={theme}>
       <View style={styles.container}>
         <View style={styles.avatar}>
           <Avatar sx={{ bgcolor: 'secondary.main' }}>
             <LockOutlinedIcon />
           </Avatar>
           <Text style={styles.title}>Sign in</Text>
         </View>
         <View style={styles.form}>
           <TextInput
            style={styles.input}
            placeholder="Email Address"
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />
          </View>
<View>
          <Button
            style={styles.button}
            title="Sign In"
            onPress={handleSubmit}
          />
        </View>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  form: {
    width: '80%',
    marginVertical: 30,

  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 15,
  },
  button: {
    marginVertical: 10,
  },
});