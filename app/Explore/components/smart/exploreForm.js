import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import DatePicker from 'react-native-datepicker';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EntypoIcons from 'react-native-vector-icons/Entypo';

import PopupDialog from 'react-native-popup-dialog';

import R from 'ramda';

import { SegmentedControls } from 'react-native-radio-buttons';
import SearchBar from '../../../Components/searchBar';
import ExploreMapView from './exploreMapView';
import ExploreListView from './exploreListView';

import { ProfessionalsClients, GymLocations } from '../../../Components/dummyEntries';
import { allProfessions } from '../../../Components/tempDataUsers';

import FullScreenLoader from '../../../Components/fullScreenLoader';

const { width, height } = Dimensions.get('window');
import * as CommonConstant from '../../../Components/commonConstant';

const background = require('../../../Assets/images/background.png');
const arrow = require('../../../Assets/images/right_arrow.png');

const locationGray = require('../../../Assets/images/location_gray.png');
const locationMultiGray = require('../../../Assets/images/location_multi_gray.png');
const locationNearbyGray = require('../../../Assets/images/location_nearby_gray.png');

const locationWhite = require('../../../Assets/images/location_white.png');
const locationMultiWhite = require('../../../Assets/images/location_multi_white.png');
const locationNearbyWhite = require('../../../Assets/images/location_nearby_white.png');

