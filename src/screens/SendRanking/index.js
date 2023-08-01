import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import coin from "../../assets/coin.png";
import ArrowLeft from "../../assets/ArrowLeft.png";
import CountryPicker from "react-native-country-picker-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "../../components/Pixel/index";
import leftArrows from "../../assets/leftArrows.png";
import LevelDigit from "../../assets/LevelDigit.png";
import sild from "../../assets/sild.png";
import Weekly from "./Weekly";

import frame1 from "../../assets/frame1.png";
import frame2 from "../../assets/frame2.png";
import frame3 from "../../assets/frame3.png";
import {
  GetAllranking,
  GetTopReciever,
  GetTopSender,
  getTopRecieverByCountry,
  getTopSenderByCountry,
} from "../../services/Api";

const options = [
  {
    name: "Send",
  },
  {
    name: "Receive",
  },
  {
    name: "Winner",
  },
];

const SendRanking = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [countryName, setcountryName] = useState("US");
  const [countryCode, setcountryCode] = useState("+1");
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [topsender, setTopSender] = useState([]);
  const [topreciever, setTopReciever] = useState([]);
  const [top3Sender, setTop3Sender] = useState([]);
  const [top3Reciever, setTop3Reciever] = useState([]);
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTopsenderData();
    getTopreciever();
    getRankingData();
  }, []);

  const OnTopSender = async (country) => {
    const customOrder = [1, 0, 2];
    console.log("Get Country Code:::", country);
    const response = await getTopSenderByCountry(country);
    console.log("Get TopSend:::", response.data);
    if (response.data.status) {
      setTopSender(response.data.data);

      const reorderedData = data
        .map((item, index) => ({ item, index })) // Add the index to each item object
        .sort(
          (a, b) => customOrder.indexOf(a.index) - customOrder.indexOf(b.index)
        ) // Sort based on customOrder
        .map((item) => item.item);

      setTop3Sender(reorderedData);
    }

    setCountryPickerVisible(false);
  };

  const OnTopReciever = async (country) => {
    const customOrder = [1, 0, 2];
    console.log("Get Country Code:::", country);
    const response = await getTopRecieverByCountry(country);
    console.log("Get Reciever:::", response.data);
    if (response.data.status) {
      setTopReciever(response.data.data);

      const reorderedData = data
        .map((item, index) => ({ item, index })) // Add the index to each item object
        .sort(
          (a, b) => customOrder.indexOf(a.index) - customOrder.indexOf(b.index)
        ) // Sort based on customOrder
        .map((item) => item.item);

      setTop3Reciever(reorderedData);
    }

    setCountryPickerVisible(false);
  };

  const getRankingData = async () => {
    try {
      const response = await GetAllranking();
      const rankingData = response.data;
      setRankingData(rankingData);
      // console.log("rankingData", rankingData);
    } catch (error) {
      console.log("Error fetching ranking data", error);
    }
  };
  const getTopsenderData = async () => {
    const customOrder = [1, 0, 2];
    try {
      const response = await GetTopSender();
      const rankingData = response.data;
      setTopSender(rankingData);
      const reorderedData = response.data
        .map((item, index) => ({ item, index })) // Add the index to each item object
        .sort(
          (a, b) => customOrder.indexOf(a.index) - customOrder.indexOf(b.index)
        ) // Sort based on customOrder
        .map((item) => item.item);

      setTop3Sender(reorderedData);
      console.log("ToprankingData", rankingData);
    } catch (error) {
      console.log("Error fetching ranking data", error);
      // Handle the error here (e.g., show an error message)
    }
  };
  const getTopreciever = async () => {
    const customOrder = [1, 0, 2];
    try {
      const response = await GetTopReciever();
      const rankingData = response.data;
      setTopReciever(rankingData);
      const reorderedData = response.data
        .map((item, index) => ({ item, index })) // Add the index to each item object
        .sort(
          (a, b) => customOrder.indexOf(a.index) - customOrder.indexOf(b.index)
        ) // Sort based on customOrder
        .map((item) => item.item);

      setTop3Reciever(reorderedData);
      console.log("Receiver rankingData", rankingData);
    } catch (error) {
      console.log("Error fetching ranking data", error);
      // Handle the error here (e.g., show an error message)
    }
  };

  const onCountrySelect = (country) => {
    setcountryName(country.cca2);
    setcountryCode("+" + country.callingCode[0]);
    console.log(countryCode);
    if (activeIndex === 0) {
      OnTopSender(countryCode);
    } else {
      OnTopReciever(countryCode);
    }
  };
  const handleTouchableOpacityPress = () => {
    setCountryPickerVisible(true);
  };

  const ToprenderRow = ({ item, index }) => {
    let lengthGet = activeIndex == 0 ? top3Sender.length : top3Reciever.length;
    if (index < 3) {
      console.log("Get Data::::", item);
      if (lengthGet != 1) {
        return (
          <>
            {index == 0 && (
              <View
                style={{
                  height: hp(28),
                  flexDirection: "row",
                  width: wp(30),
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    padding: 10,
                    marginTop: -15,
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
                    {"2"}
                  </Text>
                  <ImageBackground
                    source={frame3}
                    style={{
                      width: wp(25),
                      height: hp(10),
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    resizeMode="contain"
                  >
                    <Image
                      source={
                        item.user_info?.photo
                          ? {
                              uri: `http://13.233.229.68:8008/profile_images/${item.user_info?.photo}`,
                            }
                          : item?.sender_user_info != undefined
                          ? {
                              uri: `http://13.233.229.68:8008/profile_images/${item?.sender_user_info[0]?.photo} `,
                            }
                          : null
                      }
                      style={{
                        width: 55,
                        height: 55,
                        resizeMode: "cover",
                        marginTop: hp(2.5),
                        borderRadius: 50,
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
                      {item.user_info?.name
                        ? item.user_info?.name
                        : item.sender_user_info[0]?.name
                        ? item.sender_user_info[0]?.name
                        : null}
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
                        {item?.totalCoin
                          ? item?.totalCoin
                          : item?.coin
                          ? coin
                          : null}
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
            )}
            {index == 1 && (
              <View
                style={{
                  height: hp(28),
                  flexDirection: "row",
                  width: wp(35),
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <View key={index} style={null}>
                  <View
                    style={{
                      padding: 10,
                      marginTop: -30,
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
                      {"1"}
                    </Text>
                    <ImageBackground
                      source={frame2}
                      style={{
                        width: wp(32),
                        height: hp(14),
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      resizeMode="contain"
                    >
                      <Image
                        source={
                          item.user_info?.photo
                            ? {
                                uri: `http://13.233.229.68:8008/profile_images/${item.user_info?.photo}`,
                              }
                            : item?.sender_user_info != undefined
                            ? {
                                uri: `http://13.233.229.68:8008/profile_images/${item?.sender_user_info[0]?.photo} `,
                              }
                            : null
                        }
                        style={{
                          width: 80,
                          height: 80,
                          resizeMode: "cover",
                          marginTop: hp(4.4),
                          borderRadius: 50,
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
                        {item.user_info?.name
                          ? item.user_info?.name
                          : item.sender_user_info[0]?.name
                          ? item.sender_user_info[0]?.name
                          : null}
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
                          style={{
                            width: 20,
                            height: 20,
                            resizeMode: "contain",
                          }}
                        />
                        <Text
                          style={{
                            color: "#1877F2",
                            padding: 5,
                            marginLeft: 5,
                            fontWeight: "600",
                          }}
                        >
                          {item?.totalCoin
                            ? item?.totalCoin
                            : item?.coin
                            ? coin
                            : null}
                        </Text>
                        <View style={styles.signalListView}>
                          <Image
                            style={[styles.photoView, { marginRight: wp(-2) }]}
                            source={sild}
                          />
                          <Image
                            style={[styles.photoView]}
                            source={LevelDigit}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}
            {index == 2 && (
              <View
                style={{
                  height: hp(28),
                  flexDirection: "row",
                  width: wp(30),
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    padding: 10,
                    marginTop: -15,
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
                    {"3"}
                  </Text>
                  <ImageBackground
                    source={frame3}
                    style={{
                      width: wp(25),
                      height: hp(10),
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    resizeMode="contain"
                  >
                    <Image
                      source={
                        item.user_info?.photo
                          ? {
                              uri: `http://13.233.229.68:8008/profile_images/${item.user_info?.photo}`,
                            }
                          : item?.sender_user_info != undefined
                          ? {
                              uri: `http://13.233.229.68:8008/profile_images/${item?.sender_user_info[0]?.photo} `,
                            }
                          : null
                      }
                      style={{
                        width: 55,
                        height: 55,
                        resizeMode: "cover",
                        marginTop: hp(2.5),
                        borderRadius: 50,
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
                      {item.user_info?.name
                        ? item.user_info?.name
                        : item.sender_user_info[0]?.name
                        ? item.sender_user_info[0]?.name
                        : null}
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
                        {item?.totalCoin
                          ? item?.totalCoin
                          : item?.coin
                          ? coin
                          : null}
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
            )}
          </>
        );
      } else {
        <View
          style={{
            height: hp(28),
            flexDirection: "row",
            width: wp(35),
            alignItems: "flex-end",
          }}
        >
          <View key={index} style={styles.highlightedPlayer}>
            <View
              style={{
                padding: 10,
                marginTop: -30,
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
                {"1"}
              </Text>
              <ImageBackground
                source={frame2}
                style={{
                  width: wp(33),
                  height: hp(14),
                  alignItems: "center",
                  justifyContent: "center",
                }}
                resizeMode="contain"
              >
                <Image
                  source={
                    item.user_info?.photo
                      ? {
                          uri: `http://13.233.229.68:8008/profile_images/${item.user_info?.photo}`,
                        }
                      : item?.sender_user_info != undefined
                      ? {
                          uri: `http://13.233.229.68:8008/profile_images/${item?.sender_user_info[0]?.photo} `,
                        }
                      : null
                  }
                  style={{
                    width: 80,
                    height: 80,
                    resizeMode: "cover",
                    marginTop: hp(4.4),
                    borderRadius: 50,
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
                  {item.user_info?.name
                    ? item.user_info?.name
                    : item.sender_user_info[0]?.name
                    ? item.sender_user_info[0]?.name
                    : null}
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
                    {item?.totalCoin
                      ? item?.totalCoin
                      : item?.coin
                      ? coin
                      : null}
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
        </View>;
      }
    }
  };

  const renderRow = ({ item, index }) => {
    const isEven = index % 2 === 0;
    if (index >= 3) {
      return (
        <View
          style={[styles.rowContainer, isEven ? styles.evenRow : styles.oddRow]}
        >
          <Text style={styles.rowIndex}>{index + 1}</Text>
          <Image
            source={
              item.user_info?.photo
                ? {
                    uri: `http://13.233.229.68:8008/profile_images/${item.user_info?.photo}`,
                  }
                : item?.sender_user_info != undefined
                ? {
                    uri: `http://13.233.229.68:8008/profile_images/${item?.sender_user_info[0]?.photo}`,
                  }
                : null
            }
            style={styles.rowImage}
          />
          <View style={styles.userInfoContainer}>
            <Text style={styles.rowText}>
              {item.user_info?.name
                ? item.user_info?.name
                : item.sender_user_info[0]?.name
                ? item.sender_user_info[0]?.name
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
            <Text style={styles.rowText1}>
              {item?.totalCoin ? item?.totalCoin : item?.coin ? coin : null}
            </Text>
          </View>
        </View>
      );
    }
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
            width: "80%",
          }}
        >
          {activeIndex == 0
            ? "Send Ranking"
            : activeIndex == 1
            ? "Received Ranking"
            : "Winner Ranking"}
        </Text>
        <TouchableOpacity
          onPress={handleTouchableOpacityPress}
          style={styles.filterButton}
        >
          <Image
            style={styles.leftArrow}
            source={require("../../assets/filter.png")}
          />
          <View
            style={{
              backgroundColor: "#1877F2",
              color: "#1877F2",
              width: wp(8),
            }}
          >
            {countryPickerVisible ? (
              <CountryPicker
                withFilter
                countryCode={countryName}
                visible={countryPickerVisible}
                onSelect={onCountrySelect}
                withCallingCode={true}
                onClose={() => setCountryPickerVisible(false)}
              />
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderRadius: wp(10),
          flexDirection: "row",
          width: "84%",
          height: hp(7),
          backgroundColor: "#EEEEEE",
          alignItems: "center",
          justifyContent: "space-between",
          alignSelf: "center",
        }}
      >
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={options}
          renderItem={({ item, index }) => {
            const isActive = index === activeIndex;
            return (
              <TouchableOpacity
                style={[
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: wp(1),
                    height: hp(5.5),
                    width: wp(22),
                  },
                  isActive && {
                    borderRadius: 50,
                    alignItems: "center",
                    backgroundColor: isActive ? "#1877F2" : "transparent",
                    justifyContent: "center",
                  }, // Change background color if active
                ]}
                onPress={() => setActiveIndex(index)}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: isActive ? "#fff" : "#000", // Change text color if active
                    textAlign: "center",
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View>
        <Weekly />
      </View>

      <View style={{ height: hp(28) }}>
        <FlatList
          data={
            activeIndex == 0
              ? top3Sender
              : activeIndex == 1
              ? top3Reciever
              : rankingData
          }
          renderItem={ToprenderRow}
          horizontal
          // scrollEnabled={false}/
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          // showsVerticalScrollIndicator={false}
        />
      </View>
      <FlatList
        data={
          activeIndex == 0
            ? topsender
            : activeIndex == 1
            ? topreciever
            : rankingData
        }
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
  filterButton: {
    marginLeft: wp(1.5),
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
  highlightedPlayer: {
    backgroundColor: "#f9f9f9",
  },
  signalListView: {
    flexDirection: "row",
    alignItems: "center",
  },
  photoView: {
    width: wp(5),
    height: hp(5),
    resizeMode: "contain",
  },
});

export default SendRanking;
