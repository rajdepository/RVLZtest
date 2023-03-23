import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { app } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { StatusBar } from 'react-native';
import { LogBox } from 'react-native';

const FindOpponentScreen = ({ navigation }) => {

  LogBox.ignoreLogs(['Virtualized'])

  const [email, setEmail] = useState('');
  // const [userFound, setUserFound] = useState(true);

  const [users, setUsers] = useState([])

  let db = getFirestore(app)
  let auth = getAuth()
  let current_user = auth?.currentUser

  // it will search the users in users collection with users email
  const searchUser = async () => {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email))
      await getDocs(q)
        .then(onSnapshot => {
          let users_data = []
          setUsers([])
          onSnapshot.docs.forEach(d => {
            users_data.push(d.data())
          })
          setUsers(users_data)
        })
    } catch (error) {
      console.log(error.message);
    }
  };

  // this data will be go with match request you can change it according to your needs
  let match_request_data = {
    sender: current_user.email,
    receiver: email,
    date: new Date(),
    status: 'pending'
  }

  // it will generate a document id which you can see in the firebase firestore collection
  let _gk = (sender, receiver) => {
    let id = [sender, receiver]
    id.sort()
    return `${id[0]}_${id[1]}`
  }

  // it will submit the request
  const match_request = async () => {
    await setDoc(doc(db, 'match_request', _gk(current_user.email, email)), match_request_data)
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', }}>
      <Text style={styles.title}>Find Opponent</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter opponent's email"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />
      {/* {!userFound && <Text style={styles.error}>User not found</Text>} */}
      <TouchableOpacity style={styles.button} onPress={searchUser}>
        <Text style={styles.buttonText}>Send Match Request</Text>
      </TouchableOpacity>

      <Text style={{ textAlign: 'center' }}>
        When press on this below profile it will create a request and show the User's B screen
      </Text>
      {/* this will show the searched user data/profile */}
      {users && <FlatList
        data={users}
        style={{ height: 300 }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={match_request}
              style={{ backgroundColor: '#d7d7d7', padding: 10, margin: 10 }}
            >
              <Text>Name: {item?.name}</Text>
              <Text>Email: {item?.email}</Text>
              <Text>rvlzID: {item?.rvlzID}</Text>
              <Text>phoneNumber: {item?.phoneNumber}</Text>
            </TouchableOpacity>
          )
        }}
      />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2a9d8f',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default FindOpponentScreen;
