import React,{useState,useEffect} from "react";
import { View,Text,TouchableOpacity,Image,ImageBackground,StyleSheet,FlatList } from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../components/Pixel/index';
  import search from "../../assets/search.png";
  import downArrow from "../../assets/downArrow.png";
  import image1 from "../../assets/image1.png";
  import image2 from "../../assets/image2.png";
  import image3 from "../../assets/image3.png";
  import image4 from "../../assets/image4.png";
  import image5 from "../../assets/image5.png";
  import firestore from "@react-native-firebase/firestore";
  import moment from "moment";
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {onGetUserApi,onGetLiveStreamingApi,onWatchListAddApi} from '../../services/Api.js'

  const db = firestore();
const messageArray=[
  {
    id:1,
    name:'Marcel Orleando',
    lastMsg:'HI Romuald how are you?',
    time:'03:15 PM',
    status:true,
    user:image1
  },
  {
    id:2,
    name:'Marcel Orleando',
    lastMsg:'HI Romuald how are you?',
    time:'03:15 PM',
    status:true,
    user:image2
  },
  {
    id:3,
    name:'Marcel Orleando',
    lastMsg:'HI Romuald how are you?',
    time:'03:15 PM',
    status:true,
    user:image3
  },
  {
    id:4,
    name:'Marcel Orleando',
    lastMsg:'HI Romuald how are you?',
    time:'03:15 PM',
    status:true,
    user:image4
  },
  {
    id:5,
    name:'Marcel Orleando',
    lastMsg:'HI Romuald how are you?',
    time:'03:15 PM',
    status:true,
    user:image5
  },
  {
    id:6,
    name:'Marcel Orleando',
    lastMsg:'HI Romuald how are you?',
    time:'03:15 PM',
    status:true,
    user:image1
  }
]

const MessageScreen = ({navigation}) => {
    const [mobileNumber,setMobileNumber] = useState('')
    const [chatData,setChatData] = useState([])
    const [refresh,setRefresh] = useState(false)
    const [userId,setUserId] = useState('')
    const [userData,setUserData] = useState(null)

    useEffect(()=>{
      getAuthToken()
    },[])

    const getAuthToken = async () => {
      const authToken = await AsyncStorage.getItem('token');
      setUserId(authToken)
      try{
        const response = await onGetUserApi()
        console.log("Get Response",response.data)
        setUserData(response.data.data[0])
      }
      catch(err){
        console.log('Error:',err)
      }
    }

    useEffect(() => {

        db.collection(`rooms`)
          .orderBy('date', 'desc')
          .onSnapshot(snapshot => {
           snapshot.docs.map(doc=>{
          
            chatData.push(doc.data())
            setRefresh(!refresh)
           })
          });
    }, []);

  const renderItem = ({item,index}) => {
    console.log("Get Room Details::1",userId,userData?.name)
    return(
      <TouchableOpacity style={{width:'100%',height:hp(10),flexDirection:'row',backgroundColor:'#fff',marginBottom:hp(1),paddingHorizontal:wp(5),alignItems:'center'}} onPress={()=>navigation.navigate('ChatScreen',{
        rcvr: {id:item.id,receiver_id:userId==item.senderId?item.receiverId:item.senderId, name: userId==item.senderId?item.receiver_name:item.sender_name, profilePic:item.image},
        rcvrpic: item.image,
        user:{id:userId,name:userData?.name}
      })}>
        <Image style={{width:60,height:60,borderRadius:60}} source={{uri:item.image}} />

        <View style={{width:'70%',marginLeft:wp(3)}}>
          <View style={{flexDirection:'row',alignItems:"center",justifyContent:'space-between',width:'100%'}}>
          <Text style={{fontSize:hp(2.3),color:'#9E26BC',fontWeight:'700'}}>{userId==item.senderId?item.receiver_name:item.sender_name}</Text>
          <Text style={{fontSize:hp(1.6),color:'#9E26BC',fontWeight:'500'}}>{moment(item.date).format('hh:mm a')}</Text>
          </View>
          <Text style={{fontSize:hp(1.8),color:'#9E26BC',fontWeight:'500'}}>{item.last_msg}</Text>
        </View>
      </TouchableOpacity>
    )
  }

return(
    <View style={styles.container}>
      <View style={styles.headerView}>
         <View style={styles.bannerView}>
         <Text style={{fontSize:hp(2.6),color:'#fff',fontWeight:'700'}}>Messages</Text>
         <Image style={styles.leftArrow} source={downArrow}/>
        </View>
        <TouchableOpacity>
        <Image style={styles.leftArrow} source={search}/>
        </TouchableOpacity>
      </View>

      <FlatList 
      data={chatData}
      renderItem={renderItem}
      keyExtractor={(item,index)=>index.toString()}
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
      },
      headerView:{
        width:"100%",
        height:hp(15),
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:'5%'
      },
      bannerView:{
        alignItems:'center',
        flexDirection:'row'
      },
      leftArrow:{
        width:wp(7),
        height:hp(4),
        resizeMode:'contain'
      },
  });

export default MessageScreen;