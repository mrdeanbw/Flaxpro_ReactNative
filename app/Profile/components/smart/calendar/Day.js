import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import styles from './styles';

export default class Day extends Component {
  static defaultProps = {
    customStyle: {},
  }

  static propTypes = {
    caption: PropTypes.any,
    customStyle: PropTypes.object,
    filler: PropTypes.bool,
    event: PropTypes.object,
    isSelected: PropTypes.bool,
    isToday: PropTypes.bool,
    isWeekend: PropTypes.bool,
    onPress: PropTypes.func,
    showEventIndicators: PropTypes.bool,
  }

  dayCircleStyle = (isWeekend, isSelected, isToday, event) => {
    const { customStyle } = this.props;
    const dayCircleStyle = [styles.dayCircleFiller, customStyle.dayCircleFiller];

    switch (true) {
      case isSelected && event:
        dayCircleStyle.push(styles.hasEventDaySelectedCircle, customStyle.hasEventDaySelectedCircle, event.hasEventDaySelectedCircle);
        break;
      case isSelected:
        dayCircleStyle.push(styles.selectedDayCircle, customStyle.selectedDayCircle);
        break;
      case !!event:
        dayCircleStyle.push(styles.hasEventCircle, customStyle.hasEventCircle, event.hasEventCircle);
        break;
    }

    // if (isSelected) {
    //   if (isToday) {
    //     dayCircleStyle.push(styles.currentDayCircle, customStyle.currentDayCircle);
    //   } else {
    //     dayCircleStyle.push(styles.selectedDayCircle, customStyle.selectedDayCircle);
    //   }
    // }
    //
    // if (event) {
    //   if (isSelected) {
    //     dayCircleStyle.push(styles.hasEventDaySelectedCircle, customStyle.hasEventDaySelectedCircle, event.hasEventDaySelectedCircle);
    //   } else {
    //     dayCircleStyle.push(styles.hasEventCircle, customStyle.hasEventCircle, event.hasEventCircle);
    //   }
    // }
    return dayCircleStyle;
  }

  dayTextStyle = (isWeekend, isSelected, isToday, event) => {
    const { customStyle } = this.props;
    const dayTextStyle = [styles.day, customStyle.day];

    switch (true) {
      case isSelected:
        dayTextStyle.push(styles.selectedDayText, customStyle.selectedDayText);
        break;
      case isToday:
        dayTextStyle.push(styles.currentDayText, customStyle.currentDayText);
        break;
      case !!event:
        dayTextStyle.push(styles.hasEventText, customStyle.hasEventText, event.hasEventText)
        break;
      case isWeekend:
        dayTextStyle.push(styles.weekendDayText, customStyle.weekendDayText);
        break;
    }

    // if (isToday && !isSelected) {
    //   dayTextStyle.push(styles.currentDayText, customStyle.currentDayText);
    // } else if (isToday || isSelected) {
    //   dayTextStyle.push(styles.selectedDayText, customStyle.selectedDayText);
    // } else if (isWeekend) {
    //   dayTextStyle.push(styles.weekendDayText, customStyle.weekendDayText);
    // }
    //
    // if (event) {
    //   dayTextStyle.push(styles.hasEventText, customStyle.hasEventText, event.hasEventText)
    // }
    return dayTextStyle;
  }

  render() {
    let { caption, customStyle } = this.props;
    const {
      filler,
      event,
      isWeekend,
      isSelected,
      isToday,
      showEventIndicators,
    } = this.props;

    return filler
    ? (
        <TouchableWithoutFeedback>
          <View style={ [styles.dayButtonFiller, customStyle.dayButtonFiller] }>
            <Text style={ [styles.day, customStyle.day] } />
          </View>
        </TouchableWithoutFeedback>
      )
    : (
      <TouchableOpacity onPress={ this.props.onPress }>
        <View style={ [styles.dayButton, customStyle.dayButton] }>
          <View style={ this.dayCircleStyle(isWeekend, isSelected, isToday, event) }>
            <Text style={ this.dayTextStyle(isWeekend, isSelected, isToday, event) }>{ caption }</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
