import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DatePicker from 'react-native-datepicker';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import R from 'ramda';

import { SegmentedControls } from 'react-native-radio-buttons';
import SearchBar from '../../../Components/searchBar';
import ExploreMapView from './exploreMapView';
import ExploreListView from './exploreListView';

import { CoachesClients, GymLocations } from '../../../Components/dummyEntries';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/images/background.png');
const avatar = require('../../../Assets/images/avatar1.png');

class ExploreForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLocationSegment : 'ALL',
      selectedPriceSegment : '$50-$100',
      mapStandardMode: true,
      showContentMode: 0,
      coachesClients: CoachesClients,
      gymLocations: GymLocations,
      professionSelected: 0
    };
  }

  conponentWillMount() {
    // this.setState({ coachesClients: CoachesClients });
  }

  componentWillReceiveProps(newProps) {

    if (newProps.status == 'explore_request') {

    } else if (newProps.status == 'explore_success') {

    } else if (newProps.status == 'explore_error') {

    }
  }

  onList () {
    this.setState({ showContentMode: 1,  mapStandardMode: true });
    // this.setState({ mapStandardMode:true });
  }

  onFilter () {
    Actions.FilterForm();
  }

  onMap () {
    this.setState({ showContentMode: 0, mapStandardMode: true });
    // this.setState({ mapStandardMode:true });
  }

  onClose () {
    this.setState({ mapStandardMode:true });
  }

  onSelectLocationFilterMode(option) {
    this.setState({ selectedLocationSegment: option })

    if (option === 'ALL') {
      this.setState({ coachesClients: CoachesClients });
      return;
    }

    isEven = item => item.type === option;
    const filterValue = R.filter(isEven, CoachesClients);
    this.setState({ 
      coachesClients: filterValue,
      gymLocations: [],
    });
  }

  onSelectPriceFilterMode(option) {
    this.setState({ selectedPriceSegment: option })
  }

  get showCloseTopBar () {

    return (
      <View style={ styles.navBarContainer }>
        <TouchableOpacity
          onPress={ () => this.onClose() }
          style={ styles.closeButtonWrapper }
        >
          <EvilIcons
            name="close"  size={ 35 }
            color="#fff"
          />
        </TouchableOpacity>
        <Text style={ styles.textTitle }>MAP</Text>

        <View style={ styles.closeButtonWrapper } />

      </View>
    );
  }

  // getColorForScrollView (index) {
  //   const { professionSelected } = this.state;
  //   if ()
  //   return {backgroundColor: '#4dc7fd'}
  // }

  selectProfession(index) {
    const { professionSelected } = this.state;
    if (index == 0 || professionSelected != index + 1) {
      this.setState({ professionSelected: index + 1});
    }
  }

  today() {
    return (new Date()).toDateString();
  }

  get showFullTopBar () {
    const { professionSelected } = this.state,
      { auth: { professions, user, coachesClients } } = this.props;

    return (
      <View style={ styles.navContainer }>
        <View style={ styles.searchBarWrap }>
          <SearchBar
            onSearchChange={ () => console.log('On Focus') }
            height={ 20 }
            autoCorrect={ false }
            returnKeyType={ "search" }
            iconSearchName={ "location" }
            placeholder="Prefered Location"
            iconColor={ "#fff" }
            placeholderColor={ "#fff" }
            paddingTop={ 20 }
          />
        </View>
        <View style={ styles.calendarBarWrap } >
          <EvilIcons
            name="calendar"
            size={ 25 }
            color="#fff"
          />
          <DatePicker
            date={ this.state.birthday }
            mode="date"
            placeholder={this.today()}
            format="dddd, MMM DD, YYYY"
            minDate="01/01/1900"
            maxDate="12/31/2100"
            confirmBtnText="Done"
            cancelBtnText="Cancel"
            showIcon={ false }
            style = { styles.calendar }
            customStyles={{
              dateInput: {
                borderColor: "transparent",
                alignItems: "flex-start",
                height: 20,
              },
              dateText: {
                color: "#fff",
                fontFamily: 'Open Sans',
                fontSize: 12,
              },
              placeholderText: {
                color: "#fff",
                fontFamily: 'Open Sans',
                fontSize: 12,
              },
            }}
            onDateChange={ (date) => { this.setState({ birthday: date }) } }
          />
        </View>
        { user && user.professional ?
          <View style={ styles.filterRowContainer }>
            <View style={ styles.cellContainer }>
              <View style={ professionSelected == 0 ? styles.selectWrapper : styles.buttonWrapper }>
                <TouchableOpacity activeOpacity={ .5 } onPress={ () => {
                  this.selectProfession(-1)
                } }>
                  <View style={ [styles.cellButton] }>
                    <Text style={ professionSelected == 0 ? styles.selectedText : styles.cellText }> + </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal={ true }
                showsHorizontalScrollIndicator={ false }
              >
                {
                  professions.map((profession, index) => {
                    const selected = index + 1 == professionSelected;
                    return (
                      <View key={index} style={ selected ? styles.selectWrapper : styles.buttonWrapper }>
                        <TouchableOpacity onPress={ () => {
                          this.selectProfession(index)
                        }}>
                          <View style={ styles.cellButton }>
                            <Text style={ selected ? styles.selectedText : styles.cellText }>{ profession.name }</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )
                  })
                }
              </ScrollView>
            </View>
          </View>
          :
          <View style={ styles.segmentsBlock }>
            <SegmentedControls
              tint={ "#41c3fd" }
              selectedTint= { "#fff" }
              backTint= { "#fff" }
              options={ ["ALL", "NEARBY"] }
              onSelection={ (option) => this.onSelectLocationFilterMode(option) }
              selectedOption={ this.state.selectedLocationSegment }
              allowFontScaling={ true }
              optionStyle={{
                fontSize: 10,
              }}
              containerStyle= {{
                borderRadius: 15,
                width:width/2 - 15,
                height: 25,
                marginLeft: 10,
                marginRight: 5,
                marginVertical: 7,
              }}
            />
            <SegmentedControls
              tint={ "#41c3fd" }
              selectedTint= { "#fff" }
              backTint= { "#fff" }
              options={ ["$50-$100", "$100-$300", "$300+"] }
              onSelection={ (option) => this.onSelectPriceFilterMode(option) }
              selectedOption={ this.state.selectedPriceSegment }
              allowFontScaling={ true }
              optionStyle={{
                fontSize: 9,
              }}
              containerStyle= {{
                borderRadius: 15,
                width:width/2 - 15,
                height: 25,
                marginLeft: 5,
                marginRight: 10,
                marginVertical: 7,
              }}
            />
          </View>
        }
      </View>
    );
  }

  render() {
    const { status } = this.props;
    
    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">

          {
            this.state.mapStandardMode ?
              this.showFullTopBar
              :
              this.showCloseTopBar
          }
          {            
            this.state.showContentMode == 0 ?
              <ExploreMapView
                mapStandardMode={ this.state.mapStandardMode}
                onTapMap={ () => this.setState({ mapStandardMode:false }) }
                onFilter={ () => this.onFilter() }
                onList={ () => this.onList() }
                coachesClients={ this.state.coachesClients }
                gymLocations={ this.state.gymLocations }
              />
              :
              <ExploreListView
                onFilter={ () => this.onFilter() }
                onList={ () => this.onMap() }
                coachesClients={ this.state.coachesClients }
              />
          }

        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width,
    height,
  },
  navContainer: {
  },
  searchBarWrap: {
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  calendarBarWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5bd5f9',
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  calendar: {
    width : width - 55,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentedControlsWrap: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  navBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',

  },
  segmentsBlock: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonWrapper: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  textTitle: {
    flex: 10,
    textAlign: 'center',
    color: '#fff',
    fontSize: 22,
    paddingVertical: 10,
  },

  //scroll view
  filterRowContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  buttonWrapper: {
    borderRadius: 20,
    backgroundColor: '#4dc7fd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectWrapper: {
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellButton: {
    // color: '#5ad0f6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 30,
  },
  cellText: {
    color: '#fff',
    fontSize: 18,
  },
  selectedText: {
    color: '#4dc7fd',
    fontSize: 18,
  },
  cellContainer: {
    borderRadius: 7,
    flexDirection: 'row',
    // paddingVertical: 10,
  }
  //end scroll view
});

export default connect(state => ({
    auth: state.auth
  }),
  (dispatch) => ({})
)(ExploreForm);
