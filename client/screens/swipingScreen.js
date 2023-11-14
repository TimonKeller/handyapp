import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SwipingScreen = ({ user }) => {
  const navigation = useNavigation();
  const [hasNewRequests, setHasNewRequests] = useState(false);

  const fetchFriendRequests = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Error", "User token is not available");
        return;
      }

      const response = await fetch(
        "http://172.20.10.2:3000/api/friendRequests",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      data.friendRequests.length > 0 ? setHasNewRequests(true) : null;
    } catch (error) {
      Alert.alert("Error", `Error fetching friend requests: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.friendButton}
        onPress={() => navigation.navigate("FindFriend")}
      >
        <View>
          <MaterialCommunityIcons name="account-multiple" size={30} />
          {hasNewRequests && <View style={styles.redDot} />}
        </View>
      </TouchableOpacity>
      <Text>Hallo {user?.fullName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  friendButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  redDot: {
    position: "absolute",
    top: 19,
    right: 22,
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: "red",
  },
});

export default SwipingScreen;
