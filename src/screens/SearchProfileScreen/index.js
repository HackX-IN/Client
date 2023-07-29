import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../components/Pixel";
import {
  FollowUserApi,
  getFollowersApi,
  getFollowingApi,
  onGetUserApi,
  unFollowUserApi,
} from "../../services/Api";
import { countryCodes } from "../../components/CountryCodes";
import CountryPicker from "react-native-country-picker-modal";
import leftArrows from "../../assets/leftArrows.png";
import firestore from "@react-native-firebase/firestore";

const Index = ({ route, navigation }) => {
  const { userList } = route.params;
  console.log(userList);
  const [following, setFollowing] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [followed, setFollowed] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [countryName, setCountryName] = useState("IN");
  const db = firestore();

  useEffect(() => {
    getFollowers();
    getFollowingUsers();
    onGetUserData();
  }, []);

  const getFollowers = async () => {
    try {
      const response = await getFollowersApi(userList?._id);
      const followersCount = response?.data?.data?.length;
      console.log("Number of Followers", followersCount);
      setFollowers(followersCount);
    } catch (error) {
      console.log("Error Get Followers", error);
    }
  };

  const getFollowingUsers = async () => {
    try {
      const response = await getFollowingApi(userList?._id);
      const followingCount = response?.data?.data?.length;
      console.log("Number of Followings", followingCount);
      setFollowing(followingCount);
    } catch (error) {
      console.log("Error Get Followings", error);
    }
  };

  const followUser = async () => {
    const followFrom = profileData?._id;
    const followTo = userList?._id;

    if (followFrom === followTo) {
      return;
    }

    const raw = JSON.stringify({
      following_from: followFrom,
      following_to: followTo,
    });

    try {
      const response = await FollowUserApi(raw);
      console.log("Response Follow User", response.data);
      setFollowed(true);
      getFollowers();
      getFollowingUsers();
    } catch (error) {
      console.log("Error Follow User", error);
    }
  };

  const unFollowUser = async () => {
    const followFrom = profileData?._id;
    const followTo = userList?._id;

    if (followFrom === followTo) {
      return;
    }

    const raw = JSON.stringify({
      following_from: followFrom,
      following_to: followTo,
    });

    try {
      const response = await unFollowUserApi(raw);
      console.log("Response Unfollow User", response.data);

      setFollowed(false);
      getFollowers();
      getFollowingUsers();
    } catch (error) {
      console.log("Error Unfollow User", error);
    }
  };

  const onGetUserData = async () => {
    try {
      const response = await onGetUserApi();
      console.log("Get Response", response.data.data[0].storeItems);
      if (response.data.success) {
        setProfileData(response.data.data[0]);
        console.log("Get Response", response.data.data[0]);

        // if (response.data.data[0]?.photo !== "") {
        //   setProfileImage(
        //     `http://13.233.229.68:8008/profile_images/${response.data.data[0]?.photo}`
        //   );
        // }
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const onChattingAdd = async () => {
    db.collection("rooms").add({
      date: new Date(),
      image: userList?.photo,
      receiverId: userList?._id,
      receiver_name: userList?.name,
      senderId: profileData?._id,
      sender_name: profileData?.name,
    }).then((res)=>{
      navigation.navigate("ChatScreen", {
        rcvr: {
          id: res.id,
          receiver_id: userList._id,
          name: userList.name,
          profilePic: userList?.photo,
        },
        rcvrpic: userList?.photo,
        user: { id: profileData?._id, name: profileData?.name },
      });
    })
    
  };

  useEffect(() => {
    if (userList?.country in countryCodes) {
      const country = countryCodes[userList?.country];
      console.log(
        `Country Code ${userList?.country} corresponds to ${country}`
      );
      setCountryName(country);
    } else {
      console.log("Invalid country code");
    }
  }, [profileData]);

  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#F7F9F8" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
          marginTop: widthPercentageToDP(10),
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{
              width: widthPercentageToDP(6),
              height: heightPercentageToDP(2),
              resizeMode: "contain",
              tintColor: "#0371FF",
            }}
            source={leftArrows}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#0371FF",
            textAlign: "center",
          }}
        >
          Profile
        </Text>
        <View>
          <Image
            style={{
              width: widthPercentageToDP(6),
              height: heightPercentageToDP(2),
              resizeMode: "contain",
              tintColor: "#000",
            }}
          />
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1.3,
          borderColor: "#0371FF",
          height: 5,
          width: widthPercentageToDP(100),
          marginTop: widthPercentageToDP(2),
        }}
      />

      <View
        style={{
          marginTop: widthPercentageToDP(10),
          flex: 1,
          alignItems: "center",
        }}
      >
        {userList?.photo === "" ? (
          <Image
            source={require("../../assets/noimage.png")}
            style={{
              width: widthPercentageToDP(50),
              height: widthPercentageToDP(50),
              borderRadius: widthPercentageToDP(50),
              marginTop: 5,
              // tintColor: "#18adce",
              resizeMode: "cover",
              borderColor: "black",
              borderWidth: 1,
            }}
          />
        ) : (
          <Image
            source={{
              uri: `http://13.233.229.68:8008/profile_images/${userList?.photo}`,
            }}
            style={{
              width: widthPercentageToDP(50),
              height: widthPercentageToDP(50),
              borderRadius: widthPercentageToDP(50),
              marginTop: 5,
            }}
          />
        )}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <CountryPicker countryCode={countryName} visible={false} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              marginRight: widthPercentageToDP(3.5),
            }}
          >
            {userList.name}
          </Text>
          <Image
            source={require("../../assets/LevelDigit.png")}
            style={{
              width: widthPercentageToDP(6),
              height: widthPercentageToDP(4),
              marginRight: widthPercentageToDP(3),
              marginTop: widthPercentageToDP(1),
            }}
          />
        </View>
        <Text
          numberOfLines={4}
          style={{
            fontSize: heightPercentageToDP(1.3),
            fontWeight: "bold",
            color: "#0371FF",
            textAlign: "center",
            width: widthPercentageToDP(50),
          }}
        >
          {userList.about}
        </Text>
        <Text
          style={{
            fontSize: heightPercentageToDP(1.3),
            fontWeight: "bold",
            color: "gray",
            marginTop: widthPercentageToDP(1.8),
          }}
        >
          ID: {userList.id}
        </Text>
        <View
          style={{
            width: "90%",
            alignSelf: "center",
            borderWidth: 1,
            borderColor: "#0371FF",
            height: heightPercentageToDP(8),
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
              height: heightPercentageToDP(4),
            }}
          >
            <Text
              style={{
                fontSize: heightPercentageToDP(2),
                color: "#000",
                fontWeight: "700",
              }}
            >
              {followers || 0}
            </Text>
            <Text
              style={{
                fontSize: heightPercentageToDP(2),
                color: "#000",
                fontWeight: "700",
              }}
            >
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
              height: heightPercentageToDP(4),
            }}
          >
            <Text
              style={{
                fontSize: heightPercentageToDP(2),
                color: "#000",
                fontWeight: "700",
              }}
            >
              {following || 0}
            </Text>
            <Text
              style={{
                fontSize: heightPercentageToDP(2),
                color: "#000",
                fontWeight: "700",
              }}
            >
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
              height: heightPercentageToDP(4),
            }}
          >
            <Text
              style={{
                fontSize: heightPercentageToDP(2),
                color: "#000",
                fontWeight: "700",
              }}
            >
              0
            </Text>
            <Text
              style={{
                fontSize: heightPercentageToDP(2),
                color: "#000",
                fontWeight: "700",
              }}
            >
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
              height: heightPercentageToDP(4),
            }}
          >
            <Text
              style={{
                fontSize: heightPercentageToDP(2),
                color: "#000",
                fontWeight: "700",
              }}
            >
              0
            </Text>
            <Text
              style={{
                fontSize: heightPercentageToDP(2),
                color: "#000",
                fontWeight: "700",
              }}
            >
              Received
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: widthPercentageToDP(80),
          marginBottom: widthPercentageToDP(10),
        }}
      >
        <TouchableOpacity
          onPress={followed ? unFollowUser : followUser}
          style={{
            backgroundColor: "#0371FF",
            borderRadius: widthPercentageToDP(5),
            padding: widthPercentageToDP(2),
            width: widthPercentageToDP(35),
          }}
        >
          <Text
            style={{
              fontSize: heightPercentageToDP(1.5),
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            {followed ? "Unfollow" : "Follow"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            borderRadius: widthPercentageToDP(5),
            padding: widthPercentageToDP(2),
            width: widthPercentageToDP(35),
            borderWidth: 1,
            borderColor: "#0371FF",
          }}
          onPress={onChattingAdd}
        >
          <Text
            style={{
              fontSize: heightPercentageToDP(1.5),
              fontWeight: "bold",
              color: "#0371FF",
              textAlign: "center",
            }}
          >
            Chat
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;
