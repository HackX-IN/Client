import React,{useState,useEffect} from "react";
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
import { GetRankingApi } from "../../services/Api";

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


const LiveCoinScreen = ({navigation,route}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {name}=route.params
      const getRankingData = async () => {
    try {
      const selectedCategory = options[activeIndex].name; 
      const response = await GetRankingApi(selectedCategory); 
      const rankingData = response.data;
      
    } catch (error) {
      console.log('Error fetching ranking data', error);
    }
  };
  useEffect(() => {

 getRankingData()
  
  }, [options])

  const onFilterClick = async()=>{
    getRankingData()
  }
  

return(
    <View style={styles.container}>
          <View style={styles.bannerView}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image style={styles.leftArrow} source={leftArrows}/>
          </TouchableOpacity>
          <Text style={{fontSize:hp(2.6),color:'#000',fontWeight:'700',marginLeft:wp(6)}}>{name} Ranking</Text>
         </View>
      <View >
      <Weekly/>
      </View>

      <View style={{height:hp(25)}} >
      <Player/>
      </View>
     <Listview/>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#F7F9F8',
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
      height:hp(8),
      alignItems:'center',
      flexDirection:'row',
     
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
      tintColor:'#1877F2'
    },
  });

export default LiveCoinScreen;
