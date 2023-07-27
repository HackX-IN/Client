import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  ScrollView,
  PermissionsAndroid,
  Platform,
  findNodeHandle,
  Modal,
  FlatList,
  BackHandler,
  Alert,
  Share,
} from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import CountryPicker from "react-native-country-picker-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../components/Pixel/index";
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
  getFollowingApi,
} from "../../services/Api.js";
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
} from "react-native-popup-menu";
import {
  Send,
  Bubble,
  Actions,
  Composer,
  GiftedChat,
  SystemMessage,
} from "react-native-gifted-chat";
import ZegoUIKitPrebuiltLiveStreaming, {
  HOST_DEFAULT_CONFIG,
  ZegoMenuBarButtonName,
  AUDIENCE_DEFAULT_CONFIG,
} from "@zegocloud/zego-uikit-prebuilt-live-streaming-rn";
import * as ZIM from "zego-zim-react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Swiper from "react-native-swiper";
import CountPopup from "../../components/CountPopup";
import firestore from "@react-native-firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import KeyCenter from "./KeyCenter";

// let _engine=null;
const db = firestore();
// const granted = (Platform.OS == 'android' ? PermissionsAndroid.check(
//   PermissionsAndroid.PERMISSIONS.CAMERA,
//   PermissionsAndroid.RECORD_AUDIO) : undefined);

const giftArray = [
  {
    id: 1,
    name: "Aeroplane",
    coin: 1000,
  },
  {
    id: 2,
    name: "Aeroplane",
    coin: 3000,
  },
  {
    id: 3,
    name: "Aeroplane",
    coin: 5000,
  },
  {
    id: 4,
    name: "Aeroplane",
    coin: 10000,
  },
  {
    id: 5,
    name: "Aeroplane",
    coin: 50000,
  },
  {
    id: 6,
    name: "Aeroplane",
    coin: 100000,
  },
  {
    id: 7,
    name: "Aeroplane",
    coin: 150000,
  },
  {
    id: 8,
    name: "Aeroplane",
    coin: 200000,
  },
  {
    id: 9,
    name: "Aeroplane",
    coin: 500000,
  },
  {
    id: 10,
    name: "Aeroplane",
    coin: 700000,
  },
  {
    id: 11,
    name: "Aeroplane",
    coin: 1000000,
  },
  {
    id: 12,
    name: "Aeroplane",
    coin: 1500000,
  },
];

const countArray = [
  {
    id: 1,
    coin: 1,
  },
  {
    id: 2,
    coin: 10,
  },
  {
    id: 3,
    coin: 30,
  },
  {
    id: 4,
    coin: 50,
  },
  {
    id: 5,
    coin: 100,
  },
];

const callListArray = [
  {
    name: "yash vaishnani",
    image: image1,
  },
  {
    name: "test user",
    image: image1,
  },
];
const waitingList = [
  {
    name: "yash vaishnani",
    image: image1,
  },
  {
    name: "test user",
    image: image1,
  },
];

// const appId ='0ae27364b6cc482ba748420b9402a35c';
// const channelName ='livey';
// const token ='007eJxTYLj85tHX83X7fSqquS3Xsc68da1zQXLC2dCf85yuNS++fMNSgcEgMdXI3NjMJMksOdnEwigp0dzEwsTIIMnSxMAo0dg0Wap5XUpDICPD7FezmRkZIBDEZ2XIySxLrWRgAAB72yMi';
// const uid = 0;

const getPermission = async () => {
  if (Platform.OS === "android") {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
  }
};

