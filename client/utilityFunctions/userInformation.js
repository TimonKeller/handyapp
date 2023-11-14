import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUserInfo = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      const response = await fetch("http://172.20.10.2:3000/api/userinfo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else if (response.status === 401) {
        // Token is expired or invalid
        throw new Error("Token expired");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user info");
      }
    }
  } catch (error) {
    throw error;
  }
};
