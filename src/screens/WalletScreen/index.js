import React,{useEffect, useState} from "react";
import { View,Text,TouchableOpacity,Image,ImageBackground,StyleSheet,TextInput, FlatList } from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import CountryPicker from 'react-native-country-picker-modal'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../components/Pixel/index';
  import image1 from "../../assets/image1.png";
  import image2 from "../../assets/image2.png";
  import image3 from "../../assets/image3.png";
  import send from "../../assets/send.png";
  import comments from "../../assets/comment.png";
  import like from "../../assets/like.png";
  import Swiper from "react-native-swiper";
  import {onGetAllPostApi,onAddCommentApi,onAddLikeApi,onRemoveLikeApi} from '../../services/Api.js'
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import CommentPopup from '../../components/CommentPopup.js'

const postArray=[
  {
    name:'Jemma Ray',
    time:'19 hour ago',
    comment:[],
    like:'4k',
    images:[
      image3,
      image3,
      image3
    ]
  },
  {
    name:'Jemma Ray',
    time:'19 hour ago',
    comment:[],
    like:'4k',
    images:[
      image1,
      image2,
      image3
    ]
  },
  {
    name:'Jemma Ray',
    time:'19 hour ago',
    comment:[],
    like:'4k',
    images:[
      image1,
      image2,
      image3
    ]
  }
]

const WalletScreen = ({navigation}) => {
const [commentModal,setCommentModal] = useState(false)
const [postData,setPostData] = useState([])
const [userId,setUserId] = useState('')
const [refresh,setRefresh] = useState(false)
const [commentData,setCommentData] = useState([])

useEffect(()=>{
    const subscribe = navigation.addListener('focus',()=>{
      getPostData()
    })
},[])

const getPostData= async()=>{
  try{
    const authToken = await AsyncStorage.getItem('token');
    setUserId(authToken)
    const getData = await onGetAllPostApi()
    console.log("GEt Post Data:::",getData.data.data)
    let arrayData=getData.data.data.reverse()
    setPostData(arrayData)
  }
  catch(err){
    console.log("Error:",err)
  }
}

const onLikeSend = async(from,index) =>{
  try{
    var raw = JSON.stringify({
      userId: userId,
      postId: from._id
    });
    const response=await onAddLikeApi(raw)
    console.log('Get Response:',response.data)
    getPostData()
    // from?.likes.map((item1,index1)=>{
    //   from.userId.map((item2,index2)=>{
    //     console.log("Get Like:::",item1)
    //     if(item2._id==userId){
    //       postData[index].likeSend=true
          
    //     }
    //   })
    // })
  }
  catch(err){
    console.log('Error:',err)
  }
}

const onLikeRemove = async(from,index) =>{
  try{
    var raw = JSON.stringify({
      userId: userId,
      postId: from._id
    });
    const response=await onRemoveLikeApi(raw)
    console.log('Get Response:',response.data)
    getPostData()
  }
  catch(err){
    console.log('Error:',err)
  }
}


const addComment = async(from,index,comment) => {
  try{
    var raw = JSON.stringify({
      userId: userId,
      postId: from._id,
      comment:comment
    });
    const response=await onAddCommentApi(raw)
    console.log('Get Response:',response.data)
    setRefresh(!refresh)
    postData[index].commentInput=''
   
    getPostData()
  }
  catch(err){
    console.log('Error:',err)
  }
}

  const renderItem = ({item,index}) => {
    // console.log("Get Post ITem:::",item)
    if(item?.likes?.length>0){
      item?.likes?.map((item1,index1)=>{
        console.log("Get Like:::",item1)
             if(item1.userId==userId){
            postData[index].likeSend=true
          }
      })
    }

    return(
      <View style={styles.firstView}>
                  <View style={{
            width:"96%",
            height:hp(8),
            alignItems:'center',
            justifyContent:'space-between',
            flexDirection:'row',
            alignSelf:'center'
          }}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <Image
                    style={styles.profileImage}
                    source={{uri:`https://live-stream-lovely.onrender.com/profile_images/${item.userDetails[0]?.photo}`}} />
                    <View style={{height:hp(5),justifyContent:'space-between',marginLeft:wp(3)}}>
                    <Text style={styles.nameText}>{item.userDetails[0]?.name}</Text>
                    {/* <Text style={styles.timeText}>{item.userDetails[0].time}</Text> */}
                    </View>

            </View>

          </View>
          <Swiper 
          style={styles.wrapper}
          key={item?.comments?.length}
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
                marginBottom: hp(18)
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: '#fff',
                width: wp(10),
                height: 5,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: hp(18)
              }}
            />
          }
          paginationStyle={{
            bottom: -32,
            left: 13,
            right: null
          }}
          loop={false}
           showsButtons={false}>
          {/* {item.images.map((item1,index)=>{
            return( */}
           
              <View style={{ width:'97%',alignSelf:'center',height:'100%' }}>
                  <Image
                    style={styles.imageBox}
                    source={{uri:`https://live-stream-lovely.onrender.com/posts/${item.postUrl}`}} />
                </View>
           
            {/* )
            
          })} */}
          </Swiper>


          <View style={{
            width:"100%",
            height:hp(6),
            alignItems:'center',
            alignSelf:'center',
            justifyContent:"center",
            borderBottomColor:'#fff',
            borderBottomWidth:2,
            borderTopColor:'#fff',
            borderTopWidth:2,
            marginVertical:hp(2)
          }}>
            <View style={{
              flexDirection:'row',
              alignItems:'center',
              justifyContent:'space-between',
              width:"60%",
            }}>
            {/* <TouchableOpacity style={{alignItems:'center',
              justifyContent:'center',}}>
            <Image
                    style={styles.sendIcon}
                    source={send} />
            </TouchableOpacity> */}
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <TouchableOpacity style={{
              width:wp(14),
              alignItems:'center',
              justifyContent:'center',
            }} onPress={()=>{
              setCommentData(item?.comments),
              setCommentModal(true)
            }}>
            <Image
                    style={styles.sendIcon}
                    source={comments} />
            </TouchableOpacity>
            <Text style={{
              textAlign:"center",
              color:'#fff',
              fontSize:hp(2)
            }}>{item?.comments?.length}</Text>