let time = 0;
const LiveStreamingScreen = ({ navigation, route, props }) => {
  const scrollViewRef = useRef(null);
  const prebuiltRef = useRef();

  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [audience, setAudience] = useState(false);
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(""); // Message to the user
  const [isCoHost, setIsCoHost] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true); // Indicates if the camera is on
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isHost, setIsHost] = useState(route.params.isHost);
  const [joinSucceed, setJoinSucceed] = useState(false);
  const [userId, setUserId] = useState("0");
  const [UserData, setUserData] = useState(null);
  const [giftView, setGiftView] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(1);
  const [arrayCount, setArrayCount] = useState([]);
  const [arrayCoin, setArrayCoin] = useState([]);
  const [selectCoin, setSelectCoin] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [isHost1, setIsHost1] = useState(true);
  const [cameraEnable, setCameraEnable] = useState(true);
  const [moreButton, setMoreButton] = useState(false);
  const [speakerEnable, setSpeakerEnable] = useState(true);
  const [beautyCam, setBeautyCam] = useState(false);
  const [flipCamera, setFlipCamera] = useState(true);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [liveId, setLiveId] = useState("");
  const [comment, setComment] = useState("");
  const [joinUser, setJoinUser] = useState(false);
  const [callList, setCallList] = useState(false);
  const [callingList, setCallingList] = useState([]);
  const [waitList, setWaitList] = useState([]);
  const [listingVisible, setListingVisible] = useState(false);
  const [messagesList, setMessageList] = useState([]);
  const [storeImage, setStoreImage] = useState("");
  const [profileModal, setProfileModal] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [watchList, setWatchList] = useState(null);
  const [coinSendId, setCoinSendId] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [kickOutModal, setKickOutModal] = useState(false);
  const [kickOutList, setKickOutList] = useState(false);
  const isFocused = useIsFocused();
  const [messages, setMessages] = useState([]);
  const [storeVisible, setStoreVisible] = useState(false);
  const [giftOptionSelect, setGiftOptionSelect] = useState("");
  const [coHostRequests, setCoHostRequests] = useState([]);
  const [Followed, setFollowed] = useState(false);
  const [startScreenCaptureBool, setScreenCapture] = useState(false); // Start screen capture
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

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

  const getWatchList = async (id) => {
    const response = await onGetWatchLiveStreamingApi(id);
    if (response.data.status) {
      setWatchList(response.data.data[0]);
    }
  };

  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      if (!route.params.isHost) {
        setInterval(() => {
          getWatchList(route.params?.live);
          onGetCoHostAccept();
          onMessageGet(route.params?.live);
          // onMessageGet(route.params?.live)
          // getKickOut()
        }, 1000);
        setLiveId(route.params?.live);
      }
    });
  });

  const onGetUserData1 = async () => {
    try {
      const response = await onGetUserApi();
      console.log("Get Response", response.data.data[0]);
      onGetStoreData(response.data.data[0]);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const onGetStoreData = async (from) => {
    try {
      const response = await onGetStoreItemsApi();
      console.log("Get Response", response.data);

      let data = response.data.data;
      console.log("Get data Store", from);
      from.storeItems.map((item1, index1) => {
        console.log("Get data Image Store>>>>>>>>>>>", item1);
        data.map((item, index) => {
          // console.log("Get filter",diff)
          if (item1.storeId == item._id) {
            if (item1.inUse) {
              setStoreVisible(true);
              setStoreImage(`http://13.233.70.37:8008/store/${item.storeUrl}`);
              setTimeout(() => {
                setStoreVisible(false);
              }, 10000);
              console.log("Get data Image Store>>>>>>>>>>>", item1);
            }
          }
        });
      });
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const onGetCoHostAccept = async () => {
    try {
      setListingVisible(false);
      const response = await onGetUserAcceptRequestApi(route.params?.live);
      setCallingList(response.data.data);
      if (response.data.data.length > 0) {
        response.data.data.map((item, index) => {
          if (item.user[0]?._id == userData?._id) {
            setJoinUser(true);
          }
        });
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const onGetUserData = async () => {
    try {
      const response = await onGetUserApi();
      const userData = response.data.data[0]; // Access the user data from the response

      console.log("Get Response ####", userData);
      console.log("This is the name", userData.name);
      setUserData(userData);
      // Rest of your code...
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const onSendCoin = async () => {
    setGiftView(false);
    if (coinSendId != "") {
      const authToken = await AsyncStorage.getItem("token");

      var raw = JSON.stringify({
        sender: authToken,
        receiver: UserData?._id,
        coin: selectCoin * count,
      });
      const response = await SendGiftApi(raw);
      console.log("Response Live Streaming", response.data);
      setGiftView(false);
    } else {
      Alert.alert("", "Please select user first.");
    }
  };

  useEffect(() => {
    setIsHost(route.params.isHost);
    init();
    setInterval(() => {
      onGetUserData();
    }, 1000);

    setArrayCoin(giftArray);
    setArrayCount(countArray);
  }, []);

  const init = async () => {
    try {
      if (route.params.isHost) {
        const authToken = await AsyncStorage.getItem("token");

        var raw = JSON.stringify({
          userId: authToken,
          liveUniqueId: route.params.randomUserID,
          channelName: "testLiveID",
        });
        console.log("Response Lve Streaming", raw);
        const response = await onAddLiveStreamingApi(raw);
        console.log("Response Lve Streaming", response.data.data._id);
        setRefresh(!refresh);
        setLiveId(response.data.data._id);

        setInterval(() => {
          getWatchList(response.data.data._id);
        }, 1000);
      }
    } catch (err) {
      console.log("Response Lve Streaming", err);
    }
  };

  const followUser = async () => {
    const followFrom = UserData?._id;
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

  const onSelectCoin = (index, item) => {
    let arrayList = arrayCoin;
    arrayList.map((item1, index1) => {
      if (index1 == index) {
        arrayList[index1].selected = true;
      } else {
        arrayList[index1].selected = false;
      }
    });
    setGiftView(true);
    setSelectCoin(item.coin);
    setModalVisible(false);
    setRefresh(!refresh);
    setArrayCoin(arrayList);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <ZegoUIKitPrebuiltLiveStreaming
          ref={prebuiltRef}
          appID={KeyCenter.appID}
          appSign={KeyCenter.appSign}
          userID="You"
          userName="You"
          liveID="testLiveId"
          config={{
            ...(route.params.isHost === true
              ? HOST_DEFAULT_CONFIG
              : AUDIENCE_DEFAULT_CONFIG),
            onStartLiveButtonPressed: () => {
              console.log("########HostPage onStartLiveButtonPressed");
            },
            onLiveStreamingEnded: () => {
              console.log("########HostPage onLiveStreamingEnded");
              navigation.navigate("LiveScreen");
            },
            onLeaveLiveStreaming: () => {
              console.log("########HostPage onLeaveLiveStreaming");

              navigation.navigate("LiveScreen");
            },
            durationConfig: {
              isVisible: true,
              onDurationUpdate: (duration) => {
                console.log("########HostPage onDurationUpdate", duration);
                if (duration === 10 * 60) {
                  prebuiltRef.current.leave();
                }
              },
            },
            topMenuBarConfig: {
              buttons: [ZegoMenuBarButtonName.leaveButton],
            },
            onWindowMinimized: () => {
              console.log("[Demo]HostPage onWindowMinimized");
              navigation.navigate("HomeScreen");
            },
            onWindowMaximized: () => {
              console.log("[Demo]HostPage onWindowMaximized");
              navigation.navigate("HomeScreen", {
                liveID: "testLiveId",
              });
            },
          }}
          plugins={[ZIM]}
        />

        {!isHost && (
          <TouchableOpacity
            style={{ position: "absolute", top: 48, right: 66 }}
            onPress={followUser()}
          >
            <Image
              source={plus}
              style={{ width: wp(5), height: wp(5), resizeMode: "contain" }}
            />
          </TouchableOpacity>
        )}

        {!isHost ? (
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 80,
              left: wp(33),
            }}
            onPress={() => {
              setGiftView(true);
            }}
          >
            <Image
              source={gift}
              style={{ width: wp(10), height: hp(6), resizeMode: "contain" }}
            />
          </TouchableOpacity>
        ) : null}

        {giftView ? (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              width: "98%",
              height: hp(38),
              backgroundColor: "rgba(0,0,0,0.95)",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingHorizontal: wp(4),
              alignSelf: "center",
            }}
          >
            <View
              style={{
                width: "98%",
                height: hp(3),
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor:
                    giftOptionSelect == "Lucky"
                      ? "#1877F2"
                      : "rgba(0,0,0,0.95)",
                  width: "20%",
                  height: hp(3),
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setGiftOptionSelect("Lucky");
                }}
              >
                <Text
                  style={{
                    fontSize: hp(1.7),
                    fontWeight: "600",
                    color: "#fff",
                  }}
                >
                  Lucky
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor:
                    giftOptionSelect == "Popular"
                      ? "#1877F2"
                      : "rgba(0,0,0,0.95)",
                  width: "20%",
                  height: hp(3),
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setGiftOptionSelect("Popular");
                }}
              >
                <Text
                  style={{
                    fontSize: hp(1.7),
                    fontWeight: "600",
                    color: "#fff",
                  }}
                >
                  Popular
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor:
                    giftOptionSelect == "Luxury"
                      ? "#1877F2"
                      : "rgba(0,0,0,0.95)",
                  width: "20%",
                  height: hp(3),
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setGiftOptionSelect("Luxury");
                }}
              >
                <Text
                  style={{
                    fontSize: hp(1.7),
                    fontWeight: "600",
                    color: "#fff",
                  }}
                >
                  Luxury
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor:
                    giftOptionSelect == "Custom"
                      ? "#1877F2"
                      : "rgba(0,0,0,0.95)",
                  width: "20%",
                  height: hp(3),
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setGiftOptionSelect("Custom");
                }}
              >
                <Text
                  style={{
                    fontSize: hp(1.7),
                    fontWeight: "600",
                    color: "#fff",
                  }}
                >
                  Custom
                </Text>
              </TouchableOpacity>
            </View>
            <Swiper
              style={styles.wrapper}
              dot={
                <View
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: hp(4),
                  }}
                />
              }
              activeDot={
                <View
                  style={{
                    backgroundColor: "#fff",
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: hp(4),
                  }}
                />
              }
              paginationStyle={{
                bottom: -32,
              }}
              loop={false}
              showsButtons={false}
            >
              <View>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {arrayCoin.map((item, index) => {
                    if (index <= 3) {
                      return (
                        <TouchableOpacity
                          style={{
                            borderColor: item?.selected ? "#1877F2" : "#000",
                            borderWidth: 1,
                            borderRadius: 5,
                            paddingHorizontal: 5,
                          }}
                          onPress={() => onSelectCoin(index, item)}
                        >
                          <Image
                            source={plan}
                            style={{
                              width: wp(17),
                              height: hp(6),
                              resizeMode: "contain",
                            }}
                          />
                          <Text
                            style={{
                              fontSize: hp(1.8),
                              fontWeight: "600",
                              color: "#9E9E9E",
                            }}
                          >
                            {item.name}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              height: hp(2.2),
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              source={coin}
                              style={{
                                width: wp(4),
                                height: hp(2),
                                resizeMode: "contain",
                                marginTop: hp(0.4),
                              }}
                            />
                            <Text
                              style={{
                                fontSize: hp(1.7),
                                fontWeight: "600",
                                color: "#9E9E9E",
                                marginLeft: wp(2),
                              }}
                            >
                              {item.coin}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  })}
                </View>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {arrayCoin.map((item, index) => {
                    if (index > 3 && index <= 7) {
                      return (
                        <TouchableOpacity
                          style={{
                            borderColor: item?.selected ? "#1877F2" : "#000",
                            borderWidth: 1,
                            paddingHorizontal: 5,
                          }}
                          onPress={() => onSelectCoin(index, item)}
                        >
                          <Image
                            source={plan}
                            style={{
                              width: wp(17),
                              height: hp(6),
                              resizeMode: "contain",
                            }}
                          />
                          <Text
                            style={{
                              fontSize: hp(1.8),
                              fontWeight: "600",
                              color: "#9E9E9E",
                            }}
                          >
                            {item.name}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              height: hp(2.2),
                            }}
                          >
                            <Image
                              source={coin}
                              style={{
                                width: wp(4),
                                height: hp(2),
                                resizeMode: "contain",
                              }}
                            />
                            <Text
                              style={{
                                fontSize: hp(1.7),
                                fontWeight: "600",
                                color: "#9E9E9E",
                                marginLeft: wp(2),
                              }}
                            >
                              {item.coin}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  })}
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: hp(2),
                }}
              >
                {arrayCoin.map((item, index) => {
                  if (index >= 8 && index <= 11) {
                    return (
                      <TouchableOpacity
                        style={{
                          borderColor: item?.selected ? "#1877F2" : "#000",
                          borderWidth: 1,
                          paddingHorizontal: 5,
                        }}
                        onPress={() => onSelectCoin(index, item)}
                      >
                        <Image
                          source={plan}
                          style={{
                            width: wp(17),
                            height: hp(6),
                            resizeMode: "contain",
                          }}
                        />
                        <Text
                          style={{
                            fontSize: hp(1.8),
                            fontWeight: "600",
                            color: "#9E9E9E",
                          }}
                        >
                          {item.name}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            height: hp(2.2),
                          }}
                        >
                          <Image
                            source={coin}
                            style={{
                              width: wp(4),
                              height: hp(2),
                              resizeMode: "contain",
                            }}
                          />
                          <Text
                            style={{
                              fontSize: hp(1.7),
                              fontWeight: "600",
                              color: "#9E9E9E",
                              marginLeft: wp(2),
                            }}
                          >
                            {item.coin}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                })}
              </View>
            </Swiper>

            <View
              style={{
                width: "100%",
                height: hp(6),
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: wp(19),
                  height: hp(4.5),
                  backgroundColor: "#000",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  borderRadius: 5,
                }}
              >
                <Image
                  source={coin}
                  style={{ width: wp(5), height: hp(3), resizeMode: "contain" }}
                />
                <Text
                  style={{
                    fontSize: hp(2),
                    fontWeight: "700",
                    color: "#fff",
                    marginLeft: wp(3),
                  }}
                >
                  {UserData?.coin}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: wp(40),
                  backgroundColor: "#1877F2",
                  height: hp(5),
                  borderRadius: 5,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setGiftView(false), setModalVisible(true);
                  }}
                  style={{
                    width: wp(19),
                    height: hp(4.5),
                    backgroundColor: "#000",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: hp(2),
                      fontWeight: "700",
                      color: "#fff",
                    }}
                  >
                    {count}
                  </Text>
                  <Image
                    source={downArrow}
                    style={{
                      width: wp(5),
                      height: hp(10),
                      resizeMode: "contain",
                      marginLeft: wp(2),
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: wp(19),
                    height: hp(4.5),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => onSendCoin()}
                >
                  <Text
                    style={{
                      fontSize: hp(2),
                      fontWeight: "700",
                      color: "#fff",
                    }}
                  >
                    SEND
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9E26BC",
    width: "100%",
    alignItems: "center",
  },
  stream: {
    width: 200,
    height: 150,
  },
  arrowImage: {
    width: wp(24),
    height: hp(25),
    resizeMode: "contain",
  },
  postImage: {
    width: wp(25),
    height: hp(27),
    resizeMode: "contain",
  },
  buttonView: {
    width: "100%",
    height: "100%",
    marginTop: hp(-13),
  },
  max: {
    width: "100%",
    height: "100%",
  },
  remoteContainer: {
    width: "100%",
    height: 150,
    position: "absolute",
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
  headerView: {
    width: "100%",
    height: "16%",
    alignItems: "center",
    paddingHorizontal: "2%",
    position: "absolute",
    top: 0,
  },
  subHeaderView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  subHeaderView1: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: -8,
  },
  centeredView: {
    flex: 1,
    width: "100%",
  },
  modalView: {
    position: "absolute",

    bottom: 0,
    paddingVertical: 15,
    height: hp(26),
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),

    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView1: {
    position: "absolute",
    bottom: 0,
    paddingVertical: 15,
    height: hp(34),
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),

    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView2: {
    flex: 0.4,
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  signalListView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: wp(2),
  },
  photoView: {
    width: wp(7),
    height: hp(5),
    resizeMode: "contain",
  },
  fullscreenVideoView: { width: "100%", height: hp(115) },
  btnContainer: { flexDirection: "row", justifyContent: "center" },
  head: { fontSize: 20 },
  info: { backgroundColor: "#ffffe0", paddingHorizontal: 8, color: "#0000ff" },
  label: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#ffffff",
    padding: 4,
  },
  cohostVideoView: {
    width: "40%",
    height: hp(40),
    zIndex: 1,
    position: "absolute",
    top: 10,
    bottom: 50,
    left: 200,
  },
  container1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LiveStreamingScreen;
