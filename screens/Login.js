import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Picker } from "react-native";
// import SelectPicker from "react-native-select-picker"; // React Native alternative to react-select
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {

  const navigation = useNavigation();

  const [isSignUp, setIsSignUp] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    educationLevel: "",
  });

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const onChangeHandler = (key, value) => {
    setCredentials({ ...credentials, [key]: value });
  };


  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.navigate('Main');
        }
      } catch (err) {
        console.log("error message", err);
      }
    };
    checkLoginStatus();
  }, []);
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(credentials);
    const response = await fetch("https://helping-hands-api.vercel.app/api/CreateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        gender: credentials.gender,
        educationLevel: credentials.educationLevel,
        // skills:skilled
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      console.log("registered")
      // toast.success("Registered successfully!");
      // setotppage("true")
    }

    if (!json.success) {
      console.log("error signup")

      // toast.error("User already Resgistered");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const response = await fetch("https://helping-hands-api.vercel.app/api/LoginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (!json.success) {
      console.log("error signin")

      // toast.error("Invalid Email or Password");
    }
    if (json.success) {
      
      const userData = json.userData;
      AsyncStorage.setItem("authToken", json.authToken);
      
      AsyncStorage.setItem("userData", JSON.stringify(userData));
      console.log("signin")

      navigation.replace("Main");
    }
  };
  


  // Similar implementation for handleSignUp, handleSignIn, and handleSkills functions

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isSignUp ? (
        // SignUp Form
        <View>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={credentials.name}
            onChangeText={(text) => onChangeHandler("name", text)}
          />
          {/* Other input fields and SelectPicker for gender, educationLevel */}
          {/* <SelectPicker
            placeholder="Add Your Skills..."
            items={skills.map((skill) => ({ label: skill, value: skill }))}
            onValueChange={(value) => handleSkills(value)}
          /> */}
          {/* Button to submit signup form */}
        </View>
      ) : (
        // Login Form
        <View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={credentials.email}
            onChangeText={(text) => onChangeHandler("email", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={credentials.password}
            onChangeText={(text) => onChangeHandler("password", text)}
            secureTextEntry
          />
          {/* Button to submit login form */}
        </View>
      )}
      <TouchableOpacity onPress={isSignUp ? handleSignUp : handleSignIn}>
        <Text>{isSignUp ? "SignUp" : "Login"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={isSignUp ? handleSignInClick : handleSignUpClick}>
        <Text>
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
};

export default Login;






// const styles = StyleSheet.create({})