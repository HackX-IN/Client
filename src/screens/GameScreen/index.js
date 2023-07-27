import React,{useState} from "react";
import { View,Text,Image,StyleSheet,FlatList, TouchableOpacity } from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import CountryPicker from 'react-native-country-picker-modal'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../components/Pixel/index';
import leftArrows from "../../assets/leftArrows.png";
import bike1 from "../../assets/bike1.png";
import bike2 from "../../assets/bike2.png";


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

const GameScreen = ({navigation}) => {

return(
    <View style={styles.container}>
          <View style={styles.bannerView}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image style={styles.leftArrow} source={leftArrows}/>
          </TouchableOpacity>
          <Text style={{fontSize:hp(2.6),color:'#fff',fontWeight:'700',marginLeft:wp(6)}}>Game</Text>
         </View>
         <View style={styles.listView}>
          {livePhoto.map((item,index)=>{
            return(
              <View style={{width:'48%'}}>
              <View style={styles.signalListView}>
                <View></View>
                <Image style={styles.photoView} source={item.image}/>
                <TouchableOpacity>
                <Image style={styles.playImage} source={require('../../assets/play.png')}/>
                </TouchableOpacity>
                </View>
                <Text style={{fontSize:hp(2.6),color:'#fff',fontWeight:'700',textAlign:'center',marginTop:hp(2)}}>{item.name}</Text>
                </View>
            )
          })}
         </View>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#0371FF',
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
      height:hp(15),
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
      resizeMode:'contain'
    },
  });

export default GameScreen;