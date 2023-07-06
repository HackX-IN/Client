import { View, Text,FlatList,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../components/Pixel/index';
const options = [
    {
      name: "Daily",
    },
    {
      name: "Weekly",
    },
    {
      name: "Monthly",
    },
    {
        name: "Last month",
      },
      {
        name: "Overall",
      },
  ];
  
  const Weekly = () => {
    const [activeIndex, setActiveIndex] = useState(0);
  return (
    <View
    style={{
      borderRadius: 50,
      flexDirection: "row",
      width: "100%",
      marginVertical: hp(2),
    }}
  >
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={options}
      renderItem={({ item, index }) => {
        const isActive = index === activeIndex;
        return (
          <TouchableOpacity
            style={[
              {
                justifyContent: "center",
                alignItems: "center",
               width:wp(20),
               height:hp(5),
               borderRadius:50,
               marginHorizontal:wp(2)
              },
              isActive && { borderRadius:50,alignItems:"center",backgroundColor:isActive?"#639cf7":"transparent",justifyContent:"center" }, // Change background color if active
            ]}
            onPress={() => setActiveIndex(index)}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                
                color: isActive ? "#fff" : "#000", // Change text color if active
                textAlign: "center",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  </View>
  )
}

export default Weekly