import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Text,
  ListView
}from 'react-native'
import {Button,ListItem} from "../../../theme"
import styles from "./clientsProfessionals_style"
import * as Constants from "../../../Components/commonConstant"

class ClientsProfessionals extends React.Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.navi}>
          <View style={styles.searchContainer}>
            <Image source={require("../../../Assets/images/icon/ic_search.png")} style={styles.iconSearch}/>
            <TextInput
              style={styles.inputSearch}
              placeholder="Search"
              placeholderTextColor="white"
              autoCorrect={false}
              underlineColorAndroid='transparent'
              autoCapitalize="none"
              />
          </View>
        </View>
        <View style={styles.tabContainer}>
            <View style={{flex:1,flexDirection:"row"}}>
              <View style={{flex:0.5}}><Text style={styles.titleSection}>Name</Text></View>
              <View style={{marginLeft:5,flex:0.5}}><Text style={styles.titleSection}>Next Appointment</Text></View>
            </View>
            <View style={{width:110}}>
              <Text style={styles.titleSection}>Sessions</Text>
            </View>
        </View>
        <ListView
          style={styles.list}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <ListItem data={rowData}/>}
        />

        <View style={styles.bottomView}>
          <View style={styles.line}>
            <View style={styles.all}><Text style={styles.allText}>All Days</Text></View>
            <Text style={{color:Constants.APP_COLOR}}>MON</Text>
            <Text style={{color:Constants.APP_COLOR}}>TUE</Text>
            <Text style={{color:Constants.APP_COLOR}}>WED</Text>
            <Text style={{color:Constants.APP_COLOR}}>THU</Text>
          </View>
          <View style={styles.line}>
            <View style={styles.all}><Text style={styles.allText}>All Months</Text></View>
            <Text style={{color:Constants.APP_COLOR}}>JAN</Text>
            <Text style={{color:Constants.APP_COLOR}}>FEB</Text>
            <Text style={{color:Constants.APP_COLOR}}>MAR</Text>
            <Text style={{color:Constants.APP_COLOR}}>APR</Text>
          </View>
          <View style={styles.line}>
            <View style={styles.all}><Text style={styles.allText}>All Years</Text></View>
            <Text style={{color:Constants.APP_COLOR}}>2017</Text>
            <Text style={{color:Constants.APP_COLOR}}>2018</Text>
            <Text style={{color:Constants.APP_COLOR}}>2019</Text>
            <Text style={{color:Constants.APP_COLOR}}>2020</Text>
          </View>
        </View>
      </View>
    )
  }

  componentDidMount(){
    var datas = []
    var item = {
      name:"Sara Clinton",
      time:"DEC 13  18:45PM",
      progress:4,
      type:"image",
      image:require("../../../Assets/images/icon/avatar1.png")
    }
    datas.push(item)

    item = {
      name:"Emily Carter",
      time:"DEC 12  18:45PM",
      progress:10,
      type:"text",
      text:"F",
      backgroundColor:"#43c6f0"
    }
    datas.push(item)

    item = {
      name:"Steven Besoz",
      time:"DEC 13  18:45PM",
      progress:7,
      type:"text",
      text:"S",
      backgroundColor:"#ff1b66"
    }
    datas.push(item)

    item = {
      name:"Jeff Nelson",
      time:"DEC 13  18:45PM",
      progress:6,
      type:"image",
      image:require("../../../Assets/images/icon/avatar2.png")
    }
    datas.push(item)

    this.setState({dataSource:this.state.dataSource.cloneWithRows(datas)})
  }
}

export default ClientsProfessionals;
