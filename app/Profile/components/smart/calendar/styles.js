import { Dimensions, StyleSheet } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const PADDING_H = 10;

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: '#f7f7f7',
  },
  monthContainer: {
    width: (DEVICE_WIDTH-PADDING_H*2),
  },
  scrollingBlock: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
  },
  calendarControls: {
    flexDirection: 'row',
  },
  controlButton: {
  },
  controlButtonText: {
    margin: 10,
    fontSize: 15,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    margin: 10,
  },
  calendarHeading: {
    flexDirection: 'row',
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
  },
  dayHeading: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  weekendHeading: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#cccccc',
  },
  paddingHorizontal: {
    paddingHorizontal: PADDING_H
  },
  weekRow: {
    flexDirection: 'row',
    paddingVertical: 2,
    paddingHorizontal: PADDING_H,
  },
  dayButton: {
    alignItems: 'center',
    width: (DEVICE_WIDTH-PADDING_H*2) / 7,
    // borderTopWidth: 1,
    // borderTopColor: '#e9e9e9',
  },
  dayButtonFiller: {
    width: (DEVICE_WIDTH-PADDING_H*2) / 7,
  },
  day: {
    fontSize: 12,
    alignSelf: 'center',
  },
  eventIndicatorFiller: {
    marginTop: 3,
    borderColor: 'transparent',
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  eventIndicator: {
    backgroundColor: '#cccccc',
  },
  dayCircleFiller: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  currentDayCircle: {
    backgroundColor: 'red',
  },
  currentDayText: {
    color: 'red',
  },
  selectedDayCircle: {
    backgroundColor: 'black',
  },
  hasEventCircle: {
  },
  hasEventDaySelectedCircle: {
    backgroundColor: '#45c7f1',
    borderWidth: 1,
    borderColor: '#34aadc',
  },
  hasEventText: {
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  weekendDayText: {
    color: '#cccccc',
  },
});

export default styles;
