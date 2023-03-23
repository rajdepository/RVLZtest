import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Timer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft > 0) {
      setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
  }, [timeLeft]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{timeLeft} seconds</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Add your container styles here
  },
  text: {
    // Add your text styles here
  },
});

export default Timer;
