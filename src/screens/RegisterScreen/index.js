import React,{useState,useRef} from "react";
import { View,Text,TouchableOpacity,Image,ImageBackground,StyleSheet,TextInput,Keyboard,Dimensions } from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../components/Pixel/index';
  import logo from "../../assets/logo.png";
  import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
  import {RegistrationScreenApi,SendOtpScreenApi,onGetUserApi,onUploadImageApi} from '../../services/Api.js'
  import {Loader} from '../../components/Loader.js'
  import DropdownPopup from '../../components/DropdownPopup'
  import DatePicker from 'react-native-date-picker';
  import moment from 'moment';
  import CountryPicker from 'react-native-country-picker-modal'
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import auth from '@react-native-firebase/auth';
  import firestore from "@react-native-firebase/firestore";
  import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
  import ImagePicker from 'react-native-image-crop-picker';

  const {height, width} = Dimensions.get('window');

const genderList = [
    {
    name:'Male',
    selected:false
    },
    {
    name:'Female',
    selected:false
    }
]

const RegisterScreen = ({navigation}) => {
    const inputCodeRef = useRef(null);
    const [value, setValue] = useState('');
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [date,setDate] = useState('')
    const [gender,setGender] = useState('')
    const [about,setAbout] = useState('')
    const [mobile,setMobile] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [modalVisible,setModalVisible] = useState(false)
    const [genderOption,setGenderOption] = useState(genderList)
    const [open, setOpen] = useState(false);
    const [fullDate,setFullDate] = useState(new Date());
    const [countryName, setcountryName] = useState('US');
    const [countryCode, setcountryCode] = useState('+1');
    const [dateFormat,setDateFormat] = useState('')
     const [profileImage,setProfileImage]= useState('')
    const [profile, setProfile] = useState(null);
    const [refresh,setRefresh] = useState(false)
    
    const onCountrySelect = country => {
        setcountryName(country.cca2);
        setcountryCode('+' + country.callingCode[0]);
      };

    const onSubmitData = async() => {
        try{
            setIsLoading(true)
            if(name==''){
                setIsLoading(false)
                alert('Please enter your full name.')
            }
            else if(mobile==''){
                setIsLoading(false)
                alert('Please enter your mobile number.')
            }
            else if(date==''){
                setIsLoading(false)
                alert('Please enter your date of birth.')
            }
            else if(gender==''){
                setIsLoading(false)
                alert('Please enter your gender.')
            }
            else{
    
       

                var raw = JSON.stringify({
                    name: name,
                    mobile: mobile,
                    about: "about",
                    dob: dateFormat,
                    gender: gender=='Male'?1:2
                  });
    
                const response = await RegistrationScreenApi(raw)
                console.log("Get Response:::",raw,date)
                if(response.data.success){
                    
                    await firestore().collection('users').doc(response.data.data._id).set({
                        name: name,
                        email: email,
                        mobile: mobile,
                        about: "about",
                        dob: dateFormat,
                        gender: gender=='Male',
                        userId:response.data.data._id
                    })
                    .then((res)=>{
                        console.log("Get Firebase Response::",res)
                    })
                   
                    // var raw1 = JSON.stringify({
                    //     otp: 1122,
                    //     mobile: mobile
                    //   });
                    // const response1 = await SendOtpScreenApi(raw1,mobile)
                    // console.log("Get Response:::",response1.data)
                    // if(response1.data.status){
                       
                        const confirmation = await auth().signInWithPhoneNumber(`${countryCode+mobile}`);
                        if (confirmation) {
                     
                        AsyncStorage.setItem('token',response.data.data._id)
                        onImageUpload(profile)
                        setIsLoading(false)
                    navigation.navigate('OTPScreen',{mobileNumber:`${countryCode+mobile}`,confirm: confirmation})
                        } else {
                            setIsLoading(false)
                          console.log('error');
                        }
                       
                    // }
                    // else{
                    //     setIsLoading(false)
                    //     alert(response1.data.message)
                    // }
                }
                else{
                    setIsLoading(false)
                    alert(response.data.message)
                }
            }
            
        }
        catch(err){
            setIsLoading(false)
            console.log('Error:',err)
        }
    }

    const onChangeDob = (value) => {
        setDate(moment(value).format('DD-MM-YYYY'));
        setDateFormat(moment(value).format('YY-MM-DD'))
        setFullDate(value);
    }

 const onSelectGender = (index,item) =>{
    let arrayList=genderOption
    arrayList.map((item1,index1)=>{
        if(index1==index){
            arrayList[index1].selected=true
        }
        else{
            arrayList[index1].selected=false
        }
    })
   
    setGender(item.name)
    setModalVisible(false)
    setGenderOption(arrayList)
 }


 const selectFile = async () => {
    if (Platform.OS == 'ios') {
      let options = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
      };
      launchImageLibrary(options, response => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled camera picker');
             return;
        } else if (response.errorCode == 'camera_unavailable') {
          console.log('Camera not available on device');
            return;
        } else if (response.errorCode == 'permission') {
          console.log('Permission not satisfied');
            return;
        } else if (response.errorCode == 'others') {
          console.log(response.errorMessage);
              return;
        }

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
          // setProfile(response.data.image)
          setProfile(imageData);
            // onImageUpload(imageData)
        }).catch((err)=>{
          console.log("Error:",err)
        })
      } catch (err) {
      }
    }
  };

  const onImageUpload = async(imageData) =>{
  try{
    var formdata = new FormData();
    formdata.append("profile_image", imageData);

    const response = await onUploadImageApi(formdata)
    console.log("Get Response",response.data)
  }
  catch(err){
    console.log("Error:",err)
  }
  }


