import React from 'react';
import {
  Alert,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
}from 'react-native'
import Moment from 'moment';

import FullScreenLoader from '../../../Components/fullScreenLoader';
import { ListProfession } from "../../../theme"
import styles from "./contractsList_style"
import { 
  user_client as userClient,
  user_professional as userProfessional,
  APP_COLOR as appColor,
} from "../../../Components/commonConstant"

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
    this.state = {
      days: days,
      months: months,
      years: years,
      search: '',
      contracts: [],
    };
  }
  componentWillMount(){
    if(this.props.auth.user.role === userClient) this.props.getMyProfessionals();
    if(this.props.auth.user.role === userProfessional) this.props.getMyClients();
  }
  componentWillReceiveProps(newProps) {
    if(newProps.contracts.loading) return;
    if(newProps.contracts.error) return Alert.alert(newProps.contracts.error);

    const {contracts: {contracts}} = newProps;
    const role = newProps.auth.user.role === userProfessional ? userClient.toLowerCase() : userProfessional.toLowerCase();

    const data = contracts.map( e => (
      {
        profession: e.profession.name,
        professionColor: e.profession.color,
        contracts: e.contracts.map(c => (
          {
            contractId: c._id,
            name: c[role].name,
            userId: c[role].user,
            time: c.next ? Moment(c.next.from).format('MMM DD hh:mm A') : '',
            progress: c.sessionsPast,
            total: c.sessionsTotal,
            text: !c[role].avatar ? c[role].name[0].toUpperCase() : '',
            backgroundColor: !c[role].avatar ? '#43c6f0' : '',
            type: c[role].avatar ? 'url' : 'text',
            image: c[role].avatar || ''
          })
        )
      })
    );
    this.setState({contracts:data})
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
    if(this.props.auth.user.role === userClient) this.props.getMyProfessionals(data);
    if(this.props.auth.user.role === userProfessional) this.props.getMyClients(data);
  }

  render(){
    const role = this.props.auth.user.role === userProfessional ? userClient.toLowerCase() : userProfessional.toLowerCase();
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

        {
          !this.state.contracts.length ?
            <Text style={ styles.noRows }>No {role}s hired</Text>
            :
            <View style={styles.tabContainer}>
              <View style={{flex:1,flexDirection:"row"}}>
                <View style={{flex:0.5}}><Text style={styles.titleSection}>Name</Text></View>
                <View style={{marginLeft:5,flex:0.5}}><Text style={styles.titleSection}>Next Appointment</Text></View>
              </View>
              <View style={{width:110}}>
                <Text style={styles.titleSection}>Sessions</Text>
              </View>
            </View>

        }
        <ScrollView>
          {
            this.state.contracts.map( (data, index) => (
              <ListProfession
                key={index}
                data={data}
                cancelContract={this.props.cancelContract}
                role={this.props.auth.user.role}
                color={appColor}
                lastElement={this.state.contracts.length -1 === index}
                startChat={this.props.startChat}
              />
            ))
          }

        </ScrollView>

        <View style={styles.bottomView}>
          <View style={styles.line}>
            {
              this.state.days.map((row, index) => (
                <TouchableOpacity
                  onPress={ () => this.onSelectDay(row) }
                  key={index}
                >
                  <View style={[row.active && styles.all]}>
                    <Text style={[row.active && styles.allText, !row.active && {color:appColor}]}>{row.name}</Text>
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
                    <Text style={[row.active && styles.allText, !row.active && {color:appColor}]}>{row.name}</Text>
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
                    <Text style={[row.active && styles.allText, !row.active && {color:appColor}]}>{row.name}</Text>
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
}

export default ClientsProfessionals;
