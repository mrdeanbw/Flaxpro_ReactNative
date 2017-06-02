
// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const SPACE = 0.014;

export const USER_NEARBY = 'NEARBY';
export const USER_NEW = 'NEW';
export const USER_REGULAR = 'REGULAR';

export const GymLocations = [
  {
    coordinate: {
      latitude: LATITUDE - SPACE * 2,
      longitude: LONGITUDE + SPACE * 2,
    },
  },
  {
    coordinate: {
      latitude: LATITUDE - SPACE,
      longitude: LONGITUDE - SPACE * 2,
    },
  },
  {
    coordinate: {
      latitude: LATITUDE - SPACE * 2,
      longitude: LONGITUDE - SPACE * 2,
    },
  },
];



export const ProfessionalsClients = [
  {
    id: 0,
    coordinate: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
    },
    amount: 100,
    avatar: require('../Assets/images/avatar1.png'),
    rating: 4,
    name: "Emily Joe",
    description: "4 years experience independent",
    date: 'MAR 18, 2017',
    duration: '09:00 AM - 12:00 PM',
    type: USER_NEARBY,
    time: 'DEC 13 18:45PM',
    location: 'St Tropez',
    myGuest: true,
    profession: {
      name: 'Fitness Training',
      color: '#fec107',
      _id: '591c1e632b185e1add2214d8'
    },
  },
  {
    id: 1,
    coordinate: {
      latitude: LATITUDE + SPACE,
      longitude: LONGITUDE - SPACE,
    },
    amount: 200,
    avatar: require('../Assets/images/avatar2.png'),
    rating: 5,
    name: "Mark Carter",
    description: "5 years experience independent",
    date: 'MAR 19, 2017',
    duration: '09:00 AM - 12:00 PM',
    type: USER_NEARBY,
    time: 'DEC 13 18:45PM',
    location: 'St Tropez',
    myGuest: true,
    profession: {
      name: 'Simply Yoga',
      color: '#ac6bbd',
      _id: '591c1e632b185e1add2214d9'
    },
  },
  {
    id: 2,
    coordinate: {
      latitude: LATITUDE - SPACE,
      longitude: LONGITUDE - SPACE,
    },
    amount: 89,
    avatar: require('../Assets/images/avatar3.png'),
    rating: 5,
    name: "John Smith",
    description: "8 years experience independent",
    date: 'MAR 20, 2017',
    duration: '09:00 AM - 12:00 PM',
    type: USER_NEARBY,
    time: 'DEC 13 18:45PM',
    location: 'St Tropez',
    myGuest: true,
    profession: {
      name: 'Strength Training',
      color: '#ee4e42',
      _id: '591c1e632b185e1add2214d7'
    },
  },
  {
    id: 3,
    coordinate: {
      latitude: LATITUDE + SPACE,
      longitude: LONGITUDE + SPACE,
    },
    amount: 90,
    avatar: require('../Assets/images/avatar4.png'),
    rating: 4,
    name: "Sara Lewis",
    description: "9 years experience independent",
    date: 'MAR 21, 2017',
    duration: '09:00 AM - 12:00 PM',
    type: USER_NEARBY,
    time: 'DEC 13 18:45PM',
    location: 'St Tropez',
    myGuest: true,
    profession: {
      color: '#000000',
      name: 'Massage',
      _id: '591c1e632b185e1add2214db'
    },
  },
  {
    id: 4,
    coordinate: {
      latitude: LATITUDE + 10,
      longitude: LONGITUDE + 10,
    },
    amount: 130,
    avatar: require('../Assets/images/avatar5.png'),
    rating: 4,
    name: "Steven Hill",
    description: "10 years experience independent",
    date: 'MAR 22, 2017',
    duration: '09:00 AM - 12:00 PM',
    type: USER_NEW,
    time: 'DEC 13 18:45PM',
    location: 'St Tropez',
    myGuest: true,
    profession: {
      name: 'Strength Training',
      color: '#ee4e42',
      _id: '591c1e632b185e1add2214d7'
    },
  },
  {
    id: 5,
    coordinate: {
      latitude: LATITUDE + SPACE + 10,
      longitude: LONGITUDE - SPACE + 10,
    },
    amount: 180,
    avatar: require('../Assets/images/avatar6.png'),
    rating: 5,
    name: "Sarah Nelson",
    description: "12 years experience independent",
    date: 'MAR 23, 2017',
    duration: '09:00 AM - 12:00 PM',
    type: USER_NEW,
    time: 'DEC 13 18:45PM',
    location: 'St Tropez',
    myGuest: true,
    profession: {
      name: 'Yoga',
      color: '#ac6bbd',
      _id: '591c1e632b185e1add2214d5'
    },
  },
  {
    id: 6,
    coordinate: {
      latitude: LATITUDE - SPACE + 10,
      longitude: LONGITUDE - SPACE + 10,
    },
    amount: 100,
    avatar: require('../Assets/images/avatar1.png'),
    rating: 4,
    name: "Emily Joe",
    description: "4 years experience independent",
    date: 'MAR 24, 2017',
    duration: '09:00 AM - 12:00 PM',
    type: USER_NEW,
    time: 'DEC 13 18:45PM',
    location: 'St Tropez',
    myGuest: false,
    profession: {
      name: 'Fitness Training',
      color: '#fec107',
      _id: '591c1e632b185e1add2214d8'
    },
  },
  {
    id: 7,
    coordinate: {
      latitude: LATITUDE + SPACE + 10,
      longitude: LONGITUDE + SPACE + 10,
    },
    amount: 200,
    avatar: require('../Assets/images/avatar2.png'),
    rating: 5,
    name: "Mark Carter",
    description: "5 years experience independent",
    date: 'MAR 25, 2017',
    duration: '09:00 AM - 12:00 PM',
    type: USER_NEW,
    time: 'DEC 13 18:45PM',
    location: 'St Tropez',
    myGuest: false,
    profession: {
      color: '#4c64b4',
      name: 'Physiotherapist',
      _id: '591c1e632b185e1add2214da'
    },
  },
  {
    id: 8,
    coordinate: {
      latitude: LATITUDE + 20,
      longitude: LONGITUDE + 20,
    },
    amount: 89,
    avatar: require('../Assets/images/avatar3.png'),
    rating: 5,
    name: "John Smith",
    description: "8 years experience independent",
    date: 'MAR 26, 2017',
    duration: '09:00 AM - 12:00 PM',
    type: USER_REGULAR,
    time: 'DEC 13 18:45PM',
    location: 'St Tropez',
    myGuest: false,
    profession: {
      color: '#4c64b4',
      name: 'Physiotherapist',
      _id: '591c1e632b185e1add2214da'
    },
  },
  {
    id: 7,
    coordinate: {
      latitude: LATITUDE + SPACE + 10,
      longitude: LONGITUDE + SPACE + 10,
    },
    amount: 200,
    avatar: require('../Assets/images/avatar2.png'),
    rating: 5,
    name: "Mark Carter",
    description: "5 years experience independent",
    date: 'MAR 25, 2017',
    duration: '09:00 AM - 12:00 PM',
    type: USER_NEW,
    time: 'DEC 13 18:45PM',
    location: 'St Tropez',
    myGuest: false,
    profession: {
      color: '#4c64b4',
      _id: '591c1e632b185e1add2214dc',
      name: 'Yoga8',
    },
  },
  {
    id: 8,
    coordinate: {
      latitude: LATITUDE + 20,
      longitude: LONGITUDE + 20,
    },
    amount: 89,
    avatar: require('../Assets/images/avatar3.png'),
    rating: 5,
    name: "John Smith",
    description: "8 years experience independent",
    date: 'MAR 26, 2017',
    duration: '09:00 AM - 12:00 PM',
    type: USER_REGULAR,
    time: 'DEC 13 18:45PM',
    location: 'St Tropez',
    myGuest: false,
    profession: {
      color: '#4c64b4',
      _id: '591c1e632b185e1add2214dc',
      name: 'Yoga8',
    },
  },
  {
    id: 7,
    coordinate: {
      latitude: LATITUDE + SPACE + 10,
      longitude: LONGITUDE + SPACE + 10,
    },
    amount: 200,
    avatar: require('../Assets/images/avatar2.png'),
    rating: 5,
    name: "Mark Carter",
    description: "5 years experience independent",
    date: 'MAR 25, 2017',
    duration: '09:00 AM - 12:00 PM',
    type: USER_NEW,
    time: 'DEC 13 18:45PM',
    location: 'St Tropez',
    myGuest: false,
    profession: {
      color: '#4c64b4',
      _id: '591c1e632b185e1add2214d6',
      name: 'Chiro',
    },
  },
  {
    id: 8,
    coordinate: {
      latitude: LATITUDE + 20,
      longitude: LONGITUDE + 20,
    },
    amount: 89,
    avatar: require('../Assets/images/avatar3.png'),
    rating: 5,
    name: "John Smith",
    description: "8 years experience independent",
    date: 'MAR 26, 2017',
    duration: '09:00 AM - 12:00 PM',
    type: USER_REGULAR,
    time: 'DEC 13 18:45PM',
    location: 'St Tropez',
    myGuest: false,
    profession: {
      color: '#4c64b4',
      _id: '591c1e632b185e1add2214d6',
      name: 'Chiro',
    },
  },
  {
    id: 9,
    coordinate: {
      latitude: LATITUDE + SPACE + 20,
      longitude: LONGITUDE - SPACE + 20,
    },
    amount: 90,
    avatar: require('../Assets/images/avatar4.png'),
    rating: 4,
    name: "Sara Lewis",
    description: "9 years experience independent",
    date: 'MAR 27, 2017',
    duration: '09:00 AM - 12:00 PM',
    type: USER_REGULAR,
    time: 'DEC 13 18:45PM',
    location: 'St Tropez',
    myGuest: false,
    profession: {
      name: 'Simply Yoga',
      color: '#ac6bbd',
      _id: '591c1e632b185e1add2214d9'
    },
  },
  {
    id: 10,
    coordinate: {
      latitude: LATITUDE - SPACE + 20,
      longitude: LONGITUDE - SPACE + 20,
    },
    amount: 130,
    avatar: require('../Assets/images/avatar5.png'),
    rating: 4,
    name: "Steven Hill",
    description: "10 years experience independent",
    date: 'MAR 28, 2017',
    duration: '09:00 AM - 12:00 PM',
    type: USER_REGULAR,
    time: 'DEC 13 18:45PM',
    location: 'St Tropez',
    myGuest: false,
    profession: {
      color: '#000000',
      name: 'Massage',
      _id: '591c1e632b185e1add2214db'
    },
  },
  {
    id: 11,
    coordinate: {
      latitude: LATITUDE + SPACE + 20,
      longitude: LONGITUDE + SPACE + 20,
    },
    amount: 180,
    avatar: require('../Assets/images/avatar6.png'),
    rating: 5,
    name: "Sarah Nelson",
    description: "12 years experience independent",
    date: 'MAR 29, 2017',
    duration: '09:00 AM - 12:00 PM',
    type: USER_NEARBY,
    time: 'DEC 13 18:45PM',
    location: 'St Tropez',
    myGuest: false,
    profession: {
      name: 'Yoga',
      color: '#ac6bbd',
      _id: '591c1e632b185e1add2214d5'
    },
  },
];

