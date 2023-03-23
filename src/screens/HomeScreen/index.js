import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { collection, deleteDoc, doc, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import { app } from '../../firebase';
import { FlatList } from 'react-native';
import { getAuth } from 'firebase/auth';

const HomeScreen = () => {

  const navigation = useNavigation();

  const handleFindOpponentPress = () => {
    navigation.navigate('FindOpponentScreen');
  };

  const handleMyChallengesPress = () => {
    navigation.navigate('MyChallengesScreen');
  };

  const handleWalletPress = () => {
    navigation.navigate('WalletScreen');
  };

  let db = getFirestore(app)
  let auth = getAuth()
  let current_user = auth?.currentUser

  const [match_requests_sender, setMatch_requests_sender] = useState([])
  // receiver
  const [match_requests_receiver, setMatch_requests_receiver] = useState([])

  // it will get the data in realtime and show match requests in homescreen
  useEffect(() => {

    let ref = collection(db, 'match_request')

    const q = query(ref, where('sender', '==', current_user.email))
    const unsub = onSnapshot(q, doc => {
      let all_requests = []
      setMatch_requests_sender([])
      doc.forEach(d => {
        all_requests.push({ data: d.data(), id: d.id })
      })
      setMatch_requests_sender(all_requests)
    })

    const q1 = query(ref, where('receiver', '==', current_user.email))
    const unsub1 = onSnapshot(q1, doc => {
      let all_requests = []
      setMatch_requests_receiver([])
      doc.forEach(d => {
        all_requests.push({ data: d.data(), id: d.id })
      })
      setMatch_requests_receiver(all_requests)
    })

    return () => {
      unsub
      unsub1
    }
  }, [])

  // it will delete the match request
  let deleteRequest = async item => {
    deleteDoc(doc(db, 'match_request', item.id))
  }

  return (
    <View style={styles.container}>
      <Text>Currently logged in with: {auth.currentUser?.email}</Text>
      <Text style={styles.title}>Welcome to RVLZ</Text>
      <View style={styles.buttonContainer}>

        <Text style={{ marginVertical: 10 }}>Match request will show up here below. You can place it in your desire location</Text>

        {/* send Request */}
        {match_requests_sender && <FlatList
          data={match_requests_sender}
          renderItem={({ item }) => {

            let d = item.data.date?.toDate()
            let date = d?.toLocaleDateString()
            let time = d?.toLocaleTimeString()

            return (
              <>
                <Text>Send Request</Text>
                <View style={{ backgroundColor: '#d7d7d7', padding: 10, margin: 10 }}>
                  <Text>Sender: {item.data.sender}</Text>
                  <Text>Receiver: {item.data.receiver}</Text>
                  <Text>CreatedAt: {date} {time}</Text>
                  <Text>Status: {item.data.status}</Text>
                </View>
                <IconButton icon={'close'}
                  style={styles.closeButton}
                  onPress={() => { deleteRequest(item) }} />
              </>
            )
          }}
        />}

        {/* Receive Request */}
        {match_requests_receiver && <FlatList
          data={match_requests_receiver}
          renderItem={({ item }) => {

            let d = item.data.date?.toDate()
            let date = d?.toLocaleDateString()
            let time = d?.toLocaleTimeString()

            return (
              <>
                <Text>Receive Request</Text>
                <View style={{ backgroundColor: '#d7d7d7', padding: 10, margin: 10 }}>
                  <Text>Sender: {item.data.sender}</Text>
                  <Text>Receiver: {item.data.receiver}</Text>
                  <Text>CreatedAt: {date} {time}</Text>
                  <Text>Status: {item.data.status}</Text>
                </View>
                <IconButton icon={'close'}
                  style={styles.closeButton}
                  onPress={() => deleteRequest(item)} />
              </>
            )
          }}
        />}

        <Button mode="contained" onPress={handleFindOpponentPress} style={styles.button}>
          Find Opponent
        </Button>
        <Button mode="contained" onPress={handleMyChallengesPress} style={styles.button}>
          My Challenges
        </Button>
        <Button mode="contained" onPress={handleWalletPress} style={styles.button}>
          Wallet
        </Button>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
  },
  closeButton: {
    top: 22,
    right: 10,
    padding: 0,
    position: 'absolute',
  }
});

export default HomeScreen;