return(
    <>
    <View style={styles.container}>
        <View style={styles.firstView}> 
        <TouchableOpacity style={styles.leftArrowButton} onPress={()=>navigation.goBack()}>
            <Image source={ArrowLeft} style={styles.arrowImage} />
        </TouchableOpacity>
        <Text style={styles.phoneText}>Personal Information</Text>
            </View>
            <View style={styles.secondView}>
         <KeyboardAwareScrollView >

                <TouchableOpacity style={{
                    width:100,
                    height:100,
                    borderRadius:100,
                    backgroundColor:'#D9D9D9',
                    alignSelf:'center'
                }} onPress={()=>selectFile()}>
                     {profileImage!=''?
                    <Image source={{uri:profileImage}} style={{width:100,height:100,borderRadius:100}} />
                    :
                    null
                  }
                </TouchableOpacity>
            
                <Text style={styles.phoneNumberText}>Full name</Text>
                <View style={styles.loginButton1}>
                <TextInput
                value={name}
                onChangeText={(value)=>{setName(value)}}
                style={styles.textInputStyle}
                />
                </View>
                {/* <Text style={styles.phoneNumberText}>Email Address</Text>
                <View style={styles.loginButton1}>
                <TextInput
                value={email}
                onChangeText={(value)=>{setEmail(value)}}
                style={styles.textInputStyle}
                />
                </View> */}

                <Text style={styles.phoneNumberText}>Mobile Number</Text>
                {/* <View style={styles.loginButton1}>
                <TextInput
                value={mobile}
                onChangeText={(value)=>{setMobile(value)}}
                style={styles.textInputStyle}
                />
                </View> */}
                 <View style={styles.loginButton1}>
        <CountryPicker
                      withFilter
                      withCallingCode
                      withCallingCodeButton
                      countryCode={countryName}
                      visible={false}
                      
                      onSelect={onCountrySelect}
                    />
                <TextInput
                value={mobile}
                onChangeText={(value)=>{setMobile(value)}}
                style={styles.textInputStyle2}
                keyboardType={'number-pad'}
                />
                
            </View>

                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}>
                    <View style={{width:'48%'}}>
                    <Text style={styles.phoneNumberText}>Date of birth</Text>
                <TouchableOpacity style={styles.loginButton1} onPress={()=>{setOpen(true)}}>
                <Text style={styles.textInputStyle}>{date}</Text>
    
                </TouchableOpacity>
                <DatePicker
          modal
          open={open}
          date={fullDate}
          mode={'date'}
          onConfirm={date1 => {
            setOpen(false);
            onChangeDob(date1);
            
          }}
          maximumDate={new Date()}
          onCancel={() => {
            setOpen(false);
          }}
        
        />
                    </View>
                    <View style={{width:'48%'}}>
                    <Text style={styles.phoneNumberText}>Gender</Text>
                <TouchableOpacity style={styles.loginButton1} onPress={()=>{setModalVisible(true)}}>
                    <Text style={styles.textInputStyle}>{gender}</Text>
                {/* <TextInput
                value={gender}
                onChangeText={(value)=>{setGender(value)}}
                style={styles.textInputStyle}
                /> */}
                </TouchableOpacity>
                    </View>

                </View>

            <TouchableOpacity style={styles.loginButton} onPress={()=>onSubmitData()}>
            <Text style={styles.loginText}>Next</Text>
            </TouchableOpacity>
            <Text style={styles.signupText} onPress={()=>navigation.navigate('LoginScreen')}>Already have an account? Sign In</Text>
              </KeyboardAwareScrollView>
              </View>
    </View>
     <Loader isLoading={isLoading} />
     <DropdownPopup 
       onRequestClose={()=>{setModalVisible(false)}}
       visible={modalVisible}
       onClose={()=>{setModalVisible(false)}}
       title={'Gender'}
       allList={genderOption}
       onSelectGender={(index,item)=>onSelectGender(index,item)}
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
        fontSize:hp(2.8),
        fontWeight:'700',
        color:"#fff",
        marginLeft:wp(8)
    },
    phoneNumberText:{
        fontSize:hp(1.8),
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
        marginTop:hp(3),
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
    textInputStyle2:{
        width:'75%',
        fontSize:hp(2.2),
        fontWeight:'500',
        color:"#000",
        opacity:0.6,
        marginLeft:wp(2)
    },
    firstView:{
        flex:0.15,
        flexDirection:'row',
        alignItems:"center"
    },
    secondView:{
        flex:0.85
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
        fontSize:hp(1.5),
        fontWeight:'600',
        color:"#fff",
        marginVertical:hp(1)
    },
    optTextView: {
        width: '21%',
        height: (width * 0.95 - 20) / 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        // marginHorizontal: wp(2),
        borderBottomColor: '#848484',
        borderRadius:hp(1.5),
        marginRight:wp(4)
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
    loginButton1:{
        width:'100%',
        height:hp(7),
        backgroundColor:"#FFFFFF",
        borderRadius:hp(1),
        alignItems:"center",
        flexDirection:'row',
        paddingLeft:wp(3)
    },
    loginButton2:{
        width:'100%',
        height:hp(15),
        backgroundColor:"#FFFFFF",
        borderRadius:hp(1),
        justifyContent:'center',
        flexDirection:'row'
    },
    textInputStyle1:{
        width:'100%',
        fontSize:hp(2),
        fontWeight:'500',
        color:"#000",
        opacity:0.6,
        marginLeft:wp(5)
    },
    signupText:{
        fontSize:hp(2.1),
        fontWeight:'500',
        color:"#fff",
        marginVertical:hp(4),
    }
  });

export default RegisterScreen;