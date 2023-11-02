import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message'; // For displaying messages
import ContextApi from '../components/ContextApi';

export default function Apply() {

    const a = useContext(ContextApi);
  const navigation = useNavigation();
  const route = useRoute();
  const { state } = route.params;

  const [credentials, setCredentials] = useState({
    coverLetter: '',
    budget: '0',
  });

  const onChangeHandler = (value, fieldName) => {
    setCredentials({ ...credentials, [fieldName]: value });
  };

  const postProject = async () => {
    console.log(credentials);
    console.log("id....",state)
    console.log("auserid......",a.user._id)
    console.log('calling API');
    // Your fetch logic here
    const response = await fetch("https://helping-hands-api.vercel.app/api/ProjectProposal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: state,
          proposalID: a.user._id,
          coverLetter: credentials.coverLetter,
          budget: credentials.budget,
        }),
      });
      const json = await response.json();
      console.log(json);

    if (json.success) {
      console.log('saved');
      showMessage({ message: 'Applied successfully', type: 'success' });
      setTimeout(() => {
        navigation.navigate('Home'); // Navigate to UserPage
      }, 1000);
    } else {
      console.log('error in posting job');
      showMessage({ message: 'Error in posting job', type: 'danger' });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Project Proposal</Text>
        <View style={{ borderWidth: 2, borderColor: 'grey' }} />

        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Write an Introductory cover letter for your proposal</Text>
          <TextInput
            style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginTop: 10, width: '90%' }}
            multiline
            placeholder="Write About the project Contract including Important Detail related to the Project"
            value={credentials.coverLetter}
            onChangeText={(text) => onChangeHandler(text, 'coverLetter')}
          />

          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'green', marginTop: 20 }}>Set your Project Bid</Text>
          <Text style={{ fontSize: 20, marginRight: 5 }}>Credits:</Text>
          <TextInput
            style={{ borderWidth: 1, borderRadius: 8, padding: 10, fontSize: 18, width: '90%' }}
            keyboardType="numeric"
            placeholder="Enter Amount"
            value={credentials.budget}
            onChangeText={(text) => onChangeHandler(text, 'budget')}
          />
          <TouchableOpacity
            style={{
              backgroundColor: 'green',
              padding: 15,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
            onPress={postProject}
          >
            <Text style={{ color: 'white' }}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
