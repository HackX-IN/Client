import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import {
  onGetAllPostApi,
  onAddCommentApi,
  onAddLikeApi,
  onRemoveLikeApi,
} from "../../services/Api.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommentPopup from "../../components/CommentPopup.js";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../components/Pixel/index";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import send from "../../assets/send.png";
import comments from "../../assets/comment.png";
import like from "../../assets/like.png";
import Swiper from "react-native-swiper";

const postArray = [
  {
    name: "Jemma Ray",
    time: "19 hour ago",
    comment: [],
    like: "4k",
    images: [image3, image3, image3],
  },
  {
    name: "Jemma Ray",
    time: "19 hour ago",
    comment: [],
    like: "4k",
    images: [image1, image2, image3],
  },
  {
    name: "Jemma Ray",
    time: "19 hour ago",
    comment: [],
    like: "4k",
    images: [image1, image2, image3],
  },
];

const MyPostScreen = ({ navigation }) => {
  const [commentModal, setCommentModal] = useState(false);
  const [postData, setPostData] = useState(postArray);
  const [userId, setUserId] = useState("your_user_id_here");
  const [refresh, setRefresh] = useState(false);
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const authToken = await AsyncStorage.getItem("token");
        setUserId(authToken);
        getPostData(authToken);
      } catch (err) {
        console.log("Error:", err);
      }
    };

    const unsubscribe = navigation.addListener("focus", () => {
      getUserData();
    });

    return unsubscribe;
  }, [navigation]);

  const getPostData = async (userId) => {
    try {
      const getData = await onGetAllPostApi(userId);
      console.log("Get Post Data:::", getData.data.data);
      const currentUserPosts = getData.data.data.filter(
        (post) => post.userId === userId
      );
      console.log(currentUserPosts);
      let arrayData = currentUserPosts.reverse();
      setPostData(arrayData);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const onLikeSend = async (from, index) => {
    try {
      var raw = JSON.stringify({
        userId: userId,
        postId: from._id,
      });
      const response = await onAddLikeApi(raw);
      getPostData(userId);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const onLikeRemove = async (from, index) => {
    try {
      var raw = JSON.stringify({
        userId: userId,
        postId: from._id,
      });
      const response = await onRemoveLikeApi(raw);
      getPostData(userId);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const addComment = async (from, index, comment) => {
    try {
      var raw = JSON.stringify({
        userId: userId,
        postId: from._id,
        comment: comment,
      });
      const response = await onAddCommentApi(raw);
      setRefresh(!refresh);
      from.commentInput = "";
      getPostData(userId);
    } catch (err) {
      console.log("Error:", err);
    }
  };
  const renderItem = ({ item, index }) => {
    console.log("Get Post ITem:::", item?.caption);
    if (item?.likes?.length > 0) {
      item?.likes?.map((item1, index1) => {
        // console.log("Get Like:::", item1);
        if (item1.userId == userId) {
          postData[index].likeSend = true;
        }
      });
    }

    return (
      <View style={styles.firstView}>
        <View
          style={{
            width: "96%",
            height: hp(8),
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            alignSelf: "center",
            marginTop: -15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.userDetails ? (
              <Image
                style={styles.profileImage}
                source={{
                  uri: `http://13.233.229.68:8008/profile_images/${item.userDetails[0]?.photo}`,
                }}
              />
            ) : null}
            <View
              style={{
                height: hp(5),
                justifyContent: "space-between",
                marginLeft: wp(4),
                marginBottom: wp(2),
              }}
            >
              {item.userDetails ? (
                <Text style={styles.nameText}>{item.userDetails[0]?.name}</Text>
              ) : null}

              <Text style={styles.nameText1} numberOfLines={2}>
                {item?.caption}
              </Text>
            </View>
          </View>
        </View>
        <Swiper
          style={styles.wrapper}
          key={item?.comments?.length}
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
                marginBottom: hp(18),
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: "#fff",
                width: wp(10),
                height: 5,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: hp(18),
              }}
            />
          }
          paginationStyle={{
            bottom: -32,
            left: 13,
            right: null,
          }}
          loop={false}
          showsButtons={false}
        >
          <View style={{ width: "97%", alignSelf: "center", height: "100%" }}>
            <Image
              style={styles.imageBox}
              source={{
                uri: `http://13.233.229.68:8008/posts/${item.postUrl}`,
              }}
            />
          </View>
        </Swiper>

        <View
          style={{
            width: "100%",
            height: hp(6),
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            borderBottomColor: "#fff",
            borderBottomWidth: 2,
            borderTopColor: "#fff",
            borderTopWidth: 2,
            marginVertical: hp(2),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "60%",
            }}
          >
            {/* <TouchableOpacity style={{alignItems:'center',
              justifyContent:'center',}}>
            <Image
                    style={styles.sendIcon}
                    source={send} />
            </TouchableOpacity> */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{
                  width: wp(14),
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setCommentData(item?.comments), setCommentModal(true);
                }}
              >
                <Image style={styles.sendIcon} source={comments} />
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: hp(2),
                }}
              >
                {item?.comments?.length}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
              onPress={() => {
                item?.likeSend
                  ? onLikeRemove(item, index)
                  : onLikeSend(item, index);
              }}
            >
              <Image
                style={[
                  styles.sendIcon,
                  { tintColor: item?.likeSend ? "#ff0000" : "#fff" },
                ]}
                source={like}
              />
              <Text
                style={{
                  color: "#fff",
                  fontSize: hp(2),
                  marginLeft: wp(2),
                }}
              >
                {item?.likes?.length}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topButtonStyle}>
          <TouchableOpacity
            style={{ marginLeft: 8, marginTop: 4 }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../../assets/leftArrows.png")}
              style={{ width: wp(5), height: wp(5) }}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 12,
              fontSize: 18,
              fontWeight: "800",
              marginBottom: -6,
              color: "#fff",
              textAlign: "center",
            }}
          >
            My Posts
          </Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={postData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: hp(10) }}
        />
      </View>
      <CommentPopup
        onRequestClose={() => {
          setCommentModal(false);
        }}
        visible={commentModal}
        onClose={() => {
          setCommentModal(false);
        }}
        title={"Comment List"}
        allList={commentData}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0371FF",
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: "2%",
    paddingVertical: "5%",
  },
  topButtonStyle: {
    height: hp(6),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginTop: -15,
  },
  popularOption: {
    height: "100%",
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#000",
  },
  titleText: { fontSize: hp(2.2), color: "#0371FF", fontWeight: "700" },
  firstView: {
    width: "100%",
    height: hp(75),
    alignSelf: "center",
    marginTop: hp(3),
  },
  imageBox: {
    width: "100%",
    height: "100%",
    borderRadius: hp(1),
  },
  wrapper: {},
  profileImage: {
    width: wp(12),
    height: hp(6),
    borderRadius: 10,
    // marginLeft: 10,
  },
  nameText: {
    fontSize: hp(2.2),
    color: "#fff",
    fontWeight: "700",
  },
  nameText1: {
    fontSize: hp(1.4),
    color: "#fff",
    fontWeight: "400",
  },
  timeText: {
    fontSize: hp(1.8),
    color: "#fff",
    fontWeight: "400",
  },
  iconImage: {
    width: wp(6),
    height: hp(6),
    resizeMode: "contain",
  },
  profileCommentImage: {
    width: wp(8),
    height: hp(4),
    borderRadius: 5,
  },
  commentText: {
    fontSize: hp(2),
    color: "#000",
    fontWeight: "700",
  },
  sendIcon: {
    width: wp(6),
    height: hp(3),
    resizeMode: "contain",
  },
});

export default MyPostScreen;
