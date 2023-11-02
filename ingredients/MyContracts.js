import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message'; // For displaying messages
import Proposals from './Proposals';
import { useNavigation } from "@react-navigation/native";
import ContextApi from '../components/ContextApi';


export default function MyContracts() {
  const a = useContext(ContextApi);

  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(false);
  const [ID, setID] = useState('');

  const [descriptionStyle, setDescriptionStyle] = useState({
    height: 50,
    overflow: 'hidden',
  });

  const contract = async () => {
    try {
      const response = await fetch('https://helping-hands-api.vercel.app/api/MyContracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: a.user._id,
        }),
      });
      const json = await response.json();
      if (json.success) {
        const data = json.data;
        setProjects(data);
      } else {
        showMessage({ message: 'Not retrieved', type: 'danger' });
      }
    } catch (error) {
      showMessage({ message: 'Error fetching data', type: 'danger' });
    }
  };

  const handleStyle = () => {
    setDescriptionStyle(
      descriptionStyle.height === 50
        ? { height: 'auto', overflow: '' }
        : { height: 50, overflow: 'hidden' }
    );
  };

  const handleProposals = (id) => {
    setPage(true);
    setID(id);
  };

  useEffect(() => {
    contract();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <View style={{ margin: 20 }}>
          
          {!page ? (
            <ScrollView>
              {projects.map((project) => (
                <View
                  key={project._id}
                  style={{
                    borderWidth: 2,
                    borderColor: 'grey',
                    borderRadius: 8,
                    padding: 10,
                    
                    margin: 10,
                  }}
                >
                  <Text style={{fontSize:16,
                    fontWeight:"bold",}}>
                    {project.title}
                    <Text
                      style={{
                        right:0,
                        float: 'right',
                        backgroundColor: 'green',
                        color: 'white',
                        padding: 16,
                        borderRadius: 20,
                      }}
                    >
                      {project.proposalType}
                    </Text>
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: 'bold', color: 'grey' }}>
                      Experience Level: {project.expLevel} {'\n'}
                      Est. Budget (INR): {project.budget} Est. Duration: {project.projectDuration}
                    </Text>
                  </Text>
                  <Text style={{ height: descriptionStyle.height, overflow: descriptionStyle.overflow }}>
                    {project.description}
                  </Text>
                  <TouchableOpacity onPress={handleStyle}>
                    <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Read more</Text>
                  </TouchableOpacity>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {project.skills.map((skill, index) => (
                      <View key={index} style={{ margin: 4, padding: 5, borderRadius: 20, backgroundColor: 'lightgrey' }}>
                        <Text style={{ fontWeight: 'bold' }}>{skill}</Text>
                      </View>
                    ))}
                  </View>
                  <Text>
                    <Text style={{ fontWeight: 'bold', color: 'grey' }}>
                      Teammate required: {project.projectType} {'\n'}
                      2 hours ago
                    </Text>
                    {'\n'}
                    <View style={{position:"relative"}}>
                    <TouchableOpacity onPress={() => handleProposals(project._id)} style={{right:0}}>
                      <Text style={{ backgroundColor: 'lightgreen', fontWeight:"bold", padding: 10, borderRadius: 8, }}>Proposals</Text>
                    </TouchableOpacity>
                    </View>
                  </Text>
                </View>
              ))}
            </ScrollView>
          ) : (
            <Proposals id={ID} />
          )}
        </View>
      </View>
    </View>
  );
}
