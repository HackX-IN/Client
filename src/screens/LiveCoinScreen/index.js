import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import coin from "../../assets/coin.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../components/Pixel/index";
import leftArrows from "../../assets/leftArrows.png";
import Weekly from "./Weekly";
import { getEarningHistory } from "../../services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LiveCoinScreen = ({ navigation, route }) => {
  const { name } = route.params;
  const [earnings, setEarnings] = useState([]);

  const EarningHistory = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      console.log("authToken", authToken);

      var raw = JSON.stringify({
        userId: authToken,
        status: name === "Send" ? 1 : 2,
      });

      const response = await getEarningHistory(raw);

      console.log("Response Earning", response.data.data);
      setEarnings(response.data.data);
    } catch (error) {
      console.error("Error in EarningHistory:", error);
    }
  };

  useEffect(() => {
    EarningHistory();
  }, []);

  const renderRow = ({ item, index }) => {
    const isEven = index % 2 === 0;
    const senderName = item.sender[0]?.name;

    return (
      <View
        style={[styles.rowContainer, isEven ? styles.evenRow : styles.oddRow]}
      >
        <Text style={styles.rowIndex}>{index + 1}</Text>
        <Image
          source={
            name === "Send"
              ? {
                  uri: `http://13.233.229.68:8008/profile_images/${item.receiver[0]?.photo}`,
                }
              : name === "Recieved"
              ? {
                  uri: `http://13.233.229.68:8008/profile_images/${item.sender[0]?.photo}`,
                }
              : null
          }
          style={styles.rowImage}
        />
        <View style={styles.userInfoContainer}>
          <Text style={styles.rowText}>
            {name === "Send"
              ? item.receiver[0]?.name
              : name === "Recieved"
              ? senderName
              : null}
          </Text>
          <View style={styles.levelContainer}>
            <Image
              source={require("../../assets/sild.png")}
              style={styles.levelImage}
            />
            <Image
              style={styles.levelImage1}
              source={require("../../assets/LevelDigit.png")}
            />
          </View>
        </View>
        <View style={styles.coinsContainer}>
          <Image source={coin} style={styles.coinImage} />
          <Text style={styles.rowText1}>{item?.coin}</Text>
        </View>
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
          {name} Ranking
        </Text>
      </View>
      <View>
        <Weekly />
      </View>
      <FlatList
        data={earnings}
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
    backgroundColor: "#F7F9F8",
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: "4%",
  },
  bannerImage: {
    width: "100%",
    height: hp(13),
    resizeMode: "contain",
  },
  listView: {
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  photoView: {
    width: wp(35),
    height: hp(12),
    resizeMode: "contain",
  },
  playImage: {
    width: wp(14),
    height: hp(8),
    resizeMode: "contain",
  },
  bannerView: {
    width: "100%",
    height: hp(8),
    alignItems: "center",
    flexDirection: "row",
  },
  signalListView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    height: hp(27),
    borderRadius: 10,
  },
  leftArrow: {
    width: wp(6),
    height: hp(2),
    resizeMode: "contain",
    tintColor: "#1877F2",
  },
  rowContainer: {
    marginTop: 5,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#d6d4d4",
    borderRadius: 2,
    justifyContent: "space-between", // To distribute items evenly
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#fff",
  },
  rowIndex: {
    color: "black",
    fontSize: 16,
    fontWeight: "700",
  },
  rowImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  userInfoContainer: {
    flexDirection: "row",
    marginLeft: 10,
    flex: 1,
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  levelImage: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    marginLeft: 3,
  },
  levelImage1: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    marginLeft: -3,
  },
  rowText: {
    color: "black",
    fontWeight: "bold",
  },
  coinsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 5,
  },
  rowText1: {
    color: "#1877F2",
    fontWeight: "bold",
  },
});

export default LiveCoinScreen;
