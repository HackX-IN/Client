import React,{useState} from "react";
import { View,Text,Image,StyleSheet,FlatList, TouchableOpacity,TextInput } from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import CountryPicker from 'react-native-country-picker-modal'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../components/Pixel/index';
import leftArrows from "../../assets/leftArrows.png";
import playOutline from "../../assets/playOutline.png";
import bike2 from "../../assets/bike2.png";
import coin from "../../assets/coin.png";

const livePhoto=[
  {
    id:1,
    coin:'50,000',
    price:'7$'
  },
  {
    id:2,
    coin:'100,000',
    price:'13$'
  },
  {
    id:3,
    coin:'300,000',
    price:'32$'
  },
  {
    id:4,
    coin:'550,000',
    price:'65$'
  },
  {
    id:5,
    coin:'10,00000',
    price:'90$'
  }
]

const FreeCoinScreen = ({navigation}) => {
const [code,setCode] = useState('')


return(
    <View style={styles.container}>
          <View style={styles.bannerView}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image style={styles.leftArrow} source={leftArrows}/>
          </TouchableOpacity>
          <Text style={{fontSize:hp(2.6),color:'#fff',fontWeight:'700',marginLeft:wp(6)}}>Free Coin</Text>
         </View>
       
         <View style={styles.bannerView1}>
          <View>
          <Text style={{fontSize:hp(4),color:'#9E26BC',fontWeight:'500',marginLeft:wp(6)}}>Watch Video</Text>
          <Text style={{fontSize:hp(2.2),color:'#9E26BC',fontWeight:'400',textAlign:'center'}}>Get Free Coins</Text>
          </View>
          <Image style={styles.videoPlay} source={playOutline}/>
          </View>
        
          <View style={styles.bannerView2}>
            <View style={styles.codeView}>
              <TouchableOpacity style={{
                height:hp(4.5),
                backgroundColor:"#9E26BC",
                width:wp(45),
                borderRadius:wp(3),
                alignItems:'center',
                flexDirection:'row',
                justifyContent:"space-between",
                paddingHorizontal:wp(5)
              }}>
<Text style={{fontSize:hp(2.5),color:'#fff',fontWeight:'500'}}>gaskcryi245</Text>
<Image style={styles.leftArrow} source={require('../../assets/shareFill.png')}/>
              </TouchableOpacity>
            </View>
            <View style={styles.codeView1}>
            <Text style={{fontSize:hp(2),color:'#9E26BC',fontWeight:'500',textAlign:'center'}}>{'If You Invite You Gays  are both Get \n1000 Coins'}</Text>
            </View>
            <View style={styles.codeView}>
            <TouchableOpacity style={{
                height:hp(5),
                backgroundColor:"#9E26BC",
                width:wp(45),
                borderRadius:wp(3),
                alignItems:'center',
                paddingHorizontal:wp(2),
                justifyContent:"center"
              }}>
 <TextInput 
                    value={code}
                    onChangeText={(text)=>setCode(text)}
                    placeholder="Enter Code"
                    placeholderTextColor={'rgba(256, 256, 256, 0.6)'}
                    style={{
                      color:"#FFF",
                      fontSize:hp(2),
                      textAlign:'center'
                    }}
                    />
              </TouchableOpacity>
</View>
<View style={styles.codeView}>
<TouchableOpacity style={{
                height:hp(5),
                backgroundColor:"#9E26BC",
                width:wp(30),
                borderRadius:wp(3),
                alignItems:'center',
                justifyContent:"center",
              }} onPress={()=>navigation.goBack()}>
<Text style={{fontSize:hp(2.5),color:'#fff',fontWeight:'500'}} >Submit</Text>
              </TouchableOpacity>
            </View>
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
      
    },
    bannerImage:{
        width:'100%',
        height:hp(13),
        resizeMode:'contain',
        
    },
    listView:{
      flexDirection:'row',
      width:'100%',
      alignSelf:"center",
      justifyContent:'space-between'
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
    playImage1:{
      width:wp(8),
      height:hp(6),
      resizeMode:'contain'
    },
    bannerView:{
      width:"100%",
      height:hp(12),
      alignItems:'center',
      flexDirection:'row',
      marginHorizontal:'4%'
    },
    bannerView1:{
      width:"92%",
      height:hp(10),
      alignItems:'center',
      flexDirection:'row',
      marginHorizontal:'4%',
      backgroundColor:'#fff',
      borderRadius:10,
      paddingHorizontal:wp(4),
      justifyContent:'space-between'
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
    coinView:{
      flexDirection:'row',
      width:'100%',
      alignItems:'center',
      justifyContent:'space-between',
      paddingHorizontal:'4%'
     },
     coinView1:{
      flexDirection:'row',
      width:'100%',
      alignItems:'center',
      justifyContent:'space-between',
      paddingHorizontal:'4%',
      height:hp(10)
     },
     videoPlay:{
      width:wp(14),
      height:hp(6),
      resizeMode:'contain'
    },
    bannerView2:{
      width:"92%",
      height:hp(50),
      alignItems:'center',
      marginHorizontal:'4%',
      backgroundColor:'#fff',
      borderRadius:10,
      paddingHorizontal:wp(4),
      marginTop:hp(5)
    },
    codeView:{
      width:'100%',
      height:hp(11),
      alignItems:'center',
      justifyContent:'center',
    },
    codeView1:{
      width:'100%',
      height:hp(17),
      alignItems:'center',
      justifyContent:'center',
    }
  });

export default FreeCoinScreen;