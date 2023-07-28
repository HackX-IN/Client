import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { GetRankingApi } from "../../services/Api";
import frame1 from "../../assets/frame1.png";
import frame2 from "../../assets/frame2.png";
import frame3 from "../../assets/frame3.png";
import coin from "../../assets/coin.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../components/Pixel/index";
import LevelDigit from "../../assets/LevelDigit.png";
import sild from "../../assets/sild.png";

const RankingPage = () => {
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    const getRankingData = async () => {
      try {
        const response = await GetRankingApi();
        const rankingData = response.data.data;
        setRankingData(rankingData);
        console.log("rankingData", rankingData);
      } catch (error) {
        console.log("Error fetching ranking data", error);
      }
    };

    getRankingData();
  }, []);

  // const formatCoins = (coins) => {
  //   if (coins >= 1e6) {
  //     return (coins / 1e6).toFixed(2) + "M";
  //   } else {
  //     return coins.toFixed(2);
  //   }
  // };
  return (
    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
      {rankingData && rankingData.length > 0 ? (
        rankingData.map((item, index) => (
          <View
            key={index}
            style={item.name === "Player 1" ? styles.highlightedPlayer : null}
          >
            <View
              style={{
                padding: 10,
                marginTop: item.name === "Player 1" ? -30 : -15,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: hp(2.2),
                }}
              >
                {index + 1}
              </Text>
              <ImageBackground
                source={index == 0 ? frame2 : index == 1 ? frame1 : frame3}
                style={{
                  width: wp(50),
                  height: hp(16),
                  alignItems: "center",
                  justifyContent: "center",
                }}
                resizeMode="contain"
              >
                <Image
                  source={
                    item.image
                      ? item.image
                      : require("../../assets/profilePic.png")
                  }
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: "contain",
                    marginTop: hp(5),
                  }}
                />
              </ImageBackground>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {item.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 2,
                  }}
                >
                  <Image
                    source={coin}
                    style={{ width: 20, height: 20, resizeMode: "contain" }}
                  />
                  <Text
                    style={{
                      color: "#1877F2",
                      padding: 5,
                      marginLeft: 5,
                      fontWeight: "600",
                    }}
                  >
                    {item.totalCoinsSent}
                  </Text>
                  <View style={styles.signalListView}>
                    <Image
                      style={[styles.photoView, { marginRight: wp(-2) }]}
                      source={sild}
                    />
                    <Image style={[styles.photoView]} source={LevelDigit} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  highlightedPlayer: {
    backgroundColor: "#f9f9f9",
  },
  signalListView: {
    flexDirection: "row",
    alignItems: "center",
  },
  photoView: {
    width: wp(7),
    height: hp(5),
    resizeMode: "contain",
  },
});

export default RankingPage;
