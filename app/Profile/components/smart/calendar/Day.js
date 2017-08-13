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
      case isSelected && !this.props.isAll:
        dayCircleStyle.push(styles.hasEventDaySelectedCircle, customStyle.selectedDayCircle);
        break;
      case !!event:
        dayCircleStyle.push(styles.hasEventCircle, customStyle.hasEventCircle, event.hasEventCircle);
        break;
    }
    return dayCircleStyle;
  }

  dayTextStyle = ({isWeekend, isSelected, isToday, event, onlyEvent, isCurrentMonth}) => {
    const { customStyle } = this.props;
    const dayTextStyle = [styles.day, customStyle.day];

    switch (true) {
      case isSelected && !this.props.isAll:
        dayTextStyle.push(styles.selectedDayText, customStyle.selectedDayText);
        break;
      case isToday:
        dayTextStyle.push(styles.currentDayText, customStyle.currentDayText);
        break;
      case isWeekend:
        dayTextStyle.push(styles.weekendDayText, customStyle.weekendDayText);
        break;
      case !isCurrentMonth:
        dayTextStyle.push({color:'#cccccc'});
        break;
    }
    return dayTextStyle;
  }

  badgeStyle = ({ event, isSchedule, filterStatus}) => {
    let badgeStye = [{position:'absolute', right:10, width:4, height:4, borderRadius:2 }];
    if(isSchedule && !filterStatus && !!event) badgeStye.push({backgroundColor:'#ff0000'} );
    if(filterStatus && !!event) badgeStye.push({backgroundColor:'#00ff47'} );
    return badgeStye;
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
      isCurrentMonth,
      isSchedule,
      filterStatus
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
          {
            this.props.isNotEdit &&
            <View style={ this.badgeStyle({event, isSchedule, filterStatus }) } />
          }
          <View style={ this.dayCircleStyle({isWeekend, isSelected, isToday, event, onlyEvent}) }>
            <Text style={ this.dayTextStyle({isWeekend, isSelected, isToday, event, onlyEvent, isCurrentMonth}) }>{ caption }</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
