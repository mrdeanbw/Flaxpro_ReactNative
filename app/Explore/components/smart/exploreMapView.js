import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  Image,
  Alert,

} from 'react-native';

import { Actions } from 'react-native-router-flux';
import localStorage from 'react-native-local-storage';
import * as CommonConstant from '../../../Components/commonConstant';

import MapView from 'react-native-maps';
import PanController from './panController';
import AnimatedCoachMarker from './animatedCoachMarker';
import AnimatedViewCell from './animatedViewCell';
import PopupDialog from 'react-native-popup-dialog';
import Stars from 'react-native-stars-rating';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomBar from './bottomBar';

const { width, height } = Dimensions.get('window');
const pin_gym = require('../../../Assets/images/gym.png');
const avatar = require('../../../Assets/images/avatar1.png');


const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ITEM_SPACING = 10;
const ITEM_PREVIEW = 10;
const ITEM_WIDTH = (width - (2 * ITEM_SPACING) - (2 * ITEM_PREVIEW)) / 3;
const SNAP_WIDTH = ITEM_WIDTH + ITEM_SPACING;
const ITEM_PREVIEW_HEIGHT = ITEM_WIDTH;
const SCALE_END = width / ITEM_WIDTH;
const BREAKPOINT1 = 246;
const BREAKPOINT2 = 350;
const ONE = new Animated.Value(1);
const SPACE = 0.014;

