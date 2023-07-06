import React,{useState,useEffect} from "react";
import { View,Text,TouchableOpacity,Image,StyleSheet,FlatList,ScrollView,Platform,Modal } from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import CountryPicker from 'react-native-country-picker-modal'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../components/Pixel/index';
  import walletIcon from "../../assets/walletIcon.png";
  import post from "../../assets/post.png";
  import game from "../../assets/game.png";
  import level from "../../assets/level.png";
  import store from "../../assets/store.png";
  import Logout from "../../assets/Logout.png";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import {onGetUserApi,onUploadImageApi} from '../../services/Api.js'
  import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
  import ImagePicker from 'react-native-image-crop-picker';
  import lock from "../../assets/lock.png";
  import cashPayment from "../../assets/cashPayment.png";
  import comingSoon from "../../assets/comingSoon.png";
  import diamond from "../../assets/diamond.png";
  import information from "../../assets/information.png";
  import leftArrows from "../../assets/leftArrows.png";
  import LevelDigit from "../../assets/LevelDigit.png";
  import sild from "../../assets/sild.png";
const buttonArray=[
  {
    name:'Wallet',
    image:walletIcon
  },
  {
    name:'Post',
    image:post
  },
  {
    name:'Game',
    image:game
  },
  {
    name:'Level',
    image:level
  },
  {
    name:'Store',
    image:store
  },
  {
    name:'Privacy Policy',
    image:lock
  },
  {
    name:'About us',
    image:information
  },
  {
    name:'Free Diamond',
    image:diamond
  },
  {
    name:'Cash Out',
    image:cashPayment
  },
  {
    name:'Coming Soon',
    image:comingSoon
  },
  {
    name:'Log Out',
    image:Logout
  }
]

const ProfileScreen = ({navigation}) => {
  const [profileData,setProfileData] = useState(null)
    const [profileImage,setProfileImage]= useState('')
    const [profile, setProfile] = useState(null);
    const [refresh,setRefresh] = useState(false)

  useEffect(()=>{
    const subscribe = navigation.addListener('focus',()=>{
      onGetUserData()
    })
  },[])
  
  const onGetUserData = async() => {
    try{
      const response = await onGetUserApi()
      console.log("Get Response",response.data.data[0].storeItems)
      if(response.data.success){
        setProfileData(response.data.data[0])
        console.log("Get PRofile::::",response.data.data[0]?.photo)
        if(response.data.data[0]?.photo!=""){
          setRefresh(!refresh)
          setProfileImage(`https://live-stream-lovely.onrender.com/profile_images/${response.data.data[0]?.photo}`)
      }
      }
    }
    catch(err){
      console.log('Error:',err)
    }
  }

  const selectFile = async () => {
    if (Platform.OS == 'ios') {
      let options = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
      };
      launchImageLibrary(options, response => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled camera picker');
             return;
        } else if (response.errorCode == 'camera_unavailable') {
          console.log('Camera not available on device');
            return;
        } else if (response.errorCode == 'permission') {
          console.log('Permission not satisfied');
            return;
        } else if (response.errorCode == 'others') {
          console.log(response.errorMessage);
              return;
        }

          setProfile(response.assets);
      });
    } else {
      try {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {
          console.log(image);
          var filename = image.path.substring(image.path.lastIndexOf('/') + 1);
          setProfileImage(image.path)
          let imageData={
            uri: image.path,
            type: image.mime,
            name: filename,
          }
          // setProfile(response.data.image)
          setProfile(imageData);
            onImageUpload(imageData)
        }).catch((err)=>{
          console.log("Error:",err)
        })
      } catch (err) {
      }
    }
  };

  const onImageUpload = async(imageData) =>{
  try{
    var formdata = new FormData();
    formdata.append("profile_image", imageData);

    const response = await onUploadImageApi(formdata)
    console.log("Get Response",response.data)
  }
  catch(err){
    console.log("Error:",err)
  }
  }

const onClickButton = async(from)=>{
  if(from=='Wallet'){
    navigation.navigate('DiamondScreen')
  }
  else if(from=='Post'){

  }
  else if(from=='Game'){
    navigation.navigate('GameScreen')
  }
  else if(from=='Level'){
    navigation.navigate('LevelScreen')
  }
  else if(from=='Store'){
    navigation.navigate('StoreScreen')
  }
  else if(from=='Privacy Policy'){

  }
  else if(from=='About us'){

  }
  else if(from=='Free Diamond'){
    navigation.navigate('FreeCoinScreen')
  }
  else if(from=='Cash Out'){

  }
  else if(from=='Coming Soon'){

  }
  else if(from=='Log Out'){
    AsyncStorage.setItem('token','')
    navigation.navigate('AuthStack')
  }
}

const renderItem=({item,index})=>{
  return(
    <TouchableOpacity style={{
      flexDirection:'row',
      alignItems:'center',
      height:hp(8),
      borderBottomWidth:1,
      borderBottomColor:'#DADADA'
    }} onPress={()=>onClickButton(item.name)}>
      {item.name=='Privacy Policy'||item.name=='About us'?
      <Image style={{width:wp(7),height:hp(4),resizeMode:'contain',tintColor:'#fff'}} source={item.image} />
      :
      item.name=='Log Out'?
      <Image style={{width:wp(8),height:hp(5),resizeMode:'contain',tintColor:'#fff',marginLeft:wp(1)}} source={item.image} />
      :
      <Image style={{width:wp(8),height:hp(6),resizeMode:'contain',tintColor:'#fff'}} source={item.image} />
  }
      <Text style={{fontSize:hp(2),color:'#fff',marginLeft:wp(4)}}>{item?.name}</Text>
    </TouchableOpacity>
  )
}

