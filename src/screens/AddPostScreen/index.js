import React,{useState} from "react";
import { View,Text,Image,StyleSheet,FlatList, TouchableOpacity,TextInput,Platform } from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import CountryPicker from 'react-native-country-picker-modal'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../components/Pixel/index';
import leftArrows from "../../assets/leftArrows.png";
import bike1 from "../../assets/bike1.png";
import bike2 from "../../assets/bike2.png";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {Loader} from '../../components/Loader.js'
import {onPostSubmitApi} from '../../services/Api.js'

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

const AddPostScreen = ({navigation}) => {
  const [about,setAbout] = useState('')
  const [loading, setLoading] = useState(false);
  const [profileImage,setProfileImage]= useState('')
  const [profile, setProfile] = useState(null);
  const [isLoading,setIsLoading] = useState(false)

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
        setLoading(true);
        if (response.didCancel) {
          console.log('User cancelled camera picker');
          setLoading(false);
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          console.log('Camera not available on device');
          setLoading(false);
          return;
        } else if (response.errorCode == 'permission') {
          console.log('Permission not satisfied');
          setLoading(false);
          return;
        } else if (response.errorCode == 'others') {
          console.log(response.errorMessage);
          setLoading(false);
          return;
        }
        setLoading(false);
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
          setProfile(imageData);
        }).catch((err)=>{
          console.log("Error:",err)
        })
      } catch (err) {
        setImageVisible(false);
      }
    }
  };

  const onSubmitData = async() => {
    try{
      setIsLoading(true)
      if(about==''){
        setIsLoading(false)
        alert('Please enter post discription.')
    }
    else if(profile==null){
      setIsLoading(false)
      alert('Please select image.')
  }
    else{
      var formdata = new FormData();
      formdata.append("post", profile);
      formdata.append("caption", about);

      const response = await onPostSubmitApi(formdata)
      console.log("Get Response:::",response.data)
                if(response.data.status){
                    console.log("Get Response:::",response.data)
                    setIsLoading(false)
                    navigation.goBack()
                }
                else{
                    setIsLoading(false)
                    alert(response.data.message)
                }
    }
     
    }
    catch(err){
      setIsLoading(false)
      console.log("Error:",err)
    }
  }

return(
  <>
    <View style={styles.container}>
          <View style={styles.bannerView}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image style={styles.leftArrow} source={leftArrows}/>
          </TouchableOpacity>
          <Text style={{fontSize:hp(2.6),color:'#fff',fontWeight:'700',marginLeft:wp(6)}}>New Post</Text>
         </View>
         <View style={styles.listView}>
         <View style={styles.loginButton2}>
         <TextInput
                value={about}
                onChangeText={(value)=>{setAbout(value)}}
                style={styles.textInputStyle1}
                multiline
                placeholder="Write a caption..."
                placeholderTextColor={'#fff'}
                />
                 </View>
            <View style={{height:hp(22),paddingHorizontal:wp(5)}}>
              <Image style={{width:wp(35),height:hp(20),borderRadius:10}} source={{uri:profileImage}} />
            </View>
                 <TouchableOpacity style={{
                  width:"100%",
                  height:hp(6),
                  borderBottomColor:'#9E26BC',
                  borderBottomWidth:2,
                  justifyContent:'center',
                  paddingHorizontal:wp(5)
                 }} onPress={()=>selectFile()}>
                  <Text style={{fontSize:hp(2),color:'#9E26BC',fontWeight:'500',marginLeft:wp(1)}}>Add Photo/Video</Text>
                 </TouchableOpacity>

                 <TouchableOpacity style={{
                  width:"96%",
                  height:hp(6),
                  justifyContent:'center',
                  alignItems:'center',
                  backgroundColor:'#9E26BC',
                  alignSelf:'center',
                  marginTop:hp(5),
                  borderRadius:hp(10)
                 }} onPress={()=>onSubmitData()}>
                 <Text style={{fontSize:hp(2),color:'#fff',fontWeight:'700',marginLeft:wp(1)}}>Submit</Text>
                 </TouchableOpacity>
         </View>
    </View>
    <Loader isLoading={isLoading} />
    </>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#0371FF',
      width:'100%',
      alignSelf:'center',
    },
    listView:{
      width:'100%',
      alignSelf:"center",
      flex:0.9,
      backgroundColor:"#fff"
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
      flexDirection:'row',
      flex:0.10,
      paddingTop:hp(2),
      paddingHorizontal:'4%'
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
    textInputStyle1:{
      width:'100%',
      fontSize:hp(1.8),
      fontWeight:'500',
      color:"#fff",
      marginLeft:wp(5)
  },
  loginButton2:{
    width:'90%',
    height:hp(15),
    backgroundColor:"#9E26BC",
    borderRadius:hp(2),
    alignSelf:"center",
    marginVertical:hp(2)
},
  });

export default AddPostScreen;