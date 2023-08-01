import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../components/Pixel/index';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignSelf: "center",
      },
      bannerImage: {
        width: "100%",
        height: hp(13),
        resizeMode: "contain",
      },
      leftArrow: {
        width: wp(6),
        height: hp(2),
        resizeMode: "contain",
        tintColor:'#000'
      },
      bannerView: {
        flexDirection: "row",
        alignItems: "center",
        width: "94%",
        alignSelf: "center",
        height: hp(10),
      },
      inputText: {
        color: "black",
      },
  MainView: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor:'#0371FF',
  },

  headerBox: {
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: wp(1.5),
    paddingVertical: hp(1),
 
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    // paddingTop: hp(1.5),
  },
  rightArrow: {
    position: "absolute",
    backgroundColor: '',
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -5
  },
  
  rightArrowOverlap: {
    position: "absolute",
    // backgroundColor: color.COLOR.button,
    backgroundColor:"#fff",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 25,
    right: -15
  
  },


leftArrowOverlap: {
    position: "absolute",
    backgroundColor:'#0371FF',
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -15,
    borderBottomLeftRadius: 18,
    right: -20

},
  logoIcon: {
    resizeMode: 'contain',
    width: wp(20),
    height: hp(3),
  },
  Icon: {
    resizeMode: 'contain',
    width: wp(6.1),
    height: hp(3.1),
    // alignSelf: 'flex-end',
    marginHorizontal: wp(2),
  },
  
  Icon1: {
    width: hp(5),
    height: hp(5),
    // alignSelf: 'flex-end',
    marginHorizontal: wp(2),
    borderRadius: hp(5)
  },
  menu: {
    // width:'30%'
    flexDirection: 'row',
    alignItems: 'center',
  },
  ProfileIcon: {
    resizeMode: 'contain',
    width: wp(45),
    height: hp(10),
    marginVertical: hp(2),
  },
  IconChat: {
    width: '100%',
    height: '100%',
    borderRadius: hp(10)
    // marginHorizontal: wp(2),
  },
  userImage: {
    resizeMode: 'cover',
    width: wp(65),
    height: hp(25),
    // width: wp(59),
    // height: hp(18),
    // marginLeft: wp(3),
    borderRadius: hp(1.5)
  },
  box: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.2),
    // maxWidth: '85%',
    backgroundColor: '#F4F4F4',
    borderTopLeftRadius: hp(2),
    borderBottomRightRadius: hp(3),
    marginHorizontal: wp(2.5),
    borderTopRightRadius: hp(3),
  },
  messageText: {
    fontSize: hp(1.8),
    color: '#848484',
  },
  time: {
    fontSize: hp(1.5),
    paddingVertical: hp(1.2),
    color: '#848484',
  },
  imageBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: wp(-5),

  },
  textMes: {
    fontSize: hp(1.8),
    color: '#848484'
  },
  footer: {
    position: 'relative',
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: hp(2),
  },
  footerOptionView: {
    height: hp(9),
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
  },
  textBox: {
    width: '85%',
    borderRadius: hp(20),
    height: hp(6),
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    // marginBottom: hp(4),
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    alignItems:'center'
  },
  sectionHeader: {
    marginVertical: hp(3), height: hp(4), width: wp(30), justifyContent: 'center', alignItems: 'center',
    alignSelf: 'center', borderRadius: wp(2)
  },
  animatedVoiceView: {
    width: wp(13), backgroundColor: '#0371FF', borderRadius: hp(3),
    position: 'absolute', bottom: hp(3.5), zIndex: 4, right: wp(2), alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column',
    paddingVertical: hp(1)
  },
  text: {
    fontSize: hp(1.9),
    color: '#848484',
  },
  stickerIcon: {
    width: wp(6),
    height: hp(3),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  voiceIcon: {
    width: wp(8),
    height: hp(3),
    resizeMode: 'contain',
    // marginBottom: hp(2),
    // alignSelf:'center'
  },
  voiceIcon1: {
    width: wp(8),
    height: hp(3),
    resizeMode: 'contain',
    tintColor:'#fff'
  },
  uploadOptionIcon: {
    width: wp(15),
    height: hp(8),
    resizeMode: 'contain',
    marginBottom: hp(2),
    marginLeft: wp(4),
    marginRight: wp(4)
    // alignSelf:'center'
  },

  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  playButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  playButtonText: {
    color: 'white',
    fontSize: 18,
  },
  optionView: {
    width: '100%',
    height: hp(12),
    // paddingRight:wp(),
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },

  titleTxt: {
    marginTop: 100,
    color: 'white',
    fontSize: 28,
  },
  viewRecorder: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
  recordBtnWrapper: {
    flexDirection: 'row',
  },
  viewPlayer: {
    marginTop: 60,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  viewBarWrapper: {
    marginTop: 28,
    marginHorizontal: 28,
    alignSelf: 'stretch',
  },
  viewBar: {
    backgroundColor: '#ccc',
    height: 4,
    alignSelf: 'stretch',
  },
  viewBarPlay: {
    backgroundColor: 'white',
    height: 4,
    width: 0,
  },
  playStatusTxt: {
    marginTop: 8,
    color: '#ccc',
  },
  playBtnWrapper: {
    flexDirection: 'row',
    marginTop: 40,
  },
  btn: {
    borderColor: 'white',
    borderWidth: 1,
  },
  txt: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  txtRecordCounter: {
    marginTop: 32,
    color: 'white',
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
  txtCounter: {
    marginTop: 12,
    color: 'white',
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
  centeredView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '93%',
    backgroundColor: '#fff',
    borderRadius: hp(1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
  },
  roundList: {
    width: hp(5),
    height: hp(5),
    borderRadius: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },

});
export default styles;
