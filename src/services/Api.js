import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default class Api {
    // static baseUrl = 'https://brud-new-1.herokuapp.com/api/';
    // static baseUrl= 'http://13.231.133.55:8008/';
    static baseUrl= 'https://live-stream-lovely.onrender.com/';
  }

export const LoginScreenApi = async responseData => {
    const url = Api.baseUrl + `user/login`;
    return new Promise((resolve, reject) => {
      axios.post(url, responseData, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>resolve(res))
        .catch(err =>reject(err));
    });
  };

  export const RegistrationScreenApi = async responseData => {
    const url = Api.baseUrl + `user/create`;
    const authToken = await AsyncStorage.getItem('Token');
    return new Promise((resolve, reject) => {
      axios.post(url, responseData, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>{console.log('::res::',res);return resolve(res)})
        .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
    });
  };


  export const SendOtpScreenApi = async (responseData,number) => {
    const url = Api.baseUrl + `user/send-otp/${number}`;
    const authToken = await AsyncStorage.getItem('Token');
    return new Promise((resolve, reject) => {
      axios.post(url, responseData, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>{console.log('::res::',res);return resolve(res)})
        .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
    });
  };

  export const VerifyOtpScreenApi = async (responseData,number,otp) => {
    const url = Api.baseUrl + `user/verify-otp/${number}/${otp}`;
    const authToken = await AsyncStorage.getItem('Token');
    return new Promise((resolve, reject) => {
      axios.post(url, responseData, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>{console.log('::res::',res);return resolve(res)})
        .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
    });
  };

  export const onGetUserApi = async () => {
    const id = await AsyncStorage.getItem('token');
    const url = Api.baseUrl + `user/get/${id}`;
    
    return new Promise((resolve, reject) => {
      axios.get(url,{
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>resolve(res))
        .catch(err =>reject(err));
    });
  };

  export const onUpdateProfileScreenApi = async (responseData,number,otp) => {
    const authToken = await AsyncStorage.getItem('token');
    const url = Api.baseUrl + `user/update/${authToken}`;
    
    return new Promise((resolve, reject) => {
      axios.put(url, responseData, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>{console.log('::res::',res);return resolve(res)})
        .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
    });
  };

  export const onUploadImageApi = async (responseData) => {
    const authToken = await AsyncStorage.getItem('token');
    const url = Api.baseUrl + `user/upload-profile/${authToken}`;
    
    return new Promise((resolve, reject) => {   
      axios.post(url, responseData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json'
          },
        })
        .then(res =>{console.log('::res::',res);return resolve(res)})
        .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
    });
  };

  export const onPostSubmitApi = async (responseData) => {
    const authToken = await AsyncStorage.getItem('token');
    const url = Api.baseUrl + `user/post/add/${authToken}`;
    
    return new Promise((resolve, reject) => {   
      axios.post(url, responseData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json'
          },
        })
        .then(res =>{console.log('::res::',res);return resolve(res)})
        .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
    });
  };


  export const onGetUserPostApi = async () => {
    const authToken = await AsyncStorage.getItem('token');
    const url = Api.baseUrl + `user/post/get/${authToken}`;
    
    return new Promise((resolve, reject) => {   
      axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>{console.log('::res::',res);return resolve(res)})
        .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
    });
  };


  export const onGetAllPostApi = async () => {
    const authToken = await AsyncStorage.getItem('token');
    const url = Api.baseUrl + `user/post/get/all`;
    
    return new Promise((resolve, reject) => {   
      axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>{console.log('::res::',res);return resolve(res)})
        .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
    });
  };


  export const onAddCommentApi = async (responseData) => {
    const url = Api.baseUrl + `user/post/comment/add`;
    
    return new Promise((resolve, reject) => {   
      axios.post(url, responseData, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>{console.log('::res::',res);return resolve(res)})
        .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
    });
  };

  export const onAddLikeApi = async (responseData) => {
    const url = Api.baseUrl + `user/post/like/add`;
    
    return new Promise((resolve, reject) => {   
      axios.post(url, responseData, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>{console.log('::res::',res);return resolve(res)})
        .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
    });
  };

  export const onRemoveLikeApi = async (responseData) => {
    const url = Api.baseUrl + `user/post/like/remove`;
    
    return new Promise((resolve, reject) => {   
      axios.delete(url,{
          data: responseData,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res =>{console.log('::res::',responseData);return resolve(res)})
        .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
    });
  };

  export const onAddLiveStreamingApi = async (responseData) => {
    const url = Api.baseUrl + `live/add`;
    
    return new Promise((resolve, reject) => {   
      axios.post(url,responseData,{
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res =>resolve(res))
        .catch(err =>reject(err));
    });
  };

  export const onGetLiveStreamingApi = async (responseData) => {
    const url = Api.baseUrl + `live/get`;
    
    return new Promise((resolve, reject) => {   
      axios.get(url)
        .then(res =>resolve(res))
        .catch(err =>reject(err));
    });
  };


  export const onGetWatchLiveStreamingApi = async (id) => {
    const url = Api.baseUrl + `live/get/${id}`;
    
    return new Promise((resolve, reject) => {   
      axios.get(url)
        .then(res =>resolve(res))
        .catch(err =>reject(err));
    });
  };

  export const onDeleteLiveStreamingApi = async (id) => {
    const url = Api.baseUrl + `live/end/${id}`;
    console.log("Get DeleteResponse::",id)
    return new Promise((resolve, reject) => {   
        axios.delete(url,{
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res =>resolve(res))
        .catch(err =>reject(err));
    });
  };

  export const onRemoveWatchUserApi = async (responseData) => {
    const url = Api.baseUrl + `live/stopWatching`;
    
    return new Promise((resolve, reject) => {   
      axios.delete(url,{
          data: responseData,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res =>{console.log('::res::',responseData);return resolve(res)})
        .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
    });
  };

  export const SendGiftApi = async responseData => {
    const url = Api.baseUrl + `user/send-gift`;
    return new Promise((resolve, reject) => {
      axios.post(url, responseData, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>resolve(res))
        .catch(err =>reject(err));
    });
  };


  export const onWatchListAddApi = async responseData => {
    const url = Api.baseUrl + `live/watch`;
    return new Promise((resolve, reject) => {
      axios.post(url, responseData, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>resolve(res))
        .catch(err =>reject(err));
    });
  };


  export const onGetStoreItemsApi = async responseData => {
    const url = Api.baseUrl + `admin/get-all-store`;
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then(res =>resolve(res))
        .catch(err =>reject(err));
    });
  };
  

  export const onBuyStoreItemsApi = async responseData => {
    const url = Api.baseUrl + `user/store/purchase`;
    return new Promise((resolve, reject) => {
      axios.post(url, responseData, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>resolve(res))
        .catch(err =>reject(err));
    });
  };

  export const onUpdateStoreApi = async (responseData,number,otp) => {
    const authToken = await AsyncStorage.getItem('token');
    const url = Api.baseUrl + `user/store/update`;
    
    return new Promise((resolve, reject) => {
      axios.put(url, responseData, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>{console.log('::res::',res);return resolve(res)})
        .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
    });
  };

  // export const onLiveLiveStreamingApi = async (responseData,number,otp) => {
  //   const authToken = await AsyncStorage.getItem('token');
  //   const url = Api.baseUrl + `live/end/${id}`;
    
  //   return new Promise((resolve, reject) => {
  //     axios.put(url, responseData, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Accept: 'application/json'
  //         },
  //       })
  //       .then(res =>{console.log('::res::',res);return resolve(res)})
  //       .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
  //   });
  // };


  export const onKickDownApi = async (responseData) => {
    const authToken = await AsyncStorage.getItem('token');
    const url = Api.baseUrl + `/live/kick-user`;
    
    return new Promise((resolve, reject) => {
      axios.post(url, responseData, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>{console.log('::res::',res);return resolve(res)})
        .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
    });
  };


  export const onSendCoinApi = async (responseData,number,otp) => {
    const authToken = await AsyncStorage.getItem('token');
    const url = Api.baseUrl + `live/send-coin`;
    
    return new Promise((resolve, reject) => {
      axios.post(url, responseData, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>{console.log('::res::',res);return resolve(res)})
        .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
    });
  };

  export const onBlockUserApi = async (responseData,number,otp) => {
    const authToken = await AsyncStorage.getItem('token');
    const url = Api.baseUrl + `live/block/user`;
    
    return new Promise((resolve, reject) => {
      axios.put(url, responseData, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>{console.log('::res::',res);return resolve(res)})
        .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
    });
  };

  export const onRequestUserApi = async (responseData,number,otp) => {
    const authToken = await AsyncStorage.getItem('token');
    const url = Api.baseUrl + `live/request-join`;
    
    return new Promise((resolve, reject) => {
      axios.post(url, responseData, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>{console.log('::res::',res);return resolve(res)})
        .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
    });
  };

  export const onGetUserAcceptRequestApi = async (id) => {
    const authToken = await AsyncStorage.getItem('token');
    const url = Api.baseUrl + `live/get-accepted-request/${id}`;
    
    return new Promise((resolve, reject) => {   
      axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>resolve(res))
        .catch(err =>reject(err));
    });
  };

  export const onGetUserPendingRequestApi = async (id) => {
    const authToken = await AsyncStorage.getItem('token');
    const url = Api.baseUrl + `live/get-pending-request/${id}`;
    
    return new Promise((resolve, reject) => {   
      axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>resolve(res))
        .catch(err =>reject(err));
    });
  };


  export const onGetEaringCoinApi = async () => {
    const authToken = await AsyncStorage.getItem('token');
    const url = Api.baseUrl + `live/live-earning-history/${authToken}`;
    
    return new Promise((resolve, reject) => {   
      axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>{console.log('::res::',res);return resolve(res)})
        .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
    });
  };


  export const onUpdatePendingRequestApi = async (responseData) => {
    const authToken = await AsyncStorage.getItem('token');
    const url = Api.baseUrl + `live/request-update`;
    
    return new Promise((resolve, reject) => {
      axios.put(url, responseData, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>{console.log('::res::',res);return resolve(res)})
        .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
    });
  };

  
  export const onSendMessageApi = async (responseData) => {
    const authToken = await AsyncStorage.getItem('token');
    const url = Api.baseUrl + `liveComments/addComment`;
    
    return new Promise((resolve, reject) => {
      axios.post(url, responseData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      })
      .then(res =>{console.log('::res::',res);return resolve(res)})
      .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
  });
  };


  export const onGetMessageApi = async (id) => {
    const authToken = await AsyncStorage.getItem('token');
    const url = Api.baseUrl + `liveComments/getComments/${id}`;
    
    return new Promise((resolve, reject) => {
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      })
      .then(res =>resolve(res))
      .catch(err =>reject(err));
    });
  };


  export const onGetKickOutApi = async (id) => {
    const authToken = await AsyncStorage.getItem('token');
    const url = Api.baseUrl + `live/getkickedUsers/${id}`;
    
    return new Promise((resolve, reject) => {
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      })
      .then(res =>resolve(res))
      .catch(err =>reject(err));
    });
  };


  export const onMakeAdminApi = async (responseData) => {
    const authToken = await AsyncStorage.getItem('token');
    const url = Api.baseUrl + `live/makeAdmin`;
    
    return new Promise((resolve, reject) => {
      axios.post(url, responseData, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        })
        .then(res =>{console.log('::res::',res);return resolve(res)})
        .catch(err =>{console.log('::err in upload image ::',err);return reject(err)});
    });
  };