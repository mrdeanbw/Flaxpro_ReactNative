import {Dimensions} from "react-native"

export const user_mode = 'UserMode';
export const user_client = 'Client';
export const user_professional = 'Professional';

export const APP_COLOR = '#16c1f6';
export const WIDTH_SCREEN = Dimensions.get('window').width;
export const HEIHT_SCREEN = Dimensions.get('window').height;
export const HEIGHT_KEYBOARD_IOS = 216;

export const FONT_STYLES =   {
  fontFamily: 'Open Sans',
  fontSize: 18,
};
export const PRICES = [
  {item: '$', price: '$50-$100', level: 1},
  {item: '$$', price: '$100-$300', level: 2},
  {item: '$$$', price: '$300+', level: 3}
];

export const client_filter_labels = {
  gender: ['Male', 'Female'],
  verified: ['Yes', 'No'],
  insured: ['Yes', 'No'],
  affiliation: ['Gym', 'Independent', 'All'],
  experience: ['2004', '2005', '2006'],
  certification: ['Certified Personal Professional1', 'Certified Personal Professional2', 'Certified Personal Professional3'],
  availability: ['Meet at Home', 'One place'],
  profession: ['Pilates', 'Yoga trainers', 'Massage'],
};
export const client_filter_names = ['gender', 'age', 'priceLevel', 'verified', 'experience', 'insured', 'rating', 'certification', 'profession', 'availability'];

export const professional_filter_labels = {
  gender: ['Male', 'Female'],
  clientType: ['New', 'Regular'],
  age: [28],
  rating: [2],
};
export const professional_filter_names = ['gender', 'age', 'priceLevel', 'rating', 'clientType'];
