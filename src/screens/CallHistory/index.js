import React,{useEffect, useState} from "react";
import { View,Text,Image,StyleSheet,FlatList ,ScrollView,TouchableOpacity} from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import CountryPicker from 'react-native-country-picker-modal'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../components/Pixel/index';
  import leftArrows from "../../assets/leftArrows.png";
import {onGetEaringCoinApi} from '../../services/Api.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import coin from "../../assets/coin.png";
import viewer from "../../assets/viewer.png";

const livePhoto=[
  {
    id:1,
    coin:100000,
    duration:'10:50:43',
    date:'14 feb,2023'
  },
  {
    id:2,
    coin:100000,
    duration:'10:50:43',
    date:'14 feb,2023'
  },
  {
    id:3,
    coin:100000,
    duration:'10:50:43',
    date:'14 feb,2023'
  }
]

const CallHistory = ({navigation}) => {
  randomUserID = String(Math.floor(Math.random() * 100000))
const [coinData,setCoinData] = useState([])

useEffect(()=>{
  const subscribe = navigation.addListener('focus',()=>{
    onGetCoinData()
  })
},[])

const onGetCoinData = async() =>{
  try{
  const response=await onGetEaringCoinApi()
  console.log("Get Response>>>",response)
  setCoinData(response.data.data)
  }
  catch(err){
    console.log("get error",err)
  }
}


return(
    <View style={styles.container}>
 <View style={styles.bannerView}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image style={styles.leftArrow} source={leftArrows}/>
          </TouchableOpacity>
          <Text style={{fontSize:hp(2.6),color:'#fff',fontWeight:'700',marginLeft:wp(6)}}>Coin History</Text>
         </View>
         <ScrollView contentContainerStyle={{paddingBottom:hp(10)}}>
         <View style={styles.listView}>
         
          {livePhoto.map((item,index)=>{
            console.log("Get UserData:::",item)
            return(
              <View style={{
                width:"100%",
                backgroundColor:"#fff",
                height:hp(20),
                marginBottom:hp(2),
                borderRadius:hp(1)
              }}>
                <View style={{
                  width:'100%',
                  alignItems:'center',
                  height:hp(8)
                }}>
                  <View style={{
                  width:'50%',
                  alignItems:'center',
                  justifyContent:'center',
                  height:hp(4),
                  backgroundColor:'#9E26BC',
                  borderBottomLeftRadius:5,
                  borderBottomRightRadius:5
                }}>
                  <Text style={{fontSize:hp(2),color:'#fff'}}>{item.date}</Text>
                  </View>
                </View>

                <View style={{
                    width:'100%',
                    alignItems:'center',
                    height:hp(10),
                    justifyContent:'center'
                }}>
                  <View style={{
                      width:'92%',
                      alignItems:'center',
                      justifyContent:'space-between',
                      flexDirection:'row'
                  }}>
                   <Text style={{fontSize:hp(2.2),color:'#848484'}}>Coin Income</Text>
                   <Text style={{fontSize:hp(2.2),color:'#000',fontWeight:'700'}}>{item.coin}</Text>
                  </View>
                  <View style={{
                      width:'92%',
                      alignItems:'center',
                      justifyContent:'space-between',
                      flexDirection:'row',
                      marginTop:hp(3)
                  }}>
                   <Text style={{fontSize:hp(2.2),color:'#848484'}}>Live Duration</Text>
                   <Text style={{fontSize:hp(2.2),color:'#000',fontWeight:'700'}}>{item.duration}</Text>
                  </View>
                </View>
              </View>
            )
          })}
          
         </View>
         </ScrollView>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#9E26BC',
      width:'100%',
      alignSelf:'center',
    },
    bannerImage:{
        width:'100%',
        height:hp(13),
        resizeMode:'contain',
        
    },
    leftArrow:{
      width:wp(6),
      height:hp(2),
      resizeMode:'contain'
    },
    listView:{
      width:'92%',
      alignSelf:"center",
      justifyContent:'center'
    },
    photoView:{
      width:"100%",
      height:hp(22),
      borderRadius:10,
    },
    bannerView:{
      width:"100%",
      height:hp(12),
      alignItems:'center',
      flexDirection:'row',
      marginHorizontal:'4%'
    },
  });

export default CallHistory;