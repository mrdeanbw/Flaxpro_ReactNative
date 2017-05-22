import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ListView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import localStorage from 'react-native-local-storage';
import Icons from 'react-native-vector-icons/MaterialIcons';
import * as CommonConstant from '../../../Components/commonConstant';
import SearchBar from '../../../Components/searchBar';
import Clients_ProfessionalsListCell from './clients_professionalsListCell';
import ClientProfile from '../../../Profile/containers/clientProfile';
import ProfessionalProfile from '../../../Profile/containers/professionalProfile';
import R from 'ramda';

const { width, height } = Dimensions.get('window');

const weeks = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const years = ['2017', '2018', '2019', '2020'];

import { ProfessionalsClients } from '../../../Components/dummyEntries';

export default class Clients_ProfessionalsForm extends Component {
  constructor(props) {
    super(props);

    const dataSourceClients_Professionals = new ListView.DataSource(
      { rowHasChanged: (r1, r2) => r1 !== r2 });

    isEven = item => item.myGuest === true;
    this.filterValue = R.filter(isEven, ProfessionalsClients);

    this.state = {
      dataSourceClients_Professionals: dataSourceClients_Professionals.cloneWithRows(this.filterValue),

    };
  }

  componentWillReceiveProps(newProps) {

    if (newProps.status == 'ClientsRequest') {

    } else if (newProps.status == 'ClientsSuccess') {

    } else if (newProps.status == 'ClientsError') {

    } else if (newProps.status == 'ProfessionalsRequest') {

    } else if (newProps.status == 'ProfessionalsSuccess') {

    } else if (newProps.status == 'ProfessionalsError') {

    }
  }

  renderClients_ProfessionalsRow(rowData, sectionID, rowID) {

    return (
      <Clients_ProfessionalsListCell
        index={ Number(rowID) + 1 }
        name={ rowData.name }
        time={ rowData.time }
        location= { rowData.location }
        avatar={ rowData.avatar }
        onClick={ () => this.onCellPressed(rowID) }
      />
    );
  }

  onCellPressed (rowID) {
    localStorage.get(CommonConstant.user_mode)
      .then((data) => {
        if (data == CommonConstant.user_client) {
          Actions.ProfessionalProfile({ editable: false, user: this.filterValue[rowID] });
          return;
        } else if (data == CommonConstant.user_professional){
          Actions.ClientProfile({ editable: false, user: this.filterValue[rowID] });
          return;
        }
      });
  }

  onAllDays() {
    alert("Tapped onAllDays");
  }

  onSelectDay( index ) {
    alert("Tapped onSelectDay");
  }

  onAllMonths() {
    alert("Tapped onAllMonths");
  }

  onSelectMonth() {
    alert("Tapped onSelectMonth");
  }

  onAllYears() {
    alert("Tapped onAllYears");
  }

  onSelectYear() {
    alert("Tapped onSelectYear");
  }

  render() {
    const { status } = this.props;

    return (
      <View style={ styles.container }>
        <View style={ styles.clients_professionalsContainer }>
          <ListView
            dataSource={ this.state.dataSourceClients_Professionals}
            renderRow={ this.renderClients_ProfessionalsRow.bind(this) }
            contentContainerStyle={ styles.clients_professionalsListView}
          />
        </View>
        <View style={ styles.filterContainer }>
          <View style={ styles.filterRowContainer }>
            <View style={ styles.buttonWrapper }>
              <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onAllDays() }>
                <View style={ styles.allButton }>
                  <Text style={ styles.buttonText }>All Days</Text>
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={ true }
              showsHorizontalScrollIndicator={ false }
            >
              <View style={ styles.cellContainer }>
                {
                  weeks.map((day, index) => (
                    <View key={index} style={ styles.buttonWrapper }>
                      <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onSelectDay(index) }>
                        <View style={ styles.cellButton }>
                          <Text style={ styles.cellText }>{ day }</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))
                }
              </View>
            </ScrollView>
          </View>
          <View style={ styles.filterRowContainer }>
            <View style={ styles.buttonWrapper }>
              <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onAllMonths() }>
                <View style={ styles.allButton }>
                  <Text style={ styles.buttonText }>All Months</Text>
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={ true }
              showsHorizontalScrollIndicator={ false }
            >
              <View style={ styles.cellContainer }>
                {
                  months.map((month, index) => (
                    <View key={index} style={ styles.buttonWrapper }>
                      <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onSelectMonth(index) }>
                        <View style={ styles.cellButton }>
                          <Text style={ styles.cellText }>{ month }</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))
                }
              </View>
            </ScrollView>
          </View>
          <View style={ styles.filterRowContainer }>
            <View style={ styles.buttonWrapper }>
              <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onAllYears() }>
                <View style={ styles.allButton }>
                  <Text style={ styles.buttonText }>All Years</Text>
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={ true }
              showsHorizontalScrollIndicator={ false }
            >
              <View style={ styles.cellContainer }>
                {
                  years.map((year, index) => (
                    <View key={index} style={ styles.buttonWrapper }>
                      <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onSelectYear(index) }>
                        <View style={ styles.cellButton }>
                          <Text style={ styles.cellText }>{ year }</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))
                }
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clients_professionalsContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  clients_professionalsListView: {
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: '#f3f3f3',
  },
  filterContainer: {
    backgroundColor: '#f9f9f9',
    borderTopWidth: 2,
    borderTopColor: '#d7d7d7',
    borderBottomWidth: 2,
    borderBottomColor: '#d7d7d7',
    paddingHorizontal: 10,
    paddingBottom: 44,
  },
  filterRowContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  allButton: {
    backgroundColor: '#5ad0f6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    borderRadius: 20,
    width: 100,
    height: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  cellButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 30,
  },
  cellText: {
    color: '#72d6f6',
    fontSize: 18,
  },
  cellContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
});

