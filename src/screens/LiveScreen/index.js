import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  Alert,
  BackHandler,
} from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import CountryPicker from "react-native-country-picker-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../components/Pixel/index";
import liveButton from "../../assets/liveButton.png";
import postButton from "../../assets/postButton.png";
import chair1 from "../../assets/chair1.png";
import { useIsFocused } from "@react-navigation/native";
import {
  onDeleteLiveStreamingApi,
  onGetLiveStreamingApi,
} from "../../services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LiveScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  const randomUserID = String(Math.floor(Math.random() * 100000));
  const [isHost, setIsHost] = useState(true);
  const [liveData, setLiveData] = useState([]);

  useEffect(() => {
    // Fetch live streaming data whenever the screen is focused
    onGetLiveData();
  }, [isFocused]);

  useEffect(() => {
    // Remove live streaming entries for the current user when the screen is focused
    if (isFocused) {
      removeLiveStreaming();
    }
  }, [isFocused]);

  const onGetLiveData = async () => {
    try {
      const response = await onGetLiveStreamingApi();
      let data = response.data.data;

      setLiveData(data.reverse());
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const removeLiveStreaming = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const deletePromises = [];

      liveData.forEach(async (item) => {
        if (item?.userId === authToken) {
          const deletePromise = onDeleteLiveStreamingApi(item?._id);
          deletePromises.push(deletePromise);
        }
      });

      // Wait for all deletePromises to complete before continuing
      await Promise.all(deletePromises);

      // Fetch the updated live data after removing the entries
      onGetLiveData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("LiveStreamingScreen", {
              isHost: isHost,
              randomUserID: randomUserID,
            })
          }
        >
          <Image source={liveButton} style={styles.postImage1} />
          <Text
            style={{ fontSize: hp(1.8), color: "#fff", alignSelf: "center" }}
          >
            Live
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("AddPostScreen")}>
          <Image source={postButton} style={styles.postImage1} />
          <Text
            style={{ fontSize: hp(1.8), color: "#fff", alignSelf: "center" }}
          >
            Post
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={chair1} style={styles.postImage1} />
          <Text
            style={{ fontSize: hp(1.8), color: "#fff", alignSelf: "center" }}
          >
            Multi
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1877F2",
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowImage: {
    width: wp(22),
    height: hp(25),
    resizeMode: "contain",
  },
  postImage: {
    width: wp(22),
    height: hp(27),
    resizeMode: "contain",
  },
  postImage1: {
    width: wp(18),
    height: hp(11),
    resizeMode: "contain",
  },
  buttonView: {
    flexDirection: "row",
    width: "96%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default LiveScreen;
