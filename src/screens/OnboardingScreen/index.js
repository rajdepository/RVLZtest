import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const OnboardingScreen = ({ navigation }) => {

  // I add this function if user already signed in then it will directly move to the user's screen 
  
  useEffect(()=>{
    getAuth().onAuthStateChanged(user=>{
      if(user){
        navigation.navigate('HomeScreen');
      }
    })
  },[])
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to RVLZ App</Text>
      {/* Add onboarding content here */}

      <Button
        mode="contained"
        onPress={() => navigation.navigate('SignUpScreen')}
        style={styles.button}
      >
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default OnboardingScreen;
