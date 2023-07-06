import React,{useState,useCallback, useEffect} from "react";
import { View,Text,TouchableOpacity,Image,ImageBackground,StyleSheet,FlatList,Clipboard,ToastAndroid } from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../components/Pixel/index';
  import photo from "../../assets/photo.png";
  import downArrow from "../../assets/downArrow.png";
  import image1 from "../../assets/image1.png";
  import image2 from "../../assets/image2.png";
  import image3 from "../../assets/image3.png";
  import image4 from "../../assets/image4.png";
  import image5 from "../../assets/image5.png";
  import leftArrows from "../../assets/leftArrows.png";
  import {
    Send,
    Bubble,
    Actions,
    Composer,
    GiftedChat,
    SystemMessage,
  } from 'react-native-gifted-chat';
  import firestore from '@react-native-firebase/firestore';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {onGetUserApi,onGetLiveStreamingApi,onWatchListAddApi} from '../../services/Api.js'
  import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

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

const makeLongPress = (
  user,
  messages,
  setMessages
) => (context, message) => {
  console.log(' MESSAGE in CHATTER LINE 66', message);

  const options = ['Copy', 'Delete', 'Cancel'];

  const cancelButtonIndex = options.length - 1;
    context
      .actionSheet()
      .showActionSheetWithOptions(
        {options, cancelButtonIndex},
        async buttonIndex => {
          switch (buttonIndex) {
            case 0: // copy
              console.log('Get OnPress:::', buttonIndex, message.text);
              Clipboard.setString(message.text);
              ToastAndroid.show(message.text, ToastAndroid.SHORT);
              break;
            case 1: // delete message
              console.log('Get OnPress:::', buttonIndex);
              deleteMessage(buttonIndex, setMessages, messages, message, user);
              break;
            case 2:
              console.log('Get OnPress:::', buttonIndex);
              break;
          }
        },
      );

};

const deleteMessage = (buttonIndex, setMessages, messages, message, user) => {
  console.log('INDEX line 178', buttonIndex);
  // if (message.user?._id !== user.id) return;
  setMessages(messages =>
    messages.filter(m => m.messageDocId !== message.messageDocId),
  );
  db.collection('rooms')
    .doc(message.rcvr.id)
    .collection('messages')
    .doc(message.messageDocId)
    .set({deletedFor: firestore.FieldValue.arrayUnion(user.id)}, {merge: true})
    .catch(err => {
      console.log(err);
    });

  if (messages[0]._id === message._id) {
    db.collection('rooms')
      .doc( message.rcvr.id)
      .set(
        {
          [`last_msg`]:
            messages.length > 1 ? messages[1].text : '',
          [`last_msg`]:
            messages.length > 1 ? messages[1].user.name : '',
          // [`lastmsg${message.rcvr.id}`]: messages.length > 1 ? messages[0].text : null,
          // [`lastuser${message.rcvr.id}`]: messages.length > 1 ? messages[0].user.name : null,
        },
        {merge: true},
      );
  }
};


