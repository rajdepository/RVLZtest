import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../../utils/firebase';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const login = async (values) => {
    const { email, password } = values;
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('User logged in successfully');
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error logging in with email and password', error.message);
    }
  };

 

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => login(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              label="Email"
              name="email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType='email-address'
              autoCapitalize='none'
              value={values.email}
              error={touched.email && !!errors.email}
            />
            <TextInput
              label="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={touched.password && !!errors.password}
            />
            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
              Log In
            </Button>
            <Button onPress={() => navigation.navigate('ForgotPasswordScreen')} style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },
  button: {
    marginTop: 20,
  },
  forgotPasswordButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    color: '#007AFF',
  },
});

export default LoginScreen;
