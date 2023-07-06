import React,{useState,useEffect} from "react";
import { View,Text,TouchableOpacity,Image,ImageBackground,StyleSheet } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import loginBg from "../../assets/login_bg.png";
import logo from "../../assets/logo.png";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../components/Pixel/index';
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnBoardingScreen = ({navigation}) => {

useEffect(()=>{
    onCheckLogin()
},[])

const onCheckLogin = async() => {
    const token = await AsyncStorage.getItem('token')
    if(token!=null){
        navigation.navigate('TabStack')
    }
}

return(
    <View style={styles.container}>
        <ImageBackground style={styles.backGroundImage} source={loginBg}>
            
        <LinearGradient style={styles.linearView}
          colors={['rgba(158, 38, 188,0.5)', 'rgba(158, 38, 188,0.2)', 'rgba(158, 38, 188,0.1)']}>
          <Image style={styles.logoView} source={logo} />
        </LinearGradient>
        <View style={styles.buttonView}>
            <TouchableOpacity 
            onPress={()=>navigation.navigate('LoginScreen')} 
            style={styles.loginButton}
            >
                <Text style={styles.loginText}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={()=>navigation.navigate('RegisterScreen')} 
            style={styles.signupButton}>
                <Text style={styles.loginText}>Sign up</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    backGroundImage:{
        width:'100%',
        height:'100%'
    },
    linearView:{
        flex:0.5,
        alignItems:'center',
        justifyContent:'center'
    },
    logoView:{
        width:wp(50),
        height:hp(20),
        resizeMode:'contain'
    },
    buttonView:{
        flex:0.5,
        alignItems:'center',
        justifyContent:'center'
    },
    loginButton:{
        width:'90%',
        height:hp(7.5),
        backgroundColor:"#C4C4C4",
        borderRadius:hp(1),
        alignItems:"center",
        justifyContent:'center'
    },
    signupButton:{
        width:'90%',
        height:hp(7.5),
        backgroundColor:"#E7166A",
        borderRadius:hp(1),
        alignItems:"center",
        justifyContent:'center',
        marginTop:hp(2)
    },
    loginText:{
        fontSize:hp(2.4),
        fontWeight:'600',
        fontStyle:'italic',
        color:'#000'
    }
  });

export default OnBoardingScreen;