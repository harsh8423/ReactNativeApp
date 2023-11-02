import Home from "../screens/Home";
import Jobs from "../screens/Jobs";
import Network from "../screens/Network";
import Team from "../screens/Team";
import Login from "../screens/Login";
import Messages from "../screens/Messages";
import Profile from "../screens/Profile";
import  Wallet from "../screens/Wallet";

import Apply from "../ingredients/Apply";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign, Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import MyContracts from "../ingredients/MyContracts";
import MyProposals from "../ingredients/MyProposals"
import BuildProfile from "../ingredients/BuildProfile";

// Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label = route.name;
        const isFocused = state.index === index;

        var icon;
        if (route.name === "Home") {
          icon = isFocused ? (
            <Entypo name="home" size={24} color="green" />
          ) : (
            <AntDesign name="home" size={24} color="black" />
          );
        } else if (route.name === "Messages") {
          icon = isFocused ? (
            <MaterialIcons name="message" size={24} color="green" />
          ) : (
            <MaterialCommunityIcons
              name="message-text-outline"
              size={24}
              color="black"
            />
          );
        } else if (route.name === "Team") {
          icon = isFocused ? (
            <Ionicons name="ios-people-sharp" size={24} color="green" />
          ) : (
            <Ionicons name="ios-people-outline" size={24} color="black" />
          );
        } else if (route.name === "Network") {
          icon = isFocused ? (
            <MaterialCommunityIcons name="graph" size={24} color="green" />
          ) : (
            <MaterialCommunityIcons
              name="graph-outline"
              size={24}
              color="black"
            />
          );
        } else if (route.name === "Jobs") {
          icon = isFocused ? (
            <AntDesign name="profile" size={24} color="green" />
          ) : (
            <AntDesign name="profile" size={24} color="black" />
          );
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ["selected"] : []}
            onPress={onPress}
            style={[styles.tabBarButton, { height: 60 }]}
          >
            {icon}
            <Text style={styles.tabBarLabel}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTab() {
    return (
      <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen name="Home" component={Home}  options={{ headerShown: false }}/>
        <Tab.Screen name="Messages" component={Messages} />
        <Tab.Screen name="Team" component={Team} />
        <Tab.Screen name="Network" component={Network} />
        <Tab.Screen name="Jobs" component={Jobs} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Tab.Screen name="Main" component={BottomTab} options={{ headerShown: false }} />
        <Stack.Screen name="Apply" component={Apply} />
        <Stack.Screen name="MyContracts" component={MyContracts} />
        <Stack.Screen name="MyProposals" component={MyProposals} />
        <Stack.Screen name="BuildProfile" component={BuildProfile} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    color: "green",
    height: 80,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderColor: "green",
    borderWidth: 1,
  },
  tabBarButton: {
    flex: 1,
    color: "green",
    alignItems: "center",
  },
  tabBarLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
 
});

export default StackNavigator;
