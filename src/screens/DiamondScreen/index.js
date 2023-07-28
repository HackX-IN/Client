import React,{useState,useEffect} from "react";
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
import coin from "../../assets/coin.png";
import {onGetUserApi} from '../../services/Api.js'
const livePhoto=[
  {
    id:1,
    coin:'50,000',
    price:'7$'
  },
  {
    id:2,
    coin:'100,000',
    price:'13$'
  },
  {
    id:3,
    coin:'300,000',
    price:'32$'
  },
  {
    id:4,
    coin:'550,000',
    price:'65$'
  },
  {
    id:5,
    coin:'10,00000',
    price:'90$'
  }
]

const DiamondScreen = ({navigation}) => {
  const [profileData,setProfileData] = useState(null)

  useEffect(()=>{
    const subscribe = navigation.addListener('focus',()=>{
      onGetUserData()
    })
},[])

  const onGetUserData = async() => {
    try{
      const response = await onGetUserApi()
      console.log("Get Response",response.data)
      if(response.data.success){
        setProfileData(response.data.data[0])
      }
  
    }
    catch(err){
      console.log('Error:',err)
    }
  }

const renderItem = ({item,index})=>{
  return(
    <View style={styles.coinView1}>
      <View style={{
        flexDirection:"row",
        alignItems:'center'
      }}>
        <Image style={[styles.playImage1]} source={coin}/>
        <Text style={{fontSize:hp(4),color:'#fff',fontWeight:'500',marginLeft:wp(4)}}>{item.coin}</Text>
      </View>
      <View style={{
        height:hp(3),
        width:wp(12),
        backgroundColor:'#D9D9D9',
        borderRadius:hp(3),
        alignItems:'center',
        justifyContent:'center'
      }}>
        <Text style={{fontSize:hp(1.7),color:'#9E26BC',fontWeight:'500'}}>{item.price}</Text>
        </View>
    </View>
  )
}

return(
    <View style={styles.container}>
          <View style={styles.bannerView}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image style={styles.leftArrow} source={leftArrows}/>
          </TouchableOpacity>
          <Text style={{fontSize:hp(2.6),color:'#fff',fontWeight:'700',marginLeft:wp(6)}}>Diamond</Text>
         </View>
         <View style={{
          width:'100%',
          height:hp(19),
         }}>
         <View style={styles.coinView}>
          <View style={{
            alignItems:"center"
          }}>
          <Text style={{fontSize:hp(2.2),color:'#fff',fontWeight:'500',height:hp(7),textAlign:'center',marginTop:hp(3.5)}}>Recharge Coin</Text>
          <Text style={{fontSize:hp(4),color:'#fff',fontWeight:'500',height:hp(8)}}>{profileData?.coin}</Text>
          </View>
          <View style={{
            alignItems:"center"
          }}>
          <Image style={[styles.playImage]} source={coin}/>
          <View style={{height:hp(8),width:1,backgroundColor:'#DADADA'}} />
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('CallHistory')} style={{
            alignItems:"center"
          }}>
          <Text style={{fontSize:hp(2.2),color:'#fff',fontWeight:'500',height:hp(7),marginTop:hp(3)}}>Receive Coin</Text>
          <Text style={{fontSize:hp(4),color:'#fff',fontWeight:'500',height:hp(8)}}>{profileData?.LiveEarningcoin}</Text>
          </TouchableOpacity>
         </View>

         </View>
         <View style={{width:'100%',backgroundColor:'#DADADA',height:1}} />

         <FlatList 
         data={livePhoto}
         renderItem={renderItem}
         keyExtractor={(item,index)=>index.toString()}
         contentContainerStyle={{marginTop:hp(4)}}
         />
    </View>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#1877F2',
      width:'100%',
      alignSelf:'center',
      
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
    playImage1:{
      width:wp(8),
      height:hp(6),
      resizeMode:'contain'
    },
    bannerView:{
      width:"100%",
      height:hp(12),
      alignItems:'center',
      flexDirection:'row',
      marginHorizontal:'4%'
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
    coinView:{
      flexDirection:'row',
      width:'100%',
      alignItems:'center',
      justifyContent:'space-between',
      paddingHorizontal:'4%'
     },
     coinView1:{
      flexDirection:'row',
      width:'100%',
      alignItems:'center',
      justifyContent:'space-between',
      paddingHorizontal:'4%',
      height:hp(10)
     }
  });

export default DiamondScreen;