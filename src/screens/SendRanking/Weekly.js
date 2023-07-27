import { View, Text,FlatList,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../components/Pixel/index';
import { GetRankingApi } from '../../services/Api';
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
        name: "Last Month",
      },
      {
        name: "Overall",
      },
  ];
  
  const Weekly = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const getRankingData = async () => {
      try {
        const selectedCategory = options[activeIndex].name;
        const response = await GetRankingApi(selectedCategory);
        const rankingData = response.data;
       
      } catch (error) {
        console.log('Error fetching ranking data', error);
      }
    };
    useEffect(() => {
    getRankingData
    }, [options])
    
  return (
    <View
    style={{
      borderRadius: 50,
      flexDirection: "row",
      width: "100%",
      marginVertical: hp(2),
      marginLeft:10,
      alignItems:"center"
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
             paddingHorizontal:wp(2.1),
             height:hp(3.5),
             borderRadius:50,
            },
            isActive && { borderRadius:50,alignItems:"center",backgroundColor:isActive?"#1877F2":"transparent",justifyContent:"center" }, // Change background color if active
          ]}
          onPress={() => setActiveIndex(index)}
        >
          <Text
            style={{
              fontSize: 15,
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