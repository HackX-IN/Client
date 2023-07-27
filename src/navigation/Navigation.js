import React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../components/Pixel/index";
import LoginScreen from "../screens/LoginScreen";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import OTPScreen from "../screens/OTPScreen";
import home from "../assets/home.png";
import wallet from "../assets/wallet.png";
import live from "../assets/live.png";
import message from "../assets/message.png";
import profile from "../assets/profile.png";
import HomeScreen from "../screens/HomeScreen";
import WalletScreen from "../screens/WalletScreen";
import LiveScreen from "../screens/LiveScreen";
import MessageScreen from "../screens/MessageScreen";
import ProfileScreen from "../screens/ProfileScreen";
import GameScreen from "../screens/GameScreen";
import StoreScreen from "../screens/StoreScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import LevelScreen from "../screens/LevelScreen";
import AddPostScreen from "../screens/AddPostScreen";
import LiveStreamingScreen from "../screens/LiveStreamingScreen";
import DiamondScreen from "../screens/DiamondScreen";
import RegisterScreen from "../screens/RegisterScreen";
import FreeCoinScreen from "../screens/FreeCoinScreen";
import ChatScreen from "../screens/ChatScreen";
import CallHistory from "../screens/CallHistory";
import SendRanking from "../screens/SendRanking";
import FanListScreen from "../screens/FansListScreen";
import LiveCoinScreen from "../screens/LiveCoinScreen";
import SearchProfile from "../screens/SearchProfileScreen";
import SplashScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const navigation = () => {
  const TabStack = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          showLabel: false,
        }}
        screenOptions={{
          tabBarStyle: {
            position: "absolute",
            width: "100%",
            height: Platform.OS == "ios" ? hp(7) : hp(7),
            backgroundColor: "#fff",
            borderColor: "#fff",
            borderWidth: 0,
          },
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, tintColor }) => (
              <Image
                focused={focused}
                source={home}
                tintColor={tintColor}
                style={{
                  width: wp(7),
                  height: hp(7),
                  resizeMode: "contain",
                  tintColor: "#0371FF",
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="WalletScreen"
          component={WalletScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, tintColor }) => (
              <Image
                focused={focused}
                resizeMode="contain"
                source={wallet}
                tintColor={tintColor}
                style={{
                  width: wp(5),
                  height: hp(7),
                  resizeMode: "contain",
                  tintColor: "#0371FF",
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="LiveScreen"
          component={LiveScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, tintColor }) => (
              <Image
                source={live}
                tintColor={tintColor}
                style={{
                  width: wp(25),
                  height: hp(25),
                  resizeMode: "contain",
                  marginTop: hp(-2),
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="MessageScreen"
          component={MessageScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, tintColor }) => (
              <Image
                focused={focused}
                source={message}
                tintColor={tintColor}
                style={{
                  width: wp(8),
                  height: hp(7),
                  resizeMode: "contain",
                  tintColor: "#0371FF",
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: false,

            tabBarIcon: ({ focused, tintColor }) => (
              <Image
                focused={focused}
                source={profile}
                tintColor={tintColor}
                style={{
                  width: wp(5),
                  height: hp(7),
                  resizeMode: "contain",
                  tintColor: "#0371FF",
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="OnBoardingScreen"
          component={OnBoardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPScreen"
          component={OTPScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabStack"
          component={TabStack}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="GameScreen"
          component={GameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StoreScreen"
          component={StoreScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LevelScreen"
          component={LevelScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddPostScreen"
          component={AddPostScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LiveStreamingScreen"
          component={LiveStreamingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DiamondScreen"
          component={DiamondScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FreeCoinScreen"
          component={FreeCoinScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CallHistory"
          component={CallHistory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SendRanking"
          component={SendRanking}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FanListScreen"
          component={FanListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LiveCoinScreen"
          component={LiveCoinScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchProfile"
          component={SearchProfile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default navigation;
