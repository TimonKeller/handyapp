import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SwipingScreen from "../screens/swipingScreen";
import AccountScreen from "../screens/accountScreen";
import { useEffect, useState } from "react";
import { fetchUserInfo } from "../utilityFunctions/userInformation";
import MessagesScreen from "../screens/messagesScreen";

const Tab = createBottomTabNavigator();

function MyTabs() {
  const [user, setUser] = useState("");

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

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Swiping"
        children={() => <SwipingScreen user={user} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="gesture-swipe-horizontal"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="message-reply-text"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
