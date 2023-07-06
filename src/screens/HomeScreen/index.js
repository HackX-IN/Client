import React,{useEffect, useState} from "react";
import { View,Text,Image,StyleSheet,FlatList ,ScrollView,TouchableOpacity,Modal} from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import CountryPicker from 'react-native-country-picker-modal'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../components/Pixel/index';
import banner from "../../assets/banner.png";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";
import image5 from "../../assets/image5.png";
import {onGetUserApi,onGetLiveStreamingApi,onWatchListAddApi} from '../../services/Api.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import coin from "../../assets/coin.png";
import viewer from "../../assets/viewer.png";
import search from "../../assets/search.png";
import vip from "../../assets/vip.png";


const livePhoto=[
  {
    id:1,
    image:image1
  },
  {
    id:2,
    image:image2
  },
  {
    id:3,
    image:image3
  },
  {
    id:4,
    image:image4
  },
  {
    id:5,
    image:image5
  }
]

const HomeScreen = ({navigation}) => {
  randomUserID = String(Math.floor(Math.random() * 100000))
const [liveData,setLiveData] = useState([])
const [profileModal,setProfileModal] = useState(true)
const [profileData,setProfileData] = useState(null)
const [popupOpen,setPopupOpen] = useState(false)

useEffect(()=>{
  const subscribe = navigation.addListener('focus',()=>{
    onGetUserData()
    onGetLiveData()
  })
},[])

const onGetUserData = async() => {
  try{
    const response = await onGetUserApi()
    console.log("Get Response",response.data)
  }
  catch(err){
    console.log('Error:',err)
  }
}

const onGetLiveData = async() => {
  try{
    const response = await onGetLiveStreamingApi()
    console.log("Get onGetLiveData Response",response.data.data)
    let data = response.data.data
    setLiveData(data.reverse())
  }
  catch(err){
    console.log('Error:',err)
  }
}

const addWatchList= async(item)=>{
  const authToken = await AsyncStorage.getItem('token');
  
          
  var raw = JSON.stringify({
    userId: authToken,
    liveId: item._id
  });
   const response =await onWatchListAddApi(raw)
   console.log("Response Lve Streaming",response.data,item.liveUniqueId,item?._id)
   navigation.navigate('LiveStreamingScreen',{isHost:false,randomUserID:item.liveUniqueId,receiverId:item.user[0]?._id,live:item?._id,userItem:item})
}

return(
    <View style={styles.container}>
      <View style={styles.headerOptionView}>
      <Text style={{fontSize:hp(2),fontWeight:'600',color:'#fff'}} onPress={()=>{}}>Home</Text>
      <Text style={{fontSize:hp(2),fontWeight:'600',color:'#fff'}} onPress={()=>{}}>News</Text>
      <Text style={{fontSize:hp(2),fontWeight:'600',color:'#fff'}} onPress={()=>{}}>Multi</Text>
      <Text style={{fontSize:hp(2),fontWeight:'600',color:'#fff'}} onPress={()=>{}}>Audio</Text>
      <Text style={{fontSize:hp(2),fontWeight:'600',color:'#fff'}} onPress={()=>{}}>V/S</Text>
      <TouchableOpacity>
      <Image source={search} style={styles.vipOption} />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('SendRanking')}>
      <Image source={vip} style={styles.vipOption} />
      </TouchableOpacity>
      </View>
          <View style={styles.bannerView}>
         <Image source={banner} style={styles.bannerImage} />
         </View>
         <ScrollView contentContainerStyle={{paddingBottom:hp(10)}}>
         <View style={styles.listView}>
         
          {liveData.map((item,index)=>{
            console.log("Get UserData:::",item)
            return(
              <TouchableOpacity style={{ width:"48%",
              height:hp(22),
              // marginBottom:hp(2)}} onPress={()=>{navigation.navigate('LiveStreamingScreen',{isHost:false,randomUserID:item.liveUniqueId,receiverId:item.user[0]?._id,live:item?._id})}}>
              marginBottom:hp(2)}} onPress={()=>addWatchList(item)}>
                <Image style={styles.photoView} source={{uri:`https://live-stream-lovely.onrender.com/profile_images/${item.user[0]?.photo}`}}/>
                <View style={{
                  position:'absolute',
                  bottom:hp(1.5),
                  width:'90%',
                  alignItems:'center',
                  justifyContent:'space-between',
                  flexDirection:'row',
                  alignSelf:'center'
                }}>
                   <View style={{
                    height:hp(3),
                    width:wp(18),
                    alignItems:"center",
                    backgroundColor:'rgba(0,0,0,0.4)',
                    justifyContent:'center',
                    borderRadius:wp(5),
                    flexDirection:"row"
                  }}>
                    <Image style={{width:wp(3),height:hp(2),resizeMode:'contain'}} source={coin} />
                   <Text style={{color:'#fff',fontSize:hp(1.8),fontWeight:'700',marginLeft:wp(1)}}>{item?.coin}</Text>
                  </View>
                  <View style={{
                    width:wp(18),
                    height:hp(3),
                    backgroundColor:'rgba(0,0,0,0.4)',
                    alignItems:"center",
                    justifyContent:'center',
                    borderRadius:wp(5),
                    flexDirection:"row"
                  }}>
                     <Image style={{width:wp(4),height:hp(3),resizeMode:'contain'}} source={viewer} />
                  <Text style={{color:'#fff',fontSize:hp(1.8),marginLeft:wp(1)}}>0</Text>
                  </View>
                </View>
                <View style={{
                  position:'absolute',
                  top:hp(1.5),
                  width:'90%',
                  alignItems:'center',
                  justifyContent:'flex-start',
                  flexDirection:'row',
                  alignSelf:'center'
                }}>
                  <View style={{
                     height:hp(3),
                     alignItems:"center",
                     backgroundColor:'rgba(0,0,0,0.4)',
                     borderRadius:wp(5),
                     maxWidth:wp(25),
                     paddingHorizontal:wp(3)
                  }}>
                     <Text style={{color:'#fff',fontSize:hp(2),fontWeight:'700'}}>{item.user[0]?.name}</Text>
                 
                  </View>
                </View>
                </TouchableOpacity>
            )
          })}
          
         </View>
         </ScrollView>


         {/* <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      statusBarTranslucent
      onRequestClose={()=>{setProfileModal(false)}}>
      <View style={styles.centeredView}>

            <TouchableOpacity style={{flex:0.65,width:'100%'}} onPress={()=>{setProfileModal(false)}}></TouchableOpacity>
        <View style={styles.modalView2}>
          <View style={{flexDirection:"row",
        alignItems:'center',
        justifyContent:'space-between'}}>
        <TouchableOpacity style={{width:90,top:hp(-5),left:wp(-10)}} onPress={()=>{setPopupOpen(!popupOpen)}}>
        <Text style={{fontSize:hp(1.8),color:'#000',fontWeight:'600'}}>Manage</Text>
           </TouchableOpacity>
           {popupOpen?
           <View style={{
            position:'absolute',
            width:wp(27),
            top:hp(2.5),
            left:wp(-15),
            height:hp(20),
            alignItems:'flex-start',
            justifyContent:'flex-start'
           }}>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Image source={invite} style={{width:wp(5),height:hp(4),resizeMode:'contain'}} />
              <Text style={{fontSize:hp(2),marginLeft:wp(2)}}>Invite Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Image source={kick} style={{width:wp(5),height:hp(4),resizeMode:'contain'}} />
              <Text style={{fontSize:hp(2),marginLeft:wp(2)}}>Kick Out</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Image source={muteIcon} style={{width:wp(5),height:hp(4),resizeMode:'contain'}} />
              <Text style={{fontSize:hp(2),marginLeft:wp(2)}}>Mute</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Image source={block} style={{width:wp(5),height:hp(4),resizeMode:'contain'}} />
              <Text style={{fontSize:hp(2),marginLeft:wp(2)}}>Block</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Image source={admin} style={{width:wp(5),height:hp(4),resizeMode:'contain'}} />
              <Text style={{fontSize:hp(2),marginLeft:wp(2)}}>Set Admin</Text>
            </TouchableOpacity>
           </View>
:null}

           <View style={{width:90,height:90,borderRadius:90,backgroundColor:"red",top:hp(-8)}}>
          <Image style={{width:90,height:90,borderRadius:90}} source={{uri:`https://live-stream-lovely.onrender.com/profile_images/${profileData?.user_data?.photo}`}} />
           </View>
           <View style={{width:90,top:hp(-5),left:wp(20)}}>
        <Text style={{fontSize:hp(1.8),color:'#000',fontWeight:'600'}}>Manage</Text>
           </View>
           </View>
        <Text style={{fontSize:hp(2.6),color:'#000',fontWeight:'700',top:hp(-5)}}>{profileData?.user_data?.name}</Text>
        <View style={{flexDirection:"row",alignItems:"center",top:hp(-5)}}>
        <Text style={{fontSize:hp(1.8),color:'#000',opacity:0.5,marginTop:hp(1),height:hp(4),}}>ID : {profileData?.user_data?.id}</Text>
        <View style={styles.signalListView}>
                <Image style={[styles.photoView,{marginRight:wp(-2)}]} source={sild}/>
                <Image style={[styles.photoView]} source={LevelDigit}/>
                </View>
        </View>

            <View style={{
              width:wp(45),
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'center',
              height:hp(8),top:hp(-5)
            }}>
              <View >
                <Text style={{fontSize:hp(2.6),color:'#000',fontWeight:'700',textAlign:'center'}}>0</Text>
                <Text style={{fontSize:hp(2),color:'#000',fontWeight:'400',textAlign:'center'}}>Fans</Text>
              </View>

              <View >
                <Text style={{fontSize:hp(2.6),color:'#000',fontWeight:'700',textAlign:'center'}}>0</Text>
                <Text style={{fontSize:hp(2),color:'#000',fontWeight:'400',textAlign:'center'}}>Following</Text>
              </View>
            </View>

            <View style={{
              width:'90%',
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'center',
              height:hp(8),top:hp(-5)
            }}>
             <TouchableOpacity style={{
              backgroundColor:'#1877F2',
              width:'48%',
              height:hp(5),
              borderRadius:hp(6),
              alignItems:'center',
              justifyContent:'center'
             }}>
              <Text style={{fontSize:hp(2.6),color:'#fff',fontWeight:'700',textAlign:'center'}}>Follow</Text>
             </TouchableOpacity>

             <TouchableOpacity style={{
              backgroundColor:'#fff',
              width:'48%',
              height:hp(5),
              borderRadius:hp(6),
              alignItems:'center',
              justifyContent:'center',
              borderColor:'#1877F2',
              borderWidth:1
             }} onPress={()=>onChattingAdd()}>
              <Text style={{fontSize:hp(2.6),color:'#1877F2',fontWeight:'700',textAlign:'center'}}>Chat</Text>
             </TouchableOpacity>
            </View>

          </View>
          </View>
          </Modal> */}
    </View>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#fff',
      width:'100%',
      alignSelf:'center',
    },
    bannerImage:{
        width:'100%',
        height:hp(13),
        resizeMode:'contain',
        
    },
    vipOption:{
      width:wp(6),
      height:hp(8),
      resizeMode:'contain',
  },
    listView:{
      flexWrap:'wrap',
      flexDirection:'row',
      width:'92%',
      alignSelf:"center",
      justifyContent:'space-between'
    },
    photoView:{
      width:"100%",
      height:hp(22),
      borderRadius:10,
    },
    bannerView:{
      width:"100%",
      height:hp(11),
      justifyContent:'flex-end',
      alignItems:'center',
    },
    headerOptionView:{
      width:"100%",
      height:hp(7),
      justifyContent:'space-between',
      alignItems:'center',
      flexDirection:"row",
      paddingHorizontal:wp(3),
      backgroundColor:"#0371FF"
    }
  });

export default HomeScreen;