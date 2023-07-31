import React,{useState,useEffect,useRef} from "react";
import { View,Text,TouchableOpacity,Image,ImageBackground,StyleSheet,TextInput,ScrollView,PermissionsAndroid,Platform,findNodeHandle,Modal, FlatList,BackHandler,Alert, Share } from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import CountryPicker from 'react-native-country-picker-modal'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../components/Pixel/index';
  import coin from "../../assets/coin.png";
  import cancelButton from "../../assets/cancelButton.png";
  import crown1 from "../../assets/crown1.png";
  import crown2 from "../../assets/crown2.png";
  import crown3 from "../../assets/crown3.png";
  import mute from "../../assets/mute.png";
  import viewer from "../../assets/viewer.png";
  import userViewProfile from "../../assets/userViewProfile.png";
  import plan from "../../assets/plan.png";
  import gift from "../../assets/gift.png";
  import list2 from "../../assets/list2.png";
  import downArrow from "../../assets/downArrow.png";
  import chair1 from "../../assets/chair1.png";

  import {
    onGetUserApi,
    onAddLiveStreamingApi,
    SendGiftApi,
    onLiveLiveStreamingApi,
    onKickDownApi,
    onRequestUserApi,
    onSendCoinApi,
    onBlockUserApi,
    onDeleteLiveStreamingApi,
    onRemoveWatchUserApi,
    onGetUserAcceptRequestApi,
    onGetUserPendingRequestApi,
    onGetStoreItemsApi,
    onGetWatchLiveStreamingApi,
    onUpdatePendingRequestApi,
    onSendMessageApi,
    onGetMessageApi,
    onGetKickOutApi,
    onMakeAdminApi,
    FollowUserApi,
    unFollowUserApi,
    getFollowersApi,
    getFollowingApi
  } from '../../services/Api.js'
  import image1 from "../../assets/image1.png";
  import adminPanel from "../../assets/adminPanel.png";
  import flip from "../../assets/flip.png";
  import gameController from "../../assets/gameController.png";
  import bandit from "../../assets/bandit.png";
  import messageIcon from "../../assets/messageIcon.png";
  import plus from "../../assets/plus.png";
  import commentIcon from "../../assets/commentIcon.png";
  import send from "../../assets/send.png";
  import callEnd from "../../assets/callEnd.png";
  import unSelectedIcons from "../../assets/unSelectedIcons.png";
  import selectedIcons from "../../assets/selectedIcons.png";
  import LevelDigit from "../../assets/LevelDigit.png";
  import sild from "../../assets/sild.png";
  import invite from "../../assets/invite.png";
  import kick from "../../assets/kick.png";
  import muteIcon from "../../assets/muteIcon.png";
  import block from "../../assets/block.png";
  import admin from "../../assets/admin.png";
  import emoji from "../../assets/emoji.png";
  import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
  import {
    Send,
    Bubble,
    Actions,
    Composer,
    GiftedChat,
    SystemMessage,
  } from 'react-native-gifted-chat';
  // import ZegoUIKitPrebuiltLiveStreaming, { HOST_DEFAULT_CONFIG, ZegoMenuBarButtonName,AUDIENCE_DEFAULT_CONFIG} from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';
  // import * as ZIM from 'zego-zim-react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Swiper from "react-native-swiper";
  import CountPopup from '../../components/CountPopup'
  import firestore from '@react-native-firebase/firestore';
  import { useIsFocused } from '@react-navigation/native';
  // import ZegoExpressEngine from 'zego-express-engine-reactnative';
  // import ZegoExpressEngine, {ZegoTextureView, ZegoMixerTask, ZegoAudioConfig, ZegoAudioConfigPreset, ZegoMixerInputContentType, ZegoScenario} from 'zego-express-engine-reactnative';
  import {
    ClientRoleType,
    createAgoraRtcEngine,
    IRtcEngine,
    RtcSurfaceView,
    ChannelProfileType,
    VideoContentHint,
    

VideoSourceType,
LocalVideoStreamState,
LocalVideoStreamError,
RenderModeType,

  } from 'react-native-agora';

  // let _engine=null;
  const db = firestore();
  // const granted = (Platform.OS == 'android' ? PermissionsAndroid.check(
  //   PermissionsAndroid.PERMISSIONS.CAMERA,
  //   PermissionsAndroid.RECORD_AUDIO) : undefined);

const giftArray = [{
  id:1,
  name:'Aeroplane',
  coin:1000
},
{
  id:2,
  name:'Aeroplane',
  coin:3000
},
{
  id:3,
  name:'Aeroplane',
  coin:5000
},
{
  id:4,
  name:'Aeroplane',
  coin:10000
},
{
  id:5,
  name:'Aeroplane',
  coin:50000
},
{
  id:6,
  name:'Aeroplane',
  coin:100000
},
{
  id:7,
  name:'Aeroplane',
  coin:150000
},
{
  id:8,
  name:'Aeroplane',
  coin:200000
},
{
  id:9,
  name:'Aeroplane',
  coin:500000
},
{
  id:10,
  name:'Aeroplane',
  coin:700000
},
{
  id:11,
  name:'Aeroplane',
  coin:1000000
},
{
  id:12,
  name:'Aeroplane',
  coin:1500000
}
]

const countArray = [{
  id:1,
  coin:1
},
{
  id:2,
  coin:10
},
{
  id:3,
  coin:30
},
{
  id:4,
  coin:50
},
{
  id:5,
  coin:100
}
]

const callListArray = [
  {
    name:'yash vaishnani',
    image:image1
  },
  {
    name:'test user',
    image:image1
  }
]
const waitingList = [
  {
    name:'yash vaishnani',
    image:image1
  },
  {
    name:'test user',
    image:image1
  }
]

const appId ='0ae27364b6cc482ba748420b9402a35c';
const channelName ='livey';
const token ='007eJxTYLj85tHX83X7fSqquS3Xsc68da1zQXLC2dCf85yuNS++fMNSgcEgMdXI3NjMJMksOdnEwigp0dzEwsTIIMnSxMAo0dg0Wap5XUpDICPD7FezmRkZIBDEZ2XIySxLrWRgAAB72yMi';
const uid = 0;

const getPermission = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
  }
};


