import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import leftArrows from "../../assets/leftArrows.png";
import rankingUser from "../../assets/rankingUser.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../components/Pixel/index";
import { getFollowersApi, getFollowingApi } from "../../services/Api";

const FanListScreen = ({ navigation, route }) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]); // Changed from Following to following

  const { name } = route.params;

  useEffect(() => {
    if (name === "Fans List") {
      fetchFollowers();
    } else {
      getFollowingUsers();
    }
  }, []);

  const fetchFollowers = async () => {
    try {
      const response = await getFollowersApi();
      const followersData = response.data.data;
      console.log("followersData", followersData);
      setFollowers(followersData);
    } catch (error) {
      console.log("Error Get Followers", error);
    }
  };

  const getFollowingUsers = async () => {
    try {
      const response = await getFollowingApi();
      const followingData = response.data.data;
      console.log("Number of Followings", followingData);
      setFollowing(followingData);
    } catch (error) {
      console.log("Error Get Followings", error);
    }
  };

  const renderRow = ({ item, index }) => {
    console.log(item.name);
    const isEven = index % 2 === 0;

    const displayName =
      name === "Fans List"
        ? item.follower_details?.name
        : item.following_details?.name;

    const image =
      name === "Fans List"
        ? item.follower_details?.photo
        : item.following_details?.photo;

    return (
      <View
        style={[styles.rowContainer, isEven ? styles.evenRow : styles.oddRow]}
      >
        <Text style={styles.rowIndex}>{item._id}</Text>
        <Image
          source={{ uri: `http://13.233.229.68:8008/profile_images/${image}` }}
          style={styles.rowImage}
        />
        <Text style={styles.rowText}>{displayName}</Text>
        <Text style={styles.rowText1}>{item.score}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.bannerView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.leftArrow} source={leftArrows} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: hp(2.6),
            color: "#000",
            fontWeight: "700",
            marginLeft: wp(6),
          }}
        >
          {name}
        </Text>
      </View>
      <FlatList
        data={name === "Fans List" ? followers : following}
        renderItem={renderRow}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: "4%",
  },
  rowContainer: {
    flexDirection: "row",
    padding: 10,
    gap: 10,

    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#d6d4d4",
    borderRadius: 2,
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#fff",
  },
  rowIndex: {
    marginLeft: 5,
  },
  rowImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: "cover",
  },
  rowText: {
    marginLeft: 6,
    color: "black",
    fontSize: 16,
    fontWeight: "700",
  },
  rowText1: {
    marginLeft: 130,
  },
  leftArrow: {
    width: wp(6),
    height: hp(2),
    resizeMode: "contain",
    tintColor: "#000",
  },
  bannerView: {
    width: "100%",
    height: hp(10),
    alignItems: "center",
    flexDirection: "row",
  },
});

export default FanListScreen;