const otherLabel = {_id: 0, name: 'Other', color:'#000000',icon:'../Assets/images/sport.png'};
const allLabel = {_id: -1, name: 'All', color:'#4dc7fd'};
const defaultProfessions = [ 'Fitness Training', 'Physiotherapist', 'Yoga', 'Massage' ];

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
      filteredClients: [ ...ProfessionalsClients, ...this.props.explore.clients, ],
      filteredProfessionals: [ ...ProfessionalsClients, ...this.props.explore.professionals, ],
      locationType: 'nearby',
      locationText: 'Nearby to me',
      locationAddress: '',
      professions: {
        selected: {},
        search:'',
        searchMode: false,
        listSelected: [],
        listFiltered: [],
        listOriginal: [],
        listOther: [],
      }
    };
    this.onFilterAutocomplete = this.onFilterAutocomplete.bind(this)
  }

  componentWillMount(){
    this.setDefaultData()
  }

  componentWillReceiveProps(newProps) {
    const { explore: { error } } = newProps;
    if (error) {
      Alert.alert(error);
      return;
    }
  }

  setDefaultData () {
    const { auth: { user } , explore } = this.props;
    if(explore && user) {
      if(user.role === CommonConstant.user_client) {
        const listOriginal = (this.props.explore.professions || allProfessions).filter((e) => defaultProfessions.includes(e.name));
        const listOther = (this.props.explore.professions || allProfessions).filter((e) => !e.original);
        const listSelected = [...listOriginal, otherLabel];
        const selected = allLabel;
        const professions = {...this.state.professions, listOriginal, listOther, listSelected, selected};
        const filteredProfessionals = this.filterProfessionalsList(listSelected);
        this.setState({professions, filteredProfessionals})
      }
      if(user.role === CommonConstant.user_professional) {
        this.filterClientsList();
      }
    }

  }
  onList () {
    this.setState({ showContentMode: 1,  mapStandardMode: true });
  }

  onFilter () {
    ///Actions.FilterProfessionalForm();
    const { getProfessionals, explore: { professions } } = this.props;

    Actions.FilterClientForm({ getProfessionals, professions });
  }

  onMap () {
    this.setState({ showContentMode: 0, mapStandardMode: true });
  }

  onClose () {
    this.setState({ mapStandardMode:true });
  }

  openLocationPopup () {
    this.setState({ locationAddress: '' });
    this.popupDialogLocation.openDialog ();
  }

  closeLocationPopup () {
    this.popupDialogLocation.closeDialog ();
  }

  startFilterByLocation () {
    let { getProfessionals } = this.props,
        locationType = this.state.locationType,
        filterObj = {};
    this.closeLocationPopup();

    switch(locationType) {
      case 'nearby':
        filterObj.locationType = 'nearby'
        break
      case 'address':
        filterObj.locationType = 'address'
        this.setState({ locationText:  this.state.locationAddress });
        filterObj.address = this.state.locationAddress
        if(!filterObj.address) {
          this.closeLocationPopup()
          return Alert.alert('Alert',
            'Please enter address',
            [
              {text: 'OK', onPress: () =>  this.openLocationPopup()}
            ]
          );
        }
        break
    }
    getProfessionals(filterObj)
  }

  onLocation (value, text) {
    let self = this
    this.setState({ locationType: value });
    this.setState({ locationText: text });

    if(value !== 'address' ) {
      setTimeout(function () {
        self.startFilterByLocation()
      }, 0)
    }
  }

  get dialogLocationClient () {
    let { user } = this.props.auth;
    let originalAddress = ''
    if (user.location) {
      originalAddress = user.location.originalAddress
    }
    return (
      <PopupDialog
        ref={ (popupDialogLocation) => { this.popupDialogLocation = popupDialogLocation; }}
        width={ width * 0.95 }
        dialogStyle={ styles.dialogContainer }
      >
        <View style={ styles.locationDialogContentContainer }>
          <View style={ styles.locationDialogTopContainer }>
              <Text style={ styles.locationHeaderText }>
                My location
              </Text>
              <EntypoIcons
                style={ styles.locationClose }
                onPress={ () => this.closeLocationPopup() }
                name="chevron-small-up"
                size={ 28 }
              />
              <Text style={ styles.locationStreetText } >{ originalAddress }</Text>
          </View>
          <View style={ styles.locationMiddleContainer }>
            <Text style={ styles.locationBlueText }>Show Professionals</Text>
          </View>
          <View  style={ styles.locationBtnBlock }>
            <TouchableOpacity onPress={() => this.onLocation( "nearby", "Nearby to me" )} >
              <View style={ styles.locationBtnContainer }>
                <View
                  style={ [styles.locationBtn, this.state.locationType == "nearby"  && styles.activeLocation] }>
                  <Image
                    source={ this.state.locationType != "nearby" ? locationNearbyGray : locationNearbyWhite }
                    style={ styles.locationNearbyIcon }
                  />
                </View>
                <Text style={ styles.locationBtnText }>Nearby to me</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onLocation( "address")} >
              <View style={ styles.locationBtnContainer }>
                <View
                  style={ [styles.locationBtn, this.state.locationType == "address"  && styles.activeLocation] }>
                  <Image
                    source={ this.state.locationType != "address" ? locationGray : locationWhite }
                    style={ styles.locationGrayIcon }/>
                </View>
                <Text style={ styles.locationBtnText }>Enter an Address</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onLocation( "all", "All locations")} >
              <View style={ styles.locationBtnContainer }>
                <View
                  style={ [styles.locationBtn, this.state.locationType == "all"  && styles.activeLocation] }>
                  <Image
                    source={ this.state.locationType != "all" ? locationMultiGray : locationMultiWhite }
                    style={ styles.locationMulti }
                  />
                </View>
                <Text style={ styles.locationBtnText }>All locations</Text>
              </View>
            </TouchableOpacity>
          </View>
          {this.state.locationType == "address" &&
            <View style={styles.locationInputContainer}>
              <Text style={ styles.locationBlueText }>Enter address</Text>
              <View style={styles.addressInputContaitner}>
                <TextInput
                  editable={ true }
                  autoCapitalize="none"
                  autoCorrect={ false }
                  color="#000"
                  style={ styles.textInput }
                  onChangeText={ (text) => this.setState({locationAddress: text}) }
                />
              </View>
              <TouchableOpacity onPress={ () => this.startFilterByLocation() }>
                <View style={ styles.arrowButton }>
                  <Image source={ arrow } style={ styles.imageArrow }/>
                </View>
              </TouchableOpacity>
            </View>
          }

        </View>
      </PopupDialog>
    );
  }

  /**
   * For "Professional" role
   * Calls when user click on the one of the filters from topBar
   *
   * filtered "this.state.gymLocations" by the chosen filters
   * filtered clients list by the chosen filters:
   *
   */
  filterClientsList() {
    let filteredClients = [ ...ProfessionalsClients, ...this.props.explore.clients ];
    let gymLocations = GymLocations;
    if(this.state.selectedLocationSegment){
      if (this.state.selectedLocationSegment !== 'ALL') {
        filteredClients = filteredClients.filter((item => item.type === this.state.selectedLocationSegment));
        gymLocations = [];
      }
    }
    if(this.state.selectedPriceSegment){
      if(this.state.selectedPriceSegment === "$50-$100"){
        filteredClients = filteredClients.filter((e)=>(!e.amount || e.amount<=100))
      }
      if(this.state.selectedPriceSegment === "$100-$300"){
        filteredClients = filteredClients.filter((e)=>(e.amount && e.amount>=100 && e.amount<=300))
      }
      if(this.state.selectedPriceSegment === "$300+"){
        filteredClients = filteredClients.filter((e)=>(e.amount && e.amount>=300))
      }
    }
    this.setState({ filteredClients, gymLocations })
  };

  onSelectLocationFilterMode(option) {
    this.setState({ selectedLocationSegment: option }, () => this.filterClientsList())
  }

  onSelectPriceFilterMode(option) {
    this.setState({ selectedPriceSegment: option }, () => this.filterClientsList())
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

  /**
   * For "Client" role
   * Calls when user click "cross button"on the professions  from horizontal scrollBar
   * remove profession from selected professions list
   *
   * sets "this.state.professions.listSelected" to array without removed profession
   * filtered professionals list by the new selected professions list:
   *
   * @param profession{Object} - profession
   */
  onRemoveProfession (profession) {
    let listSelected = this.state.professions.listSelected;
    const index = listSelected.indexOf(profession);
    listSelected.splice(index, 1);
    if(profession._id === listSelected._id) {
      this.onSelectInListProfession({});
    }
    const filteredProfessionals = this.filterProfessionalsList(listSelected);
    const professions = {...this.state.professions, listSelected};

    this.setState({ professions, filteredProfessionals });
  }

  /**
   * For "Client" role
   * Calls when user click on the one of the professions from autocomplete's dropdown,
   * find selected profession and sets it on beginning of the selected professions list
   *
   * sets "this.state.professions.searchMode" to 'false' hide autocomplete and show horizontal scrollBar with selected professions
   * sets "this.state.professions.listFiltered" to the empty array (not show dropdown)
   * sets "this.state.professions.search" to the empty string
   * sets "this.state.professions.listSelected":
   *          if "profession" already exists on the list - remove it
   *          sets "profession" on beginning of the selected professions list
   *
   * @param value{Object} - profession
   */
  onSelectProfession (value) {
    let listSelected = this.state.professions.listSelected;
    const profession = R.find(R.propEq('_id', value._id))(this.props.explore.professions || allProfessions);
    if(listSelected.includes(profession)){
      listSelected.splice(listSelected.indexOf(profession), 1);
    }
    listSelected.unshift(profession);

    let filteredProfessionals = this.state.filteredProfessionals;
    if(!this.state.professions.selected) {
      filteredProfessionals = this.filterProfessionalsList(listSelected);
    }
    const professions = {...this.state.professions, listSelected, search:'', listFiltered:[], searchMode: false};

    this.setState({ professions, filteredProfessionals });
  }

  /**
   * For "Client" role
   * Calls when user click on the one of the professions from horizontal scrollBar
   *
   * sets "this.state.professions.selected" to the chosen profession or an empty object if the same profession was chosen before
   * filtered professionals list by the chosen profession:
   *          if "profession" - sets professionals with this chosen profession
   *          if "All" - sets all professionals
   *          if "Other" - sets professionals with not 'origin' profession
   *
   * @param selected{Object} - profession (also can be 'otherLabel' or 'allLabel')
   */
  onSelectInListProfession(selected) {
    let filteredProfessionals = [ ...ProfessionalsClients, ...this.props.explore.professionals ].filter((e)=>(e.profession && e.profession._id===selected._id));
    if(selected._id === this.state.professions.selected._id) {
      filteredProfessionals = [];
      selected = {};
    }
    if(selected._id === otherLabel._id) {
      filteredProfessionals = this.filterProfessionalsList(this.state.professions.listOther);
      selected = otherLabel;
    }
    if(selected._id === allLabel._id) {
      filteredProfessionals = [ ...ProfessionalsClients, ...this.props.explore.professionals];
      selected = allLabel;
    }
    const professions = {...this.state.professions, selected};

    this.setState({ professions, filteredProfessionals });
  }

  /**
   * For "Client" role
   * filters professionals list by professions list
   *
   * @param list{Array} - professions
   */
  filterProfessionalsList(list){
    let filteredList = [];
    if(list.length){
      list.map((item)=> {
        if(item._id === otherLabel._id){
          filteredList.push(...this.filterProfessionalsList(this.state.professions.listOther));
        }
        filteredList.push(...([...ProfessionalsClients, ...this.props.explore.professionals]).filter((e) => (e.profession && e.profession._id === item._id)))
      });
      return R.uniq(filteredList);
    } else {
      return [ ...ProfessionalsClients, ...this.props.explore.professionals];
    }

  }

  /**
   * For "Client" role
   * Calls when user types in an autocomplete input
   *
   * sets "this.state.professions.search" to thetext which user types in the autocomplete input
   * filtered professions list "this.state.professions.listFiltered" by the input text
   *
   * @param search{String} - text from the autocomplete input
   */
  onFilterAutocomplete(search) {
    const listFiltered = search ? (this.props.explore.professions || allProfessions).filter((e)=>e.name.toLowerCase().includes(search)) : [];
    const professions = {...this.state.professions, search, listFiltered};

    this.setState({ professions });
  }

  /**
   * For "Client" role
   * Calls when user click on the Magnifying glass icon from right corner a horizontal scrollBar
   *
   * hides horizontal scrollBar and shows input for professions - autocomplete with dropdown
   *
   */
  onFindProfession() {
    const professions = {...this.state.professions, searchMode:true};
    this.setState({ professions }, () => this.searchProfessionInput.focus());
  }

  onCloseDropdown() {
    const professions = {...this.state.professions, listFiltered:[], searchMode: false, search:''};
    this.setState({ professions });
  }

  today() {
    return (new Date()).toDateString();
  }

  get showFullTopBar () {
    const { professions } = this.state,
      { auth: { user } } = this.props;

    return (
      <View style={ styles.navContainer }>
        <View style={ styles.searchBarWrap }>
          <TouchableOpacity
            onPress={ () => this.openLocationPopup() }
          >
            <SearchBar
              height={ 20 }
              value={ this.state.locationText }
              autoCorrect={ false }
              editable={ false }
              returnKeyType={ "search" }
              iconSearchName={ "location" }
              placeholder="Prefered Location"
              iconColor={ "#fff" }
              placeholderColor={ "#fff" }
              paddingTop={ 20 }
            />
          </TouchableOpacity>
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
        { user && user.role === CommonConstant.user_client ?
          <View style={ styles.filterRowContainer }>
            <View style={ styles.professionSearchContainer }>
              {!professions.searchMode && professions.listSelected.length>0 &&
              <View style={styles.professionSearchContainer}>
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                  <View style={ [styles.buttonWrapper,
                    {
                      backgroundColor: professions.selected._id === allLabel._id ? allLabel.color : '#fff',
                      marginHorizontal:5,
                      borderColor: '#4dc7fd',
                    }
                  ] }>
                    <TouchableOpacity activeOpacity={ .5 } onPress={ () => { this.onSelectInListProfession(allLabel) } }>
                      <View style={ [styles.cellButton] }>
                        <Text style={ [styles.cellText, {color: professions.selected._id === allLabel._id ? '#fff' : allLabel.color}] }>
                          {allLabel.name}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity activeOpacity={ .5 } onPress={ () => { this.onFindProfession() } }>
                    <LineIcons
                      name="magnifier"
                      size={ 20 }
                      color={ "#4dc7fd" }
                    />
                  </TouchableOpacity>
                </View>
                <ScrollView
                  horizontal={ true }
                  showsHorizontalScrollIndicator={ false }
                  ref={(ref) => {this.searchProfessionScroll = ref}}
                  onContentSizeChange={(contentWidth, contentHeight)=>{
                    const scrollToEnd = contentWidth - width -55 >0 ? contentWidth - width -55 :0;
                    this.searchProfessionScroll.scrollTo({x: scrollToEnd});
                  }}
                >
                  <View style={ styles.cellContainer }>
                    {
                      this.state.professions.listSelected.map((profession, index) => {
                        const selected = profession._id === professions.selected._id;
                        return (
                          <View  key={index}>

                            <View style={ [ styles.buttonWrapper,
                              {
                                backgroundColor: selected ? profession.color || '#4dc7fd' : '#fff',
                                borderColor: profession.color || '#4dc7fd',
                              }
                            ] }>
                              <TouchableOpacity onPress={ () => {
                                this.onSelectInListProfession(profession)
                              }}>
                                <View style={ styles.cellButton }>
                                  <Text style={ [styles.cellText, {color: selected ? '#fff' : profession.color || '#4dc7fd' }] }>{ profession.name }</Text>
                                </View>
                              </TouchableOpacity>

                            </View>

                            <TouchableOpacity style={ styles.closeProfession} activeOpacity={ .5 } onPress={ () => {
                              this.onRemoveProfession(profession)
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
              }


            </View>

            {
              (professions.searchMode || !professions.listSelected.length) &&
              <View style={ styles.searchProfessionBlock }>
                <LineIcons
                  name="magnifier"
                  size={ 20 }
                  color={ "#acacac" }
                />
                <TextInput
                  editable={true}
                  autoCapitalize="none"
                  autoCorrect={ false }
                  placeholder="Search a Profession"
                  placeholderTextColor="#acacac"
                  color="#acacac"
                  width={250}
                  ref={(ref) => {this.searchProfessionInput = ref}}
                  style={ styles.searchProfessionText }
                  value={ professions.search }
                  onChangeText={ this.onFilterAutocomplete }
                />
                <View style={ styles.searchProfessionCloseButon }>
                  <TouchableOpacity onPress={ () => this.onCloseDropdown() }>
                    <LineIcons
                      name="close"
                      size={ 20 }
                      color={ "#acacac" }
                    />
                  </TouchableOpacity>
                </View>
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
                marginVertical: 5,
              }}
            />
          </View>
        }
      </View>
    );
  }

  render() {
    const { user } = this.props.auth;
    const { listFiltered } = this.state.professions;
    const explore = this.props.explore;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          {listFiltered.length > 0 &&
            <View style={styles.dropdownWrapper}>
              <View style={[styles.dropdown, listFiltered.length > 6 && styles.dropdownLimitHeight]}>
                <ScrollView>
                  {
                    listFiltered.map((item) => (
                      <TouchableOpacity key={item._id} activeOpacity={ .5 }
                                        onPress={ (r) => this.onSelectProfession(item) }>
                        <Text style={styles.dropdownText}>{item.name} </Text>
                        <View style={styles.dropdownSeparator}/>

                      </TouchableOpacity>
                    ))
                  }
                </ScrollView>
              </View>
              <TouchableOpacity onPress={ () => this.onCloseDropdown() }>
                <View style={styles.dropdownBackground}></View>
              </TouchableOpacity>
            </View>
          }
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
                professionalsClients={ user && user.role === CommonConstant.user_client ? this.state.filteredProfessionals : this.state.filteredClients }
                gymLocations={ this.state.gymLocations }
                user={ user }
              />
              :
              <ExploreListView
                onFilter={ () => this.onFilter() }
                onList={ () => this.onMap() }
                professionalsClients={ user && user.role === CommonConstant.user_client ? this.state.filteredProfessionals : this.state.filteredClients }
                user={ user }
              />
          }
        </Image>
        { this.dialogLocationClient }
        { explore.loading ? <FullScreenLoader/> : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  locationMulti: {
    width: 43,
    height: 28,
  },
  locationNearbyIcon: {
    width: 27,
    height: 27,
  },
  locationGrayIcon: {
    width: 20,
    height: 27,
  },
  arrowButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 50,
  },
  imageArrow: {
    width: 30,
    height: 24,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  textInput: {
    height: 30,
    width: width * 0.8,
    paddingHorizontal: 10,
    borderRadius: 15
  },
  addressInputContaitner: {
    width: width * 0.8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    marginTop: 5,
  },
  locationInputContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },

  activeLocation: {
    backgroundColor: '#48C7F2',
  },
  locationBtnBlock: {
    flexDirection: 'row',
    marginBottom: 20
  },
  locationBtnContainer: {
    width: width * 0.3,
    alignItems: 'center',
  },
  locationBtn: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.15)/2,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationBtnText: {
    fontWeight: '500',
    fontSize: 12,
  },
  locationHeaderText: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  locationClose: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 1,
    top: 2,
    color: '#48c7f2'
  },
  locationDialogContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: width * 0.95,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  locationDialogTopContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
    alignSelf: 'stretch',

  },
  locationMiddleContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  locationBlueText: {
    color: '#85D9F3'
  },
  dialogContainer: {
    backgroundColor: 'transparent',
    position: 'relative',
    top: -160
  },
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
    flex:1,
    flexDirection: 'row',
  },
  searchProfessionCloseButon: {
    flex:1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  searchProfessionText: {
    margin:0,
    height:25,
    fontSize:12,
    paddingHorizontal: 5,
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
    height: 20,
  },
  cellText: {
    color: '#4dc7fd',
    fontSize: 12,
  },
  cellContainer: {
    marginRight:150,
    borderRadius: 7,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  professionSearchContainer: {
    borderRadius: 7,
    flexDirection: 'row-reverse',
  },
  //end scroll view
  dropdownText: {
    paddingHorizontal:6,
    paddingVertical: 10,
    fontSize: 11,
    textAlignVertical: 'center',
  },
  dropdownSeparator:{
    marginHorizontal:5,
    borderWidth:0.5,
    borderColor: '#d3d3d3',
  },
  dropdown: {
    borderColor: '#d3d3d3',
    backgroundColor: '#fff',
    overflow:'hidden',
    borderRadius: 3,
    borderWidth: 1,
    justifyContent: 'center',
    left: 10,
    width:width-20,
    zIndex: 3,
    position: 'absolute',
  },
  dropdownLimitHeight: {
    height: 210,
  },
  dropdownWrapper: {
    position: 'absolute',
    top: 140,
    zIndex: 1,
    width,
    height: height-140
  },
  dropdownBackground:{
    zIndex: 2,
    position: 'relative',
    backgroundColor: '#a3a4a7',
    opacity: 0.5,
    width,
    height: height-140}
});

const mapStateToProps = (state) => ({
  explore: state.explore
});

export default connect(state =>
  mapStateToProps
)(ExploreForm);
