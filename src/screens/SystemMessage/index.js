import React, { useState, useCallback, useEffect,useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  Clipboard,
  ToastAndroid,
  SectionList,
  ScrollView
} from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../components/Pixel/index";
import photo from "../../assets/photo.png";
import downArrow from "../../assets/downArrow.png";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";
import image5 from "../../assets/image5.png";
import leftArrows from "../../assets/leftArrows.png";

import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  onGetUserApi,
  onGetLiveStreamingApi,
  onWatchListAddApi,
  onGetNotification
} from "../../services/Api.js";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import moment from 'moment';

const db = firestore();

const messageArray = [
  {
    id: 1,
    name: "Marcel Orleando",
    lastMsg: "HI Romuald how are you?",
    time: "03:15 PM",
    status: true,
    user: image1,
  },
  {
    id: 2,
    name: "Marcel Orleando",
    lastMsg: "HI Romuald how are you?",
    time: "03:15 PM",
    status: true,
    user: image2,
  },
  {
    id: 3,
    name: "Marcel Orleando",
    lastMsg: "HI Romuald how are you?",
    time: "03:15 PM",
    status: true,
    user: image3,
  },
  {
    id: 4,
    name: "Marcel Orleando",
    lastMsg: "HI Romuald how are you?",
    time: "03:15 PM",
    status: true,
    user: image4,
  },
  {
    id: 5,
    name: "Marcel Orleando",
    lastMsg: "HI Romuald how are you?",
    time: "03:15 PM",
    status: true,
    user: image5,
  },
  {
    id: 6,
    name: "Marcel Orleando",
    lastMsg: "HI Romuald how are you?",
    time: "03:15 PM",
    status: true,
    user: image1,
  },
];

const SystemMessage = ({ navigation, route }) => {
  const scrollViewRef = useRef();
  const [mobileNumber, setMobileNumber] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [profile, setProfile] = useState(null);
  const [userDetails,setUserDetails] = useState('')


  useEffect(() => {
    const subscribe= navigation.addListener('focus',()=>{
      onGetChatData()
    })
    
  }, []);

  const onGetChatData = async()=>{
try{
  const details=await AsyncStorage.getItem('token')
  setUserDetails(details)
  let raw = JSON.stringify({
    userId: details,
    key: 1
  })
  const response =await onGetNotification(raw)
  console.log("Get Notification:::",raw)
console.log("Get Data::::::::",response.data.data)
let array=response.data.data
array=array.sort((a, b) => {
    const aTime = a?.createdAt?.seconds * 1000 + a?.createdAt?.nanoseconds / 1000000;
    const bTime = b?.createdAt?.seconds * 1000 + b?.createdAt?.nanoseconds / 1000000;
    if (aTime && bTime) {
      return aTime - bTime;
    }
    return 0;
  })
  setMessages(array)
  console.log("Get Data::::::::",array)
}
catch(err){
  console.log("Get Error::",err)
}
 
  }
  


  return (
    <View style={styles.container}>
      <View style={styles.bannerView}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.leftArrow} source={leftArrows} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: hp(2.6),
            color: "#000",
            fontWeight: "700",
            marginLeft: wp(6),
          }}
        >
          {'BigeeLive System'}
        </Text>
      </View>
      <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            showsVerticalScrollIndicator={false}
            scrollEnabled={ true}
            style={{ width: '100%', opacity:1 }}
            contentContainerStyle={{
              paddingBottom:hp(2),
              flexGrow: 1,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                paddingVertical: hp(2),
                width: '100%',
                paddingHorizontal: wp(3.5),
              }}>

<FlatList
                data={messages}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item, index }) => {
                  console.log("Get ISsue :::",item)
                    return (
                      <>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent:
                              item?.to == userDetails
                                ? 'flex-start'
                                : 'flex-end',
                            alignSelf:
                              item.to == userDetails
                                ? 'flex-start'
                                : 'flex-end',
                          }}>
                          <View style={{
                            backgroundColor: item.to == userDetails
                              ? '#fff'
                              :'#0371FF',
                            padding: 10,
                            borderRadius: 5,
                            marginTop: 5,
                            paddingHorizontal: wp(3),
                            marginLeft: item.to == userDetails? "3%" : null,
                            marginRight: item.to == userDetails ? "3%" : null,

                            alignSelf: item.to == userDetails
                              ? 'flex-start'
                              : 'flex-end',
                            minWidth: wp(10),
                            maxWidth: wp(75),

                            borderRadius: 20,
                          }} >



                            <Text
                              style={[
                                styles.textMes,
                                {
                                  fontSize: hp(1.8),
                                  color:item.to == userDetails
                                      ? '#000'
                                      : '#fff',
                                },
                              ]}

                            >{item?.body}</Text>
                            {/* <View style={{
                              position: "absolute",
                              backgroundColor: item.to == userDetails
                                ? Color.COLOR.optionLineGrey
                                : Color.COLOR.button,
                              //backgroundColor:"red",
                              width: 20,
                              height: 20,
                              bottom: 0,
                              borderBottomLeftRadius: item.to != userDetails? 25 : null,
                              borderBottomRightRadius: item.to == userDetails ? 25 : null,
                              right: item.to != userDetails ? -9 : null,
                              left: item.to == userDetails ? -10 : null
                            }}>

                            </View>
                            <View style={{
                              position: "absolute",
                              backgroundColor: Color.COLOR.white,
                              //backgroundColor:"green",
                              width: 20,
                              height: 25,
                              bottom: -3,
                              borderBottomLeftRadius: item.to != userDetails ? 18 : null,
                              borderBottomRightRadius: item.to == userDetails ? 18 : null,

                              right: item.to != userDetails ? -20 : null,
                              left: item.to == userDetails ? -20 : null
                            }}></View> */}





                          </View>

                        </View>
                        <Text
                          style={{
                            fontSize: hp(1.5),
                            paddingVertical: hp(1),
                            paddingLeft:
                            item.to == userDetails
                                ? wp(4)
                                : null,
                            alignSelf:
                            item.to == userDetails
                                ? 'flex-start'
                                : 'flex-end',
                            color: '#848484',
                          }}>
                          {moment(item?.createdAt).format('hh:mm a')}
                        </Text>
                      </>
                    );
                  
                }}
              />
             
            </View>
          </ScrollView>
    </View>
  );
};

export default SystemMessage;
