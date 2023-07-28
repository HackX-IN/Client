import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";
import FastImage from "react-native-fast-image";
import { widthPercentageToDP } from "../components/Pixel";

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
      <View style={{ marginTop: -widthPercentageToDP(18) }}>
        <FastImage
          style={{ width: 110, height: 200 }}
          source={require("../assets/5.gif")}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
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
    width: "60%",
    resizeMode: "contain",
  },
});

export default SplashScreen;
