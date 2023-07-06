import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import rankingUser from "../../assets/rankingUser.png";

const RankingPage = () => {
  const data = [
    { id: '1', name: 'Player 2', score: 100, image: rankingUser },
    { id: '2', name: 'Player 1', score: 200, image: rankingUser },
    { id: '3', name: 'Player 3', score: 150, image:rankingUser },
    // Add more players as needed
  ];

  return (
    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
      {data.map((item, index) => {
        return (
          <View key={index} style={item.name === 'Player 1' ? styles.highlightedPlayer : null}>
            <View style={{ padding: 10, marginTop: item.name === 'Player 1' ? -20 : 0 }}>
              <Image source={item.image} style={{ width: 100, height: 100 }} />
              <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 5 }}>
                <Text>{item.name}</Text>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 2 }}>
                  <Image source={require("../../assets/bike1.png")} style={{ width: 20, height: 20 }} />
                  <Text style={{ color: "#639cf7", padding: 5, marginLeft: 5 }}>{item.score}</Text>
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
 
});

export default RankingPage;
