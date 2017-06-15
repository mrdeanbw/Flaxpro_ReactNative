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
    onlyEvent: PropTypes.bool,
    isToday: PropTypes.bool,
    isWeekend: PropTypes.bool,
    onPress: PropTypes.func,
    showEventIndicators: PropTypes.bool,
  }

  dayCircleStyle = ({isWeekend, isSelected, isToday, event, onlyEvent}) => {
    const { customStyle } = this.props;
    const dayCircleStyle = [styles.dayCircleFiller, customStyle.dayCircleFiller];

    switch (true) {
      case isSelected && !!event:
        dayCircleStyle.push(styles.hasEventDaySelectedCircle, customStyle.selectedDayCircle);
        break;
      case isSelected && !onlyEvent:
        dayCircleStyle.push(styles.selectedDayCircle, customStyle.selectedDayCircle);
        break;
      case !!event:
        dayCircleStyle.push(styles.hasEventCircle, customStyle.hasEventCircle, event.hasEventCircle);
        break;
    }
    return dayCircleStyle;
  }

  dayTextStyle = ({isWeekend, isSelected, isToday, event, onlyEvent}) => {
    const { customStyle } = this.props;
    const dayTextStyle = [styles.day, customStyle.day];

    switch (true) {
      case isSelected && !onlyEvent:
        dayTextStyle.push(styles.selectedDayText, customStyle.selectedDayText);
        break;
      case isSelected && !!event:
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
      onlyEvent,
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
          <View style={ this.dayCircleStyle({isWeekend, isSelected, isToday, event, onlyEvent}) }>
            <Text style={ this.dayTextStyle({isWeekend, isSelected, isToday, event, onlyEvent}) }>{ caption }</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
