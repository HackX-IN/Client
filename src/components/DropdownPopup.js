import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    FlatList
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from './Pixel/index';
  const DropdownPopup = ({
    onRequestClose,
    visible,
    onClose,
    title,
    allList,
    onSelectGender,
    status,
  }) => {
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
      setRefresh(!refresh)
    }, [status])
  
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        statusBarTranslucent
        onRequestClose={onRequestClose}>
        <View style={styles.centeredView}>
          <TouchableOpacity activeOpacity={1} onPress={onClose}>
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.1)',
                transparent: 0.5,
              }}
            />
          </TouchableOpacity>
  
          <View style={styles.modalView}>
            <View
              style={{
                width: wp(20),
                borderRadius: hp(1),
                borderColor: '#9E26BC',
                borderWidth: 2,
                alignSelf: 'center',
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text style={styles.modalText}>{title}</Text>
            </View>
            <FlatList
              data={allList}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                console.log('data item :::::', item)
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.arrayView}
                    onPress={() => {
                      onSelectGender(index, item);
                    }}>
                    <View
                      style={[
                        styles.genderTextView,
                        {
                          borderColor: item.selected
                            ? '#9E26BC'
                            : '#000',
                          backgroundColor: item.selected
                            ? '#9E26BC'
                            : null,
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.genderName,
                        {
                          color: item.selected
                            ? '#9E26BC'
                            : '#000',
                        },
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )
              }
              }
            />
          </View>
        </View>
      </Modal>
    );
  };
  
  export default DropdownPopup;
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      width: '100%',
    },
    modalView: {
      maxHeight: hp(50),
      position: 'absolute',
      bottom: 0,
      paddingVertical: 15,
      // height: hp(50),
      paddingVertical: hp(2),
      paddingHorizontal: wp(5),
  
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      width: '100%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      paddingVertical: hp(2),
      fontSize: hp(2.5),
      alignSelf: 'center',
      color: '#888888',
  
    },
    arrayView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      height: hp(5.5),
      // marginLeft:wp(2)
    },
    genderName: {
      marginLeft: wp(3),
      fontSize: hp(2),
      color: 'white'
    },
    genderTextView: {
      width: 18,
      height: 18,
      borderRadius: 18,
      borderWidth: 2,
    },
    Checkbox: {
      height: hp(6),
      width: '100%',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      // marginLeft:wp(2)
    },
    dropdownIcon: {
      height: hp(5),
      width: wp(4),
      resizeMode: 'contain',
      marginRight: wp(2),
    },
    CheckboxTitle: {
      fontSize: hp(1.7),
      color:'white',
      paddingHorizontal: wp(2),
    },
  });
  