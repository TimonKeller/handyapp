import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const ChatScreen = ({ route }) => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]); // This would be your chat messages
  const [text, setText] = useState("");

  // Dummy data - replace with actual message fetching
  const friend = route.params?.friend; // Get friend's info passed from previous screen

  // Function to send message (to be implemented)
  const sendMessage = () => {
    if (text) {
      // Add message sending logic here
      setText("");
    }
  };

  const renderMessageItem = ({ item }) => (
    <View style={styles.messageItem}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={30} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{friend?.fullName}</Text>
        </View>

        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.messagesList}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Type a message"
          />
          <TouchableOpacity onPress={sendMessage}>
            <MaterialCommunityIcons name="send" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 70,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  messagesList: {
    flex: 1,
  },
  messageItem: {
    padding: 10,
    backgroundColor: "#DCF8C6", // Light green bubble color
    borderRadius: 20,
    marginVertical: 5,
    alignSelf: "flex-end",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
});

export default ChatScreen;
