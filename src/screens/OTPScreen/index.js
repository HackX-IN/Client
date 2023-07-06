import React,{useState,useRef,useEffect} from "react";
import { View,Text,TouchableOpacity,Image,ImageBackground,StyleSheet,TextInput,Keyboard,Dimensions } from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../components/Pixel/index';
  import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
  import logo from "../../assets/logo.png";
  import {Loader} from '../../components/Loader.js'
  import {VerifyOtpScreenApi} from '../../services/Api.js'
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import auth from '@react-native-firebase/auth';

  const {height, width} = Dimensions.get('window');

const OTPScreen = ({navigation,route}) => {
    const inputCodeRef = useRef(null);
    const [value, setValue] = useState('');
    const [isLoading,setIsLoading] = useState(false)
    const [timer, setTimer] = useState(60);
    const [confirmation,setConfirmation] = useState('')
    const [resend,setResend] = useState(false)
    const [inputCodeProps, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
      });

  // entry otp time out.
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => {
        // Add a leading zero if the countdown is a single digit
        const formattedTimer = parseInt(prevTimer) - 1;
        return prevTimer < 11 ? `0${formattedTimer}` : formattedTimer;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

      // const onVerifyOtp=async(otpValue=false)=>{
      //   if(resend==false){
      //   try {
      //     const confirmation=route.params?.confirm
      //     setLoading(true)
      //    const verify= await confirmation.confirm(otpValue ? otpValue : value);
      //    console.log('Get Api Response:::',verify)
      //    if(verify){
      //     setLoading(false)
          
      //     if(route.params?.from=='forgot'){
      //       navigation.navigate('setUpNewPassword',{id:route.params?.id});
      //     }
      //     else{
      //       AsyncStorage.setItem('id',route.params?.id)
      //     navigation.navigate('OtpSuccess',{id:route.params?.id});
      //     } 
      //   }
      //    else{
      //     setLoading(false)
      //     setAlertMessage('Please Enter Valid Otp.')
      //     setAlertPopup(true)
      //    }
      //   } catch (error) {
      //     setLoading(false)
      //     setAlertMessage('Invalid Otp.')
      //     setAlertPopup(true)
      //   }
      // }
      // else{
      //   try {
      //     // const confirmation=route.params?.confirm
      //     setLoading(true)
      //    const verify= await confirmation.confirm(value);
      //    console.log('Get Api Response:::',verify)
      //    if(verify){
      //     setLoading(false)
      //     if(route.params?.from=='forgot'){
      //       navigation.navigate('setUpNewPassword',{id:route.params?.id});
      //     }
      //     else{
      //       AsyncStorage.setItem('id',route.params?.id)
      //     navigation.navigate('OtpSuccess',{id:route.params?.id});
      //     } 
      //    }
      //    else{
      //     setLoading(false)
      //     setAlertMessage('Please Enter Valid Otp.')
      //     setAlertPopup(true)
      //     // alert('Invalid Otp.')
      //    }
      //   } catch (error) {
      //     setLoading(false)
      //     setAlertMessage('Invalid Otp.')
      //     setAlertPopup(true)
      //     // alert('Invalid Otp.')
      //   }
      // }

      // }


      const onSubmitData = async() => {
        try{
            setIsLoading(true)
            if(value==''){
                setIsLoading(false)
                alert('Please enter 4 digit otp.')
            }
            else if(value.length !=6){
                setIsLoading(false)
                alert('Please enter valid otp.')
            }
          //   else if(value!=1122){
          //     setIsLoading(false)
          //     alert('Please enter valid otp.')
          // }
            else{
              if(resend==false){
              const confirmation=route.params?.confirm
             const verify= await confirmation.confirm(value);
             console.log('Get Api Response:::',verify)
             if(verify){
              setIsLoading(false)
              navigation.navigate('TabStack')
            }
            else{
                  setIsLoading(false)
                  AsyncStorage.setItem('token','')
                  alert('Please Enter Valid Otp.')
              }
            }
            else{
              // const confirmation=route.params?.confirm
              const verify= await confirmation.confirm(value);
              console.log('Get Api Response:::',verify)
              if(verify){
               setIsLoading(false)
               navigation.navigate('TabStack')
             }
             else{
                   setIsLoading(false)
                   AsyncStorage.setItem('token','')
                   alert('Please Enter Valid Otp.')
               }
            }
                // var raw = JSON.stringify({
                //     otp: value,
                //     mobile: route.params?.mobileNumber
                //   });
    
                // const response = await VerifyOtpScreenApi(raw,route.params?.mobileNumber,value)
                // console.log("Get Response:::",response.data)
                // if(response.data.status){
                //         setIsLoading(false)
                //         alert(response.data.message)
                //         navigation.navigate('TabStack')
                // }
                // else{
                //     setIsLoading(false)
                //     AsyncStorage.setItem('token','')
                //     alert(response.data.message)
                // }
            }
            
        }
        catch(err){
            setIsLoading(false)
            console.log('Error:',err)
        }
    }

    const onResendOtpFunction = async()=>{
      
      // console.log('get Number:::',route.params?.mobileNumber)
      const confirmation = await auth().signInWithPhoneNumber('+918866496297');
      console.log('get Number:::',confirmation)
      setResend(true)
      setConfirmation(confirmation)
      setTimer(60)
    }

return(
  <>
    <View style={styles.container}>
        <View style={styles.firstView}> 
        <TouchableOpacity style={styles.leftArrowButton} onPress={()=>navigation.goBack()}>
            <Image source={ArrowLeft} style={styles.arrowImage} />
        </TouchableOpacity>
        <Text style={styles.phoneText}>OTP sent</Text>
        <Text style={styles.phoneNumberText}>Enter the OTP sent to you</Text>
        <View style={styles.OtpView}>
        <CodeField
                ref={inputCodeRef}
                {...inputCodeProps}
                value={value}
                onChangeText={(value, i) => {
                  setValue(value);
                  if (value && value.length === 6) {
                    Keyboard.dismiss()
                  }
                }}
                cellCount={6}
                rootStyle={styles.codeFieldRoot}

                returnKeyType={'done'}
                enablesReturnKeyAutomatically
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                onSubmitEditing={() => {Keyboard.dismiss()}}
                renderCell={({index, symbol, isFocused}) => (
                  <View
                    style={[
                      styles.optTextView,
                      {
                        borderBottomColor: '#F55800',
                      },
                    ]}>
                    <Text
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
            </View>
            <View style={{
              flexDirection:'row',
              alignItems:'center'
            }}>
            <Text style={styles.desText}>Didn’t receive any code? </Text>
            {parseInt(timer) <= 0 ? (
                <TouchableOpacity style={{flexDirection:'row'}}  onPress={() => onResendOtpFunction()}>
                <Text
                 
                  style={styles.desText}>
                  {' '}
                  RESEND 
                </Text>
               
               
                </TouchableOpacity>
               
              ) : (
                <Text style={styles.desText}>Resend in 00:{timer}</Text>
              )}
              </View>
            </View>
            <View style={styles.secondView}> 
            <Image style={styles.logoView} source={logo} />
            </View>
            <View style={styles.ThirdView}> 
            <TouchableOpacity style={styles.loginButton} onPress={()=>onSubmitData()}>
            <Text style={styles.loginText}>Next</Text>
            </TouchableOpacity>

            <Text style={styles.signupText}>Already have an account? Sign In</Text>
            </View>
    </View>
     <Loader isLoading={isLoading} />
     </>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#9E26BC',
      width:'100%',
      alignSelf:'center',
      paddingHorizontal:'5%'
    },
    arrowImage:{
        width:wp(4),
        height:hp(2.5),
        resizeMode:'contain'
    },
    leftArrowButton:{
        marginTop:hp(7),
        marginBottom:hp(6)
    },
    phoneText:{
        fontSize:hp(2.6),
        fontWeight:'700',
        color:"#fff"
    },
    phoneNumberText:{
        fontSize:hp(2.1),
        fontWeight:'600',
        color:"#fff",
        marginVertical:hp(1),
        opacity:0.6
    },
    loginButton:{
        width:'100%',
        height:hp(7),
        borderRadius:hp(1),
        alignItems:"center",
        justifyContent:'center',
        marginTop:hp(2),
        flexDirection:'row',
        backgroundColor:'#fff'
    },
    OtpView:{
        width:'100%',
        height:hp(7),
        borderRadius:hp(1),
        alignItems:"center",
        marginTop:hp(2),
        flexDirection:'row',
    },
    textInputStyle:{
        width:'80%',
        fontSize:hp(2.2),
        fontWeight:'500',
        color:"#000",
        opacity:0.6
    },
    firstView:{
        flex:0.4,
    },
    secondView:{
        flex:0.35,
        alignItems:"center",
        justifyContent:"center"
    },
    ThirdView:{
        flex:0.25,
        alignItems:'center'
    },
    loginText:{
        fontSize:hp(2.4),
        fontWeight:'600',
        color:'#000'
    },
    signupText:{
        fontSize:hp(2.1),
        fontWeight:'500',
        color:"#fff",
        marginVertical:hp(4),
    },
    desText:{
        fontSize:hp(1.7),
        fontWeight:'600',
        color:"#fff",
        marginVertical:hp(1)
    },
    optTextView: {
        width: '13%',
        height: (width * 0.95 - 20) / 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        // marginHorizontal: wp(2),
        borderBottomColor: '#848484',
        borderRadius:hp(1.5),
        marginRight:wp(3)
      },
      cell: {
        fontSize: hp(2.4),
        color: '#000',
      },
      logoView:{
        width:wp(50),
        height:hp(20),
        resizeMode:'contain'
    },
  });

export default OTPScreen;