import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import leftArrows from "../../assets/leftArrows.png";
import rankingUser from "../../assets/rankingUser.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../components/Pixel/index';
const data = [
  {
    id: "4",
    name: "Player 1",
    score: 100,
    image: rankingUser,
  },
  {
    id: "5",
    name: "Player 2",
    score: 200,
    image: rankingUser,
  },
  {
    id: "6",
    name: "Player 3",
    score: 200,
    image: rankingUser,
  },
  {
    id: "7",
    name: "Player 4",
    score: 200,
    image: rankingUser,
  },
  {
    id: "8",
    name: "Player 5",
    score: 200,
    image: rankingUser,
  },
  {
    id: "9",
    name: "Player 6",
    score: 200,
    image: rankingUser,
  },
  {
    id: "10",
    name: "Player 6",
    score: 200,
    image: rankingUser,
  },
  {
    id: "11",
    name: "Player 6",
    score: 200,
    image: rankingUser,
  },
];
const FanListScreen = ({navigation}) => {
  const renderRow = ({ item, index }) => {
    const isEven = index % 2 === 0;
    return (
      <View
        style={[
          styles.rowContainer,
          isEven ? styles.evenRow : styles.oddRow,
        ]}
      >
        <Text style={styles.rowIndex}>{item.id}</Text>
        <Image source={item.image} style={styles.rowImage} />
        <Text style={styles.rowText}>{item.name}</Text>
        <Text style={styles.rowText1}>{item.score}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <View style={styles.bannerView}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image style={styles.leftArrow} source={leftArrows}/>
          </TouchableOpacity>
          <Text style={{fontSize:hp(2.6),color:'#000',fontWeight:'700',marginLeft:wp(6)}}>Fans List</Text>
         </View>
       <FlatList
        data={data}
        renderItem={renderRow}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    width:'100%',
    alignSelf:'center',
    paddingHorizontal:'4%'
  },
  rowContainer: {
    flexDirection: "row",
    padding: 10,
    gap:10,
    
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#d6d4d4",
    borderRadius:2
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#fff",
  },
  rowIndex: {
    marginLeft: 10,
  },
  rowImage: {
    width: 50,
    height: 50,
  },
  rowText: {
    marginLeft: 10,
  },
  rowText1: {
    marginLeft: 130,
  },
  leftArrow:{
    width:wp(6),
    height:hp(2),
    resizeMode:'contain',
    tintColor:'#000'
  },
  bannerView:{
    width:"100%",
    height:hp(10),
    alignItems:'center',
    flexDirection:'row'
  },
});

export default FanListScreen;
