class NetworkHelper {
  static requestGet(url){
    return new Promise((resolve,reject)=>{
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          resolve(responseJson)
        })
        .catch((error) => {
          reject(error)
        });
    });
  }

  static requestPost(url,params){
    return new Promise((resolve,reject)=>{
        fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params)
          })
        .then((response) => response.json())
        .then((responseJson) => {
          resolve(responseJson)
        })
        .catch((error) => {
          reject(error)
        });
    });
  }
}

export default NetworkHelper
