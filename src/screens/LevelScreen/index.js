import React,{useState} from "react";
import { View,Text,Image,StyleSheet,FlatList, TouchableOpacity } from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import CountryPicker from 'react-native-country-picker-modal'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../components/Pixel/index';
import leftArrows from "../../assets/leftArrows.png";
import LevelDigit from "../../assets/LevelDigit.png";
import sild from "../../assets/sild.png";


const livePhoto=[
  {
    id:1,
    name:'100000'
  },
  {
    id:2,
    name:'3000000'
  },
  {
    id:3,
    name:'6000000'
  },
  {
    id:4,
    name:'18000000'
  },
  {
    id:5,
    name:'4500000'
  },
  {
    id:6,
    name:'95000000'
  },
  {
    id:7,
    name:'95000000'
  },
  {
    id:8,
    name:'95000000'
  },
  {
    id:9,
    name:'95000000'
  }
]

const LevelScreen = ({navigation}) => {

return(
    <View style={styles.container}>
          <View style={styles.bannerView}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image style={styles.leftArrow} source={leftArrows}/>
          </TouchableOpacity>
          <Text style={{fontSize:hp(2.6),color:'#fff',fontWeight:'700',marginLeft:wp(6)}}>Level</Text>
         </View>

       

         <View style={[styles.listView1]}>
         <Text style={{fontSize:hp(2),color:'#fff',fontWeight:'600',textAlign:'center',marginTop:hp(2)}}>Level Rules</Text>
         <Text style={{fontSize:hp(2),color:'#fff',fontWeight:'600',textAlign:'center',marginTop:hp(2)}}>Level Requirement</Text>
          </View>
          <FlatList 
          data={livePhoto}
          renderItem={({item,index})=>{
            return(
              <View style={[styles.listView,{backgroundColor:index%2!=0?"#fff":'#F4F5F9',borderBottomColor:'#9E26BC',borderBottomWidth:index%5!=0||index==0?0:4}]}>
              <View style={styles.signalListView}>
                <Image style={[styles.photoView,{marginRight:wp(-2)}]} source={sild}/>
                <Image style={[styles.photoView]} source={LevelDigit}/>
                </View>
                <Text style={{fontSize:hp(2),color:'#9E26BC',fontWeight:'600',textAlign:'center',marginTop:hp(2)}}>{item.name}</Text>
                </View>
            )
          }}
          />
    </View>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#9E26BC',
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
      flexDirection:'row',
      width:'100%',
      alignSelf:"center",
      justifyContent:'space-between',
      height:hp(7),
      paddingHorizontal:wp(4),
    },
    listView1:{
      flexDirection:'row',
      width:'100%',
      alignSelf:"center",
      justifyContent:'space-between',
      height:hp(7),
    },
    photoView:{
      width:wp(10),
      height:hp(5),
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
      flexDirection:"row",
      alignItems:'center'
    },
    leftArrow:{
      width:wp(6),
      height:hp(2),
      resizeMode:'contain'
    },
  });

export default LevelScreen;