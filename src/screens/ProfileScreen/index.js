import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  Platform,
  Modal,
} from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import CountryPicker from "react-native-country-picker-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../components/Pixel/index";
import walletIcon from "../../assets/walletIcon.png";
import post from "../../assets/post.png";
import game from "../../assets/game.png";
import level from "../../assets/level.png";
import store from "../../assets/store.png";
import Logout from "../../assets/Logout.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getEarningHistory,
  getFollowersApi,
  getFollowingApi,
  onGetUserApi,
  onUploadImageApi,
} from "../../services/Api.js";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ImagePicker from "react-native-image-crop-picker";
import lock from "../../assets/lock.png";
import cashPayment from "../../assets/cashPayment.png";
import comingSoon from "../../assets/comingSoon.png";
import diamond from "../../assets/diamond.png";
import information from "../../assets/information.png";
import leftArrows from "../../assets/leftArrows.png";
import LevelDigit from "../../assets/LevelDigit.png";
import sild from "../../assets/sild.png";
import { countryCodes } from "../../components/CountryCodes";

const buttonArray = [
  {
    name: "Wallet",
    image: walletIcon,
  },
  {
    name: "Post",
    image: post,
  },
  {
    name: "Game",
    image: game,
  },
  {
    name: "Level",
    image: level,
  },
  {
    name: "Store",
    image: store,
  },
  {
    name: "Privacy Policy",
    image: lock,
  },
  {
    name: "About us",
    image: information,
  },
  {
    name: "Free Diamond",
    image: diamond,
  },
  {
    name: "Cash Out",
    image: cashPayment,
  },
  {
    name: "Coming Soon",
    image: comingSoon,
  },
  {
    name: "Log Out",
    image: Logout,
  },
];

const ProfileScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [profile, setProfile] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [countryName, setCountryName] = useState("IN");
  const [Sender, setSender] = useState(0);
  const [reciever, setReceiver] = useState(0);

  useEffect(() => {
    if (profileData?.country in countryCodes) {
      const country = countryCodes[profileData?.country];
      console.log(
        `Country Code ${profileData?.country} corresponds to ${country}`
      );
      setCountryName(country);
    } else {
      console.log("Invalid country code");
    }
  }, [profileData]);

  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      onGetUserData();
    });
  }, []);

  const getFollowers = async () => {
    try {
      const response = await getFollowersApi();
      const followersLength = response.data.data.length;
      console.log("Number of Followers", followersLength);
      setFollowers(followersLength);
    } catch (error) {
      console.log("Error Get Followers", error);
    }
  };

  const getFollowingUsers = async () => {
    try {
      const response = await getFollowingApi();
      const followingLength = response.data.data.length;
      console.log("Number of Followings", followingLength);
      setFollowing(followingLength);
    } catch (error) {
      console.log("Error Get Followings", error);
    }
  };

  const onGetUserData = async () => {
    try {
      const response = await onGetUserApi();
      console.log("Get Response", response.data.data[0].storeItems);
      if (response.data.success) {
        setProfileData(response.data.data[0]);
        console.log("Get Response", response.data.data[0]);

        if (response.data.data[0]?.photo != "") {
          setRefresh(!refresh);
          setProfileImage(
            `http://13.233.229.68:8008/profile_images/${response.data.data[0]?.photo}`
          );
        }
      }
      // Call the getFollowers function here to get the followers count
      getFollowers();
      // Call the getFollowinguser function here to get the followers count
      getFollowingUsers();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const EarningHistory = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      console.log("authToken", authToken);

      var raw = JSON.stringify({
        userId: authToken,
        status: 1,
      });

      const response = await getEarningHistory(raw);

      let totalSender = 0;

      response.data.data.forEach((item) => {
        totalSender += item.receiver?.length || 0;
      });

      setSender(totalSender);
    } catch (error) {
      console.error("Error in EarningHistory:", error);
    }
  };

  const EarningHistory1 = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      console.log("authToken", authToken);

      var raw = JSON.stringify({
        userId: authToken,
        status: 2,
      });

      const response = await getEarningHistory(raw);

      let totalSender = 0;

      response.data.data.forEach((item) => {
        totalSender += item.sender?.length || 0;
      });

      console.log("Total Sender Length:", totalSender);

      setReceiver(totalSender);
    } catch (error) {
      console.error("Error in EarningHistory:", error);
    }
  };

  useEffect(() => {
    EarningHistory();
    EarningHistory1();
  }, []);

  const selectFile = async () => {
    if (Platform.OS == "ios") {
      let options = {
        mediaType: "photo",
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
      };
      launchImageLibrary(options, (response) => {
        console.log("Response = ", response);
        if (response.didCancel) {
          console.log("User cancelled camera picker");
          return;
        } else if (response.errorCode == "camera_unavailable") {
          console.log("Camera not available on device");
          return;
        } else if (response.errorCode == "permission") {
          console.log("Permission not satisfied");
          return;
        } else if (response.errorCode == "others") {
          console.log(response.errorMessage);
          return;
        }

        setProfile(response.assets);
      });
    } else {
      try {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          cropperCircleOverlay: true,
        })
          .then((image) => {
            console.log(image);
            var filename = image.path.substring(
              image.path.lastIndexOf("/") + 1
            );
            setProfileImage(image.path);
            let imageData = {
              uri: image.path,
              type: image.mime,
              name: filename,
            };
            // setProfile(response.data.image)
            setProfile(imageData);
            onImageUpload(imageData);
          })
          .catch((err) => {
            console.log("Error:", err);
          });
      } catch (err) {}
    }
  };

  const onImageUpload = async (imageData) => {
    try {
      var formdata = new FormData();
      formdata.append("profile_image", imageData);

      const response = await onUploadImageApi(formdata);
      console.log("Get Response", response.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const onClickButton = async (from) => {
    if (from == "Wallet") {
      navigation.navigate("DiamondScreen");
    } else if (from == "Post") {
      navigation.navigate("MyPost");
    } else if (from == "Game") {
      navigation.navigate("GameScreen");
    } else if (from == "Level") {
      navigation.navigate("LevelScreen");
    } else if (from == "Store") {
      navigation.navigate("StoreScreen");
    } else if (from == "Privacy Policy") {
    } else if (from == "About us") {
    } else if (from == "Free Diamond") {
      navigation.navigate("FreeCoinScreen");
    } else if (from == "Cash Out") {
    } else if (from == "Coming Soon") {
    } else if (from == "Log Out") {
      AsyncStorage.setItem("token", "");
      navigation.replace("AuthStack");
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: hp(8),
          borderBottomWidth: 1,
          borderBottomColor: "#DADADA",
        }}
        onPress={() => onClickButton(item.name)}
      >
        {item.name == "Privacy Policy" || item.name == "About us" ? (
          <Image
            style={{
              width: wp(7),
              height: hp(4),
              resizeMode: "contain",
              tintColor: "#fff",
            }}
            source={item.image}
          />
        ) : item.name == "Log Out" ? (
          <Image
            style={{
              width: wp(8),
              height: hp(5),
              resizeMode: "contain",
              tintColor: "#fff",
              marginLeft: wp(1),
            }}
            source={item.image}
          />
        ) : (
          <Image
            style={{
              width: wp(8),
              height: hp(6),
              resizeMode: "contain",
              tintColor: "#fff",
            }}
            source={item.image}
          />
        )}
        <Text style={{ fontSize: hp(2), color: "#fff", marginLeft: wp(4) }}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: wp(40),
          borderBottomWidth: 1,
          height: hp(4),
          alignSelf: "center",
          borderBottomColor: "#fff",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: hp(2.4),
            color: "#fff",
            fontWeight: "700",
          }}
        >
          Profile
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginVertical: hp(2),
          height: hp(12),
        }}
      >
        <TouchableOpacity onPress={() => selectFile()}>
          {profileImage == "" ? (
            <View
              style={{
                backgroundColor: "#1877F2",
                width: 90,
                height: 100,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{
                  width: wp(24),
                  height: wp(24),
                  borderRadius: wp(90) / 2,
                  resizeMode: "contain",
                }}
                source={require("../../assets/logo.png")}
              />
            </View>
          ) : (
            <Image
              style={{
                width: wp(24),
                height: wp(24),
                borderRadius: wp(90) / 2,
                resizeMode: "contain",
              }}
              source={{ uri: profileImage }}
            />
          )}
        </TouchableOpacity>
        <View style={{ width: "50%", marginLeft: wp(7) }}>
          <Text style={{ fontSize: hp(2.6), color: "#fff", fontWeight: "700" }}>
            {profileData?.name}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: hp(1.8),
                color: "#fff",
                opacity: 0.5,
                marginTop: hp(1),
                height: hp(4),
              }}
            >
              ID : {profileData?.id}
            </Text>
            <View style={styles.signalListView}>
              <Image
                style={[styles.photoView, { marginRight: wp(-2) }]}
                source={sild}
              />
              <Image style={[styles.photoView]} source={LevelDigit} />
            </View>

            <CountryPicker countryCode={countryName} visible={false} />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: wp(8),
              width: wp(60),
            }}
          >
            <Text
              numberOfLines={4}
              style={{
                fontSize: hp(1.8),
                color: "#fff",
                opacity: 0.8,
                marginTop: hp(3.5),
                height: hp(8),
                fontWeight: "500",
              }}
            >
              {profileData?.about}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            height: "100%",
            flexDirection: "row",
            justifyContent: "center",
            width: "20%",
          }}
          onPress={() => navigation.navigate("EditProfileScreen")}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: hp(2),
              color: "#fff",
              marginTop: hp(1),
              opacity: 0.5,
            }}
          >
            Edit
          </Text>
          <Image
            style={{
              width: wp(7),
              height: hp(4),
              resizeMode: "contain",
              marginLeft: wp(2),
            }}
            source={require("../../assets/edit.png")}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          alignSelf: "center",
          borderWidth: 1,
          borderColor: "#fff",
          height: hp(8),
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("FanListScreen", { name: "Fans List" });
          }}
          style={{
            width: "25%",
            alignItems: "center",
            justifyContent: "center",
            height: hp(4),
            borderRightColor: "#fff",
            borderRightWidth: 1,
          }}
        >
          <Text style={{ fontSize: hp(2), color: "#fff", fontWeight: "700" }}>
            {followers || 0}
          </Text>
          <Text style={{ fontSize: hp(2), color: "#fff", fontWeight: "700" }}>
            Fan
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("FanListScreen", { name: "Following" });
          }}
          style={{
            width: "25%",
            alignItems: "center",
            justifyContent: "center",
            height: hp(4),
            borderRightColor: "#fff",
            borderRightWidth: 1,
          }}
        >
          <Text style={{ fontSize: hp(2), color: "#fff", fontWeight: "700" }}>
            {following || 0}
          </Text>
          <Text style={{ fontSize: hp(2), color: "#fff", fontWeight: "700" }}>
            Following
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LiveCoinScreen", { name: "Send" });
          }}
          style={{
            width: "25%",
            alignItems: "center",
            justifyContent: "center",
            height: hp(4),
            borderRightColor: "#fff",
            borderRightWidth: 1,
          }}
        >
          <Text style={{ fontSize: hp(2), color: "#fff", fontWeight: "700" }}>
            {Sender}
          </Text>
          <Text style={{ fontSize: hp(2), color: "#fff", fontWeight: "700" }}>
            Send
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LiveCoinScreen", { name: "Recieved" });
          }}
          style={{
            width: "25%",
            alignItems: "center",
            justifyContent: "center",
            height: hp(4),
          }}
        >
          <Text style={{ fontSize: hp(2), color: "#fff", fontWeight: "700" }}>
            {reciever}
          </Text>
          <Text style={{ fontSize: hp(2), color: "#fff", fontWeight: "700" }}>
            Received
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={buttonArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(10) }}
      />
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
    paddingTop: hp(6),
  },
  signalListView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: wp(2),
  },
  photoView: {
    width: wp(7),
    height: hp(5),
    resizeMode: "contain",
  },

  centeredView: {
    flex: 1,
    width: "100%",
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    paddingVertical: 15,
    height: hp(26),
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),

    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView1: {
    position: "absolute",
    bottom: 0,
    paddingVertical: 15,
    height: hp(39),
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ProfileScreen;
