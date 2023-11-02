import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import AchievementUpload from '../components/UploadScript/AchievementUpload'; // Update the import based on the file structure
// import BioUpload from '../components/UploadScript/BioUpload'; // Update the import based on the file structure
// import CertificateUpload from '../components/UploadScript/CertificateUpload'; // Update the import based on the file structure
// import ProjectUploadScript from '../components/UploadScript/ProjectUploadScript'; // Update the import based on the file structure

export default function BuildProfile() {
  const [pageState, setpageState] = useState('');

  const handlePage = (name) => {
    setpageState(name);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 30 }}>
        <View style={{  width: '80%', marginTop: 10 }}>
          {pageState === '' ? (
            <View>
              <TouchableOpacity
                style={{ borderWidth: 2, borderColor: 'green', padding: 10, margin: 10, borderRadius:20, alignItems:"center"  }}
                onPress={() => handlePage('Upload Project')}
              >
                <Text style={{ fontWeight:"bold"}}>Upload Project</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ borderWidth: 2, borderColor: 'green', padding: 10, margin: 10, borderRadius:20, alignItems:"center"  }}
                onPress={() => handlePage('Upload Certificate')}
              >
                <Text style={{ fontWeight:"bold"}}>Upload Certificate</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ borderWidth: 2, borderColor: 'green', padding: 10, margin: 10, borderRadius:20, alignItems:"center"  }}
                onPress={() => handlePage('Add Achievements')}
              >
                <Text style={{ fontWeight:"bold"}}>Add Achievements</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ borderWidth: 2, borderColor: 'green', padding: 10, margin: 10, fontWeight:"bold", borderRadius:20, alignItems:"center" }}
                onPress={() => handlePage('Add Bio')}
              >
                <Text style={{ fontWeight:"bold"}}>Add Bio</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {pageState === 'Upload Project' && <ProjectUploadScript PageState={pageState} />}
              {pageState === 'Upload Certificate' && <CertificateUpload PageState={pageState} />}
              {pageState === 'Add Achievements' && <AchievementUpload PageState={pageState} />}
              {pageState === 'Add Bio' && <BioUpload PageState={pageState} />}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