function getMarkerState(panX, panY, scrollY, i) {
  
  const xLeft = (-SNAP_WIDTH * i) + (SNAP_WIDTH / 2);
  const xRight = (-SNAP_WIDTH * i) - (SNAP_WIDTH / 2);
  const xPos = -SNAP_WIDTH * i;

  const isIndex = panX.interpolate({
    inputRange: [xRight - 1, xRight, xLeft, xLeft + 1],
    outputRange: [0, 1, 1, 0],
    extrapolate: 'clamp',
  });

  const isNotIndex = panX.interpolate({
    inputRange: [xRight - 1, xRight, xLeft, xLeft + 1],
    outputRange: [1, 0, 0, 1],
    extrapolate: 'clamp',
  });

  const center = panX.interpolate({
    inputRange: [xPos - 10, xPos, xPos + 10],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  });

  const selected = panX.interpolate({
    inputRange: [xRight, xPos, xLeft],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  });

  const translateY = Animated.multiply(isIndex, panY);

  const translateX = panX;

  const anim = Animated.multiply(isIndex, scrollY.interpolate({
    inputRange: [0, BREAKPOINT1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  }));

  const scale = Animated.add(ONE, Animated.multiply(isIndex, scrollY.interpolate({
    inputRange: [BREAKPOINT1, BREAKPOINT2],
    outputRange: [0, SCALE_END - 1],
    extrapolate: 'clamp',
  })));

  let opacity = scrollY.interpolate({
    inputRange: [BREAKPOINT1, BREAKPOINT2],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  opacity = Animated.multiply(isNotIndex, opacity);

  opacity = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  let markerOpacity = scrollY.interpolate({
    inputRange: [0, BREAKPOINT1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  markerOpacity = Animated.multiply(isNotIndex, markerOpacity).interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const markerScale = selected.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return {
    translateY,
    translateX,
    scale,
    opacity,
    anim,
    center,
    selected,
    markerOpacity,
    markerScale,
  };
}

class ExploreMapView extends Component {
  constructor(props) {
    super(props);

    const panX = new Animated.Value(0);
    const panY = new Animated.Value(0);

    const scrollY = panY.interpolate({
      inputRange: [-1, 1],
      outputRange: [1, -1],
    });

    const scrollX = panX.interpolate({
      inputRange: [-1, 1],
      outputRange: [1, -1],
    });

    const scale = scrollY.interpolate({
      inputRange: [0, BREAKPOINT1],
      outputRange: [1, 1.6],
      extrapolate: 'clamp',
    });

    const translateY = scrollY.interpolate({
      inputRange: [0, BREAKPOINT1],
      outputRange: [0, -100],
      extrapolate: 'clamp',
    });

    this.state = {
      panX,
      panY,
      index: 0,
      canMoveHorizontal: false,
      scrollY,
      scrollX,
      scale,
      translateY,
      selectedGymIndex: 0,
      selectedCoacheClientIndex: 0,
    };

    // this.region = new MapView.AnimatedRegion({
    //   latitude: LATITUDE,
    //   longitude: LONGITUDE,
    //   latitudeDelta: LATITUDE_DELTA,
    //   longitudeDelta: LONGITUDE_DELTA,
    // });

    this.onTapMap = this.onTapMap.bind(this);
    this.onList = this.onList.bind(this);
    this.onFilter = this.onFilter.bind(this);
  }

  componentWillReceiveProps(newProps) {
     // this.setState({ selectedCoacheClientIndex: 0 }); //TODO: commented
  }

  onStartShouldSetPanResponder = (e) => {

    // we only want to move the view if they are starting the gesture on top
    // of the view, so this calculates that and returns true if so. If we return
    // false, the gesture should get passed to the map view appropriately.
    const { panY } = this.state;
    const { pageY } = e.nativeEvent;
    const topOfMainWindow = ITEM_PREVIEW_HEIGHT + panY.__getValue();
    const topOfTap = height - pageY;

    return topOfTap < topOfMainWindow;
  }

  onMoveShouldSetPanResponder = (e) => {

    const { panY } = this.state;
    const { pageY } = e.nativeEvent;
    const topOfMainWindow = ITEM_PREVIEW_HEIGHT + panY.__getValue();
    const topOfTap = height - pageY;

    return topOfTap < topOfMainWindow;
  }

  onPanXChange = ({ value }) => {

    const { index } = this.state;
    const newIndex = Math.floor(((-1 * value) + (SNAP_WIDTH / 2)) / SNAP_WIDTH);
    if (index !== newIndex) {
      this.setState({ index: newIndex });
    }
  }

  onPanYChange = ({ value }) => {

    const { 
      canMoveHorizontal, 
      scrollY, 
      scrollX, 
      index,
    } = this.state;

    const coachesClients = this.props.coachesClients;

    const shouldBeMovable = Math.abs(value) < 2;
    if (shouldBeMovable !== canMoveHorizontal) {
      this.setState({ canMoveHorizontal: shouldBeMovable });
      if (!shouldBeMovable) {
        const { coordinate } = coachesClients[index];
        this.region.stopAnimation();
        this.region.timing({
          latitude: scrollY.interpolate({
            inputRange: [0, BREAKPOINT1],
            outputRange: [
              coordinate.latitude,
              coordinate.latitude - (LATITUDE_DELTA * 0.5 * 0.375),
            ],
            extrapolate: 'clamp',
          }),
          latitudeDelta: scrollY.interpolate({
            inputRange: [0, BREAKPOINT1],
            outputRange: [LATITUDE_DELTA, LATITUDE_DELTA * 0.5],
            extrapolate: 'clamp',
          }),
          longitudeDelta: scrollY.interpolate({
            inputRange: [0, BREAKPOINT1],
            outputRange: [LONGITUDE_DELTA, LONGITUDE_DELTA * 0.5],
            extrapolate: 'clamp',
          }),
          duration: 0,
        }).start();
      } else {
        this.region.stopAnimation();
        this.region.timing({
          latitude: scrollX.interpolate({
            inputRange: coachesClients.map( (item, index) => index * SNAP_WIDTH),
            outputRange: coachesClients.map(item => item.coordinate.latitude),
          }),
          longitude: scrollX.interpolate({
            inputRange: coachesClients.map( (item, index) => index * SNAP_WIDTH),
            outputRange: coachesClients.map(item => item.coordinate.longitude),
          }),
          duration: 0,
        }).start();
      }
    }
  }

  onRegionChange(/* region */) {
    // this.state.region.setValue(region);
  }

  onPressPin ( index ) {

    this.setState({ selectedGymIndex: index });
    this.popupDialogGym.openDialog ();
  }

  onCloseGym () {

    this.popupDialogGym.closeDialog ();
  }

  onSetGym () {
    this.popupDialogGym.closeDialog ();
  }

  onPressCoachClient ( index ) {
    this.setState({ selectedCoacheClientIndex: index });
    this.popupDialogCoach.openDialog ();
  }

  onHireCoach ( key ) {

    this.popupDialogCoach.closeDialog ();
    Actions.Payment();
  }

  onMakeOfferCoach ( ) {

    Actions.ProposeTerms({ user: this.props.coachesClients[this.state.selectedCoacheClientIndex] });
  }

  onExpandCoach ( key ) {
    this.popupDialogCoach.closeDialog ();

    localStorage.get(CommonConstant.user_mode)
      .then((data) => {
        if (data == CommonConstant.user_client) {
          Actions.TrainerProfile({ editable: false, user: this.props.coachesClients[this.state.selectedCoacheClientIndex] });
          return;
        } else if (data == CommonConstant.user_trainer){
          Actions.ClientProfile({ editable: false, user: this.props.coachesClients[this.state.selectedCoacheClientIndex] });
          return;
        }
      });
  }

  onTapMap () {
    if (this.props.onTapMap) {
      this.props.onTapMap();
    }
  }

  onList() {

    if (this.props.onList) {
      this.props.onList();
    }
  }

  onFilter() {

    if (this.props.onFilter) {
      this.props.onFilter();
    }
  }

  onClickAnimatedViewCell (index) {

    this.setState({ selectedCoacheClientIndex: index });
    this.popupDialogCoach.openDialog ();
  }

  get dialogGymPreferedWorkoutLocation () {
    return (
      <PopupDialog
        ref={ (popupDialogGym) => { this.popupDialogGym = popupDialogGym; } }
        width={ width * 0.8 }
        dialogStyle={ styles.dialogContainer }
      >
        <View style={ styles.gymDialogMainContentContainer }>
          <View style={ styles.gymDialogContentContainer }>
            <Text style={ styles.dialogText1 }>Do you want to set this Gym as the prefered workout location?</Text>
            <View style={ styles.dialogBottomContainer }>
              <View style={ styles.leftButtonContainer }>
                <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onCloseGym() }>
                  <View style={ styles.buttonWrapper }>
                    <Text style={ styles.button }>NO</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={ styles.rightButtonContainer }>
                <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onSetGym() }>
                  <View style={ styles.buttonWrapper }>
                    <Text style={ styles.button }>YES</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={ styles.gymDialogTopContainer }>
            <Image source={ pin_gym } style={ styles.gymBanner } />
          </View>
        </View>
      </PopupDialog>
    );
  }

  get dialogSelectCoachClient () {

    const coachesClients = this.props.coachesClients

    return (
      <PopupDialog
        ref={ (popupDialogCoach) => { this.popupDialogCoach = popupDialogCoach; }}
        width={ width * 0.8 }
        dialogStyle={ styles.dialogContainer }
      >
        <View style={ styles.coachDialogContentContainer }>
          <View style={ styles.coachDialogTopContainer }>
            <Image source={ coachesClients[this.state.selectedCoacheClientIndex].avatar } style={ styles.avatar } />
            <View style={ styles.coachTopSubContainer }>
              <View style={ styles.coachNameRatingContainer }>
                <Text style={ styles.textName }>{ coachesClients[this.state.selectedCoacheClientIndex].name }</Text>
                <Stars
                  isActive={ false }
                  rateMax={ 5 }
                  isHalfStarEnabled={ true }
                  rate={ coachesClients[this.state.selectedCoacheClientIndex].rating }
                  size={ 20 }
                />
              </View>
              <Text style={ styles.dialogText2 }>{ coachesClients[this.state.selectedCoacheClientIndex].description }</Text>
            </View>
          </View>
          <View style = { styles.coachMiddleContainer }>
            <View style={ styles.dateContainer }>
              <EvilIcons
                name="calendar"  size={ 30 }
                color="#41c3fd"
              />
              <Text style={ styles.textDate }>{ coachesClients[this.state.selectedCoacheClientIndex].date }</Text>
            </View>
            <Text>{ coachesClients[this.state.selectedCoacheClientIndex].duration }</Text>
          </View>
          <View style={ styles.dialogBottomContainer }>
            <View style={ styles.leftButtonContainer }>
              <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onHireCoach() }>
                <View style={ styles.buttonWrapper }>
                  <Text style={ styles.coachButton }>HIRE ${ coachesClients[this.state.selectedCoacheClientIndex].amount }/HR</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={ styles.rightButtonContainer }>
              <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onMakeOfferCoach() }>
                <View style={ styles.buttonWrapper }>
                  <Text style={ styles.coachButton }>MAKE AN OFFER</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={ styles.expandContainer }>
            <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onExpandCoach() }>
              <View style={ styles.expandWrapper }>
                <Ionicons
                  name="md-expand"  size={ 25 }
                  color="#fff"
                />
                <Text style={ styles.textExpand }>EXPAND</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </PopupDialog>
    );
  }

  render() {
    const {
      panX,
      panY,
      canMoveHorizontal,
      scrollX,
      scrollY
    } = this.state;

    const { coachesClients, gymLocations } = this.props;

    this.region = new MapView.AnimatedRegion({
      latitude: coachesClients[0].coordinate.latitude,
      longitude: coachesClients[0].coordinate.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
    
    const animations = coachesClients.map( (item, index) =>
      getMarkerState(panX, panY, scrollY, index)
    );

    panX.addListener(this.onPanXChange);
    panY.addListener(this.onPanYChange);

    this.region.stopAnimation();
    this.region.timing({
      latitude: scrollX.interpolate({
        inputRange: coachesClients.map( (item, index) => index * SNAP_WIDTH),
        outputRange: coachesClients.map(item => item.coordinate.latitude),
      }),
      longitude: scrollX.interpolate({
        inputRange: coachesClients.map( (item, index) => index * SNAP_WIDTH),
        outputRange: coachesClients.map( item => item.coordinate.longitude),
      }),
      duration: 0,
    }).start();


    return (
      <View style={ styles.container }>
        <PanController
          style={ styles.container }
          horizontal={ canMoveHorizontal }
          xMode="snap"
          snapSpacingX={ SNAP_WIDTH }
          xBounds={ [-(ITEM_WIDTH + ITEM_SPACING) * (coachesClients.length - 1), 0] }
          panY={ panY }
          panX={ panX }
          onStartShouldSetPanResponder={ this.onStartShouldSetPanResponder }
          onMoveShouldSetPanResponder={ this.onMoveShouldSetPanResponder }
        >
          <MapView.Animated
            provider={ this.props.provider }
            style={ styles.map }
            region={ this.region }
            onRegionChange={ this.onRegionChange }
            onLongPress={ () => this.onTapMap() }
          >
            {
              gymLocations && gymLocations.map( (marker, index) => (
                <MapView.Marker
                  image={ pin_gym }
                  key={ index }
                  coordinate={ marker.coordinate }
                  calloutOffset={{ x: 0, y: 28 }}
                  calloutAnchor={{ x: 0.5, y: 0.4 }}
                  onPress={ () => this.onPressPin(index) }
                >
                </MapView.Marker>
              ))
            }

            {
              coachesClients.map( (marker, index) => {

                const {
                  selected,
                  markerOpacity,
                  markerScale,
                } = animations[index];

                return (
                  <MapView.Marker
                    key={ index }
                    coordinate={ marker.coordinate }
                    onPress={ () => this.onPressCoachClient(index) }
                  >
                    <AnimatedCoachMarker
                      style={{
                        opacity: markerOpacity,
                        transform: [
                          { scale: markerScale },
                        ],
                      }}
                      amount={ marker.amount }
                      personName={ marker.name }
                      rating={ marker.rating }
                      selected={ selected }
                      index={index}
                    />
                  </MapView.Marker>
                );
              })
            }
          </MapView.Animated>

          <View style={ [styles.mainContentContainer] }>
            <BottomBar
              onList={ () => this.onList() }
              onFilter={ () => this.onFilter() }
            />
          </View>
          {
            this.props.mapStandardMode ?
              <View style={ [styles.itemContainer, { height: 0 }] }/>
            :
              <View style={ styles.itemContainer }>
                {
                  coachesClients.map( (marker, index) => {
                    const {
                      translateY,
                      translateX,
                      scale,
                      opacity,
                    } = animations[index];

                    return (
                      <AnimatedViewCell
                        key={ index }
                        style={ [styles.item, {
                          opacity,
                          transform: [
                            { translateY },
                            { translateX },
                            { scale },
                          ],
                        }]}
                        avatar={ marker.avatar }
                        width={ ITEM_WIDTH }
                        height={ ITEM_PREVIEW_HEIGHT }
                        rating={ marker.rating }
                        name={ marker.name }
                        description={ marker.description }
                        amount={ marker.amount }
                        onPress={ () => this.onClickAnimatedViewCell(index) }
                      />
                    );
                  })
                }
              </View>
          }

          { this.dialogGymPreferedWorkoutLocation }
          { this.dialogSelectCoachClient }

        </PanController>
      </View>
    );
  }
}

ExploreMapView.propTypes = {
  provider: MapView.ProviderPropType,
  mapStandardMode: PropTypes.bool,
  onTapMap: PropTypes.func,
  onFilter: PropTypes.func,
  onList: PropTypes.func,
};

ExploreMapView.defaultProps = {
  mapStandardMode: true,
  onTapMap: () => {},
  onFilter: () => {},
  onList: () => {},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: ITEM_PREVIEW / 2,
    width: width,
    height: ITEM_PREVIEW_HEIGHT + 20,
    alignItems: 'center',
    backgroundColor: '#47c8f280',
    marginBottom: 50,
  },
  item: {
    width: ITEM_WIDTH,
    height: ITEM_PREVIEW_HEIGHT,
    marginHorizontal: ITEM_SPACING / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  dialogContainer: {
    backgroundColor: 'transparent',
    marginBottom: 100,
  },
  gymDialogMainContentContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gymDialogTopContainer: {
    width: width * 0.8,
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gymBanner: {
    width: 44,
    height: 44,
  },
  gymDialogContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: 22,
    position: 'absolute',
    top: 22,
    width: width * 0.8,
    borderRadius: 20,
  },
  dialogText1: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignSelf: 'center',
    color: '#585858',
  },
  dialogBottomContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
  },
  leftButtonContainer: {
    flex: 1,
  },
  rightButtonContainer: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#e6e6e6',
  },
  buttonWrapper: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    textAlign: 'center',
    color: '#696969',
  },
  coachDialogContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: width * 0.8,
    borderRadius: 20,
  },
  coachDialogTopContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  coachTopSubContainer: {
    flex : 1,
    paddingLeft: 15,
  },
  coachNameRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textName: {
    fontSize: 18,
    color: '#585858'
  },
  dialogText2: {
    color: '#585858',
    paddingVertical: 10,
  },
  coachMiddleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDate: {
    color: '#41c3fd',
  },
  expandContainer: {
    backgroundColor: '#41c3fd',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    alignSelf: 'stretch',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  expandWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.8,
  },
  textExpand: {
    paddingLeft: 10,
    fontSize: 16,
    color: '#fff',
  },
  coachButton: {
    color: '#272727',
  },
  mainContentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 60,
  },
});

module.exports = ExploreMapView;