export const Messages = [
  {
    name: 'Emily Joe',
    time: '18:45PM',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    avatar: require('../Assets/images/avatar1.png'),
    read: true,
    group: [],    
  },
  {
    name: 'Mark Carter',
    time: '18:45PM',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    avatar: require('../Assets/images/avatar2.png'),
    read: true,
    group: [],
  },
  {
    name: 'John Smith',
    time: '18:45PM',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    avatar: require('../Assets/images/avatar3.png'),
    read: false,
    group: [],
  },
  {
    name: 'Sara Lewis',
    time: '18:45PM',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    avatar: require('../Assets/images/avatar4.png'),
    read: false,
    group: [],
  },
  {
    name: 'Steven Hill',
    time: '18:45PM',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    avatar: require('../Assets/images/avatar5.png'),
    read: true,
    group: [],
  },
  {
    name: 'Group',
    time: '18:45PM',
    message: 'Friends group',
    avatar: 0,    
    read: true,
    group: [
      {
        name: 'Emily Joe',
        avatar: require('../Assets/images/avatar1.png'),
      },
      {
        name: 'Mark Carter',
        avatar: require('../Assets/images/avatar2.png'),
      },
      {
        name: 'John Smith',
        avatar: require('../Assets/images/avatar3.png'),
      },
    ],
  },
];

export const Reviews = [{
  rating: 5,
  review: "O spent foor months with him and helped me reached my goal in no time. I love him.",
  date: 'SEP 18, 2016',
  author: 'Alex'
}, {
  rating: 3,
  review: "O spent foor months with him and helped me reached my goal in no time. I love him.",
  date: 'SEP 18, 2016',
  author: 'Mark'
}, {
  rating: 5,
  review: "O spent foor months with him and helped me reached my goal in no time. I love him.",
  date: 'SEP 18, 2016',
  author: 'Tony'
}, {
  rating: 4,
  review: "O spent foor months with him and helped me reached my goal in no time. I love him.",
  date: 'SEP 18, 2016',
  author: 'Daniel'
}, {
  rating: 5,
  review: "O spent foor months with him and helped me reached my goal in no time. I love him.",
  date: 'SEP 18, 2016',
  author: 'Dick'
}]

