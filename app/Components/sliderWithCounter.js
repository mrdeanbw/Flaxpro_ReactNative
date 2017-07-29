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
    } = this.props;

    const ageInitialValue = minimumValue;
    const numberDivisions = maximumValue - minimumValue + 1;
    const allPaddingsMargings = 85;
    const scale = (sliderWidth - allPaddingsMargings) / numberDivisions ;
    const paddingLeft =(this.state.counter - ageInitialValue) * scale;

    return (
      <View style={ styles.viewSlider }>
        <Animated.View style={ [styles.animateContainer, {paddingLeft: paddingLeft}] }>
          <Animated.View style={ styles.bubble }>
            <Animated.Text style={ [styles.textAboveSlider] }>{ this.state.counter }</Animated.Text>
          </Animated.View>
          <Animated.View style={ styles.arrowBorder } />
          <Animated.View style={ styles.arrow } />
        </Animated.View>
        <Slider style={ styles.slider }
                maximumTrackTintColor={"#9be5ff"}
                minimumTrackTintColor={"#10c7f9"}
                trackStyle= {{backgroundColor: 'rgba(173, 230, 254, 0.5);'}}
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
  onSlidingComplete: PropTypes.func.isRequired,
};

SliderWithCounter.defaultProps = {
  counter: 15,
  minimumValue: 15,
  maximumValue: 85,
  sliderWidth: width * 0.75,
};

const styles = StyleSheet.create({
  viewSlider:{},
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
  textAboveSlider: {
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
