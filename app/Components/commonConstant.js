import {Dimensions} from "react-native"

export const user_mode = 'UserMode';
export const user_client = 'Client';
export const user_professional = 'Professional';
export const GOOGLE_API_KEY = 'AIzaSyAVyPfgJHW3NrdPdEAZekPwHU9q1jwFj_k';
export const APP_COLOR = '#16c1f6';
export const WIDTH_SCREEN = Dimensions.get('window').width;
export const HEIHT_SCREEN = Dimensions.get('window').height;
export const HEIGHT_KEYBOARD_IOS = 216;

export const FONT_STYLES =   {
  fontFamily: 'Open Sans',
  fontSize: 18,
};

export const PRICES = [
  {item: '$', price: '$50-$100', level: '1'},
  {item: '$$', price: '$100-$300', level: '2'},
  {item: '$$$', price: '$300+', level: '3'}
];

export const INFO_CALENDAR_OPTIONS = {
  BASIC_INFO: 'BASIC INFO',
  CALENDAR: 'CALENDAR'
};