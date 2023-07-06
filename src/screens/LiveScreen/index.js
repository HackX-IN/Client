import React,{useState,useEffect} from "react";
import { View,Text,TouchableOpacity,Image,ImageBackground,StyleSheet,TextInput } from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import CountryPicker from 'react-native-country-picker-modal'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../components/Pixel/index';
  import liveButton from "../../assets/liveButton.png";
  import postButton from "../../assets/postButton.png";


  const appId= 'aa2b2d95b6fa4815bd6f1859c32c06fa';
  const channelName= 'test'; // your agora channel
  const token= null;

const LiveScreen = ({navigation,route}) => {
  randomUserID = String(Math.floor(Math.random() * 100000))
    const [isHost, setIsHost] = useState(true);
    const [peerIds,setPeerIds] = useState([])
    const [joinSucceed,setJoinSucceed] = useState(false)
    const [remoteUser,setRemoteUser] = useState(0)


        
        //  const init = async () => {
        //   console.log("Coming INIT")
        //     _engine = await RtcEngine.create(appId);
        //     await _engine.enableVideo();
        //     await _engine.enableAudio();
        //     await _engine?.setChannelProfile(ChannelProfile.LiveBroadcasting);
        //     await _engine?.setClientRole(
        //       isHost ? ClientRole.Broadcaster : ClientRole.Audience
        //     );
        //     console.log("Coming INIT",_engine)
        //     _engine.addListener('Warning', (warn) => {
        //       console.log('Warning', warn);
        //     });
        
        //     _engine.addListener('Error', (err) => {
        //       console.log('Error', err);
        //     });
        
        //     _engine.addListener('UserJoined', (uid, elapsed) => {
        //       console.log('UserJoined', uid, elapsed);
        //       // If new user
        //       if (peerIds.indexOf(uid) === -1) {
        //         setPeerIds([...peerIds, uid])
        
        //       }
        //     });
        //     _engine.addListener('UserOffline', (uid, reason) => {
        //       console.log('UserOffline', uid, reason);
        //       setPeerIds([...peerIds, uid])
        //     });
        
        //     // If Local user joins RTC channel
        //     _engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
        //       console.log('JoinChannelSuccess', channel, uid, elapsed);
        //       // Set state variable to true
        //     setJoinSucceed(true)
        //     });
        //   };
        
          const toggleRoll = async () => {
            console.log("Coming toggleRoll")
            // Join Channel using null token and channel name
            // setIsHost(!isHost),
              async () => {
                await _engine?.setClientRole(
                  isHost ? ClientRole.Broadcaster : ClientRole.Audience
                );
              }
              await _engine?.joinChannel(token, channelName, null, 0);
              navigation.navigate('LiveStreamingScreen',{token, channelName,peerIds,isHost})
          };                  
        
         const startCall = async () => {
          console.log("Coming startCall")
            // Join Channel using null token and channel name
            await _engine?.joinChannel(token, channelName, null, 0);
            setIsHost(!isHost)
            navigation.navigate('LiveStreamingScreen',{token, channelName,peerIds,isHost})
          };
        
          const endCall = async () => {
            await _engine?.leaveChannel();
            setPeerIds([])
            setJoinSucceed(false)
          };


return(
    <View style={styles.container}>
        <View style={styles.buttonView}>
       <TouchableOpacity onPress={()=>navigation.navigate('LiveStreamingScreen',{isHost:isHost,randomUserID:randomUserID})}>
            <Image source={liveButton} style={styles.arrowImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('AddPostScreen')}>
            <Image source={postButton} style={styles.postImage} />
        </TouchableOpacity>
        </View>
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
      alignItems:'center',
      justifyContent:'center'
    },
    arrowImage:{
        width:wp(24),
        height:hp(25),
        resizeMode:'contain'
    },
    postImage:{
        width:wp(25),
        height:hp(27),
        resizeMode:'contain'
    },
    buttonView:{
        flexDirection:'row',
        width:"64%",
        alignSelf:'center',
        alignItems:"center",
        justifyContent:"space-between"
    }
  });

export default LiveScreen;