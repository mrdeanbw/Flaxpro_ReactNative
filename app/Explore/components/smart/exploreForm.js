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

import R from 'ramda';

import { SegmentedControls } from 'react-native-radio-buttons';
import SearchBar from '../../../Components/searchBar';
import ExploreMapView from './exploreMapView';
import ExploreListView from './exploreListView';

import { ProfessionalsClients, GymLocations } from '../../../Components/dummyEntries';
import { allProfessions } from '../../../Components/tempDataUsers';

const { width, height } = Dimensions.get('window');
import * as CommonConstant from '../../../Components/commonConstant';

const background = require('../../../Assets/images/background.png');
const otherLabel = {_id: 0, name: 'Other', color:'#000000',icon:'../Assets/images/sport.png'};
const allLabel = {_id: -1, name: 'All', color:'#4dc7fd'};

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
      filteredProfessionals: [ ...ProfessionalsClients, ...this.props.explore.professionals, ],
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
    this.setDefaultProfessions()
  }

  componentWillReceiveProps(newProps) {
    const { explore: { professionals, error } } = newProps;
    if (error) {
      Alert.alert(error);
      return;
    }
    if (newProps.status == 'explore_request') {

    } else if (newProps.status == 'explore_success') {

    } else if (newProps.status == 'explore_error') {

    }
  }

  setDefaultProfessions () {
    if(this.props.explore && this.props.explore.professions) {
      const listOriginal = this.props.explore.professions.filter((e) => e.original);
      const listOther = this.props.explore.professions.filter((e) => !e.original);
      const listSelected = [...listOriginal, otherLabel ];
      const professions = {...this.state.professions, listOriginal, listOther, listSelected};
      this.setState({ professions })
    }

  }
  onList () {
    this.setState({ showContentMode: 1,  mapStandardMode: true });
  }

  onFilter () {
    ///Actions.FilterProfessionalForm();
    Actions.FilterClientForm();
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

    const filterValue = R.filter(item => item.type === option, ProfessionalsClients);
    this.setState({
      selectedLocationSegment: option,
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
    const filteredProfessionals = this.filterProfessionalList(listSelected);
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
    const filteredProfessionals = this.filterProfessionalList(listSelected);
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
      filteredProfessionals = this.filterProfessionalList(this.state.professions.listSelected);
      selected = {};
    }
    if(selected._id === otherLabel._id) {
      filteredProfessionals = this.filterProfessionalList(this.state.professions.listOther);
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
  filterProfessionalList(list){
    let filteredList = [];
    if(list.length){
      list.map((item)=>(
        filteredList.push(...([ ...ProfessionalsClients, ...this.props.explore.professionals ]).filter((e)=>(e.profession && e.profession._id===item._id)))
      ));
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

  today() {
    return (new Date()).toDateString();
  }

  get showFullTopBar () {
    const { professions } = this.state,
      { auth: { user } } = this.props;

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

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">

          <View style={styles.dropdown}>
            {
              listFiltered.map((item) => (
                <TouchableOpacity key={item._id} activeOpacity={ .5 } onPress={ (r) => this.onSelectProfession(item) }>
                  <Text style={styles.dropdownText}>{item.name} </Text>
                  <View style={styles.dropdownSeparator} />

                </TouchableOpacity>
              ))
            }
          </View>

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
                professionalsClients={ this.state.filteredProfessionals }
                gymLocations={ this.state.gymLocations }
                user={ user }
              />
              :
              <ExploreListView
                onFilter={ () => this.onFilter() }
                onList={ () => this.onMap() }
                professionalsClients={ this.state.filteredProfessionals }
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
    // width:250,
    height:25,
    fontSize:12,
    paddingHorizontal: 5,
    alignSelf: 'center',

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
    position: 'absolute',
    top: 140,
    justifyContent: 'center',
    left: 10,
    zIndex: 1
  }
});

const mapStateToProps = (state) => ({
  explore: state.explore
});

export default connect(state =>
  mapStateToProps
)(ExploreForm);
