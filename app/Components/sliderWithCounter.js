import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import Slider from 'react-native-slider';
import {
  WIDTH_SCREEN as width
} from './commonConstant';

export default class SliderWithCounter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: props.counter,
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onSlidingComplete = this.onSlidingComplete.bind(this);
  }

  onValueChange(value) {
    this.setState({ counter: value });
  }

  onSlidingComplete(value) {
    if (this.props.onSlidingComplete) {
      this.props.onSlidingComplete(value);
    }
  }
  render() {
    const {
      minimumValue,
      maximumValue,
      sliderWidth,
      additionalOffset,
      trackStyle,
      maximumTrackTintColor,
      minimumTrackTintColor,
      bubbleStyle,
      textAboveSliderStyle,
      arrowBorderStyle,
      arrowStyle,
    } = this.props;

    const ageInitialValue = minimumValue;
    const numberDivisions = maximumValue - minimumValue + 1;
    const allPaddingsMargings = 85 + additionalOffset;
    const scale = (sliderWidth - allPaddingsMargings) / numberDivisions ;
    const paddingLeft =(this.state.counter - ageInitialValue) * scale;

    return (
      <View style={ styles.viewSlider }>
        <Animated.View style={ [styles.animateContainer, {paddingLeft: paddingLeft}] }>
          <Animated.View style={ [styles.bubble, bubbleStyle] }>
            <Animated.Text style={ [styles.textAboveSliderStyle, textAboveSliderStyle] }>{ this.state.counter }</Animated.Text>
          </Animated.View>
          <Animated.View style={ [styles.arrowBorder, arrowBorderStyle] } />
          <Animated.View style={ [styles.arrow, arrowStyle] } />
        </Animated.View>
        <Slider style={ styles.slider }
                maximumTrackTintColor={ maximumTrackTintColor }
                minimumTrackTintColor={ minimumTrackTintColor }
                trackStyle= { [styles.trackStyle, trackStyle] }
                thumbTouchSize={{width: 40, height: 60}}
                thumbStyle={ styles.thumbStyle }
                minimumValue={ minimumValue }
                maximumValue={ maximumValue }
                step={ 1 }
                value = { this.state.counter }
                onValueChange={ this.onValueChange }
                onSlidingComplete={ this.onSlidingComplete }
        />
      </View>
    );
  }
}

SliderWithCounter.propTypes = {
  counter: PropTypes.number,
  minimumValue: PropTypes.number,
  maximumValue: PropTypes.number,
  sliderWidth: PropTypes.number,
  additionalOffset: PropTypes.number,
  onSlidingComplete: PropTypes.func.isRequired,
  trackStyle: PropTypes.object,
  maximumTrackTintColor: PropTypes.string,
  minimumTrackTintColor: PropTypes.string,
  bubbleStyle: PropTypes.object,
  textAboveSliderStyle: PropTypes.object,
  arrowBorderStyle: PropTypes.object,
  arrowStyle: PropTypes.object,
};

SliderWithCounter.defaultProps = {
  counter: 15,
  minimumValue: 15,
  maximumValue: 85,
  additionalOffset: 0,
  sliderWidth: width * 0.75,
  maximumTrackTintColor: "#9be5ff",
  minimumTrackTintColor: "#10c7f9",
};

const styles = StyleSheet.create({
  viewSlider:{},
  trackStyle:{
    backgroundColor: 'rgba(173, 230, 254, 0.5)',
    marginTop: -4
  },
  slider: {
    marginRight: 15,
    height: 20,
    marginBottom: -8,
  },
  animateContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    marginRight: 6,
    marginLeft: -6,
  },

  bubble: {
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    flex: 0,
    alignSelf: 'flex-start',
    backgroundColor: '#19b8ff',
    borderRadius: 5,
    borderColor: '#19b8ff',
    borderWidth: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 6,
    borderColor: 'transparent',
    borderTopColor: '#19b8ff',
    alignSelf: 'center',
    marginTop: -15,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 6,
    borderColor: 'transparent',
    borderTopColor: '#19b8ff',
    alignSelf: 'center',
    marginTop: -0.5,
  },
  textAboveSliderStyle: {
    textAlign: 'center',
    height: 15,
    width: 20,
    color: '#fff',
    fontSize: 13,
  },
  thumbStyle:{
    top:11,
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderColor: '#10c7f9',
    borderWidth: 1
  },
});
