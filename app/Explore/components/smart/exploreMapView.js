import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import MapView from 'react-native-maps';
import PanController from './panController';
import AnimatedProfessionalMarker from './animatedProfessionalMarker';
import AnimatedViewCell from './animatedViewCell';
import PopupDialog from 'react-native-popup-dialog';
import Stars from 'react-native-stars-rating';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import supercluster from 'supercluster';
import R from 'ramda';

import BottomBar from './bottomBar';
import MapClusterMarker from './mapClusterMarker';
import { Avatar } from '../../../theme';

import {
  WIDTH_SCREEN as width,
  HEIHT_SCREEN as height,
  APP_COLOR as appColor,
} from '../../../Components/commonConstant';

const pin_gym = require('../../../Assets/images/gym.png');
const avatar = require('../../../Assets/images/avatar1.png');


const ASPECT_RATIO = width / height;
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

    const locationForFocus = R.isEmpty(props.currentLocation.coordinate) ? props.user : props.currentLocation;
    this.state = {
      panX,
      panY,
      index: 0,
      canMoveHorizontal: false,
      scrollY,
      scrollX,
      scale,
      translateY,
      professionalsClients: props.professionalsClients,
      searchAddress: props.searchAddress,
      currentLocation: props.currentLocation,
      selectedGymIndex: 0,
      selectedProfessionalClientIndex: 0,
      region: new MapView.AnimatedRegion({
        latitude: locationForFocus.coordinate.latitude,
        longitude: locationForFocus.coordinate.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
      markers: [],
    };
    this.onTapMap = this.onTapMap.bind(this);
    this.onList = this.onList.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.createCluster = this.createCluster.bind(this);
    this.getMarkers = this.getMarkers.bind(this);
    this.getZoomLevel = this.getZoomLevel.bind(this);

    const cluster = this.createCluster(props.professionalsClients);
    this.state['cluster'] = cluster;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.professionalsClients && nextProps.professionalsClients!==this.state.professionalsClients) {
      const cluster = this.createCluster(nextProps.professionalsClients);
      const markers = this.getMarkers(cluster, this.state.region);
      this.setState({
        cluster,
        markers,
      });
    }
    let locationForFocus = { coordinate: this.state.region.__getValue()};
    switch (true) {
      case nextProps.searchAddress &&  nextProps.searchAddress!==this.state.searchAddress :
        locationForFocus = nextProps.searchAddress;
        this.setState({ searchAddress: locationForFocus });
        break;
      case nextProps.currentLocation &&  nextProps.currentLocation!==this.state.currentLocation :
        locationForFocus =  nextProps.currentLocation;
        this.setState({ currentLocation: locationForFocus });
        break;
      default: return;
    }
    this.setRegion(locationForFocus);
  }

  setRegion(locationForFocus){
    let region = {
      latitude: locationForFocus.coordinate.latitude,
      longitude: locationForFocus.coordinate.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    this.onRegionChange(region);
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      this.onRegionChange(region);
    },
      (error) => {
        console.log('navigator.geolocation.watchPosition: Error: ', error);
      });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  createCluster(geoData) {
    const cluster = supercluster({
      radius: 75,
      maxZoom: 16,
    });

    const places = geoData.map( geo => {
      return {
        "type": "Feature",
        "geometry": {"type": "Point", "coordinates": [geo.coordinate.longitude, geo.coordinate.latitude]},
        "data": geo
      };
    });

    try {
      cluster.load(places);
      return cluster;
    }
    catch(e) {
      console.debug('failed to create cluster', e);
    }
  }

  getMarkers(cluster, region) {
    const padding = 0.2;
    const regionValue = region.__getValue();
    return cluster.getClusters([
      regionValue.longitude - (regionValue.longitudeDelta * (0.5 + padding)),
      regionValue.latitude - (regionValue.latitudeDelta * (0.5 + padding)),
      regionValue.longitude + (regionValue.longitudeDelta * (0.5 + padding)),
      regionValue.latitude + (regionValue.latitudeDelta * (0.5 + padding)),
    ], this.getZoomLevel(region));
  }

  getZoomLevel(region = this.state.region) {
    const angle = region.__getValue().longitudeDelta;
    return Math.round(Math.log(360 / angle) / Math.LN2);
  }

  onRegionChange(region) {
    this.state.region.setValue(region);
    const markers = this.getMarkers(this.state.cluster, this.state.region);
    this.setState({
      region: this.state.region,
      markers
    });
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
  };

  onMoveShouldSetPanResponder = (e) => {

    const { panY } = this.state;
    const { pageY } = e.nativeEvent;
    const topOfMainWindow = ITEM_PREVIEW_HEIGHT + panY.__getValue();
    const topOfTap = height - pageY;

    return topOfTap < topOfMainWindow;
  };

  onPanXChange = ({ value }) => {

    const { index } = this.state;
    const newIndex = Math.floor(((-1 * value) + (SNAP_WIDTH / 2)) / SNAP_WIDTH);
    if (index !== newIndex) {
      this.setState({ index: newIndex });
    }
  };

  onPanYChange = ({ value }) => {

    const { 
      canMoveHorizontal, 
      scrollY, 
      scrollX, 
      index,
    } = this.state;

    const professionalsClients = this.props.professionalsClients;

    const shouldBeMovable = Math.abs(value) < 2;
    if (shouldBeMovable !== canMoveHorizontal && professionalsClients.length) {
      this.setState({ canMoveHorizontal: shouldBeMovable });
      if (!shouldBeMovable) {
        const { coordinate } = professionalsClients[index];
        this.state.region.stopAnimation();
        this.state.region.timing({
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
        this.state.region.stopAnimation();
        this.state.region.timing({
          latitude: scrollX.interpolate({
            inputRange: professionalsClients.map( (item, index) => index * SNAP_WIDTH),
            outputRange: professionalsClients.map(item => item.coordinate.latitude),
          }),
          longitude: scrollX.interpolate({
            inputRange: professionalsClients.map( (item, index) => index * SNAP_WIDTH),
            outputRange: professionalsClients.map(item => item.coordinate.longitude),
          }),
          duration: 0,
        }).start();
      }
    }
  };

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

  onPressProfessionalClient ( index ) {
    this.setState({ selectedProfessionalClientIndex: index });
    this.popupDialogProfessional.openDialog ();
  }

  onHireProfessional ( price ) {

    this.popupDialogProfessional.closeDialog ();
    Actions.Contract({ user: {...this.props.professionalsClients[this.state.selectedProfessionalClientIndex], price}, editable: false });
  }

  onMakeOfferProfessional ( price ) {
    Actions.Contract({ user: {...this.props.professionalsClients[this.state.selectedProfessionalClientIndex], price}, editable: true });
  }

  onExpandProfessional ( key ) {
    this.popupDialogProfessional.closeDialog ();
    Actions.ViewProfile({ editable: false, user: this.props.professionalsClients[this.state.selectedProfessionalClientIndex] });
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

    this.setState({ selectedProfessionalClientIndex: index });
    this.popupDialogProfessional.openDialog ();
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

  get dialogSelectProfessionalClient () {

    const professionalsClients = this.props.professionalsClients || [];
    const professionalClient =  professionalsClients[this.state.selectedProfessionalClientIndex] || {};
    const professionalClientPrice = professionalClient.price;
    const price = this.props.user.role === "Professional" ? this.props.user.price: professionalClientPrice;

    return (
      <PopupDialog
        ref={ (popupDialogProfessional) => { this.popupDialogProfessional = popupDialogProfessional; }}
        width={ width * 0.8 }
        dialogStyle={ styles.dialogContainer }
      >
        {professionalClient &&
        <View style={ styles.professionalDialogContentContainer }>
          <View style={ styles.professionalDialogTopContainer }>

            <Avatar source={ professionalClient.avatar }
                    type={ professionalClient.avatar ? "url" : "image" }
                    avatarStyle={ { width: 70, height: 70, borderRadius: 35 } }/>
            <View style={ styles.professionalTopSubContainer }>
              <View style={ styles.professionalNameRatingContainer }>
                <Text style={ styles.textName }>{ professionalClient.name }</Text>
                <Stars
                  isActive={ false }
                  rateMax={ 5 }
                  isHalfStarEnabled={ true }
                  rate={ professionalClient.rating }
                  size={ 20 }
                />
              </View>
              <Text style={ styles.dialogText2 } numberOfLines={5} >{ professionalClient.description }</Text>
            </View>
          </View>
          <View style = { styles.professionalMiddleContainer }>
            <View style={ styles.dateContainer }>
              <EvilIcons
                name="calendar"  size={ 30 }
                color="#41c3fd"
              />
              <Text style={ styles.textDate }>{ professionalClient.date }</Text>
            </View>
            <Text>{ professionalClient.duration }</Text>
          </View>
          <View style={ styles.dialogBottomContainer }>
            <View style={ styles.leftButtonContainer }>
              <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onHireProfessional(price) }>
                <View style={ styles.buttonWrapper }>
                  <Text style={ styles.professionalButton }>HIRE ${ price }/HR</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={ styles.rightButtonContainer }>
              <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onMakeOfferProfessional(price) }>
                <View style={ styles.buttonWrapper }>
                  <Text style={ styles.professionalButton }>MAKE AN OFFER</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={ styles.expandContainer }>
            <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onExpandProfessional() }>
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
        }
      </PopupDialog>
    );
  }

  render() {
    const {
      panX,
      panY,
      canMoveHorizontal,
      scrollX,
      scrollY,
      markers
    } = this.state;
    const { professionalsClients=[], gymLocations, user } = this.props;

    const animations = professionalsClients.map( (item, index) =>
      getMarkerState(panX, panY, scrollY, index)
    ) || [];

    if(professionalsClients.length){

      panX.addListener(this.onPanXChange);
      panY.addListener(this.onPanYChange);

      this.state.region.stopAnimation();
      this.state.region.timing({
        latitude: scrollX.interpolate({
          inputRange: professionalsClients.length > 1 ? professionalsClients.map( (item, index) => index * SNAP_WIDTH) : [0, 0,],
          outputRange: professionalsClients.length > 1 ? professionalsClients.map(item => item.coordinate.latitude) : [
            professionalsClients[0].coordinate.latitude,
            professionalsClients[0].coordinate.latitude - (LATITUDE_DELTA * 0.5 * 0.375),
          ],
        }),
        longitude: scrollX.interpolate({
          inputRange: professionalsClients.length > 1 ? professionalsClients.map( (item, index) => index * SNAP_WIDTH) : [0, 0,],
          outputRange: professionalsClients.length > 1 ? professionalsClients.map( item => item.coordinate.longitude) : [
            professionalsClients[0].coordinate.longitude,
            professionalsClients[0].coordinate.longitude - (LONGITUDE_DELTA * 0.5 * 0.375),
          ],
        }),
        duration: 0,
      }).start();
    }

    return (
      <View style={ styles.container }>
        <PanController
          style={ styles.container }
          horizontal={ canMoveHorizontal }
          xMode="snap"
          snapSpacingX={ SNAP_WIDTH }
          xBounds={ [-(ITEM_WIDTH + ITEM_SPACING) * (professionalsClients.length - 1), 0] }
          panY={ panY }
          panX={ panX }
          onStartShouldSetPanResponder={ this.onStartShouldSetPanResponder }
          onMoveShouldSetPanResponder={ this.onMoveShouldSetPanResponder }
        >
          <MapView.Animated
            provider={ this.props.provider }
            style={ styles.map }
            region={ this.state.region }
            onRegionChange={ this.onRegionChange }
            onLongPress={ () => this.onTapMap() }
          >
            {
              professionalsClients.length > 0 && markers.map( (marker, i) => {
                let selected,
                  markerOpacity,
                  markerScale,
                  index;

                if(!marker.properties) {
                  index = R.findIndex(R.propEq('_id', marker.data._id))(professionalsClients);
                  selected = animations[index].selected;
                  markerOpacity = animations[index].markerOpacity;
                  markerScale = animations[index].markerScale;
                };

                return (
                  <MapView.Marker
                    key={i}
                    coordinate={{
                      latitude: marker.geometry.coordinates[1],
                      longitude: marker.geometry.coordinates[0],
                    }}
                    onPress={ () => !marker.properties && this.onPressProfessionalClient(index) }
                  >
                    {
                      marker.properties ?
                        <MapClusterMarker {...marker} />
                        :
                        <AnimatedProfessionalMarker
                          style={{
                            opacity: markerOpacity,
                            transform: [
                              {scale: markerScale},
                            ],
                          }}
                          amount={ marker.data.price }
                          personName={ marker.data.name }
                          rating={ marker.data.rating }
                          profession={ marker.data.profession }
                          selected={ selected }
                          index={ index }
                          user={ user }
                        />
                    }
                  </MapView.Marker>
                );
              })
            }
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

          </MapView.Animated>
          <View style={ [styles.mainContentContainer, this.props.mapStandardMode?{bottom:60}:{bottom:ITEM_PREVIEW_HEIGHT+80}] }>
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
                {professionalsClients.length>1 &&
                  professionalsClients.map( (marker, index) => {
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
                        amount={ marker.price }
                        user={ user }
                        profession={ marker.profession }
                        onPress={ () => this.onClickAnimatedViewCell(index) }
                      />
                    );
                  })
                }
              </View>
          }

          { this.dialogGymPreferedWorkoutLocation }
          { this.dialogSelectProfessionalClient }

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
  user: PropTypes.shape({
    coordinate: PropTypes.object.isRequired
  }),
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
  professionalDialogContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: width * 0.8,
    borderRadius: 20,
  },
  professionalDialogTopContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  professionalTopSubContainer: {
    flex : 1,
    paddingLeft: 15,
  },
  professionalNameRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textName: {
    paddingLeft:10,
    fontSize: 18,
    color: '#585858'
  },
  dialogText2: {
    color: '#585858',
    paddingTop: 20,
    paddingBottom:10
  },
  professionalMiddleContainer: {
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
  professionalButton: {
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