let time=0;
const LiveStreamingScreen = ({navigation,route}) => {
  const scrollViewRef = useRef(null);
 
  const agoraEngineRef = useRef(IRtcEngine);
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [audience, setAudience] = useState(false);
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(''); // Message to the user
  const [isCoHost, setIsCoHost] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true); // Indicates if the camera is on
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
     const[isSpeakerOn,setIsSpeakerOn]=useState(true)
    const [isHost, setIsHost] = useState(route.params.isHost);
    const [joinSucceed,setJoinSucceed] = useState(false)
    const [userId,setUserId] = useState('0')
    const [userData,setUserData] = useState(null)
    const [giftView,setGiftView] = useState(false)
    const [modalVisible,setModalVisible] = useState(false)
    const [count,setCount] = useState(1)
    const [arrayCount,setArrayCount] = useState([])
    const [arrayCoin,setArrayCoin] = useState([])
    const [selectCoin,setSelectCoin] = useState(0)
    const [refresh,setRefresh] = useState(false)
    const [isHost1, setIsHost1] = useState(true);
    const [cameraEnable,setCameraEnable] = useState(true)
    const [moreButton,setMoreButton] = useState(false)
    const [speakerEnable,setSpeakerEnable] = useState(true)
    const [beautyCam,setBeautyCam] = useState(false)
    const [flipCamera,setFlipCamera] = useState(true)
    const [hours,setHours] = useState(0)
    const [mins,setMins] = useState(0)
    const [liveId,setLiveId] = useState('')
    const [comment,setComment] = useState('')
    const [joinUser,setJoinUser] = useState(false)
    const [callList,setCallList] = useState(false)
    const [callingList,setCallingList] = useState([])
    const [waitList,setWaitList] = useState([])
    const [listingVisible,setListingVisible] = useState(false)
    const [messagesList,setMessageList] = useState([])
    const [storeImage,setStoreImage] = useState('')
    const [profileModal,setProfileModal] = useState(false)
    const [profileData,setProfileData] = useState(null)
    const [watchList,setWatchList] = useState(null)
    const [coinSendId,setCoinSendId] = useState('')
    const [popupOpen,setPopupOpen] = useState(false)
    const [kickOutModal,setKickOutModal] = useState(false)
    const [kickOutList,setKickOutList] = useState(false)
    const isFocused = useIsFocused();
    const [messages, setMessages] = useState([]);
    const [storeVisible,setStoreVisible] = useState(false)
    const [giftOptionSelect,setGiftOptionSelect] = useState('')
    const [coHostRequests, setCoHostRequests] = useState([]);
     const[Followed,setFollowed] = useState(false)
    const [startScreenCaptureBool, setScreenCapture] = useState(false); // Start screen capture
    const [isScreenSharing, setIsScreenSharing] = useState(false);  
    const [followers, setFollowers] = useState(0); 
    const [following, setFollowing] = useState(0);
    
    useEffect(() => {
      // Initialize Agora engine when the app starts
      const subscribe = navigation.addListener('focus',()=>{
        setupVideoSDKEngine();
        setTimeout(()=>{
            join()
          },3000)
      })
     return subscribe;
    }, []);
   

    const setupVideoSDKEngine = async () => {
      try {
        // use the helper function to get permissions
        if (Platform.OS === 'android') { await getPermission()};
        agoraEngineRef.current = createAgoraRtcEngine();

        const agoraEngine = agoraEngineRef.current;
        agoraEngine.initialize({
          appId: appId,
          channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      
        agoraEngine.registerEventHandler({
            onJoinChannelSuccess: (uid) => {
                showMessage('Successfully joined the channel ' + channelName);
                setIsJoined(true);
                
            },
            
            onUserJoined: (_connection, Uid) => {
                showMessage('Remote user joined with uid ' + Uid);
                console.log('Remote user joined with UID:', Uid);
                setRemoteUid(Uid);
               
                
            },
            onUserOffline: (_connection, Uid) => {
                showMessage('Remote user left the channel. uid: ' + Uid);
                setRemoteUid(0);
                
            },
            onLocalVideoStateChanged(
              source,
              state,
              _error
          ) {
              if (source === VideoSourceType.VideoSourceScreen) {
              switch (state) {
                  case LocalVideoStreamState.LocalVideoStreamStateStopped:
                  case LocalVideoStreamState.LocalVideoStreamStateFailed:
                  break;
                  case LocalVideoStreamState.LocalVideoStreamStateCapturing:
                  case LocalVideoStreamState.LocalVideoStreamStateEncoding:
                  setScreenCapture(true);
                  break;
              }
              }
          },
          
        });
      
  if (Platform.OS === 'android') {
    agoraEngine.loadExtensionProvider('agora_screen_capture_extension');
  }

        agoraEngine.enableVideo();

        
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(()=>{

    })

    const desiredWidth = 1280; // Desired video width
const desiredHeight = 720; // Desired video height
const desiredFrameRate = 30; // Desired video frame rate
const desiredBitrate = 2000; // Desired video bitrate in Kbps
const desiredContentHint = VideoContentHint.VideoContentHintDetail; // Desired video content hint (e.g., detail or motion)

const desiredSampleRate = 48000; // Desired audio sample rate
const desiredChannels = 2; // Desired audio channels (e.g., stereo)
const desiredCaptureSignalVolume = 100; // Desired audio capture signal volume (0-100)

    const startScreenCapture = () => {
      const videoParams = {
        dimensions: { width: desiredWidth, height: desiredHeight },
        frameRate: desiredFrameRate,
        bitrate: desiredBitrate,
        contentHint: desiredContentHint,
      };
    
      const audioParams = {
        sampleRate: desiredSampleRate,
        channels: desiredChannels,
        captureSignalVolume: desiredCaptureSignalVolume,
      };
    
      agoraEngineRef.current?.startScreenCapture({
        captureVideo: true,
        captureAudio: true,
        videoParams,
        audioParams,
      });
    
      agoraEngineRef.current?.startPreview();
      setScreenCapture(true);
      setIsScreenSharing(true);
    };
    
    
    const stopScreenSharing = () => {
      agoraEngineRef.current?.stopScreenCapture();
      setScreenCapture(false);
      setIsScreenSharing(false);
    };
    
    const getFollowers = async () => {
      try {
        const response = await getFollowersApi();
        const followersCount = response.data.data.length;
        console.log("Number of Followers", followersCount);
        setFollowers(followersCount);
      } catch (error) {
        console.log("Error Get Followers", error);
      }
    };
    
    const getFollowingUsers = async () => {
      try {
        const response = await getFollowingApi();
        const followingCount = response.data.data.length;
        console.log("Number of Followings", followingCount);
        setFollowing(followingCount);
      } catch (error) {
        console.log("Error Get Followings", error);
      }
    };
    
    // Function to toggle the camera on and off
    const toggleCamera = () => {
      setIsCameraOn((prevCameraState) => !prevCameraState); // Toggle the camera state
    
      agoraEngineRef.current?.enableLocalVideo(!isCameraOn); // Enable or disable local video based on the current camera state
    };
    const toggleSpeaker = () => {
      setIsSpeakerOn((prevSpeakerState) => !prevSpeakerState); // Toggle the speaker state
      
      agoraEngineRef.current?.setEnableSpeakerphone(!isSpeakerOn); // Enable or disable the speaker based on the current speaker state
    };
    
    
    

   
    var isMuted = false;
    const mute = () => {
      isMuted = !isMuted;
      agoraEngineRef.current?.muteRemoteAudioStream(remoteUid, isMuted);
  };


  
  const join = async () => {
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(ChannelProfileType.ChannelProfileLiveBroadcasting);
  
      if (isHost) {
        agoraEngineRef.current?.startPreview();
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster
        });
       
      } else {
        agoraEngineRef.current?.enableVideo();
        agoraEngineRef.current?.startPreview();
  
        // Call the function to publish the video for the audience
       
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleAudience
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  

    const callListArray = [
  { uid: remoteUid, name: 'John' },
  
  // Add more audience members as needed
]

  
    const leave = () => {
      try {
        agoraEngineRef.current?.leaveChannel();
        setRemoteUid(0);
        setIsJoined(false);
        showMessage('You left the channel');
      } catch (e) {
        console.log(e);
      }
    };
  
    const showMessage = (msg) => {
      setMessage(msg);
    };
  

   

    const getWatchList = async(id) =>{
     const response = await onGetWatchLiveStreamingApi(id)
      if(response.data.status){
       setWatchList(response.data.data[0])
      }
    }

useEffect(()=>{
  if(route.params.isHost){
   let timer = setInterval(() => {
    time=time+1
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time - minutes * 60 - hours * 3600;
    
    setHours(seconds < 11 ? `0${seconds}` : seconds)
    setMins(minutes < 11 ? `0${minutes}` : minutes)
    }, 1000);
   
  }
},[])
useEffect(()=>{
  const subscribe = navigation.addListener('focus',()=>{
    if(!route.params.isHost){
      setInterval(() => {
        getWatchList(route.params?.live)
        onGetCoHostAccept()
        onMessageGet(route.params?.live)
        // onMessageGet(route.params?.live)
        // getKickOut()
        
      }, 1000);
      setLiveId(route.params?.live)
    }
  })
})


const getKickOut= async()=>{
  const response = await onGetKickOutApi()
}

useEffect(()=>{
  const subscribe = navigation.addListener('focus',()=>{
    onGetUserData1()
  })
},[])

const onGetUserData1 = async() => {
  try{
    const response = await onGetUserApi()
    console.log("Get Response",response.data.data[0])
    onGetStoreData(response.data.data[0])
  }
  catch(err){
    console.log('Error:',err)
  }
}

const onGetStoreData = async(from) => {
  try{
    const response = await onGetStoreItemsApi()
    console.log("Get Response",response.data)
 
    let data=response.data.data
    console.log("Get data Store",from)
    from.storeItems.map((item1,index1)=>{
      console.log("Get data Image Store>>>>>>>>>>>",item1)
    data.map((item,index)=>{
      // console.log("Get filter",diff)
     if(item1.storeId==item._id){
      if(item1.inUse){
        setStoreVisible(true)
        setStoreImage(`http://13.233.70.37:8008/store/${item.storeUrl}`)
        setTimeout(()=>{
          setStoreVisible(false)
        },10000)
        console.log("Get data Image Store>>>>>>>>>>>",item1)
        
      }
     }
      })
    })
  }
  catch(err){
    console.log('Error:',err)
  }
}

const onGetUserJoinRequest = async()=>{
  try{
    setListingVisible(true)

    const response = await onGetUserPendingRequestApi(liveId)
    console.log("GEt Data:::",response.data.data)
    setWaitList(response.data.data)
  }
 catch(err){
  console.log("error",err)
 }
}

const onGetUserJoinRequestAccept = async()=>{
  try{
    setListingVisible(false)
    const response = await onGetUserAcceptRequestApi(liveId)
    setCallingList(response.data.data)
  
  }
 catch(err){
  console.log("error",err)
 }
}

const onGetCoHostAccept = async()=>{
  try{
    setListingVisible(false)
    const response = await onGetUserAcceptRequestApi(route.params?.live)
    setCallingList(response.data.data)
    if(response.data.data.length>0){
      response.data.data.map((item,index)=>{
        if(item.user[0]?._id==userData?._id){
          setJoinUser(true)
        
        }
      })
    } 
   
  }
 catch(err){
  console.log("error",err)
 }
}


    const onGetUserData = async() => {
      try{
        const response = await onGetUserApi()
        setUserData(response.data.data[0])
      }
      catch(err){
        console.log('Error:',err)
      }
    }

    useEffect(()=>{
      setIsHost(route.params.isHost)
        init()
        setInterval(()=>{
          onGetUserData()
        },1000)
        
        setArrayCoin(giftArray)
        setArrayCount(countArray)
       
        },[])
        
         const init = async () => {
          try{
            if(route.params.isHost){
              const authToken = await AsyncStorage.getItem('token');
  
          
              var raw = JSON.stringify({
                userId: authToken,
                liveUniqueId: route.params.randomUserID,
                channelName: 'testLiveID'
              });
              console.log("Response Lve Streaming",raw)
               const response =await onAddLiveStreamingApi(raw)
               console.log("Response Lve Streaming",response.data.data._id)
               setRefresh(!refresh)
               setLiveId(response.data.data._id)
             
               setInterval(() => {
                getWatchList(response.data.data._id)
                
              }, 1000); 
            }
          }
        catch(err){
          console.log("Response Lve Streaming",err)
        }
         
          };
        
          const onSendCoin = async () => {
            
            setGiftView(false)
            if(coinSendId!=''){
              const authToken = await AsyncStorage.getItem('token');
  
          
              var raw = JSON.stringify({
                sender: authToken,
                receiver: coinSendId,
                coin: selectCoin*count
              });
               const response =await SendGiftApi(raw)
               console.log("Response Lve Streaming",response.data)
                  setGiftView(false)
            }
            else{
              Alert.alert("",'Please select user first.')
            }
            };


            const onClickAdmin = async () => {
            
              var raw = JSON.stringify({
                userId: profileData?._id,
                liveId: liveId,
                status: true
              });
               const response =await onMakeAdminApi(raw)
               console.log("Response Lve Streaming",response.data)
                  
            }
            
            const followUser = async () => {
              const followFrom = userData?._id;
              const followTo = liveId;
            
              if (followFrom === followTo) {
                // User cannot follow themselves
                return;
              }
            
              const raw = JSON.stringify({
                following_from: followFrom,
                following_to: followTo,
              });
            
              try {
                const response = await FollowUserApi(raw);
                console.log("Response Follow User", response.data);
                setFollowed(true);
                getFollowers();
                getFollowingUsers();
              } catch (error) {
                console.log("Error Follow User", error);
              }
            };
            
            const unFollowUser = async () => {
              const followFrom = userData?._id;
              const followTo = liveId;
            
              if (followFrom === followTo) {
                // User cannot unfollow themselves
                return;
              }
            
              const raw = JSON.stringify({
                following_from: followFrom,
                following_to: followTo,
              });
            
              try {
                const response = await unFollowUserApi(raw);
                console.log("Response Unfollow User", response.data);
            
                setFollowed(false);
              } catch (error) {
                console.log("Error Unfollow User", error);
              }
            };
            
              


          const onSelectGender = (index,item) =>{
            let arrayList=arrayCount
            arrayList.map((item1,index1)=>{
                if(index1==index){
                    arrayList[index1].selected=true
                }
                else{
                    arrayList[index1].selected=false
                }
            })
            setGiftView(true)
            setCount(item.coin)
            setModalVisible(false)
            setRefresh(!refresh)
            setArrayCount(arrayList)
         }


         const onSelectCoin = (index,item) =>{
          let arrayList=arrayCoin
          arrayList.map((item1,index1)=>{
              if(index1==index){
                  arrayList[index1].selected=true
              }
              else{
                  arrayList[index1].selected=false
              }
          })
          setGiftView(true)
          setSelectCoin(item.coin)
          setModalVisible(false)
          setRefresh(!refresh)
          setArrayCoin(arrayList)
       }


       const removeLiveStreaming = async () => {
        try {
          const authToken = await AsyncStorage.getItem('token');
          const response = await onDeleteLiveStreamingApi(authToken, route.params.live);
          console.log("Response Live Streaming", response.data);
          agoraEngineRef.current?.leaveChannel();
          // Reset the time variable to 0 or perform any additional necessary actions
          time = 0;
          navigation.goBack()
          
        } catch (error) {
          console.error(error);
          // Handle any errors that occur during the API request or response handling
        }
      };
      


// useEffect(() => {
//   if (isFocused && route?.name == 'LiveStreamingScreen') {
//     const handleBackPress = () => {
//       Alert.alert(
//         'Live Streaming',
//         'Are you sure you want to end live streaming?',
//         [
//           { text: 'No', onPress: () => { }, style: 'cancel' },
//           { text: 'Yes', onPress: () => {route.params?.isHost?removeLiveStreaming():removeWatchingUser()} },
//         ],
//         { cancelable: false },
//       );
//       return true; // Prevent default behavior
//     };
    
//     // BackHandler.addEventListener('hardwareBackPress', handleBackPress);
//      return () => {
//       BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
//     };
//   }
// }, [isFocused, route?.name]);

const closePress = async () => {
  Alert.alert(
    'Live Streaming',
    'Are you sure you want to end live streaming?',
    [
      { text: 'No', onPress: () => {}, style: 'cancel' },
      {
        text: 'Yes',
        onPress: async () => {
          await new Promise((resolve) => setTimeout(resolve, 200)); // Delay for 200 milliseconds (adjust as needed)
          if (route.params?.isHost) {
            removeLiveStreaming();
          } else {
            removeWatchingUser();
          }
        },
      },
    ],
    { cancelable: false },
  );
};


const removeWatchingUser = async () => {
  try {
    const authToken = await AsyncStorage.getItem('token');
    const requestData = {
      userId: authToken,
      liveId: route.params.live,
    };

    const response = await onRemoveWatchUserApi(requestData);
    console.log("Response Live Streaming", response.data);
    agoraEngineRef.current?.leaveChannel();
    navigation.goBack();
    
    
  } catch (error) {
    console.error(error);
    // Handle any errors that occur during the API request or response handling
  }
};


const onCameraOn=async()=>{
  agoraEngineRef.current?.enableCamera();
  agoraEngineRef.current?.enableVideo();
  agoraEngineRef.current?.switchCamera();
  setCameraEnable(true)

}


const onBeautifyCam = () => {
  agoraEngineRef.current?.setBeautyEffectOptions(true, {
    lighteningContrastLevel:0.5,
    lighteningLevel: 0.7,
    smoothnessLevel: 0.5,
    rednessLevel: 0.1
  });
};


const onCameraFlip=async()=>{
  agoraEngineRef.current?.switchCamera();

    setFlipCamera(!flipCamera)
    // onClickA()
 
}
const onMessageSend = async () => {
  const newMessage = {
    userId: userData._id,
    userPhoto: userData.photo,
    userName: userData.name,
    comment: comment,
  };

  console.log("Request Message:", newMessage);

  const updatedMessages = [...messagesList, newMessage];
  console.log("Updated Messages:", updatedMessages);

  try {
    await onSendMessageApi(updatedMessages); // Send the updated messages array to the API

    if (agoraEngineRef.current) {
      const data = JSON.stringify(updatedMessages);
      agoraEngineRef.current.sendStreamMessage(0, data, data.length);
    }

    console.log("Updated Messages:", updatedMessages);
    setMessageList(updatedMessages);
    setComment('');
  } catch (error) {
    console.log("Error sending message:", error);
    // Handle the error if needed
  }
};

const onMessageGet = async (id) => {
  try {
    const sendMessageResponse = await onGetMessageApi(id);
    const responseData = sendMessageResponse.data; 
  
    const data = responseData.data;
    const slicedData = data.slice(Math.max(data.length - 5, 0));
    setRefresh(!refresh);
    setMessageList(slicedData);
  } catch (error) {
    console.log("Get Error:", error);
  }
};


const onJoinRoom = async() => {
  const authToken = await AsyncStorage.getItem('token');
  var raw = JSON.stringify({
    userId: authToken,
    liveId: route.params.live,
  });
   const response =await onRequestUserApi(raw)

   console.log("Response Lve Streaming",response.data)

}

const onSend = (giftedChatMessages) => {
  const agoraMessages = giftedChatMessages.map((giftedChatMessage
    
  ) => ({
    _id: giftedChatMessage._id,
    text: giftedChatMessage.text,
    createdAt: giftedChatMessage.createdAt,
    user: giftedChatMessage.user,
  }));
  const data = JSON.stringify(agoraMessages);
  if (agoraEngineRef.current) {
    agoraEngineRef.current.sendStreamMessage(0, data, data.length);
  }

  setMessages((previousMessages) =>
    GiftedChat.append(previousMessages, giftedChatMessages)
  );
};


const AcceptPendingRequest = async(item) => {
  const authToken = await AsyncStorage.getItem('token');
  var raw = JSON.stringify({
    userId: item.user[0]._id,
    liveId: liveId,
    status:1
  });
   const response =await onUpdatePendingRequestApi(raw)
   
    
   onGetUserJoinRequestAccept()
   onGetUserJoinRequest() 

}
  const onShare = async () => {
    try {
      const result = await Share.share({
        
        message:
            `Bigee Live | ${userData?.name} is live join and have fun`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

const RejectPendingRequest = async(item) => {
  
  const authToken = await AsyncStorage.getItem('token');
  var raw = JSON.stringify({
    userId: item.user[0]._id,
    liveId: liveId,
    status:2
  });
   const response =await onUpdatePendingRequestApi(raw)
   onGetUserJoinRequestAccept()
   onGetUserJoinRequest()

}

const onKickOut = async (id) => {
  try {
    setCallList(false);
    const authToken = await AsyncStorage.getItem('token');
    const raw = JSON.stringify({
      userId: id,
      liveId: route.params.live,
    });
    const response = await onKickDownApi(raw);
    console.log("Response Live Streaming", response.data);
    if (response.data.status) {
      onGetUserJoinRequestAccept();
    }
  } catch (error) {
    console.log("Error:", error);
  }
};


const onChattingAdd = async()=>{
  db.collection('rooms')
  .add({
    date:new Date(),
    image:profileData?.photo,
    receiverId:profileData?._id,
    receiver_name:profileData?.name,
    senderId:userData?._id,
    sender_name:userData?.name
  })
  .then((res)=>{
    db.collection('rooms')
    .doc(res.id)
    .update({
      id:res.id
    })
    navigation.navigate('ChatScreen',{
      rcvr: {id:res.id,receiver_id:profileData._id, name: profileData.name, profilePic:profileData?.photo},
      rcvrpic: profileData?.photo,
      user:{id:userData?._id,name:userData?.name}
    })
  })
 
}


const onKickOutListFunction = async () => {
  setMoreButton(false);
  setKickOutModal(true);

  try {
    const responseData = await onGetKickOutApi(liveId);
    console.log(responseData);
    const updatedKickOutList = responseData.filter(user => user.id !== userData?._id);
    console.log(updatedKickOutList);

    setKickOutList(updatedKickOutList);
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error retrieving kick-out list:", error);
  }
};


const handleCoHostRequest = (requestUid) => {
  Alert.alert(
    'Co-host Request',
    `User with uid ${requestUid} has requested co-host.`,
    [
      {
        text: 'Reject',
        style: 'cancel',
        onPress: () => {
          setCoHostRequests((prevRequests) =>
            prevRequests.filter((request) => request !== requestUid)
          );
        },
      },
      {
        text: 'Accept',
        onPress: () => {
          setIsCoHost(true);
          setCoHostRequests((prevRequests) =>
            prevRequests.filter((request) => request !== requestUid)
          );
        },
      },
    ],
    { cancelable: false }
  );
};


return(
    <View style={styles.container}>
     
        <View style={styles.buttonView}>
        {/* <Text onPress={join} style={{marginTop:hp(20)}}>
            Join
          </Text> */}
          {cameraEnable?
       route.params.isHost?
        <> 
        {isJoined &&
        <>
          <React.Fragment key={0}>
            <RtcSurfaceView canvas={{ uid: 0 }} style={[styles.fullscreenVideoView]} />
          </React.Fragment>
 </>
}
       {/* <React.Fragment key={0}>
        <RtcSurfaceView canvas={{ uid: userData?.id }} style={styles.videoView} />
        <Text>Remote user uid: {userData?.id}</Text>
        </React.Fragment> */}
         {/* <ZegoTextureView ref={zego_preview_view} style={{height: hp(121)}}/> */}
        {/* <View style={{
              position:'absolute',
              top:hp(28),
              right:wp(5),
              width:'32%',
              height:hp(18),
              borderRadius:hp(1)
            }}>
        <RtcSurfaceView canvas={{ uid: userData?.id }} style={styles.videoView} />
        </View> */}
        </>
      :
      <>
      {isJoined && !route.params.isHost && remoteUid !== 0  &&
       <React.Fragment key={remoteUid}>
            <RtcSurfaceView
              canvas={{ uid: remoteUid }}
              style={styles.fullscreenVideoView}
            />
          </React.Fragment>
}
{callingList.length > 0 && isJoined? (
  callingList.map((item, index) => (
    <View
      key={index}
      style={{
        position: 'absolute',
        top: hp(28),
        right: wp(10),
        width: '28%',
        height: hp(22),
        borderRadius: hp(1),
        backgroundColor: 'red',
      }}
    >
      <React.Fragment key={item?.Uid}>
        <RtcSurfaceView
          canvas={{ uid: item?.Uid }}
          style={{ flex: 1,zIndex:3000 }}
        />
      </React.Fragment>
    </View>
  ))
) : null}

      </>

          :
          <View style={{
            width:'100%',
            height:'100%',
            backgroundColor:"#9E26BC",
            alignItems:'center',justifyContent:'center'
          }}>
            <View style={{
              height:120,
              width:120,
              borderRadius:120,
              backgroundColor:'#fff',
              alignItems:"center",
              justifyContent:'center'
            }}>
            <Text style={{fontSize:hp(4),color:"#9E26BC",fontWeight:"700"}}>{userData.name.charAt(0).toUpperCase()}</Text>
            </View>
            </View>
          }
        </View>
          {storeVisible?
        <View style={{
          position:'absolute',
          bottom:0,
          top:'40%',
          right:0
        }}>
          <Image style={{width:wp(20),height:hp(15),resizeMode:'contain'}} source={{uri:storeImage}} />
        </View>
:null}
        <View style={styles.headerView}>
        <View style={styles.subHeaderView}>
          <View style={{
            height:hp(6),
            width:wp(50),
            backgroundColor:'rgba(0,0,0,0.2)',
            borderRadius:hp(5),
            marginVertical:hp(2),
            alignItems:'center',
            flexDirection:'row',
            marginBottom:20
          }}>
             {route.params.isHost?
             <>
             <Image style={{width:50,height:50,borderRadius:50}} source={{uri:`http://13.233.70.37:8008/profile_images/${userData?.photo}`}} />
             <View style={{ marginLeft:wp(1),width:wp(23)}}>
            <Text style={{fontSize:hp(1.8),color:"#fff",fontWeight:"500"}} numberOfLines={1}>{userData?.name}</Text>
            <Text style={{fontSize:hp(1.7),color:"#E1E1E1",fontWeight:"500"}}>ID: {userData?.id}</Text>
            </View>
            </>
            :
            <>
             <Image style={{width:50,height:50,borderRadius:50}} source={{uri:`http://13.233.70.37:8008/profile_images/${route.params?.userItem?.user[0]?.photo}`}} />
             <View style={{ marginLeft:wp(1),width:wp(23)}}>
            <Text style={{fontSize:hp(1.8),color:"#fff",fontWeight:"500"}} numberOfLines={1}>{route.params?.userItem?.user[0]?.name}</Text>
            <Text style={{fontSize:hp(1.7),color:"#E1E1E1",fontWeight:"500"}}>ID: {route.params?.userItem?.user[0]?.id}</Text>
            </View>
            </>
            }
            <TouchableOpacity onPress={()=>followUser()} 
            style={{
            height:38,
            width:38,
            borderRadius:38,
            marginLeft:wp(3.5),
            alignItems:"center",
            justifyContent:"center"
            }}><Image style={{width:wp(4),height:hp(4),resizeMode:'contain'}} source={plus} />
            </TouchableOpacity>
          </View>
          <View style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            marginBottom:5
          }}>
            {watchList?.LiveUser.length>0?
            <TouchableOpacity onPress={()=>{setProfileModal(true),setProfileData(watchList?.LiveUser[0].user_data)}}>
             <Image style={{width:40,height:40,borderRadius:40,borderWidth:2,borderColor:'#FEC105'}} source={{uri:`http://13.233.70.37:8008/profile_images/${watchList?.LiveUser[0].user_data.photo}`}} />
              <Image style={{width:22,height:17,marginLeft:18,position:'absolute',marginTop:hp(-2)}} source={crown1} />
            </TouchableOpacity>
:null}
{watchList?.LiveUser.length>1?
            <TouchableOpacity style={{marginLeft:wp(2)}} onPress={()=>{setProfileModal(true),setProfileData(watchList?.LiveUser[1].user_data)}}>
           
              <Image style={{width:40,height:40,borderRadius:40,borderWidth:2,borderColor:'#fff'}} source={{uri:`http://13.233.70.37:8008/profile_images/${watchList?.LiveUser[1].user_data.photo}`}}  />
              <Image style={{width:30,height:20,marginLeft:15,position:'absolute',marginTop:hp(-1.5)}} source={crown2} />
            </TouchableOpacity>
:null}
{watchList?.LiveUser.length>2?
            <TouchableOpacity style={{marginLeft:wp(2)}} onPress={()=>{setProfileModal(true),setProfileData(watchList?.LiveUser[2].user_data)}}>
              <Image style={{width:40,height:40,borderRadius:40,borderWidth:2,borderColor:'#F6A164'}} source={{uri:`http://13.233.70.37:8008/profile_images/${watchList?.LiveUser[2].user_data.photo}`}}  />
              <Image style={{width:22,height:17,marginLeft:18,position:'absolute',marginTop:hp(-2)}} source={crown3} />
            </TouchableOpacity>
:null}
            <TouchableOpacity onPress={()=>closePress()}>
            <Image style={{width:wp(5),height:hp(5),resizeMode:'contain',marginLeft:wp(2)}} source={cancelButton} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.subHeaderView1}>
         {
          route.params.isHost?(
            <TouchableOpacity style={{
              width:wp(22),
              backgroundColor:'rgba(46, 40, 44, 0.3)',
              height:hp(3.5),
              borderRadius:wp(4),
              alignItems:"center",
              justifyContent:'center',
              flexDirection:"row"
            }} onPress={() => navigation.navigate('LiveCoinScreen',{name:"Recieved"})}>
              <Image style={{width:wp(5),height:hp(4),resizeMode:'contain'}} source={coin} />
            <Text style={{fontSize:hp(1.6),color:'#fff',fontWeight:'600',marginLeft:wp(1)}}>{watchList?.coin}</Text>
            </TouchableOpacity>
          ):(
            <TouchableOpacity style={{
              width:wp(22),
              backgroundColor:'rgba(46, 40, 44, 0.3)',
              height:hp(3.5),
              borderRadius:wp(4),
              alignItems:"center",
              justifyContent:'center',
              flexDirection:"row"
            }} onPress={() => navigation.navigate('LiveCoinScreen',{name:"Send"})}>
              <Image style={{width:wp(5),height:hp(4),resizeMode:'contain'}} source={coin} />
            <Text style={{fontSize:hp(1.6),color:'#fff',fontWeight:'600',marginLeft:wp(1)}}>{watchList?.coin}</Text>
            </TouchableOpacity>
          )


         }
         {
          route.params.isHost?(
            <View style={{
              width:wp(28),
              backgroundColor:'rgba(46, 40, 44, 0.3)',
              height:hp(3.5),
              borderRadius:wp(4),
              marginLeft:wp(4),
              alignItems:"center",
              justifyContent:'center'
            }}>
            <Text style={{fontSize:hp(1.6),color:'#fff',fontWeight:'600'}}>{mins}:{hours} Minutes</Text>
            </View>
          ):null
         }
         {
          route.params.isHost?(

            <View style={{
              width:wp(27),
              backgroundColor:'rgba(46, 40, 44, 0.3)',
              height:hp(3.5),
              borderRadius:wp(4),
              marginLeft:wp(4),
              alignItems:"center",
              justifyContent:'center',
              flexDirection:"row"
            }}>
               <Image style={{width:wp(5),height:hp(4),resizeMode:'contain'}} source={viewer} />
            <Text style={{fontSize:hp(1.8),color:'#fff',fontWeight:'600',marginLeft:wp(1)}}>{watchList==null?'0': watchList?.LiveUser?.length}</Text>
            </View>

          ):null
         }
          
          </View>
      </View>

      <View style={{
  position:'absolute',
  bottom:hp(11),
  width:'70%',
  maxHeight:hp(30),
  // alignItems:"center",
  alignSelf:'flex-start',
  marginLeft:wp(4),
      }}>
        <FlatList 
        data={messagesList}
        renderItem={({item,index})=>{
          return(
               <View style={{
                  width:'96%',
                  height:hp(6),
                  alignSelf:'center',
                  flexDirection:'row',
                  justifyContent:'space-between',
                  alignItems:'center'
                }}>
                  <View style={{
                  height:hp(6),
                  flexDirection:'row',
                  alignItems:'center'
                }}>
                  <TouchableOpacity onPress={()=>{setProfileModal(true),setProfileData(item.user[0])}}>
                  <Image source={{uri:`http://13.233.70.37:8008/profile_images/${item.userPhoto}`}} style={{width:30,height:30,borderRadius:30}} />
                  </TouchableOpacity>
                  <Text style={{fontSize:hp(1.8),color:'#fff',fontWeight:'700',marginLeft:wp(2)}}>{item.userName}</Text>
                  <Text style={{fontSize:hp(1.8),color:'#fff',fontWeight:'400',marginLeft:wp(2)}}>{item.comment}</Text>
                  </View>
            </View>
          )
        }}
        keyExtractor={(item,index)=>index.toString()}
        />
        </View>

      <View style={{
  position:'absolute',
  bottom:0.3,
  width:'97%',
  flexDirection:'row',
  alignItems:"center",
  justifyContent:"space-between",
      }}>
        <View style={{
           height:hp(5),
           width:'67%',
           backgroundColor:'rgba(0,0,0,0.2)',
           borderRadius:hp(5),
           marginVertical:hp(2),
           alignItems:'center',
           flexDirection:'row',
        }}>
        <TextInput 
        value={comment}
        onChangeText={(text)=>{setComment(text)}}
        style={{width:'85%',marginLeft:wp(1),color:'#fff',fontSize:hp(1.6)}}
        />
        {comment.length>0?
        <TouchableOpacity onPress={()=>onMessageSend()}>
        <Image style={{width:wp(6),height:hp(6),resizeMode:"contain"}} source={send} />
        </TouchableOpacity>
:null}
        </View>


        <View style={{
            flexDirection:'row',
            alignItems:"center",
        }}>
           <TouchableOpacity onPress={()=>{}}>
        <Image source={emoji} style={{width:wp(7),height:hp(6),resizeMode:'contain',marginLeft:wp(1)}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setGiftView(true)}}>
        <Image source={gift} style={{width:wp(8),height:hp(6),resizeMode:'contain',marginLeft:wp(3)}} />
        </TouchableOpacity>
        {!audience&&
        <TouchableOpacity onPress={()=>{setMoreButton(true)}}>
        <Image source={list2} style={{width:wp(6),height:hp(5),resizeMode:'contain',marginLeft:wp(3)}} />
        </TouchableOpacity>
}
        {!route.params?.isHost&& !joinUser &&
        <TouchableOpacity style={{
          position:'absolute',
          bottom:hp(15),
          height:hp(6),
          width:wp(17),
          alignItems:"center",
          justifyContent:"center",
          borderRadius:wp(3),
          marginLeft:wp(10)
        }} onPress={()=>{onJoinRoom()}}>
        <Image source={chair1} style={{width:wp(6),height:wp(6),resizeMode:"contain",tintColor:'rgba(255,255,255,0.5)',}}/>
        <Text style={{fontSize:hp(1.5),color:'rgba(255,255,255,0.5)',fontWeight:'600',textAlign:"center"}}>Join</Text>
        </TouchableOpacity>
}

{route.params?.isHost &&
        <TouchableOpacity style={{
          position:'absolute',
          bottom:hp(15),
          height:hp(6),
          width:wp(17),
          alignItems:"center",
          justifyContent:"center",
          borderRadius:wp(3),
          marginLeft:wp(10)
        }} onPress={()=>{setCallList(true)}}>
         <Image source={chair1} style={{width:wp(6),height:wp(6),resizeMode:"contain",tintColor:'rgba(255,255,255,0.5)',}}/>
        <Text style={{fontSize:hp(1.5),color:'rgba(255,255,255,0.5)',fontWeight:'600',textAlign:"center"}}>Manage</Text>
        </TouchableOpacity>
}

        </View>
        </View>
      {!isHost1?
       <TouchableOpacity style={{
  position:'absolute',
  bottom:35,
  right:wp(43)
      }} onPress={()=>{setGiftView(true)}}>
          <Image source={gift} style={{width:wp(10),height:hp(6),resizeMode:'contain'}} />
      </TouchableOpacity>
 :null} 
  {!speakerEnable?
       <View style={{
  position:'absolute',
  top:hp(15),
  left:wp(5)
      }}>
          <Image source={mute} style={{width:wp(10),height:hp(6),resizeMode:'contain'}} />
      </View>
      :null
}
      {giftView?
      <View style={{
  position:'absolute',
  bottom:0,
  width:"98%",
  height:hp(38),
  backgroundColor:'rgba(0,0,0,0.95)',
  borderTopLeftRadius:10,
  borderTopRightRadius:10,
  paddingHorizontal:wp(4),
  alignSelf:'center'
      }}>
<View style={{width:'98%',height:hp(3),alignSelf:'center',flexDirection:'row',justifyContent:'space-between'}}>
     <TouchableOpacity style={{backgroundColor:giftOptionSelect=='Lucky'?'#1877F2':'rgba(0,0,0,0.95)',width:"20%",height:hp(3),alignItems:'center',justifyContent:'center'}} onPress={()=>{setGiftOptionSelect('Lucky')}}>
      <Text style={{fontSize:hp(1.7),fontWeight:'600',color:'#fff'}}>Lucky</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{backgroundColor:giftOptionSelect=='Popular'?'#1877F2':'rgba(0,0,0,0.95)',width:"20%",height:hp(3),alignItems:'center',justifyContent:'center'}} onPress={()=>{setGiftOptionSelect('Popular')}}>
      <Text style={{fontSize:hp(1.7),fontWeight:'600',color:'#fff'}}>Popular</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{backgroundColor:giftOptionSelect=='Luxury'?'#1877F2':'rgba(0,0,0,0.95)',width:"20%",height:hp(3),alignItems:'center',justifyContent:'center'}} onPress={()=>{setGiftOptionSelect('Luxury')}}>
      <Text style={{fontSize:hp(1.7),fontWeight:'600',color:'#fff'}}>Luxury</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{backgroundColor:giftOptionSelect=='Custom'?'#1877F2':'rgba(0,0,0,0.95)',width:"20%",height:hp(3),alignItems:'center',justifyContent:'center'}} onPress={()=>{setGiftOptionSelect('Custom')}}>
      <Text style={{fontSize:hp(1.7),fontWeight:'600',color:'#fff'}}>Custom</Text>
     </TouchableOpacity>
      </View>
      <View style={{width:'98%',height:hp(5),alignSelf:'center'}}>
        <FlatList 
        data={watchList?.LiveUser}
        horizontal
        renderItem={({item,index})=>{
          if(userData?._id!=item.userId){
            return(
              <TouchableOpacity style={{marginLeft:wp(2)}} onPress={()=>{setCoinSendId(item.userId)}}>
                <Image style={{
                  width:40,
                  height:40,
                  borderRadius:40,
                  borderColor:'#9E26BC',
                  borderWidth:item.userId==coinSendId?2:0
                }} source={{uri:`http://13.233.70.37:8008/profile_images/${item.user_data.photo}`}} />
              </TouchableOpacity>
            )
            }
        }}
        keyExtractor={(item,index)=>index.toString()}
        />
      </View>

         <Swiper 
          style={styles.wrapper}
          dot={
            <View
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: hp(4)
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: '#fff',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: hp(4)
              }}
            />
          }
          paginationStyle={{
            bottom: -32,
          }}
          loop={false}
           showsButtons={false}>
            <View>
        <View style={{
          width:'100%',
          flexDirection:'row',
          alignItems:"center",
          justifyContent:'space-between',
        }}>
          {arrayCoin.map((item,index)=>{
            if(index<=3){
              return(
                <TouchableOpacity style={{borderColor:item?.selected?'#1877F2':'#000',borderWidth:1,borderRadius:5,paddingHorizontal:5}} onPress={()=>onSelectCoin(index,item)}>
                  <Image source={plan} style={{width:wp(17),height:hp(6),resizeMode:'contain'}}/>
                  <Text style={{fontSize:hp(1.8),fontWeight:'600',color:'#9E9E9E'}}>{item.name}</Text>
                  <View style={{
              flexDirection:'row',
              alignItems:"center",height:hp(2.2),justifyContent:'center'
            }}>
               <Image source={coin} style={{width:wp(4),height:hp(2),resizeMode:'contain',marginTop:hp(0.4)}}/>
                  <Text style={{fontSize:hp(1.7),fontWeight:'600',color:'#9E9E9E',marginLeft:wp(2)}}>{item.coin}</Text>
            </View>
                </TouchableOpacity>
                )  
            }
          
        })}
          </View>
          <View style={{
          width:'100%',
          flexDirection:'row',
          alignItems:"center",
          justifyContent:'space-between',
        }}>
          {arrayCoin.map((item,index)=>{
            if(index>3&&index<=7){
              return(
                <TouchableOpacity style={{borderColor:item?.selected?'#1877F2':'#000',borderWidth:1,paddingHorizontal:5}} onPress={()=>onSelectCoin(index,item)}>
                  <Image source={plan} style={{width:wp(17),height:hp(6),resizeMode:'contain'}}/>
                  <Text style={{fontSize:hp(1.8),fontWeight:'600',color:'#9E9E9E'}}>{item.name}</Text>
                  <View style={{
              flexDirection:'row',
              alignItems:"center",
              height:hp(2.2)
            }}>
               <Image source={coin} style={{width:wp(4),height:hp(2),resizeMode:'contain'}}/>
                  <Text style={{fontSize:hp(1.7),fontWeight:'600',color:'#9E9E9E',marginLeft:wp(2)}}>{item.coin}</Text>
            </View>
                </TouchableOpacity>
                )  
            }
          
        })}
          </View>
          </View>
          <View style={{
          width:'100%',
          flexDirection:'row',
          alignItems:"center",
          justifyContent:'space-between',
          marginTop:hp(2)
        }}>
            {arrayCoin.map((item,index)=>{
            if(index>=8&&index<=11){
              return(
                <TouchableOpacity style={{borderColor:item?.selected?'#1877F2':'#000',borderWidth:1,paddingHorizontal:5}} onPress={()=>onSelectCoin(index,item)}>
                  <Image source={plan} style={{width:wp(17),height:hp(6),resizeMode:'contain'}}/>
                  <Text style={{fontSize:hp(1.8),fontWeight:'600',color:'#9E9E9E'}}>{item.name}</Text>
                  <View style={{
              flexDirection:'row',
              alignItems:"center",
              height:hp(2.2)
            }}>
                <Image source={coin} style={{width:wp(4),height:hp(2),resizeMode:'contain'}}/>
                  <Text style={{fontSize:hp(1.7),fontWeight:'600',color:'#9E9E9E',marginLeft:wp(2)}}>{item.coin}</Text>
            </View>
                </TouchableOpacity>
                )  
            }
          
        })}
          </View>
          </Swiper>

          <View style={{
            width:'100%',
            height:hp(6),
            alignItems:'center',
            justifyContent:'space-between',
            flexDirection:"row"
          }}>
             <View  style={{
              width:wp(19),
              height:hp(4.5),
              backgroundColor:'#000',
              alignItems:"center",
            justifyContent:'center',
            flexDirection:'row',
            borderRadius:5
            }}>
              <Image source={coin} style={{width:wp(5),height:hp(3),resizeMode:'contain'}}/>
<Text style={{fontSize:hp(2),fontWeight:'700',color:'#fff',marginLeft:wp(3)}}>{userData?.coin}</Text>

</View>
            <View style={{
 flexDirection:'row',
 alignItems:'center',
 width:wp(40),
 backgroundColor:'#1877F2',
 height:hp(5),
 borderRadius:5,
 justifyContent:'center'
            }}>
            <TouchableOpacity onPress={()=>{setGiftView(false),setModalVisible(true)}} style={{
              width:wp(19),
              height:hp(4.5),
              backgroundColor:'#000',
              alignItems:"center",
            justifyContent:'center',
            flexDirection:'row',
            borderRadius:5
            }}>
<Text style={{fontSize:hp(2),fontWeight:'700',color:'#fff'}}>{count}</Text>
<Image source={downArrow} style={{width:wp(5),height:hp(10),resizeMode:'contain',marginLeft:wp(2)}}/>
</TouchableOpacity>
<TouchableOpacity style={{
   width:wp(19),
   height:hp(4.5),
   alignItems:"center",
 justifyContent:'center',
}} onPress={()=>onSendCoin()}>
  <Text style={{fontSize:hp(2),fontWeight:'700',color:'#fff'}}>SEND</Text>
</TouchableOpacity>
            </View>
         
          </View>
          </View>
:null}

