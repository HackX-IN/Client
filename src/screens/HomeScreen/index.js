import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Modal,
  RefreshControl,
  TextInput,
  Alert,
} from "react-native";

import CountryPicker from "react-native-country-picker-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../components/Pixel/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import ArrowLeft from "../../assets/ArrowLeft.png";
import banner from "../../assets/banner.png";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";
import image5 from "../../assets/image5.png";
import coin from "../../assets/coin.png";
import viewer from "../../assets/viewer.png";
import search from "../../assets/search.png";
import vip from "../../assets/vip.png";
import { useIsFocused } from "@react-navigation/native";
import Swiper from "react-native-swiper";

import {
  onGetUserApi,
  onGetLiveStreamingApi,
  onWatchListAddApi,
  UserSearch,
  liveFilterApi,
} from "../../services/Api.js";

const livePhoto = [
  {
    id: 1,
    image: image1,
  },
  {
    id: 2,
    image: image2,
  },
  {
    id: 3,
    image: image3,
  },
  {
    id: 4,
    image: image4,
  },
  {
    id: 5,
    image: image5,
  },
];

const HomeScreen = ({ navigation, route }) => {
  const randomUserID = String(Math.floor(Math.random() * 100000));
  const [liveData, setLiveData] = useState([]);
  const [profileModal, setProfileModal] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLiveData, setFilteredLiveData] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [giftOptionSelect, setGiftOptionSelect] = useState("");
  const [userList, setUserList] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();
  const [withFlag, setWithFlag] = useState(false);
  const [countryName, setcountryName] = useState("US");
  const [countryCode, setcountryCode] = useState("+1");
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  const onCountrySelect = (country) => {
    setcountryName(country.cca2);
    setcountryCode("+" + country.callingCode[0]);
    console.log(countryCode);
    onCountry(countryCode);
  };

  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      onGetUserData();
      onGetLiveData();
    });

    return subscribe;
  }, [navigation]);

  const onCountry = async (country) => {
    console.log("Get Country Code:::", country);
    const response = await liveFilterApi(country);
    console.log("Get data:::", response);
    if (response.data.status) {
      setLiveData(response.data.data);
    }

    setCountryPickerVisible(false);
  };

  const onGetUserData = async () => {
    try {
      const response = await onGetUserApi();
      let data = response.data.data;
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const onGetLiveData = async () => {
    try {
      const response = await onGetLiveStreamingApi();
      let data = response.data.data;
      data.map((item, index) => {
        console.log("Get Data:::", item._id);
      });

      setLiveData(data.reverse());
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const addWatchList = async (item) => {
    try {
      const authToken = await AsyncStorage.getItem("token");

      const raw = JSON.stringify({
        userId: authToken,
        liveId: item._id,
      });

      const response = await onWatchListAddApi(raw);
      console.log(
        "Response Live Streaming",
        response.data,
        item.liveUniqueId,
        item?._id
      );
      navigation.navigate("LiveStreamingScreen", {
        isHost: false,
        randomUserID: item.liveUniqueId,
        receiverId: item.user[0]?._id,
        live: item?._id,
        userItem: item,
      });
    } catch (error) {
      console.error("Error in addWatchList:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await onGetUserData();
    await onGetLiveData();
    setRefreshing(false);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setFilteredLiveData([]);
    try {
      const response = await UserSearch(query);
      console.log(response.data.data);

      setUserList(response.data.data);
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  const Clear = () => {
    setFilteredLiveData([]);
    setLiveData([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerOptionView}>
        {showInput && (
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.inputText}
              placeholder="Search Name"
              onChangeText={handleSearch}
              value={searchQuery}
              placeholderTextColor="black"
            />
          </View>
        )}
        {!showInput && (
          <>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                backgroundColor:
                  giftOptionSelect === "Home" ? "#fff" : "transparent",
                width: "14%",
                height: hp(3),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                opacity: 1,
              }}
              onPress={() => {
                setGiftOptionSelect("Home"), setRefresh(!refresh);
              }}
            >
              <Text
                style={{
                  fontSize: hp(2),
                  fontWeight: "600",
                  color: giftOptionSelect === "Home" ? "#1877F2" : "#fff",
                }}
              >
                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                backgroundColor:
                  giftOptionSelect === "News" ? "#fff" : "transparent",
                width: "14%",
                height: hp(3),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
              }}
              onPress={() => {
                setGiftOptionSelect("News");
                setRefresh(!refresh);
              }}
            >
              <Text
                style={{
                  fontSize: hp(2),
                  fontWeight: "600",
                  color: giftOptionSelect === "News" ? "#1877F2" : "#fff",
                }}
              >
                News
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                backgroundColor:
                  giftOptionSelect === "Multi" ? "#fff" : "transparent",
                width: "14%",
                height: hp(3),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
              }}
              onPress={() => {
                setGiftOptionSelect("Multi");
                setRefresh(!refresh);
              }}
            >
              <Text
                style={{
                  fontSize: hp(2),
                  fontWeight: "600",
                  color: giftOptionSelect === "Multi" ? "#1877F2" : "#fff",
                }}
              >
                Multi
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                backgroundColor:
                  giftOptionSelect === "Audio" ? "#fff" : "transparent",
                width: "14%",
                height: hp(3),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
              }}
              onPress={() => {
                setGiftOptionSelect("Audio");
                setRefresh(!refresh);
              }}
            >
              <Text
                style={{
                  fontSize: hp(2),
                  fontWeight: "600",
                  color: giftOptionSelect === "Audio" ? "#1877F2" : "#fff",
                }}
              >
                Audio
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                backgroundColor:
                  giftOptionSelect === "V/S" ? "#fff" : "transparent",
                width: "14%",
                height: hp(3),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
              }}
              onPress={() => {
                setGiftOptionSelect("V/S");
                setRefresh(!refresh);
              }}
            >
              <Text
                style={{
                  fontSize: hp(2),
                  fontWeight: "600",
                  color: giftOptionSelect === "V/S" ? "#1877F2" : "#fff",
                }}
              >
                V/S
              </Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          onPress={() => setShowInput(!showInput)}
          activeOpacity={1}
        >
          <Image source={search} style={styles.vipOption} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("SendRanking")}
          activeOpacity={1}
        >
          <Image source={vip} style={styles.vipOption} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCountryPickerVisible(true)}
          style={styles.leftArrow}
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

      <ScrollView
        contentContainerStyle={{ paddingBottom: hp(10) }}
        refreshControl={
          <RefreshControl
            colors={["#639cf7"]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {showInput ? (
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SearchProfile", { userList: userList })
              }
              style={{ backgroundColor: "#F0F0f0", marginTop: hp(1) }}
            >
              <View style={styles.userContainer}>
                <Image
                  source={{
                    uri: `http://13.233.229.68:8008/profile_images/${userList?.photo}`,
                  }}
                  style={{
                    width: wp(12),
                    height: wp(12),
                    borderRadius: wp(12),
                    marginRight: wp(1),
                  }}
                />
                <Text
                  style={{
                    color: "black",
                    fontSize: hp(2.5),
                    fontWeight: "700",
                    marginBottom: 5,
                  }}
                >
                  {userList?.name}
                </Text>
                {userList ? (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../../assets/sild.png")}
                      style={{
                        width: 20,
                        height: 20,
                        marginTop: wp(0.5),
                        marginLeft: -wp(0.5),
                      }}
                    />
                    <Image
                      style={{
                        width: 23,
                        height: 20,
                        resizeMode: "contain",
                        marginTop: wp(0.5),
                        marginLeft: -3,
                      }}
                      source={require("../../assets/LevelDigit.png")}
                    />
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.bannerView}>
              <Swiper
                style={styles.wrapper}
                autoplay
                dot={
                  <View
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      marginLeft: 3,
                      marginRight: 3,
                      marginTop: 3,
                      marginBottom: hp(4),
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 5,
                    }}
                  />
                }
                activeDot={
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      marginLeft: 3,
                      marginRight: 3,
                      marginTop: 3,
                      marginBottom: hp(4),
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 5,
                    }}
                  />
                }
                paginationStyle={{
                  bottom: -20,
                }}
                loop={true}
                showsButtons={false}
              >
                <Image source={banner} style={styles.bannerImage} />

                <Image source={banner} style={styles.bannerImage} />
              </Swiper>
            </View>
            <View style={styles.listView}>
              {liveData.map((item, index) => (
                <TouchableOpacity
                  key={item._id}
                  style={{
                    width: "48%",
                    height: hp(22),
                    marginBottom: hp(2),
                  }}
                  onPress={() => addWatchList(item)}
                >
                  <Image
                    style={styles.photoView}
                    source={{
                      uri: `http://13.233.229.68:8008/profile_images/${item.user[0]?.photo}`,
                    }}
                  />
                  <View
                    style={{
                      position: "absolute",
                      bottom: hp(1.5),
                      width: "90%",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignSelf: "center",
                    }}
                  >
                    <View
                      style={{
                        height: hp(3),
                        width: wp(18),
                        alignItems: "center",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        justifyContent: "center",
                        borderRadius: wp(5),
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        style={{
                          width: wp(3),
                          height: hp(2),
                          resizeMode: "contain",
                        }}
                        source={coin}
                      />
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: hp(1.8),
                          fontWeight: "700",
                          marginLeft: wp(1),
                        }}
                      >
                        {item?.coin}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: wp(18),
                        height: hp(3),
                        backgroundColor: "rgba(0,0,0,0.4)",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: wp(5),
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        style={{
                          width: wp(4),
                          height: hp(3),
                          resizeMode: "contain",
                        }}
                        source={viewer}
                      />
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: hp(1.8),
                          marginLeft: wp(1),
                        }}
                      >
                        0
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      top: hp(1.5),
                      width: "90%",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      alignSelf: "center",
                    }}
                  >
                    <View
                      style={{
                        height: hp(3),
                        alignItems: "center",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        borderRadius: wp(5),
                        maxWidth: wp(40),
                        paddingHorizontal: wp(3),
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: hp(2),
                          fontWeight: "700",
                        }}
                      >
                        {item.user[0]?.name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9F8",
    width: "100%",
    alignSelf: "center",
  },
  bannerImage: {
    width: "100%",
    height: hp(13),
    resizeMode: "contain",
    marginTop: hp(-2),
  },
  vipOption: {
    width: wp(6),
    height: hp(8),
    resizeMode: "contain",
  },
  listView: {
    flexWrap: "wrap",
    flexDirection: "row",
    width: "92%",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  photoView: {
    width: "100%",
    height: hp(22),
    borderRadius: 10,
  },
  bannerView: {
    width: "100%",
    height: hp(11),
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerOptionView: {
    width: "100%",
    height: hp(8),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: wp(3),
    backgroundColor: "#0371FF",
  },
  inputText: {
    height: 45,
    padding: 10,
    color: "black",
    borderRadius: 5,
    width: wp(75),
    fontSize: wp(3.2),
    marginTop: 10,
    marginBottom: 0.5,
    backgroundColor: "#fff",
  },
  userContainer: {
    width: wp(53),
    height: hp(9),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: hp(0.5),
  },
  userInfo: {
    color: "black",
    fontSize: hp(2),
    fontWeight: "700",
  },
  leftArrow: {
    width: wp(6),
    height: hp(2),
    resizeMode: "contain",
    tintColor: "#fff",
  },
});

export default HomeScreen;
