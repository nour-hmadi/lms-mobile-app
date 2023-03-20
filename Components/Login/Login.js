import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    if (!email || !password) {
      toast.error('Please enter your email and password', { autoClose: 2000 });
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
          toast.success('Logged in', { autoClose: 2000 });
          console.log(data, 'Logged in');
          window.localStorage.setItem('token', data.token);
          window.localStorage.setItem('loggedIn', true);
          window.localStorage.setItem('role', data.role);
          // Redirect to homepage
        } else {
          toast.error('Invalid email or password', { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error('An error occurred. Please try again later.', {
          autoClose: 2000,
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
          <Button
            style={styles.button}
            title="Sign In"
            onPress={handleSubmit}
          />
        </View>
      </View>
      <ToastContainer />
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
  },
  button: {
    marginVertical: 10,
  },
});