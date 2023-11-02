import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import portIcon from "../images/Screenshot_2023-08-09_143330-transformed-transformed.png";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const TopBar = () => {
  return (
    <View style={styles.container}>
      <FontAwesome5 name="user-circle" size={30} color="black" />
      <Image source={portIcon} style={styles.icon} />
      <View style={styles.cont}>
      <Ionicons style={styles.cont1} name="wallet-outline" size={30} color="black" />
        <Ionicons name="md-notifications-outline" size={30} color="black" />
      </View>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    width: 90,
    height: 30,
    resizeMode: 'contain',
  },

  container: {
    padding: 10,
    paddingLeft: 25,
    paddingRight: 18,
    marginTop: 10,
    backgroundColor: "white",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  cont:{
    flexDirection:"row",
    alignItems:"center",
  },
  cont1:{
    paddingRight:18
  }
});
