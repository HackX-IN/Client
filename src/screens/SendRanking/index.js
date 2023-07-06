import React,{useState} from "react";
import { View,Text,Image,StyleSheet,FlatList, TouchableOpacity,ScrollView } from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import CountryPicker from 'react-native-country-picker-modal'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../components/Pixel/index';
import leftArrows from "../../assets/leftArrows.png";
import bike1 from "../../assets/bike1.png";
import bike2 from "../../assets/bike2.png";
import Weekly from "./Weekly";
import Player from './Player'
import Listview from "./Listview";

const options = [
  {
    name: "Receive",
  },
  {
    name: "Send",
  },
  {
    name: "Winner",
  },
];

const livePhoto=[
  {
    id:1,
    image:bike1,
    name:'Teen Patti'
  },
  {
    id:2,
    image:bike2,
    name:'Ludu Game'
  }
]

const SendRanking = ({navigation}) => {
  const [activeIndex, setActiveIndex] = useState(0);

return(
    <View style={styles.container}>
          <View style={styles.bannerView}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image style={styles.leftArrow} source={leftArrows}/>
          </TouchableOpacity>
          <Text style={{fontSize:hp(2.6),color:'#000',fontWeight:'700',marginLeft:wp(6)}}>Send Ranking</Text>
         </View>
         <View
        style={{
          borderRadius: wp(10),
          flexDirection: "row",
          width: "80%",
          height: hp(7),
          backgroundColor: "#EEEEEE",
          alignItems:'center',
          justifyContent:'space-between',
          alignSelf:'center'
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
                    marginHorizontal:wp(2),
                    height:hp(6),
                    width:wp(20)
                  },
                  isActive && { borderRadius:50,alignItems:"center",backgroundColor:isActive?"#639cf7":"transparent",justifyContent:"center" }, // Change background color if active
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
      <View style={{padding:5}}>
      <Weekly/>
      </View>

      <View style={{padding:2,height:hp(25)}} >
      <Player/>
      </View>
     <Listview/>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#fff',
      width:'100%',
      alignSelf:'center',
      paddingHorizontal:'4%'
    },
    bannerImage:{
        width:'100%',
        height:hp(13),
        resizeMode:'contain',
        
    },
    listView:{
      flexWrap:'wrap',
      flexDirection:'row',
      width:'100%',
      alignSelf:"center",
      justifyContent:'space-between'
    },
    photoView:{
      width:wp(35),
      height:hp(12),
      resizeMode:'contain'
    },
    playImage:{
      width:wp(14),
      height:hp(8),
      resizeMode:'contain'
    },
    bannerView:{
      width:"100%",
      height:hp(10),
      alignItems:'center',
      flexDirection:'row'
    },
    signalListView:{
      width:'100%',
      alignItems:'center',
      justifyContent:'space-between',
      backgroundColor:'#fff',
      height:hp(27),
      borderRadius:10
    },
    leftArrow:{
      width:wp(6),
      height:hp(2),
      resizeMode:'contain',
      tintColor:'#000'
    },
  });

export default SendRanking;
