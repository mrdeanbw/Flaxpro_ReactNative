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
import Clients_CoachesListCell from './clients_coachesListCell';
import ClientProfile from '../../../Profile/containers/clientProfile';
import TrainerProfile from '../../../Profile/containers/trainerProfile';

const { width, height } = Dimensions.get('window');

const weeks = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const years = ['2017', '2018', '2019', '2020'];

const dataEntries = [
  {
    name: 'Emily Carter',
    date: 'DEC 13 18:45PM',
    location: 'St Tropez',
    avatar: require('../../../Assets/avatar1.png'),
  },
  {
    name: 'Mark Deo',
    date: 'DEC 13 18:45PM',
    location: 'St Tropez',
    avatar: require('../../../Assets/avatar1.png'),
  },
  {
    name: 'John Smith',
    date: 'DEC 13 18:45PM',
    location: 'St Tropez',
    avatar: require('../../../Assets/avatar1.png'),
  },
  {
    name: 'Sara Clinton',
    date: 'DEC 13 18:45PM',
    location: 'Toronto, ON',
    avatar: require('../../../Assets/avatar1.png'),
  },
  {
    name: 'Steven Besoz',
    date: 'DEC 13 18:45PM',
    location: 'Toronto, ON',
    avatar: require('../../../Assets/avatar1.png'),
  },
  {
    name: 'Jeff Nelson',
    date: 'DEC 13 18:45PM',
    location: 'Toronto, ON',
    avatar: require('../../../Assets/avatar1.png'),
  },
];

export default class Clients_CoachesForm extends Component {
  constructor(props) {
    super(props);

    var dataSourceClients_Coaches = new ListView.DataSource(
      { rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSourceClients_Coaches: dataSourceClients_Coaches.cloneWithRows(dataEntries),

    };
  }

  componentWillReceiveProps(newProps) {

    if (newProps.status == 'ClientsRequest') {

    } else if (newProps.status == 'ClientsSuccess') {

    } else if (newProps.status == 'ClientsError') {

    } else if (newProps.status == 'CoachesRequest') {

    } else if (newProps.status == 'CoachesSuccess') {

    } else if (newProps.status == 'CoachesError') {

    }
  }

  renderClients_CoachesRow(rowData, sectionID, rowID) {

    return (
      <Clients_CoachesListCell
        index={ Number(rowID) + 1 }
        name={ rowData.name }
        date={ rowData.date }
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
          Actions.TrainerProfile({ editable: false });
          return;
        } else if (data == CommonConstant.user_trainer){
          Actions.ClientProfile({ editable: false });
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
        <View style={ styles.clients_coachesContainer }>
          <ListView
            dataSource={ this.state.dataSourceClients_Coaches}
            renderRow={ this.renderClients_CoachesRow.bind(this) }
            contentContainerStyle={ styles.clients_coachesListView}
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
  clients_coachesContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  clients_coachesListView: {
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

