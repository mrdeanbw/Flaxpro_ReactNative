import React from 'react';
import {
  Alert,
  View,
  Image,
  TextInput,
  Text,
  ListView,
  TouchableOpacity
}from 'react-native'
import Moment from 'moment';

import FullScreenLoader from '../../../Components/fullScreenLoader';
import {Button,ListItem} from "../../../theme"
import styles from "./contractsList_style"
import * as Constants from "../../../Components/commonConstant"

const days = [
  {active: true, name: 'All Days', value: ''},
  {active: false, name: 'MON', value: 'MON'},
  {active: false, name: 'TUE', value: 'TUE'},
  {active: false, name: 'WED', value: 'WED'},
  {active: false, name: 'THU', value: 'THU'},
];
const months = [
  {active: true, name: 'All Months', value: ''},
  {active: false, name: 'JAN', value: '0'},
  {active: false, name: 'FEB', value: '1'},
  {active: false, name: 'MAR', value: '2'},
  {active: false, name: 'APR', value: '3'},
];
const years = [
  {active: true, name: 'All Years', value: ''},
  {active: false, name: '2017', value: '2017'},
  {active: false, name: '2018', value: '2018'},
  {active: false, name: '2019', value: '2019'},
  {active: false, name: '2020', value: '2020'},
];

class ClientsProfessionals extends React.Component {
  constructor(props) {
    super(props);
    if(props.auth.user.role === Constants.user_client) props.getMyProfessionals();
    if(props.auth.user.role === Constants.user_professional) props.getMyClients();

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      days: days,
      months: months,
      years: years,
      search: '',
      dataSource: ds.cloneWithRows([]),
    };
  }
  componentWillReceiveProps(newProps) {
    if(newProps.contracts.loading) return;
    if(newProps.contracts.error) return Alert.alert(newProps.contracts.error);

    const {contracts: {contracts}} = newProps;
    const role = newProps.auth.user.role === Constants.user_professional ? Constants.user_client.toLowerCase() : Constants.user_professional.toLowerCase();

    const data = contracts.map( e => ({
      contractId: e._id,
      name: e[role].name,
      time: e.next ? Moment(e.next.from).format('MMM DD hh:mm A') : '',
      progress: e.sessionsPast,
      total: e.sessionsTotal,
      text: !e[role].avatar ? e[role].name[0].toUpperCase() : '',
      backgroundColor: !e[role].avatar ? '#43c6f0' : '',
      type: e[role].avatar ? 'url' : 'text',
      image: e[role].avatar || ''
      })
    )
    this.setState({dataSource:this.state.dataSource.cloneWithRows([...this.createFakeData(), ...data])})
  }
  onSelectDay(day) {
    const days = this.state.days.map(e => {
      if(e.active) e.active = false;
      if(e === day) e.active = true;
      return e;
    });
    this.setState({days}, ()=>this.startFilter())
  }

  onSelectMonths(month) {
    const months = this.state.months.map(e => {
      if(e.active) e.active = false;
      if(e === month) e.active = true;
      return e;
    });
    this.setState({months}, ()=>this.startFilter())
  }

  onSelectYears(year) {
    const years = this.state.years.map(e => {
      if(e.active) e.active = false;
      if(e === year) e.active = true;
      return e;
    });
    this.setState({years}, ()=>this.startFilter())
  }

  startFilter() {
    let data = {
      month: this.state.months.filter(e=>e.active)[0].value,
      year:  this.state.years.filter(e=>e.active)[0].value,
      day: this.state.days.filter(e=>e.active)[0].value,
      name: this.state.search,
    };
    if(this.props.auth.user.role === Constants.user_client) this.props.getMyProfessionals(data);
    if(this.props.auth.user.role === Constants.user_professional) this.props.getMyClients(data);
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
              onChangeText={ (text) => this.setState({search: text}, ()=>this.startFilter()) }
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
          renderRow={(rowData) => <ListItem data={rowData} cancelContract={this.props.cancelContract} role={this.props.auth.user.role}/>}
        />

        <View style={styles.bottomView}>

          <View style={styles.line}>
            {
              this.state.days.map((row, index) => (
                <TouchableOpacity
                  onPress={ () => this.onSelectDay(row) }
                  key={index}
                >
                  <View style={[row.active && styles.all]}>
                    <Text style={[row.active && styles.allText, !row.active && {color:Constants.APP_COLOR}]}>{row.name}</Text>
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
          <View style={styles.line}>
            {
              this.state.months.map((row, index) => (
                <TouchableOpacity
                  onPress={ () => this.onSelectMonths(row) }
                  key={index}
                >
                  <View style={[row.active && styles.all]}>
                    <Text style={[row.active && styles.allText, !row.active && {color:Constants.APP_COLOR}]}>{row.name}</Text>
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
          <View style={styles.line}>
            {
              this.state.years.map((row, index) => (
                <TouchableOpacity
                  onPress={ () => this.onSelectYears(row) }
                  key={index}
                >
                  <View style={[row.active && styles.all]}>
                    <Text style={[row.active && styles.allText, !row.active && {color:Constants.APP_COLOR}]}>{row.name}</Text>
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
        { this.props.contracts.loading ? <FullScreenLoader/> : null }
      </View>
    )
  }

  componentDidMount(){
    const data = this.createFakeData();

    this.setState({dataSource:this.state.dataSource.cloneWithRows(data)})
  }

  createFakeData(){
    const data = []
    let item = {
      fake:true,
      name:"Sara Clinton",
      time:"DEC 13  18:45PM",
      progress:1,
      total:5,
      type:"image",
      image:require("../../../Assets/images/icon/avatar1.png")
    }
    data.push(item)

    item = {
      fake:true,
      name:"Emily Carter",
      time:"DEC 12  18:45PM",
      progress:10,
      total:10,
      type:"text",
      text:"F",
      backgroundColor:"#43c6f0"
    }
    data.push(item)

    item = {
      fake:true,
      name:"Steven Besoz",
      time:"DEC 13  18:45PM",
      progress:7,
      total:7,
      type:"text",
      text:"S",
      backgroundColor:"#ff1b66"
    }
    data.push(item)

    item = {
      fake:true,
      name:"Jeff Nelson",
      time:"DEC 13  18:45PM",
      total:10,
      progress:6,
      type:"image",
      image:require("../../../Assets/images/icon/avatar2.png")
    }
    data.push(item)
    return data;
  }
}

export default ClientsProfessionals;