{moreButton?
      <Modal
      animationType="slide"
      transparent={true}
      visible={moreButton}
      statusBarTranslucent
      onRequestClose={()=>{setMoreButton(false)}}>
      <View style={styles.centeredView}>
        <TouchableOpacity activeOpacity={1} onPress={()=>{setMoreButton(false)}}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.1)',
              transparent: 0.5,
            }}
          />
        </TouchableOpacity>

        <View style={styles.modalView}>
        <View style={{
          width:'100%',
          flexDirection:'row',
          alignItems:"center",
          justifyContent:route.params.isHost?'space-between':'space-around',
          // gap:route.params.isHost?0:12
        }}>
        <TouchableOpacity style={{
          height:hp(5),
          alignItems:"center",
          }} onPress={()=>{navigation.navigate('MessageScreen')}}>
           <Image source={messageIcon} style={{width:wp(8),height:hp(6),resizeMode:'contain'}} />
           <Text style={{fontSize:hp(1.6),color:'#9E26BC',fontWeight:'500'}}>Inbox</Text>
          </TouchableOpacity>
         {(route.params.isHost ) ? (<TouchableOpacity style={{
          height:hp(5),
          alignItems:"center",
          }} onPress={()=>{onCameraFlip()}}>
           <Image source={flip} style={{width:wp(9),height:hp(6),resizeMode:'contain'}} />
           <Text style={{fontSize:hp(1.6),color:'#9E26BC',fontWeight:'500'}}>Flip</Text>
          </TouchableOpacity>):<TouchableOpacity style={{
            height:hp(5),
            alignItems:"center",
            }} onPress={()=>{onShare()}}>
             <Image source={require('../../assets/share.png')} style={{width:wp(9),height:hp(6),resizeMode:'contain'}} />
             <Text style={{fontSize:hp(1.6),color:'#9E26BC',fontWeight:'500'}}>Share</Text>
            </TouchableOpacity>}
          <TouchableOpacity style={{
          height:hp(5),
          alignItems:"center",
          }} onPress={()=>{}}>
           <Image source={gameController} style={{width:wp(9),height:hp(6),resizeMode:'contain'}} />
           <Text style={{fontSize:hp(1.6),color:'#9E26BC',fontWeight:'500'}}>Game</Text>
          </TouchableOpacity>
         {route.params.isHost ? (<TouchableOpacity style={{
          height:hp(5),
          alignItems:"center",
          }} onPress={()=>{onClickAdmin()}}>
           <Image source={adminPanel} style={{width:wp(9),height:hp(6),resizeMode:'contain'}} />
           <Text style={{fontSize:hp(1.6),color:'#9E26BC',fontWeight:'500'}}>Admin</Text>
          </TouchableOpacity>):null}
          {route.params.isHost?(<TouchableOpacity style={{ 
          height:hp(5),
          alignItems:"center",
          }} onPress={()=>onKickOutListFunction()}>
           <Image source={bandit} style={{width:wp(9),height:hp(6),resizeMode:'contain'}} />
           <Text style={{fontSize:hp(1.6),color:'#9E26BC',fontWeight:'500'}}>Kick List</Text>
          </TouchableOpacity>):null}
          </View>
          <View style={{
            width:'100%',
            backgroundColor:'#9E26BC',
            height:2,
            marginTop:hp(6),
            marginBottom:hp(1)
          }}>
          </View>
        <View style={{
          width:'100%',
          flexDirection:'row',
          alignItems:"center",
          justifyContent:'space-between',
          
        }}>
       { (route.params.isHost )?(<TouchableOpacity style={{
          height:hp(5),
          alignItems:"center",
          }} onPress={()=>toggleSpeaker()}>
           <Image source={require('../../assets/mute.png')} style={{width:wp(6),height:hp(6),resizeMode:'contain'}} />
           <Text style={{fontSize:hp(1.6),color:'#9E26BC',fontWeight:'500'}}>Audio</Text>
          </TouchableOpacity>):null}
         {(route.params.isHost )?( <TouchableOpacity style={{
          height:hp(5),
          alignItems:"center",
          }} onPress={()=>{toggleCamera()}}>

           <Image source={require('../../assets/video.png')} style={{width:wp(9),height:hp(6),resizeMode:'contain'}} />
           <Text style={{fontSize:hp(1.6),color:'#9E26BC',fontWeight:'500'}}>Camera</Text>
          </TouchableOpacity>):null}
        
         {route.params.isHost?( <TouchableOpacity style={{
          height:hp(5),
          alignItems:"center",
          }} onPress={()=>onBeautifyCam()}>
           <Image source={require('../../assets/profileFemale.png')} style={{width:wp(9),height:hp(6),resizeMode:'contain'}} />
           <Text style={{fontSize:hp(1.6),color:'#9E26BC',fontWeight:'500'}}>Beauty</Text>
          </TouchableOpacity>):null}
         {route.params.isHost?( <TouchableOpacity style={{ 
          height:hp(5),
          alignItems:"center",
          }} onPress={()=>(isScreenSharing?stopScreenSharing():startScreenCapture())}>
           <Image source={require('../../assets/screenShare.png')} style={{width:wp(9),height:hp(6),resizeMode:'contain'}} />
           <Text style={{fontSize:hp(1.6),color:'#9E26BC',fontWeight:'500'}}>{isScreenSharing ? 'Stop Sharing' : 'Screen Share'}</Text>
          </TouchableOpacity>):null}
          {(route.params.isHost && isCoHost) ?( <TouchableOpacity style={{
          height:hp(5),
          alignItems:"center",
          }} onPress={()=>{onShare()}}>
           <Image source={require('../../assets/share.png')} style={{width:wp(9),height:hp(6),resizeMode:'contain'}} />
           <Text style={{fontSize:hp(1.6),color:'#9E26BC',fontWeight:'500'}}>Share</Text>
          </TouchableOpacity>):null}
          </View>
          </View>
          </View>
          </Modal>
          :null}



