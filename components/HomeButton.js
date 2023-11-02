import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import contractIcon from '../images/contract.png';
import myjobIcon from '../images/promotion.png';
import myproposalIcon from '../images/proposal.png';
import portIcon from '../images/icons8-portfolio-48.png';
import { useNavigation } from "@react-navigation/native";

const HomeButtons = () => {

  const navigation = useNavigation();

  const handlePostJob = () => {
    navigation.navigate("PostJob");
  };

  const handleBuildPortfolio = () => {
    navigation.navigate("BuildProfile");
  };

  const handleMyContracts = () => {
    navigation.navigate("MyContracts");
  };

  const handleMyProposals = () => {
    navigation.navigate("MyProposals");
  };

  return (
    <View style={styles.container}>
      <View style={styles.contsmall}>
      <TouchableOpacity style={styles.button} onPress={handleBuildPortfolio}>
        <View style={styles.infoContainer}>
          <Image source={portIcon} style={styles.icon} />
        </View>
        <Text style={styles.buttonText}>Build Profile</Text>
      </TouchableOpacity>

      {/* Additional Buttons */}
      <TouchableOpacity style={styles.button} onPress={handlePostJob}>
        <View style={styles.infoContainer}>
          <Image source={myproposalIcon} style={styles.icon} /> 
        </View>
        <Text style={styles.buttonText}>Post Project</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.contsmall}>
      <TouchableOpacity style={styles.button} onPress={handleMyProposals}>
        <View style={styles.infoContainer}>
          <Image source={myjobIcon} style={styles.icon} />
        </View>
        <Text style={styles.buttonText}>Proposal</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleMyContracts}>
        <View style={styles.infoContainer}>
          <Image source={contractIcon} style={styles.icon} />
        </View>
        <Text style={styles.buttonText}>Contract</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // marginTop: 10,
  },
  contsmall: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  button: {
    padding: 1,
    width: 170,
    height:100,
    backgroundColor: "lightgrey",
    borderRadius: 15,
    alignItems:"center",
    justifyContent:"center"
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 15,
    cursor: "pointer",
  },
  infoContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  icon: {
    width: 65,
    height: 65,
  },
  infoText: {
    fontSize: 14,
    fontWeight: "normal",
    lineHeight: 20,
    marginLeft: 10,
  },
  // More styles for other buttons can be added in a similar fashion
};

export default HomeButtons;
