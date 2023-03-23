import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../../utils/firebase';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
    rvlzId: Yup.string().required('RVLZ ID is required'),
    dob: Yup.string().required('Date of birth is required'),
    acceptTerms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions'),
  });

  const signUp = async (values) => {
    const { email, password } = values;
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('User account created & signed in!');
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error signing up with email and password', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
          rvlzId: '',
          dob: '',
          acceptTerms: false,
        }}
        onSubmit={(values) => signUp(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          <>
            <TextInput
              label="Name"
              name="name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              error={touched.name && !!errors.name}
            />
            <TextInput
              label="Email"
              name="email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={touched.email && !!errors.email}
            />
            <TextInput
              label="Phone Number"
              name="phoneNumber"
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              value={values.phoneNumber}
              error={touched.phoneNumber && !!errors.phoneNumber}
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
            />
            <TextInput
              label="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={touched.password && !!errors.password}
              textContentType="password"
            />
            <TextInput
              label="Confirm Password"
              secureTextEntry
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              error={touched.confirmPassword && !!errors.confirmPassword}
              textContentType="password"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
            <TextInput
label="RVLZ ID"
onChangeText={handleChange('rvlzId')}
onBlur={handleBlur('rvlzId')}
value={values.rvlzId}
error={touched.rvlzId && !!errors.rvlzId}
textContentType="username"
/>
<TextInput
label="Date of Birth (DD/MM/YYYY)"
onChangeText={handleChange('dob')}
onBlur={handleBlur('dob')}
value={values.dob}
error={touched.dob && !!errors.dob}
textContentType="none"
/>
{touched.dob && errors.dob && (
<Text style={styles.errorText}>{errors.dob}</Text>
)}
<View style={styles.checkboxContainer}>
<Checkbox.Android
status={values.acceptTerms ? 'checked' : 'unchecked'}
onPress={() => setFieldValue('acceptTerms', !values.acceptTerms)}
/>
<Text style={styles.label}>I accept the terms and conditions</Text>
</View>
{touched.acceptTerms && errors.acceptTerms && (
<Text style={styles.errorText}>{errors.acceptTerms}</Text>
)}
<Button
mode="contained"
onPress={() => navigation.navigate('HomeScreen')} // navigate to HomeScreen
style={styles.button}
>
Sign Up
</Button>
<Button
mode="outlined"
onPress={() => navigation.navigate('LoginScreen')} // navigate to LoginScreen
style={styles.button}
>
Login
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
// ... other styles
});

export default SignupScreen;