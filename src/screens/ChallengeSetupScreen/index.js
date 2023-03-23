import React from 'react';
import { View, Text } from 'react-native';

const ChallengeSetupScreen = ({ route }) => {
  const { opponent } = route.params;
  
  return (
    <View>
      <Text>ChallengeSetupScreen</Text>
      <Text>Opponent: {opponent.email}</Text>
    </View>
  );
};

export default ChallengeSetupScreen;