{callList?
      <Modal
      animationType="slide"
      transparent={true}
      visible={callList}
      statusBarTranslucent
      onRequestClose={()=>{setCallList(false)}}>
      <View style={styles.centeredView}>
        <TouchableOpacity activeOpacity={1} onPress={()=>{setCallList(false)}}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.1)',
              transparent: 0.5,
            }}
          />
        </TouchableOpacity>

        <View style={styles.modalView1}>
            <View style={{
              width:'70%',
              height:hp(6),
              alignSelf:'center',
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'center'
            }}>
              <TouchableOpacity onPress={()=>onGetUserJoinRequestAccept()}>
              <Text style={{fontSize:hp(1.8),color:'#000',fontWeight:'700'}}>{`Call List (${callingList.length})`}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>onGetUserJoinRequest()}>
              <Text style={{fontSize:hp(1.8),color:'#000',fontWeight:'700'}}>{`Waiting List (${waitList.length})`}</Text>
              </TouchableOpacity>
            
            </View>
            {listingVisible?
            <FlatList 
            data={waitList}
            renderItem={({item,index})=>{
              return(
                <View style={{
                  width:'96%',
                  height:hp(8),
                  alignSelf:'center',
                  flexDirection:'row',
                  justifyContent:'space-between',
                  alignItems:'center'
                }}>
                  <View style={{
                  height:hp(8),
                  flexDirection:'row',
                  alignItems:'center'
                }}>
                  <TouchableOpacity >
                  <Image source={{uri:`http://13.233.70.37:8008/profile_images/${item.user[0].photo}`}} style={{width:50,height:50,borderRadius:50}} />
                  </TouchableOpacity>
                  <Text style={{fontSize:hp(1.8),color:'#000',fontWeight:'700',marginLeft:wp(2)}}>{item.user[0].name}</Text>
                  </View>
                  <View style={{
                  height:hp(8),
                  flexDirection:'row',
                  alignItems:'center'
                }}>
                  <TouchableOpacity onPress={()=>AcceptPendingRequest(item)}>
                  <Image source={selectedIcons} style={{width:wp(7),height:hp(5),resizeMode:'contain'}} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>RejectPendingRequest(item)}>
                  <Image source={unSelectedIcons} style={{width:wp(7),height:hp(5),resizeMode:'contain',marginLeft:wp(3)}} />
                  </TouchableOpacity>
                  
                  </View>
                </View>
              )
            }}
            keyExtractor={(item,index)=>index.toString()}
            />
          :
          
            <FlatList 
            data={callingList}
            renderItem={({item,index})=>{
              return(
                <View style={{
                  width:'96%',
                  height:hp(8),
                  alignSelf:'center',
                  flexDirection:'row',
                  justifyContent:'space-between',
                  alignItems:'center'
                }}>
                  <View style={{
                  height:hp(8),
                  flexDirection:'row',
                  alignItems:'center'
                }}>
                   <TouchableOpacity>
                  <Image source={{uri:`http://13.233.70.37:8008/profile_images/${item.user[0].photo}`}} style={{width:50,height:50,borderRadius:50}} />
                  </TouchableOpacity>
                  <Text style={{fontSize:hp(1.8),color:'#000',fontWeight:'700',marginLeft:wp(2)}}>{item.user[0].name}</Text>
                  </View>
                  <View style={{
                  height:hp(8),
                  flexDirection:'row',
                  alignItems:'center'
                }}>
                 <TouchableOpacity onPress={()=>onKickOut(item.user[0]?._id)}>
                  <Image source={callEnd} style={{width:wp(7),height:hp(5),resizeMode:'contain'}} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                  <Image source={mute} style={{width:wp(7),height:hp(5),resizeMode:'contain',marginLeft:wp(3),tintColor:'#1877F2'}} />
                  </TouchableOpacity>
                  </View>
                </View>
              )
            }}
            keyExtractor={(item,index)=>index.toString()}
            />
}
          </View>
          </View>
          </Modal>
          :null}



          {kickOutModal ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={kickOutModal}
              statusBarTranslucent
              onRequestClose={() => {
                setKickOutModal(false);
              }}
            >
              <View style={styles.centeredView}>
                <TouchableOpacity activeOpacity={1} onPress={() => { setKickOutModal(false) }}>
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      opacity: 0.5,
                    }}
                  />
                </TouchableOpacity>
          
                <View style={styles.modalView1}>
                  <FlatList
                    data={kickOutList}
                    renderItem={({ item, index }) => {
                      return (
                        <View style={{
                          width: '96%',
                          height: hp(8),
                          alignSelf: 'center',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <View style={{
                            height: hp(8),
                            flexDirection: 'row',
                            alignItems: 'center'
                          }}>
                            <TouchableOpacity >
                              <Image source={{ uri: `http://13.233.70.37:8008/profile_images/${item.user[0].photo}` }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: hp(1.8), color: '#000', fontWeight: '700', marginLeft: wp(2) }}>{item.user[0].name}</Text>
                          </View>
                          <View style={{
                            height: hp(8),
                            flexDirection: 'row',
                            alignItems: 'center'
                          }}>
                            <TouchableOpacity onPress={() => AcceptPendingRequest(item)}>
                              <Image source={selectedIcons} style={{ width: wp(7), height: hp(5), resizeMode: 'contain' }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => RejectPendingRequest(item)}>
                              <Image source={unSelectedIcons} style={{ width: wp(7), height: hp(5), resizeMode: 'contain', marginLeft: wp(3) }} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </View>
            </Modal>
          ) : null}
          

{profileModal?
<Modal
      animationType="slide"
      transparent={true}
      visible={profileModal}
      statusBarTranslucent
      onRequestClose={()=>{setProfileModal(false)}}>
      <View style={styles.centeredView}>

        {/* <TouchableOpacity activeOpacity={1} onPress={()=>{setProfileModal(false)}}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.1)',
              transparent: 0.5,
            }}
          />
        </TouchableOpacity> */}
            <TouchableOpacity style={{flex:0.65,width:'100%'}} onPress={()=>{setProfileModal(false)}}></TouchableOpacity>
        <View style={styles.modalView2}>
          <View style={{flexDirection:"row",
        alignItems:'center',
        justifyContent:'space-between'}}>
        <TouchableOpacity style={{width:90,top:hp(-3),left:wp(-10)}} onPress={()=>{setPopupOpen(!popupOpen)}}>
        <Text style={{fontSize:hp(1.8),color:'#000',fontWeight:'600'}}>Manage</Text>
           </TouchableOpacity>
           {popupOpen ? (
            <View
              style={{
                position: 'absolute',
                width: wp(35),
                top: hp(3.5),
                left: wp(-14),
                height: hp(25),
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                backgroundColor:"white"
              }}
            >
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={invite} style={{ width: wp(5), height: hp(4), resizeMode: 'contain' }} />
                <Text style={{ fontSize: hp(2), marginLeft: wp(2), color: '#1877F2' }}>Invite Call</Text>
              </TouchableOpacity>
          
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={getKickOut}>
                <Image source={kick} style={{ width: wp(5), height: hp(4), resizeMode: 'contain' }} />
                <Text style={{ fontSize: hp(2), marginLeft: wp(2), color: '#1877F2' }}>Kick Out</Text>
              </TouchableOpacity>
          
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={muteIcon} style={{ width: wp(5), height: hp(4), resizeMode: 'contain' }} />
                <Text style={{ fontSize: hp(2), marginLeft: wp(2), color: '#1877F2' }}>Mute</Text>
              </TouchableOpacity>
          
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={block} style={{ width: wp(5), height: hp(4), resizeMode: 'contain' }} />
                <Text style={{ fontSize: hp(2), marginLeft: wp(2), color: '#1877F2' }}>Block</Text>
              </TouchableOpacity>
          
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => { setProfileModal(false); onClickAdmin(); }}>
                <Image source={admin} style={{ width: wp(5), height: hp(4), resizeMode: 'contain' }} />
                <Text style={{ fontSize: hp(2), marginLeft: wp(2), color: '#1877F2', backgroundColor: '#FFF' }}>Set Admin</Text>
              </TouchableOpacity>
            </View>
          ):null}
          

           <View style={{width:90,height:90,borderRadius:90,backgroundColor:"red",top:hp(-8)}}>
          <Image style={{width:90,height:90,borderRadius:90}} source={{uri:`http://13.233.70.37:8008/profile_images/${profileData?.photo}`}} />
           </View>
           <View style={{width:90,top:hp(-3),left:wp(20)}}>
        <Text style={{fontSize:hp(1.8),color:'#000',fontWeight:'600'}}>Report</Text>
           </View>
           </View>
        <Text style={{fontSize:hp(2.6),color:'#000',fontWeight:'700',top:hp(-5)}}>{profileData?.name}</Text>
        <View style={{flexDirection:"row",alignItems:"center",top:hp(-5)}}>
        <Text style={{fontSize:hp(1.8),color:'#000',opacity:0.5,marginTop:hp(1),height:hp(4),}}>ID : {profileData?.id}</Text>
        <View style={styles.signalListView}>
                <Image style={[styles.photoView,{marginRight:wp(-2)}]} source={sild}/>
                <Image style={[styles.photoView]} source={LevelDigit}/>
                </View>
        </View>

            <View style={{
              width:wp(80),
              flexDirection:'row',
              justifyContent:'space-around',
              alignItems:'center',
              height:hp(8),top:hp(-5)
            }}>
              <View >
                <Text style={{fontSize:hp(2.6),color:'#000',fontWeight:'700',textAlign:'center'}}>{followers?followers:0}</Text>
                <Text style={{fontSize:hp(2),color:'#000',fontWeight:'400',textAlign:'center'}}>Fans</Text>
              </View>

              <View >
                <Text style={{fontSize:hp(2.6),color:'#000',fontWeight:'700',textAlign:'center'}}>{following?following:0}</Text>
                <Text style={{fontSize:hp(2),color:'#000',fontWeight:'400',textAlign:'center'}}>Following</Text>
              </View>
              <View >
              <Text style={{fontSize:hp(2.6),color:'#000',fontWeight:'700',textAlign:'center'}}>0</Text>
              <Text style={{fontSize:hp(2),color:'#000',fontWeight:'400',textAlign:'center'}}>Send</Text>
            </View>
            <View >
            <Text style={{fontSize:hp(2.6),color:'#000',fontWeight:'700',textAlign:'center'}}>0</Text>
            <Text style={{fontSize:hp(2),color:'#000',fontWeight:'400',textAlign:'center'}}>Recieved</Text>
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

             }} onPress={Followed ? unFollowUser : followUser}>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width:'100%',height:'100%'}}>
              <Image source={require('../../assets/plus.png')} style={{width:wp(5),height:wp(3.5),resizeMode:'contain',marginRight:5}}/>
              <Text style={{fontSize:hp(2.6),color:'#fff',fontWeight:'700',textAlign:'center'}}>{Followed? 'UnFollow':'Follow'}</Text>
              </View>
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
             <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width:'100%',height:'100%'}}>
              <Image source={require('../../assets/com.png')} style={{width:wp(5),height:wp(4),resizeMode:'contain',marginRight:5}}/>
              <Text style={{fontSize:hp(2.6),color:'#1877F2',fontWeight:'700',textAlign:'center'}}>Chat</Text>
              </View>
             </TouchableOpacity>
            </View>

          </View>
          </View>
          </Modal>
          :null}



          <CountPopup 
           onRequestClose={()=>{setModalVisible(false)}}
           visible={modalVisible}
           onClose={()=>{setModalVisible(false)}}
           title={'quantity'}
           allList={countArray}
           onSelectGender={(index,item)=>onSelectGender(index,item)}
         />
    </View>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#9E26BC',
      width:'100%',
      alignItems:'center',
    },
    stream: {
      width: 200,
      height: 150,
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
        width:"100%",
        height:'100%',
        marginTop:hp(-13)
    },
    max:{
      width:'100%',
      height:'100%'
    },
    remoteContainer: {
      width: '100%',
      height: 150,
      position: 'absolute',
      top: 5,
      
    },
    remoteContainerContent: {
      paddingHorizontal: 2.5,
    },
    remote: {
      width: 150,
      height: 150,
      marginHorizontal: 2.5,
    },
    headerView:{
      width:'100%',
      height:'16%',
      alignItems:'center',
      paddingHorizontal:'2%',
      position:'absolute',
      top:0
  },
  subHeaderView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:'100%'
  },
  subHeaderView1:{
    flexDirection:'row',
    alignItems:'center',
    width:'100%',
    marginTop:-8
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
    height: hp(34),
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
  modalView2: {
    flex:0.4,
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
     alignItems:"center",
     justifyContent:'center'
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
   fullscreenVideoView: { width: '100%', height: hp(115) },
   btnContainer: { flexDirection: 'row', justifyContent: 'center' },
   head: { fontSize: 20 },
   info: { backgroundColor: '#ffffe0', paddingHorizontal: 8, color: '#0000ff' },
   label: {
     position: 'absolute',
     top: 10,
     left: 10,
     backgroundColor: 'rgba(0, 0, 0, 0.5)',
     color: '#ffffff',
     padding: 4,
   },
   cohostVideoView: { width: '40%', height: hp(40), zIndex: 1,position: 'absolute',
   top:10,
   bottom:50,
   left:200,},
  });

export default LiveStreamingScreen;