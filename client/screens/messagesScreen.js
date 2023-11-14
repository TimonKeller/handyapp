import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchFriends } from "../utilityFunctions/friends";

const MessagesScreen = () => {
  const [friends, setFriends] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getFriends = async () => {
      const friendsData = await fetchFriends();
      if (friendsData) {
        setFriends(friendsData);
      }
    };

    getFriends();
  }, []);

  const handlePressFriend = (friend) => {
    // Navigate to chat screen, passing friend's info
    navigation.navigate("Chat", { friend });
  };

  const renderFriend = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.friendItem}
        onPress={() => handlePressFriend(item)}
      >
        <Text style={styles.friendName}>{item.fullName}</Text>
        {/* Add more details if needed */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <FlatList
        data={friends}
        renderItem={renderFriend}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 70,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
    marginBottom: 30,
  },
  friendItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  friendName: {
    fontSize: 18,
  },
});

export default MessagesScreen;