</View>
            <TouchableOpacity style={{
              alignItems:'center',
              justifyContent:'center',
              flexDirection:'row'
            }} onPress={()=>{item?.likeSend?onLikeRemove(item,index):onLikeSend(item,index)}}>
            <Image
                    style={[styles.sendIcon,{tintColor:item?.likeSend ?"#ff0000" :"#fff"}]}
                    source={like} />
                     <Text  style={{
              color:'#fff',
              fontSize:hp(2),
              marginLeft:wp(2)
            }}>{item?.likes?.length}</Text>
            </TouchableOpacity>
            </View>

          </View>

          <View style={{
            backgroundColor:'#fff',
            width:'100%',
            height:hp(8),
            borderRadius:10,
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
            paddingHorizontal:wp(3)
          }}>
 <Image
                    style={styles.profileCommentImage}
                    source={{uri:`https://live-stream-lovely.onrender.com/profile_images/${item.userDetails[0]?.photo}`}}/>
                    <TextInput 
                    value={item?.commentInput}
                    onChangeText={(text)=>postData[index].commentInput=text}
                    placeholder="Add a comment..."
                    placeholderTextColor={'rgba(0, 0, 0, 0.6)'}
                    style={{
                      width:'80%',
                      color:"rgba(0, 0, 0, 0.6)",
                      fontSize:hp(2),
                      marginLeft:wp(1)
                    }}
                    />
                    <TouchableOpacity style={{width:'10%'}} onPress={()=>addComment(item,index,item?.commentInput)}>
            <Image
                    style={[styles.sendIcon,{tintColor:'#848484'}]}
                    source={send} />
            </TouchableOpacity>
          </View>
      </View>
    )
  }

return(
  <>
    <View style={styles.container}>
      <View style={styles.topButtonStyle}>
        <TouchableOpacity style={styles.popularOption}>
          <Text style={styles.titleText}>Popular</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.popularOption}>
          <Text style={styles.titleText}>Latest</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.popularOption,{borderRightWidth:0}]}>
          <Text style={styles.titleText}>Following</Text>
        </TouchableOpacity>
      </View>
      <FlatList 
      data={postData}
      renderItem={renderItem}
      keyExtractor={(item,index)=>index.toString()}
      contentContainerStyle={{paddingBottom:hp(10)}}
      />


    </View>
    <CommentPopup
      onRequestClose={()=>{setCommentModal(false)}}
      visible={commentModal}
      onClose={()=>{setCommentModal(false)}}
      title={'Comment List'}
      allList={commentData}
    />
    </>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#9E26BC',
        width:'100%',
        alignSelf:'center',
        paddingHorizontal:'2%',
        paddingVertical:'5%'
      },
      topButtonStyle:{
        width:'100%',
        height:hp(7),
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
      },
      popularOption:{
        height:'100%',
        width:'33%',
        alignItems:'center',
        justifyContent:"center",
        borderRightWidth:1,
        borderRightColor:'#000'
      },
      titleText:{fontSize:hp(2.2),color:'#9E26BC',fontWeight:'700'},
      firstView:{
        width:'100%',
        height:hp(75),
        alignSelf:'center',
        marginTop:hp(3)
      },
      imageBox:{
        width: '100%',
        height: '100%',
        borderRadius:hp(1)
      },
      wrapper: {},
      profileImage:{
        width:wp(12),
        height:hp(6),
        borderRadius:10
      },
      nameText:{
        fontSize:hp(2.2),color:'#fff',fontWeight:'700'
      },
      timeText:{
        fontSize:hp(1.8),color:'#fff',fontWeight:'400'
      },
      iconImage:{
        width:wp(6),
        height:hp(6),
        resizeMode:'contain'
      },
      profileCommentImage:{
        width:wp(8),
        height:hp(4),
        borderRadius:5
      },
      commentText:{
        fontSize:hp(2),color:'#000',fontWeight:'700'
      },
      sendIcon:{
        width:wp(6),
        height:hp(3),
        resizeMode:'contain'
      },
  });

export default WalletScreen;