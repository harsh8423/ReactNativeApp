import React from 'react';
import { View, Text, StyleSheet, Image, Video, TouchableOpacity } from 'react-native';

const HomeBanner = () => {
  return (
    <View style={styles.container}>
      
      {/* Title */}
      <Text style={styles.heading}>
        Welcome to Helping Hands
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:0,
    paddingLeft: 18,
    paddingRight:18,
    marginTop: 10
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20, // Adjust fontSize according to your requirements
    textAlign: 'center',
    // margin: 20,
    backgroundColor:'green',
    borderRadius:10,
    padding:20,
    justifyContent:"center",
    color: 'white',
  },
  // description: {
  //   fontWeight: 'bold',
  //   fontSize: 14, // Adjust fontSize according to your requirements
  //   textAlign: 'center',
  //   color: 'white',
  // },
});

export default HomeBanner;
