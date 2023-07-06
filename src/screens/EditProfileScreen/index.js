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
  import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
  import {onGetUserApi,onUpdateProfileScreenApi} from '../../services/Api.js'
  import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
  import ImagePicker from 'react-native-image-crop-picker';
  import moment from 'moment';
  import {Loader} from '../../components/Loader.js'
  import DropdownPopup from '../../components/DropdownPopup'
  import DatePicker from 'react-native-date-picker';
  import AsyncStorage from '@react-native-async-storage/async-storage';

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

const EditProfileScreen = ({navigation}) => {
    const inputCodeRef = useRef(null);
    const [value, setValue] = useState('');
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [date,setDate] = useState('')
    const [gender,setGender] = useState('')
    const [about,setAbout] = useState('')
    const [profileImage,setProfileImage]= useState('')
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isLoading,setIsLoading] = useState(false)
    const [modalVisible,setModalVisible] = useState(false)
    const [genderOption,setGenderOption] = useState(genderList)
    const [open, setOpen] = useState(false);
    const [dateFormat,setDateFormat] = useState('')
    const [fullDate,setFullDate] = useState(new Date());
    useEffect(()=>{
        const subscribe = navigation.addListener('focus',()=>{
          onGetUserData()
        })
      },[])
      
      const onGetUserData = async() => {
        try{
          const response = await onGetUserApi()
          console.log("Get Response",response.data)
          if(response.data.success){
            setName(response.data.data[0]?.name)
            setEmail(response.data.data[0]?.email)
            setDate(moment(response.data.data[0]?.dob).format('DD-MM-YYYY'))
            setDateFormat(moment(response.data.data[0]?.dob).format('YY-MM-DD'))
            setFullDate(new Date(response.data.data[0]?.dob))
            if(response.data.data[0]?.gender!=null){
                setGender(response.data.data[0]?.gender==1?'Male':'Female')
                genderOption[parseInt(response.data.data[0]?.gender)-1].selected=true
            }
           
            setAbout(response.data.data?.about)
           

            
          }
        }
        catch(err){
          console.log('Error:',err)
        }
      }



      const onSubmitData = async() => {
        try{
            setIsLoading(true)
            if(name==''){
                setIsLoading(false)
                alert('Please enter your full name.')
            }
            else if(date==''){
                setIsLoading(false)
                alert('Please enter your date of birth.')
            }
            else if(gender==''){
                setIsLoading(false)
                alert('Please enter your gender.')
            }
            else if(about==''){
                setIsLoading(false)
                alert('Please enter about data.')
            }
            else{
    
                var raw = JSON.stringify({
                    name: name,
                    about: about,
                    dob: dateFormat,
                    gender: gender=='Male'?1:2
                  });
    
                const response = await onUpdateProfileScreenApi(raw)
                console.log("Get Response:::",response.data)
                if(response.data.success){
                    console.log("Get Response:::",response.data)
                    setIsLoading(false)
                    navigation.goBack()
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

return(
    <>
    <View style={styles.container}>
        <View style={styles.firstView}> 
        <TouchableOpacity style={styles.leftArrowButton} onPress={()=>navigation.goBack()}>
            <Image source={ArrowLeft} style={styles.arrowImage} />
        </TouchableOpacity>
        <Text style={styles.phoneText}>Personal Information</Text>
        <Text style={styles.phoneNumberText}>Please fill the following</Text>
            </View>
            <View style={styles.secondView}>
         <KeyboardAwareScrollView >

            
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

                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}>
                    {/* <View style={{width:'48%'}}>
                    <Text style={styles.phoneNumberText}>Date of birth</Text>
                <View style={styles.loginButton1}>
                <TextInput
                value={date}
                onChangeText={(value)=>{setDate(value)}}
                style={styles.textInputStyle}
                />
                </View>  </View> */}
                 <View style={{width:'48%'}}>
                    <Text style={styles.phoneNumberText}>Date of birth</Text>
                <TouchableOpacity style={styles.loginButton1} onPress={()=>{setOpen(true)}}>
                <Text style={styles.textInputStyle}>{date}</Text>
                {/* <TextInput
                value={date}
                onChangeText={(value)=>{setDate(value)}}
                style={styles.textInputStyle}
                /> */}
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
            

                <Text style={styles.phoneNumberText}>About</Text>
                <View style={styles.loginButton2}>
                <TextInput
                value={about}
                onChangeText={(value)=>{setAbout(value)}}
                style={styles.textInputStyle1}
                multiline
                />
                </View>

            <TouchableOpacity style={styles.loginButton} onPress={()=>onSubmitData() }>
            <Text style={styles.loginText}>Next</Text>
            </TouchableOpacity>
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
        fontSize:hp(2.4),
        fontWeight:'700',
        color:"#fff"
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
        width:'100%',
        fontSize:hp(2.2),
        fontWeight:'500',
        color:"#000",
        opacity:0.6,
        marginLeft:wp(4)
    },
    firstView:{
        flex:0.23,
    },
    secondView:{
        flex:0.77
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
        justifyContent:'center',
        flexDirection:'row'
    },
    loginButton2:{
        width:'100%',
        height:hp(15),
        backgroundColor:"#FFFFFF",
        borderRadius:hp(1),
        justifyContent:'center',
        flexDirection:'row',
        alignItems:"flex-start"
    },
    textInputStyle1:{
        width:'100%',
        fontSize:hp(2),
        fontWeight:'500',
        color:"#000",
        opacity:0.6,
        marginLeft:wp(5)
    },
  });

export default EditProfileScreen;