return(
    <View style={styles.container}>
      <View style={{width:wp(40),borderBottomWidth:1,height:hp(4),alignSelf:'center',borderBottomColor:'#fff'}}>
      <Text style={{textAlign:"center",fontSize:hp(2.4),color:'#fff',fontWeight:'700'}}>Profile</Text>
      </View>
      <View style={{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
        marginVertical:hp(2),
        height:hp(12),
      }}>
        <TouchableOpacity onPress={()=>selectFile()}>
          {profileImage==''?
          <View style={{
            backgroundColor:'#9E26BC',
            width:90,
            height:100,
            borderRadius:100,
            alignItems:'center',
            justifyContent:"center"
          }}>
          <Image style={{width:wp(15),height:hp(10),resizeMode:"contain"}} source={require('../../assets/logo.png')} />
          </View>
          :
          <Image style={{width:90,height:90,borderRadius:90}} source={{uri:profileImage}} />
        }
        
        </TouchableOpacity>
        <View style={{width:'50%'}}>
        <Text style={{fontSize:hp(2.6),color:'#fff',fontWeight:'700'}}>{profileData?.name}</Text>
        <View style={{flexDirection:"row",alignItems:"center"}}>
        <Text style={{fontSize:hp(1.8),color:'#fff',opacity:0.5,marginTop:hp(1),height:hp(4),}}>ID : {profileData?.id}</Text>
        <View style={styles.signalListView}>
                <Image style={[styles.photoView,{marginRight:wp(-2)}]} source={sild}/>
                <Image style={[styles.photoView]} source={LevelDigit}/>
                </View>
        <Image style={{width:wp(6),height:hp(3),resizeMode:'contain',marginLeft:wp(2)}} source={require('../../assets/flag.png')} />
        </View>
        </View>
        <TouchableOpacity style={{height:'100%',flexDirection:"row",justifyContent:'center',width:'20%'}} onPress={()=>navigation.navigate('EditProfileScreen')}>
        <Text style={{textAlign:"center",fontSize:hp(2),color:'#fff',marginTop:hp(1),opacity:0.5}}>Edit</Text>
        <Image style={{width:wp(7),height:hp(4),resizeMode:'contain',marginLeft:wp(2)}} source={require('../../assets/edit.png')} />
        </TouchableOpacity>
      </View>
        <View style={{
          width:'100%',
          alignSelf:'center',
          borderWidth:1,
          borderColor:'#fff',
          height:hp(8),
          borderRadius:10,
          flexDirection:'row',
          alignItems:"center",
          justifyContent:'center'
        }}>
          <TouchableOpacity onPress={()=>{navigation.navigate('FanListScreen')}} style={{
            width:'25%',
            alignItems:"center",
          justifyContent:'center',
          height:hp(4),
          borderRightColor:'#fff',
          borderRightWidth:1
          }}>
            <Text style={{fontSize:hp(2),color:'#fff',fontWeight:'700'}}>0</Text>
            <Text style={{fontSize:hp(2),color:'#fff',fontWeight:'700'}}>Fan</Text>
          </TouchableOpacity>

          <View style={{
            width:'25%',
            alignItems:"center",
          justifyContent:'center',
          height:hp(4),
          borderRightColor:'#fff',
          borderRightWidth:1
          }}>
            <Text style={{fontSize:hp(2),color:'#fff',fontWeight:'700'}}>0</Text>
            <Text style={{fontSize:hp(2),color:'#fff',fontWeight:'700'}}>Following</Text>
          </View>

          <View style={{
            width:'25%',
            alignItems:"center",
          justifyContent:'center',
          height:hp(4),
          borderRightColor:'#fff',
          borderRightWidth:1
          }}>
            <Text style={{fontSize:hp(2),color:'#fff',fontWeight:'700'}}>0</Text>
            <Text style={{fontSize:hp(2),color:'#fff',fontWeight:'700'}}>Send</Text>
          </View>

          <View style={{
            width:'25%',
            alignItems:"center",
          justifyContent:'center',
          height:hp(4),
          }}>
            <Text style={{fontSize:hp(2),color:'#fff',fontWeight:'700'}}>0</Text>
            <Text style={{fontSize:hp(2),color:'#fff',fontWeight:'700'}}>Received</Text>
          </View>
        </View>
      <FlatList 
      data={buttonArray}
      renderItem={renderItem}
      keyExtractor={(item,index)=>index.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:hp(10)}}
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
        paddingHorizontal:'5%',
        paddingTop:hp(6)
      },
      signalListView:{
        flexDirection:"row",
        alignItems:'center',
        marginLeft:wp(2)
      },
      photoView:{
        width:wp(7),
        height:hp(5),
        resizeMode:'contain'
      },

      centeredView: {
        flex: 1,
        width: '100%',
      },
      modalView: {
        position: 'absolute',
        bottom: 0,
        paddingVertical: 15,
        height: hp(26),
        paddingVertical: hp(2),
        paddingHorizontal: wp(5),
    
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalView1: {
        position: 'absolute',
        bottom: 0,
        paddingVertical: 15,
        height: hp(39),
        paddingVertical: hp(2),
        paddingHorizontal: wp(5),
        alignItems:'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
  });

export default ProfileScreen;