const ChatScreen = ({navigation,route}) => {
  const {rcvr,rcvrpic,user} = route.params
    const [mobileNumber,setMobileNumber] = useState('')
    const [messages, setMessages] = useState([])
    const [text,setText]= useState('')
    const [userId,setUserId] = useState('')
    const [userData,setUserData] = useState(null)
    const [loading, setLoading] = useState(false);
  const [profileImage,setProfileImage]= useState('')
  const [profile, setProfile] = useState(null);
    const chat = db.doc(`rooms/${rcvr.id}`);
 
    useEffect(()=>{
      getAuthToken()
    },[])

    const getAuthToken = async () => {
      const authToken = await AsyncStorage.getItem('token');
      setUserId(authToken)
      try{
        const response = await onGetUserApi()
        console.log("Get Response",response.data)
        setUserData(response.data.data)
      }
      catch(err){
        console.log('Error:',err)
      }
    }

    useEffect(async () => {
      const chatsRef = chat.collection(`messages`);
      const subscribe = chatsRef.onSnapshot(querySnapshot => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({type}) => type === 'added')
        .map(({doc}) => {
          const message = doc.data();

          return {
            ...message,
            messageDocId: doc.id,
            createdAt: message?.createdAt?.toDate(),
            received: message?.user?._id != user.id,
          };
        })
        .sort((a, b) => b?.createdAt?.getTime() - a?.createdAt?.getTime())
        .filter(msg => {
          if (msg?.deletedFor) {
            return !msg?.deletedFor?.includes(user.id);
          }

          return true;
        });
      appendMessages(messagesFirestore);
    });
    return subscribe;
    }, []);

    const appendMessages = useCallback(
      messages => { 
        setMessages(previousMessages =>
              GiftedChat.append(previousMessages, messages)
      )
      },
      [messages,onSend],
    );

    const onLongPress = makeLongPress(
      user,
      messages,
      setMessages
    );

    const onSend = useCallback((messages = []) => {
      const chatsRef = chat.collection(`messages`);
      const writes = messages.map(
            async m =>
              await chatsRef.add({...m, rcvr}).then(doc => doc.update('sent', true)),
          );
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      )
      const lastchat = messages[0];
        if (lastchat) {
          chat.update({
            date: new Date(lastchat.createdAt).getTime(),
            [`lastmsg${user.id}`]: lastchat.text,
            [`lastmsg${rcvr.id}`]: lastchat.text,
            [`lastuser${user.id}`]: lastchat.user.name.split(' ')[0],
            [`lastuser${rcvr.id}`]: lastchat.user.name.split(' ')[0],
            lasttime: lastchat.createdAt,
          });
    
        }
    }, [])
    // const handleSend = async messages => {
    //   if (messages?.length && reply) {
    //     Object.assign(messages[0], {reply});
    //     setReply(null);
    //   }
    //   const chatsRef = chat.collection(`messages`);
    //   const writes = messages.map(
    //     async m =>
    //       await chatsRef.add({...m, rcvr}).then(doc => doc.update('sent', true)),
    //   );
    //   await Promise.all(writes).then(async () => {
    //     const lastchat = messages[0];
    //     if (lastchat) {
    //       chat.update({
    //         date: new Date(lastchat.createdAt).getTime(),
    //         [`lastmsg${user.id}`]: lastchat.text,
    //         [`lastmsg${rcvr.id}`]: lastchat.text,
    //         [`lastuser${user.id}`]: lastchat.user.name.split(' ')[0],
    //         [`lastuser${rcvr.id}`]: lastchat.user.name.split(' ')[0],
    //         lasttime: lastchat.createdAt,
    //       });
    
    //     }
    //   });
    // };

    const selectFile = async (props) => {
      const {onSend} = props;
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
            uploadMedia(image.path,filename,onSend,downloadURL => {
              console.log("Get Value::::",downloadURL)
              return {text: '', image: downloadURL}
            })
            setProfile(imageData);
          }).catch((err)=>{
            console.log("Error:",err)
          })
        } catch (err) {
          setLoading(false);
        }
      }
    };

    function uploadMedia(uri,filename,onSend,msgFunc) {
      if (uri) {
        console.log('Get DFATA::::::', uri);
        const uploadTask = storage()
          .ref()
          .child(`/media/${filename}`)
          .putFile(uri);
        uploadTask.on(
          'state_changed',
          snapshot => {
            var progress = snapshot.bytesTransferred / snapshot.totalBytes;
            console.log('error uploading image', progress);
          },
          error => {
            console.error('error uploading image', error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              console.log('Get URL:::', downloadURL);
              onSend(msgFunc(downloadURL));
            });
          },
        );
      }
    }

return(
  <View style={styles.container}>
  <View style={styles.bannerView}>
  <Image style={styles.leftArrow} source={{uri:rcvrpic}}/>
  <Text style={{fontSize:hp(2.6),color:'#fff',fontWeight:'700',marginLeft:wp(6)}}>{rcvr?.name}</Text>
 </View>
 <GiftedChat
        text={text}
        onSend={messages => onSend(messages)}
        messages={messages}
        onLongPress={onLongPress}
        renderActions={(props) => (
          <TouchableOpacity style={{height:hp(6),width:wp(12),alignItems:"center",justifyContent:"center"}} onPress={()=>selectFile(props)}>
            <Image style={{width:wp(6),height:hp(4),resizeMode:'contain'}} source={photo} />
          </TouchableOpacity>
        )}
       onInputTextChanged={setText}
        user={{_id: user.id, name: user?.name}}
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
      bannerImage:{
        width:'100%',
        height:hp(13),
        resizeMode:'contain',
        
    },
    leftArrow:{
      width:50,
      height:50,
      borderRadius:50
    },
    bannerView:{
      flexDirection:'row',
      alignItems:'center',
      width:'94%',
      alignSelf:'center',
      height:hp(10)
    }
  });

export default ChatScreen;