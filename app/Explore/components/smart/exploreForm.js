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
import ModalDropdown from 'react-native-modal-dropdown';

import DatePicker from 'react-native-datepicker';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LineIcons from 'react-native-vector-icons/SimpleLineIcons';

import R from 'ramda';

import { SegmentedControls } from 'react-native-radio-buttons';
import SearchBar from '../../../Components/searchBar';
import ExploreMapView from './exploreMapView';
import ExploreListView from './exploreListView';

import { ProfessionalsClients, GymLocations } from '../../../Components/dummyEntries';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/images/background.png');

class ExploreForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLocationSegment : 'ALL',
      selectedPriceSegment : '$50-$100',
      mapStandardMode: true,
      showContentMode: 0,
      professionalsClients: ProfessionalsClients,
      gymLocations: GymLocations,
      professionSelected: 0,
      listSelectedProfessions: [],
    };
  }

  componentWillReceiveProps(newProps) {

    if (newProps.status == 'explore_request') {

    } else if (newProps.status == 'explore_success') {

    } else if (newProps.status == 'explore_error') {

    }
  }

  onList () {
    this.setState({ showContentMode: 1,  mapStandardMode: true });
  }

  onFilter () {
    Actions.FilterForm();
  }

  onMap () {
    this.setState({ showContentMode: 0, mapStandardMode: true });
  }

  onClose () {
    this.setState({ mapStandardMode:true });
  }

  onSelectLocationFilterMode(option) {
    this.setState({ selectedLocationSegment: option })

    if (option === 'ALL') {
      this.setState({ professionalsClients: ProfessionalsClients });
      return;
    }

    isEven = item => item.type === option;
    const filterValue = R.filter(isEven, ProfessionalsClients);
    this.setState({ 
      professionalsClients: filterValue,
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

  removeProfession (profession) {
    const index = this.state.listSelectedProfessions.indexOf(profession);
    if(index + 1 === this.state.professionSelected) {
      this.selectProfession(-1);
    } else if(index + 1 < this.state.professionSelected){
      this.selectProfession(this.state.professionSelected-2);
    }
    this.state.listSelectedProfessions.splice(index, 1);
    this.setState({ listSelectedProfessions: this.state.listSelectedProfessions });
  }

  onSelectProfession (value) {
    let listSelectedProfessions = this.state.listSelectedProfessions;
    const profession = R.find(R.propEq('id', value.props.id))(this.props.auth.professions);
    if(listSelectedProfessions.includes(profession)){
      listSelectedProfessions.splice(listSelectedProfessions.indexOf(profession), 1);
    }
    listSelectedProfessions.unshift(profession);

    this.setState({ listSelectedProfessions });
    this.selectProfession(0);
    return false;
  }

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
      { auth: { professions, user, professionalsClients } } = this.props;

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
        { user && !user.professional ?
          <View style={ styles.filterRowContainer }>
            <View style={ styles.professionSearchContainer }>
              <TouchableOpacity activeOpacity={ .5 }>
                <ModalDropdown
                  options={ professions.map((item) => (<Text key={item.id} id={item.id}>{item.name}</Text>)) }
                  defaultValue={<CommunityIcons name="plus" size={ 25 } color={ "#41c3fd" }/>}
                  style={ styles.dropdown }
                  textStyle ={ styles.dropDownText }
                  dropdownStyle={ styles.dropdownStyle }
                  onSelect={ (rowId, rowData) => this.onSelectProfession(rowData) }
                />
              </TouchableOpacity>

              {
                this.state.listSelectedProfessions.length>0 &&
                <View style={ [styles.buttonWrapper,
                  {
                    backgroundColor: professionSelected == 0 ? '#4dc7fd' : '#fff',
                    borderColor: '#4dc7fd',
                  }
                ] }>
                  <TouchableOpacity activeOpacity={ .5 } onPress={ () => {
                    this.selectProfession(-1)
                  } }>
                    <View style={ [styles.cellButton] }>
                      <Text style={ [styles.cellText, {color: professionSelected == 0 ? '#fff' : '#4dc7fd'}] }>
                        All </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              }

              <ScrollView
                horizontal={ true }
                showsHorizontalScrollIndicator={ false }
                ref={(ref) => {this.searchProfessionScroll = ref}}
                onContentSizeChange={(contentWidth, contentHeight)=>{
                  const scrollToEnd = contentWidth - width + 20 >0 ? contentWidth - width + 20 :0;
                  this.searchProfessionScroll.scrollTo({x: scrollToEnd});
                }}
              >
                <View style={ styles.cellContainer }>
                {
                  this.state.listSelectedProfessions.map((profession, index) => {
                    const selected = index + 1 == professionSelected;
                    return (
                      <View  key={index}>

                        <View style={ [ styles.buttonWrapper,
                          {
                            backgroundColor: selected ? profession.color || '#4dc7fd' : '#fff',
                            borderColor: profession.color || '#4dc7fd',
                          }
                          ] }>
                          <TouchableOpacity onPress={ () => {
                            this.selectProfession(index)
                          }}>
                            <View style={ styles.cellButton }>
                              <Text style={ [styles.cellText, {color: selected ? '#fff' : profession.color || '#4dc7fd' }] }>{ profession.name }</Text>
                            </View>
                          </TouchableOpacity>

                        </View>

                        <TouchableOpacity style={ styles.closeProfession} activeOpacity={ .5 } onPress={ () => {
                          this.removeProfession(profession)
                        }}>
                          <View style={ styles.closeProfessionView }></View>
                          <EvilIcons
                            name="close-o"
                            size={ 21 }
                            color={ "#4dc7fd" }
                            style={ styles.closeProfessionIcon}
                          />
                        </TouchableOpacity>
                      </View>
                    )
                  })
                }
                </View>
              </ScrollView>
            </View>

            {
              !this.state.listSelectedProfessions.length &&
              <View style={ styles.searchProfessionBlock }>
                <LineIcons
                  name="magnifier"
                  size={ 20 }
                  color={ "#acacac" }
                />
                <Text style={ styles.searchProfessionText }> Search a Profession </Text>
              </View>
            }

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
    const { user } = this.props.auth;

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
                professionalsClients={ this.state.professionalsClients }
                gymLocations={ this.state.gymLocations }
                user={ user }
              />
              :
              <ExploreListView
                onFilter={ () => this.onFilter() }
                onList={ () => this.onMap() }
                professionalsClients={ this.state.professionalsClients }
                user={ user }
              />
          }

        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // width,
    // height,
    // backgroundColor: '#1abef2',
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
  searchProfessionBlock: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchProfessionText: {
    color: '#acacac',
  },
  closeProfession: {
    position: 'absolute',
    right:0,
    top:-1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    height: 25,
    width: 25,
    backgroundColor: 'transparent',
  },
  closeProfessionIcon: {

  },
  closeProfessionView: {
    backgroundColor: '#fff',
    borderRadius: 8,
    position: 'absolute',
    right: 3,
    top: 1,
    height: 15,
    width: 15,
    overflow: 'hidden'
  },

  //scroll view
  filterRowContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  buttonWrapper: {
    marginHorizontal: 2,
    marginTop: 3,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4dc7fd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellButton: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    height: 23,
  },
  cellText: {
    color: '#4dc7fd',
    fontSize: 12,
  },
  cellContainer: {
    borderRadius: 7,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  professionSearchContainer: {
    borderRadius: 7,
    flexDirection: 'row-reverse',
  },
  //end scroll view
});

export default connect(state => ({
    auth: state.auth
  }),
  (dispatch) => ({})
)(ExploreForm);
