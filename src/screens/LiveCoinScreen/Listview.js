import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import rankingUser from "../../assets/rankingUser.png";
import { GetRankingApi } from "../../services/Api";
import coin from '../../assets/coin.png';
const Listview = () => {
  const [ranking, setRanking] = useState([]);

const getRankingApi = async () => {
  try {
    const response = await GetRankingApi();
    const rankingData = response.data.data;
    console.log("Get Ranking", rankingData);
    setRanking(rankingData.slice(3));
  } catch (error) {
    console.log("Error Get Followers", error);
  }
};

useEffect(() => {
  getRankingApi();
}, []);

const renderRow = ({ item, index }) => {
  const isEven = index % 2 === 0;
  return (
    <View
      style={[
        styles.rowContainer,
        isEven ? styles.evenRow : styles.oddRow,
      ]}
    >
      <Text style={styles.rowIndex}>{index + 4}</Text>
      <Image source={rankingUser} style={styles.rowImage} />
      <View style={{flexDirection:"row"}}>
       <Text style={styles.rowText}>{item.name}</Text>
       <Image source={require('../../assets/sild.png')} style={{ width: 15, height: 15,marginTop:5,marginLeft:-3 }} />
       <Image style={{width: 20, height: 15,resizeMode:"contain",marginTop:5,marginLeft:-3}} source={require('../../assets/LevelDigit.png')}/>
       </View>
        <Image source={coin} style={{ width: 20, height: 20,marginLeft:23,resizeMode:'contain' }} />
        <Text style={styles.rowText1}>{item.totalCoinsSent}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={ranking}
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
    width: "100%",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    padding: 10,
    gap: 8,
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
    marginLeft: 10,
    color:"black",
    fontSize:16,
    fontWeight:"700"
  },
  rowImage: {
    width: 50,
    height: 50,
  },
  rowText: {
    color:"black",
    marginLeft: 10,
    fontWeight: "bold",
  },
  rowText1: {
    color:"#1877F2",
    marginLeft: 10,
    fontWeight: "bold",
  },
});

export default Listview;