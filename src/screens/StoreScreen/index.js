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
import bike3 from "../../assets/bike3.png";
import bike4 from "../../assets/bike4.png";
import {onGetStoreItemsApi,onBuyStoreItemsApi,onUpdateStoreApi,onGetUserApi} from '../../services/Api.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../../components/Loader.js'



const livePhoto=[
  {
    id:1,
    image:bike1,
    des:'Hunda R15'
  },
  {
    id:2,
    image:bike2,
    des:'Lamber Giny'
  },
  {
    id:3,
    image:bike3,
    des:'150.000/15 Days'
  },
  {
    id:4,
    image:bike4,
    des:'150.000/15 Days'
  }
]

const StoreScreen = ({navigation}) => {

const [buyUser,setBuyUser] = useState(false)
const [storeData,setStoreData] = useState([])
const [isLoading,setIsLoading] = useState(false)
const [userData,setUserData] = useState(false)

  useEffect(()=>{
    const subscribe = navigation.addListener('focus',()=>{
      onGetUserData()
    })
  },[])

  const onGetUserData = async() => {
    try{
      setIsLoading(true)
      const response = await onGetUserApi()
      console.log("Get Response",response.data.data[0])
      setUserData(response.data.data[0])
      onGetStoreData(response.data.data[0])
      setIsLoading(false)
    }
    catch(err){
      console.log('Error:',err)
    }
  }
  
  const onGetStoreData = async(from) => {
    try{
      setIsLoading(true)
      const response = await onGetStoreItemsApi()
      console.log("Get Response",response.data)
      setIsLoading(false)
      let data=response.data.data
      console.log("Get data",from)
      from.storeItems.map((item1,index1)=>{
      data.map((item,index)=>{
var msDiff = new Date(item1.validTill).getTime() - new Date().getTime();    //Future date - current date
var daysTill30June2035 = Math.floor(msDiff / (1000 * 60 * 60 * 24));
console.log(daysTill30June2035);
        // console.log("Get filter",diff)
       if(item1.storeId==item._id){
        if(item1.inUse){
          data[index].inUse=true
        }
        data[index].isBuy=true
        data[index].remainDay=daysTill30June2035
       }
        })
      })
      setStoreData(data)
    }
    catch(err){
      setIsLoading(false)
      console.log('Error:',err)
    }
  }

  const onBuyStore = async(storeId) => {
    try{
      setIsLoading(true)
      const authToken = await AsyncStorage.getItem('token');
      var raw = JSON.stringify({
        userId: authToken,
        storeId: storeId
      });
     
      const response= await onBuyStoreItemsApi(raw)
      setIsLoading(false)
      console.log("Get Response",response.data)
      if(response.data.status){
        onGetUserData()
      }
    }
    catch(err){
      setIsLoading(false)
      console.log('Error:',err)
    }
  }


  const onUseStore = async (storeId) => {
    try{
      setIsLoading(true)
      const authToken = await AsyncStorage.getItem('token');
      var raw = JSON.stringify({
        userId: authToken,
        storeId: storeId,
        inUse: true
      });
     
      const response= await onUpdateStoreApi(raw)
      setIsLoading(false)
      console.log("Get Response",response.data)
      if(response.data.status){
        onGetUserData()
      }
    }
    catch(err){
      setIsLoading(false)
      console.log('Error:',err)
    }
  }


return(
  <>
    <View style={styles.container}>
          <View style={styles.bannerView}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image style={styles.leftArrow} source={leftArrows}/>
          </TouchableOpacity>
          <Text style={{fontSize:hp(2.6),color:'#fff',fontWeight:'700',marginLeft:wp(6)}}>Store</Text>
         </View>
        
          <ScrollView contentContainerStyle={{paddingBottom:hp(10)}} showsVerticalScrollIndicator={false}>
          <View style={styles.listView}>
          {storeData.map((item,index)=>{
            return(
              <View style={styles.signalListView}>
                <View></View>
                <Image style={styles.photoView} source={{uri:`http://13.233.229.68:8008/store/${item.storeUrl}`}}/>
                <View style={{width:'90%',justifyContent:'center'}}>
                <Text style={{fontSize:hp(2),color:'#fff',marginLeft:wp(1),textAlign:"center"}}>{item.name}</Text>
                
                <Text style={{fontSize:hp(2),color:'#fff',marginLeft:wp(1),textAlign:"center"}}>{item.price}/{item.remainDay!=undefined?<Text style={{fontSize:hp(2),color:'#ff0000',marginLeft:wp(1)}}>{item.remainDay} days</Text>: `${item.validity} days`}</Text>
                <View style={{width:'100%',justifyContent:'center',alignItems:'center',flexDirection:'row',height:hp(5)}}>
                  <TouchableOpacity onPress={()=>{
                    item.isBuy?onUseStore(item._id):onBuyStore(item._id)
                  }}>
                    {item.isBuy?
                <Image style={styles.playImage} source={require('../../assets/use.png')}/>
                :item.inUse?
                 null
                 :<Image style={styles.playImage} source={require('../../assets/buy.png')}/>
                    }
                </TouchableOpacity>
              
                </View>
                </View>
                </View>
            )
          })}
          </View>
          </ScrollView>
         
    </View>
    <Loader isLoading={isLoading} />
    </>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#1877F2',
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
      width:wp(16),
      height:hp(9),
    },
    bannerView:{
      width:"100%",
      height:hp(15),
      alignItems:'center',
      flexDirection:'row'
    },
    signalListView:{
      width:'48%',
      alignItems:'center',
      justifyContent:'space-between',
      height:hp(27),
      borderRadius:10,
      marginBottom:hp(2)
    },
    leftArrow:{
      width:wp(6),
      height:hp(2),
      resizeMode:'contain'
    },
  });

export default StoreScreen;