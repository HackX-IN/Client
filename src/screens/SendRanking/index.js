import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import CountryPicker from "react-native-country-picker-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "../../components/Pixel/index";
import leftArrows from "../../assets/leftArrows.png";
import bike1 from "../../assets/bike1.png";
import bike2 from "../../assets/bike2.png";
import Weekly from "./Weekly";
import Player from "./Player";
import Listview from "./Listview";
import { GetRankingApi } from "../../services/Api";

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
  const [countryName, setCountryName] = useState("US");
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const onCountrySelect = (country) => {
    setCountryName(country.cca2);
    setCountryPickerVisible(false);
  };

  const getRankingData = async () => {
    try {
      const selectedCategory = options[activeIndex].name;
      const response = await GetRankingApi(selectedCategory);
      const rankingData = response.data;
    } catch (error) {
      console.log("Error fetching ranking data", error);
    }
  };
  useEffect(() => {
    getRankingData();
  }, [options]);

  const handleTouchableOpacityPress = () => {
    setCountryPickerVisible(true);
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

      {activeIndex == 0 ? (
        <>
          <View style={{ height: hp(25) }}>
            <Player />
          </View>
          <Listview />
        </>
      ) : (
        <Text style={{ textAlign: "center" }}>No data available</Text>
      )}
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
});

export default SendRanking;
