import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
} from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import CountryPicker from "react-native-country-picker-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../components/Pixel/index";
import { LoginScreenApi, SendOtpScreenApi } from "../../services/Api.js";
import { Loader } from "../../components/Loader.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import DeviceInfo from "react-native-device-info";

const LoginScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryName, setcountryName] = useState("US");
  const [countryCode, setcountryCode] = useState("+1");
  const [isLoading, setIsLoading] = useState(false);

  const onCountrySelect = (country) => {
    setcountryName(country.cca2);
    setcountryCode("+" + country.callingCode[0]);
  };

  const onSubmitData = async () => {
    try {
      // auth().settings.appVerificationDisabledForTesting = true;
      setIsLoading(true);
      if (mobileNumber == "") {
        setIsLoading(false);
        alert("Please enter your mobile number.");
      }
      // else if(mobileNumber.length!=10){
      //     setIsLoading(false)
      //     alert('Please enter valid mobile number.')
      // }
      else {
        var raw = JSON.stringify({
          otp: 1122,
          mobile: mobileNumber,
        });

        const response = await LoginScreenApi(raw);
        console.log("Get Response:::", response.data.data);
        if (response.data.success) {
          const response1 = await SendOtpScreenApi(raw, mobileNumber);
          console.log("Get Response:::", response1.data);
          if (response1.data.status) {
            console.log(
              "Get phon number>>>:::",
              `${countryCode + mobileNumber}`
            );
            const confirmation = await auth().signInWithPhoneNumber(
              `${countryCode + mobileNumber}`
            );
            if (confirmation) {
              setIsLoading(false);

              //   alert(response1.data.message)
              AsyncStorage.setItem("token", response.data.data._id);
              navigation.replace("OTPScreen", {
                mobileNumber: `${countryCode}${mobileNumber}`,
                confirm: confirmation,
              });
            } else {
              setIsLoading(false);

              console.log("error");
            }
            //     setIsLoading(false)
            //     alert(response1.data.message)
            //     AsyncStorage.setItem('token',response.data.data._id)
            // navigation.navigate('OTPScreen',{mobileNumber:mobileNumber})
          } else {
            setIsLoading(false);
            alert(response1.data.message);
          }
        } else {
          setIsLoading(false);
          alert(response.data.message);
        }
      }
    } catch (err) {
      setIsLoading(false);
      console.log("Error:", err);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.firstView}>
          <TouchableOpacity
            style={styles.leftArrowButton}
            onPress={() => navigation.replace("OnBoardingScreen")}
          >
            <Image source={ArrowLeft} style={styles.arrowImage} />
          </TouchableOpacity>
          <Text style={styles.phoneText}>Phone</Text>
          <Text style={styles.phoneNumberText}>Enter your phone number</Text>
          <View style={styles.loginButton}>
            <CountryPicker
              withFilter
              withCallingCode
              withCallingCodeButton
              countryCode={countryName}
              visible={false}
              onSelect={onCountrySelect}
            />
            <TextInput
              value={mobileNumber}
              onChangeText={(value) => {
                setMobileNumber(value);
              }}
              style={styles.textInputStyle}
              keyboardType={"number-pad"}
            />
          </View>
        </View>
        <View style={styles.secondView}></View>
        <View style={styles.ThirdView}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => onSubmitData()}
          >
            <Text style={styles.loginText}>Next</Text>
          </TouchableOpacity>

          <Text
            style={styles.signupText}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            You don't have an account? Sign Up
          </Text>
        </View>
      </View>
      <Loader isLoading={isLoading} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0371FF",
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: "5%",
  },
  arrowImage: {
    width: wp(4),
    height: hp(2.5),
    resizeMode: "contain",
  },
  leftArrowButton: {
    marginTop: hp(7),
    marginBottom: hp(6),
  },
  phoneText: {
    fontSize: hp(2.6),
    fontWeight: "700",
    color: "#fff",
  },
  phoneNumberText: {
    fontSize: hp(2.1),
    fontWeight: "600",
    color: "#fff",
    marginVertical: hp(1),
    opacity: 0.6,
  },
  loginButton: {
    width: "100%",
    height: hp(7),
    backgroundColor: "#FFFFFF",
    borderRadius: hp(1),
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(2),
    flexDirection: "row",
  },
  textInputStyle: {
    width: "75%",
    fontSize: hp(2.2),
    fontWeight: "500",
    color: "#000",
    opacity: 0.6,
    marginLeft: wp(2),
  },
  firstView: {
    flex: 0.35,
  },
  secondView: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
  ThirdView: {
    flex: 0.25,
    alignItems: "center",
  },
  loginText: {
    fontSize: hp(2.4),
    fontWeight: "600",
    color: "#000",
  },
  signupText: {
    fontSize: hp(2.1),
    fontWeight: "500",
    color: "#fff",
    marginVertical: hp(4),
  },
});

export default LoginScreen;
