import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const StartingScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require(`../assets/adaptive-icon.png`)}
        />
        <Text style={styles.logoText}>Buddy Venture</Text>
        <Text style={styles.tagline}>Explore together</Text>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.startingTitle}>Lets get Started</Text>
        <Text style={styles.description}>
          Join your friends to the journey of a lifetime
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.buttonTextSignUp}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7631FE", // Adjust to match the purple background color
  },
  logo: {
    width: 80,
    height: 82,
    marginBottom: 20,
  },
  logoContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  logoText: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
  tagline: {
    color: "#E1E1E1",
    fontSize: 18,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  startingTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    gap: 15,
    marginTop: 20,
  },
  signupButton: {
    backgroundColor: "white", // Use a different color if you like
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#7631FE",
    width: "40%",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  loginButton: {
    backgroundColor: "#7631FE", // Purple color
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: "40%",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonTextSignUp: {
    color: "#7631FE",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default StartingScreen;
