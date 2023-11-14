import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { fetchFriends } from "../utilityFunctions/friends";

const FindFriendScreen = () => {
  const [friends, setFriends] = useState([]);
  const [friendName, setFriendName] = useState("");
  const [friend, setFriend] = useState(null);
  const [friendRequests, setFriendRequests] = useState([]);

  const searchFriend = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        Alert.alert("Error", "User token is not available");
        return;
      }

      if (!friendName) {
        Alert.alert("Error", "Please enter a friend's email");
        return;
      }

      const response = await fetch(
        `http://172.20.10.2:3000/api/findFriend?email=${encodeURIComponent(
          friendName
        )}`,
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
      setFriend(data.user); // Assuming the response has a user object
    } catch (error) {
      Alert.alert("Error", `Error searching for friend: ${error.message}`);
    }
  };

  // Function to fetch friend requests
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
      setFriendRequests(data.friendRequests); // Update state with friend requests
    } catch (error) {
      Alert.alert("Error", `Error fetching friend requests: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchFriendRequests();

    const getFriends = async () => {
      const friendsData = await fetchFriends();
      if (friendsData) {
        setFriends(friendsData);
      }
    };

    getFriends();
  }, []);

  const sendInvite = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Error", "User token is not available");
        return;
      }

      const response = await fetch("http://172.20.10.2:3000/api/sendInvite", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friendEmail: friend.email, // Assuming friend object contains email
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      Alert.alert("Success", "Invitation sent successfully");
    } catch (error) {
      Alert.alert("Error", `Error sending invitation: ${error.message}`);
    }
  };

  const acceptInvite = async (requestId) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Error", "User token is not available");
        return;
      }

      const response = await fetch(
        `http://172.20.10.2:3000/api/acceptInvite/${requestId}`,
        {
          method: "POST",
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
      Alert.alert("Success", "Friend request accepted");
      fetchFriendRequests(); // Refresh friend requests list
    } catch (error) {
      Alert.alert("Error", `Error accepting friend request: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Friends</Text>
      {friends &&
        friends.map((friend, index) => (
          <Text key={index}>{friend.fullName}</Text>
        ))}

      <Text>Search for Friend</Text>
      <TextInput
        style={styles.input}
        placeholder="E-Mail from Friend"
        value={friendName}
        onChangeText={setFriendName}
      />
      <Button title="Search" onPress={searchFriend} />

      {friend && (
        <View style={styles.friendInfo}>
          <Text>{friend.fullName}</Text>
          <TouchableOpacity style={styles.friendButton} onPress={sendInvite}>
            <MaterialCommunityIcons name="account-plus" size={30} />
          </TouchableOpacity>
        </View>
      )}
      <Text>Friends Requests</Text>
      {friendRequests.map((request, index) => (
        <View key={index} style={styles.friendRequestItem}>
          <Text>{request.fullName}</Text>
          <TouchableOpacity
            style={styles.friendButton}
            onPress={() => acceptInvite(request._id)}
          >
            <MaterialCommunityIcons name="check" size={30} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  friendInfo: {
    marginTop: 20,
  },
});

export default FindFriendScreen;
