import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import profileIcon from '../images/icons8-profile-80.png';
import { useNavigation } from '@react-navigation/native'; // Use appropriate navigation hook as per your setup

export default function Proposals(props) {
  const { id } = props;
  const [req, setReq] = useState([]);
  const navigation = useNavigation();

  const fetchProposals = async () => {
    try {
      const response = await fetch('https://helping-hands-api.vercel.app/api/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const json = await response.json();
      if (json.success) {
        const data = json.proposals;
        setReq(data);
      } else {
        console.log('Not retrieved');
      }
    } catch (error) {
      console.log('Error fetching proposals', error);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  return (
    <ScrollView>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Proposals</Text>
      {req && (
        <View style={{ }}>
          {req.map((request) => (
            <View key={request._id} style={{ borderWidth: 2, borderColor: 'grey', margin: 10, borderRadius:8, padding:10 }}>
              <Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'green' }}>
                  {request.proposalID.personalInfo[0].name}
                </Text>
                <Image source={profileIcon} style={{ float: 'right', width: 60, height: 60 }} />
                {'\n'}
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'grey' }}>
                  {request.proposalID.personalInfo[0].title}
                </Text>
              </Text>
              <View style={{ alignItems: 'center', flexDirection:"row" }}>
                <TouchableOpacity style={{ margin: 5, backgroundColor: 'green', padding: 10, borderRadius: 8 }}>
                  <Text style={{ color: 'white' }}>Cover letter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ margin: 5, backgroundColor: 'green', padding: 10, borderRadius: 8 }}
                  onPress={() => {
                    navigation.navigate('ChatRoom', { state: request._id });
                  }}
                >
                  <Text style={{ color: 'white' }}>Message</Text>
                </TouchableOpacity>
                {request.status === 'pending' ? (
                  <TouchableOpacity
                    style={{ margin: 5, backgroundColor: 'blue', padding: 10, borderRadius: 8 }}
                    onPress={() => {
                      navigation.navigate('JobConfirmLetter', { state: request.proposalID._id });
                    }}
                  >
                    <Text style={{ color: 'white' }}>Confirm</Text>
                  </TouchableOpacity>
                ) : (
                  <Text>Sent</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
