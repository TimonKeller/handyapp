import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export const AddFriendButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("FindFriend")}
      style={{ marginRight: 15 }}
    >
      <MaterialCommunityIcons name="account-plus" size={30} />
    </TouchableOpacity>
  );
};
