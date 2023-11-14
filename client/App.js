import LoginScreen from "./screens/loginScreen";
import RegisterScreen from "./screens/registerScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTabs from "./components/bottomNavigation";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FindFriendScreen from "./screens/findFriendScreen";
import ChatScreen from "./screens/chatScreen";
import StartingScreen from "./screens/startingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState("StartingScreen");

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        setInitialRoute("Home");
      }
    };

    checkToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={MyTabs} />
        <Stack.Screen name="FindFriend" component={FindFriendScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="StartingScreen" component={StartingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
