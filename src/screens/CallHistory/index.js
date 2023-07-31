import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import CountryPicker from "react-native-country-picker-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../components/Pixel/index";
import leftArrows from "../../assets/leftArrows.png";
import { onGetEaringCoinApi, getEarningHistory } from "../../services/Api.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import coin from "../../assets/coin.png";
import viewer from "../../assets/viewer.png";
import moment from "moment";

const livePhoto = [
  {
    id: 1,
    coin: 100000,
    duration: "10:50:43",
    date: "14 feb,2023",
    reward: 15000,
  },
  {
    id: 2,
    coin: 100000,
    duration: "10:50:43",
    date: "14 feb,2023",
  },
  {
    id: 3,
    coin: 100000,
    duration: "10:50:43",
    date: "14 feb,2023",
  },
];

const CallHistory = ({ navigation }) => {
  randomUserID = String(Math.floor(Math.random() * 100000));
  const [coinData, setCoinData] = useState([]);

  // useEffect(() => {
  //   const subscribe = navigation.addListener("focus", () => {
  //     onGetCoinData();
  //   });
  // }, []);

  // const onGetCoinData = async () => {
  //   try {
  //     const response = await onGetEaringCoinApi();

  //     console.log("Get Response>>>", response.data.data);
  //     setCoinData(response.data.data);
  //   } catch (err) {
  //     console.log("get error", err);
  //     // Handle the error gracefully if needed
  //   }
  // };

  const EarningHistory = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      console.log("authToken", authToken);

      var raw = JSON.stringify({
        userId: authToken,
        status: 1,
      });

      const response = await getEarningHistory(raw);

      var raw1 = JSON.stringify({
        userId: authToken,
        status: 2,
      });

      const response1 = await getEarningHistory(raw1);

      console.log("Response Earning", {
        ...response.data.data,
        ...response1.data.data,
      });
      setCoinData([...response.data.data, ...response1.data.data]);
    } catch (error) {
      console.error("Error in EarningHistory:", error);
    }
  };
  useEffect(() => {
    EarningHistory();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bannerView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.leftArrow} source={leftArrows} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: hp(2.6),
            color: "#fff",
            fontWeight: "700",
            marginLeft: wp(6),
          }}
        >
          Receive History
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: hp(10) }}>
        <View style={styles.listView}>
          {coinData &&
            coinData.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: "100%",
                    backgroundColor: "#fff",
                    height: hp(22),
                    marginBottom: hp(2),
                    borderRadius: hp(1),
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      height: hp(8),
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        height: hp(4),
                        backgroundColor: "#0371FF",
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                      }}
                    >
                      <Text style={{ fontSize: hp(2), color: "#fff" }}>
                        {moment(item?.createdAt).format("DD MMM, YYYY")}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      height: hp(10),
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "92%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        borderBottomColor: "#848484",
                        borderBottomWidth: 0.5,
                      }}
                    >
                      <Text style={{ fontSize: hp(2.2), color: "#848484" }}>
                        Coin Income
                      </Text>
                      <Text
                        style={{
                          fontSize: hp(2.2),
                          color: "#000",
                          fontWeight: "700",
                        }}
                      >
                        {item?.coin}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "92%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        marginTop: hp(3),
                        borderBottomColor: "#848484",
                        borderBottomWidth: 0.5,
                      }}
                    >
                      <Text style={{ fontSize: hp(2.2), color: "#848484" }}>
                        Live Duration
                      </Text>
                      <Text
                        style={{
                          fontSize: hp(2.2),
                          color: "#000",
                          fontWeight: "700",
                        }}
                      >
                        {item?.duration}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "92%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        marginTop: hp(3),
                      }}
                    >
                      <Text style={{ fontSize: hp(2.2), color: "#848484" }}>
                        Time Reward
                      </Text>
                      <Text
                        style={{
                          fontSize: hp(2.2),
                          color: "#000",
                          fontWeight: "700",
                        }}
                      >
                        15000
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0371FF",
    width: "100%",
    alignSelf: "center",
  },
  bannerImage: {
    width: "100%",
    height: hp(13),
    resizeMode: "contain",
  },
  leftArrow: {
    width: wp(6),
    height: hp(2),
    resizeMode: "contain",
  },
  listView: {
    width: "92%",
    alignSelf: "center",
    justifyContent: "center",
  },
  photoView: {
    width: "100%",
    height: hp(22),
    borderRadius: 10,
  },
  bannerView: {
    width: "100%",
    height: hp(12),
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: "4%",
  },
});

export default CallHistory;
