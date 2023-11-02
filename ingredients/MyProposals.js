import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import ConfirmationLetter from '../bloackchainFiles/ConfirmationLetter'; // Adjust this import based on the file structure
import { showMessage } from 'react-native-flash-message'; // For displaying messages
import { useNavigation } from '@react-navigation/native'; // Use the appropriate navigation hook based on your setup
import ContextApi from '../components/ContextApi';


export default function MyProposals() {
  const a = useContext(ContextApi);
  const userID = a.user._id;
  const navigation = useNavigation();

  const [projects, setProjects] = useState([]);
  const [confirmation, setConfirmation] = useState({});
  const [confDetail, setConfDetail] = useState({
    projectTitle: '',
    proposalType: '',
    proposalID: '',
    id: '',
  });
  const [pageState, setPageState] = useState(true);
  const [descriptionStyle, setDescriptionStyle] = useState({
    height: 50,
    overflow: 'hidden',
  });

  const fetchContracts = async () => {
    try {
      const response = await fetch('https://helping-hands-api.vercel.app/api/contracts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      if (json.success) {
        setProjects(json.data);
      } else {
        showMessage({ message: 'Not retrieved', type: 'danger' });
      }
    } catch (error) {
      showMessage({ message: 'Error fetching contracts', type: 'danger' });
    }
  };

  const handleStyle = () => {
    setDescriptionStyle(
      descriptionStyle.height === 50 ? { height: 'auto', overflow: '' } : { height: 50, overflow: 'hidden' }
    );
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  const handleConfirmation = (conf, projectTitle, proposalType, proposalID, creater) => {
    setConfirmation(conf);
    setConfDetail({
      projectTitle: projectTitle,
      proposalType: proposalType,
      proposalID: proposalID,
      id: creater,
    });
    setPageState(false);
  };

  return (
    <View>
      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>My Proposals</Text>
        <View style={{ borderWidth: 3 }} />
        {pageState ? (
          <ScrollView>
            {projects.map((project) => {
              const skilled = project.skills;
              const proposals = project.proposals;

              return (
                <View key={project._id}>
                  {proposals.map((request) => {
                    if (request.proposalID === userID) {
                      return (
                        <View
                          style={{
                            borderWidth: 2,
                            borderColor: 'grey',
                            borderRadius: 8,
                            margin: 10,
                            padding: 10,
                          }}
                        >
                          <Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'green' }}>
                              {project.title}
                            </Text>
                            <Text
                              style={{
                                float: 'right',
                                backgroundColor: 'green',
                                color: 'white',
                                padding: 6,
                                borderRadius: 20,
                              }}
                            >
                              {project.proposalType}
                            </Text>
                          </Text>
                          <Text>
                            <Text style={{ fontWeight: 'bold', color: 'grey' }}>
                              Experience Level: {project.expLevel} | Credits: {project.budget} | Est.Duration:{' '}
                              {project.projectDuration}
                            </Text>
                          </Text>
                          <Text style={{ height: descriptionStyle.height, overflow: descriptionStyle.overflow }}>
                            {project.description}
                          </Text>
                          <TouchableOpacity onPress={handleStyle}>
                            <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Read more</Text>
                          </TouchableOpacity>
                          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {skilled.map((skill) => (
                              <View
                                style={{
                                  margin: 4,
                                  padding: 5,
                                  borderRadius: 20,
                                  backgroundColor: 'lightgrey',
                                }}
                              >
                                <Text style={{ fontWeight: 'bold' }}>{skill}</Text>
                              </View>
                            ))}
                          </View>
                          <Text>
                            <Text style={{ fontWeight: 'bold', color: 'grey' }}>
                              Teammate required: {project.projectType} {'\n'}
                              2 hours ago
                            </Text>
                            {request.confirmation && (
                              <TouchableOpacity
                                onPress={() =>
                                  handleConfirmation(
                                    request.confirmation,
                                    project.title,
                                    project.proposalType,
                                    request.proposalID,
                                    project.creater
                                  )
                                }
                              >
                                <Text style={{ backgroundColor: 'blue', color: 'white', padding: 10, borderRadius: 8 }}>
                                  Confirmation Letter
                                </Text>
                              </TouchableOpacity>
                            )}
                            <Text style={{ float: 'right', color: 'red', fontWeight: 'bold', fontSize: 20 }}>
                              {request.status}
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate('ChatRoom', { state: project.creater });
                              }}
                            >
                              <Text style={{ backgroundColor: 'blue', color: 'white', padding: 10, borderRadius: 8 }}>
                                Message
                              </Text>
                            </TouchableOpacity>
                          </Text>
                        </View>
                      );
                    }
                  })}
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <ConfirmationLetter confirmation={confirmation} project={confDetail} />
        )}
      </View>
    </View>
  );
}
