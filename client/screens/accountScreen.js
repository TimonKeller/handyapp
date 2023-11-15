import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { fetchUserInfo } from "../utilityFunctions/userInformation";

const AccountScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfo = await fetchUserInfo();
        if (userInfo && userInfo.user) {
          setUser(userInfo.user); // Set to the inner user object directly
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUserInfo();
  }, []);

  console.warn("user", user);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImageUri({ uri: imageUri });
    }
  };

  const handleSaveChanges = async () => {
    // Here you would send the data to the server to update the user profile
    // For example: await updateProfile({ fullName, email, password, imageUri });
    Alert.alert(
      "Profile Updated",
      "Your profile has been updated successfully."
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {imageUri ? (
          <Image source={imageUri} style={styles.profileImage} />
        ) : (
          <Text style={styles.addImageText}>Add Image</Text>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={user && user.fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={user && user.email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={user && user.password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
        <Text style={styles.buttonTextLogout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  input: {
    width: "90%",
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 8,
  },
  button: {
    width: "90%",
    height: 48,
    backgroundColor: "#7631FE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 12,
    marginTop: 12,
  },
  buttonLogout: {
    width: "90%",
    height: 48,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#7631FE",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    marginTop: 12,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  buttonTextLogout: {
    fontSize: 16,
    color: "#7631FE",
    fontWeight: "bold",
  },
  imagePicker: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eeeeee",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  addImageText: {
    color: "#999999",
  },
});

export default AccountScreen;
