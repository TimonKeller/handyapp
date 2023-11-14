import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const fetchFriends = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      Alert.alert("Error", "User token is not available");
      return;
    }

    const response = await fetch("http://172.20.10.2:3000/api/friends", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.friends; // Update state with the list of friends
  } catch (error) {
    Alert.alert("Error", `Error fetching friends: ${error.message}`);
  }
};
