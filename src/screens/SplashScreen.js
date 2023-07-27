import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const splashTimeout = setTimeout(async () => {
      const token = await AsyncStorage.getItem("token");
      if (token != null) {
        navigation.replace("TabStack");
      } else {
        navigation.replace("AuthStack");
      }
    }, 3000);

    return () => clearTimeout(splashTimeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1877F2",
  },
  image: {
    width: "70%",
    resizeMode: "contain",
  },
});

export default SplashScreen;
