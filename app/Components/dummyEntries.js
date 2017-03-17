
// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const SPACE = 0.014;


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

export const CoachesClients = [
  {
    id: 0,
    coordinate: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
    },
    amount: 100,
    avatar: require('../Assets/avatar1.png'),
    rating: 4,
    name: "Emily Joe",
    description: "4 years experience independent",
  },
  {
    id: 1,
    coordinate: {
      latitude: LATITUDE + SPACE,
      longitude: LONGITUDE - SPACE,
    },
    amount: 200,
    avatar: require('../Assets/avatar2.png'),
    rating: 5,
    name: "Mark Carter",
    description: "5 years experience independent",
  },
  {
    id: 2,
    coordinate: {
      latitude: LATITUDE - SPACE,
      longitude: LONGITUDE - SPACE,
    },
    amount: 89,
    avatar: require('../Assets/avatar3.png'),
    rating: 5,
    name: "John Smith",
    description: "8 years experience independent",
  },
  {
    id: 3,
    coordinate: {
      latitude: LATITUDE + SPACE,
      longitude: LONGITUDE + SPACE,
    },
    amount: 90,
    avatar: require('../Assets/avatar4.png'),
    rating: 4,
    name: "Sara Lewis",
    description: "9 years experience independent",
  },
  {
    id: 5,
    coordinate: {
      latitude: LATITUDE + 10,
      longitude: LONGITUDE + 10,
    },
    amount: 130,
    avatar: require('../Assets/avatar5.png'),
    rating: 4,
    name: "Steven Hill",
    description: "10 years experience independent",
  },
  {
    id: 6,
    coordinate: {
      latitude: LATITUDE + SPACE + 10,
      longitude: LONGITUDE - SPACE + 10,
    },
    amount: 180,
    avatar: require('../Assets/avatar6.png'),
    rating: 5,
    name: "Sarah Nelson",
    description: "12 years experience independent",
  },
  {
    id: 7,
    coordinate: {
      latitude: LATITUDE - SPACE + 10,
      longitude: LONGITUDE - SPACE + 10,
    },
    amount: 100,
    avatar: require('../Assets/avatar1.png'),
    rating: 4,
    name: "Emily Joe",
    description: "4 years experience independent",
  },
  {
    id: 8,
    coordinate: {
      latitude: LATITUDE + SPACE + 10,
      longitude: LONGITUDE + SPACE + 10,
    },
    amount: 200,
    avatar: require('../Assets/avatar2.png'),
    rating: 5,
    name: "Mark Carter",
    description: "5 years experience independent",
  },
  {
    id: 9,
    coordinate: {
      latitude: LATITUDE + 20,
      longitude: LONGITUDE + 20,
    },
    amount: 89,
    avatar: require('../Assets/avatar3.png'),
    rating: 5,
    name: "John Smith",
    description: "8 years experience independent",
  },
  {
    id: 10,
    coordinate: {
      latitude: LATITUDE + SPACE + 20,
      longitude: LONGITUDE - SPACE + 20,
    },
    amount: 90,
    avatar: require('../Assets/avatar4.png'),
    rating: 4,
    name: "Sara Lewis",
    description: "9 years experience independent",
  },
  {
    id: 11,
    coordinate: {
      latitude: LATITUDE - SPACE + 20,
      longitude: LONGITUDE - SPACE + 20,
    },
    amount: 130,
    avatar: require('../Assets/avatar5.png'),
    rating: 4,
    name: "Steven Hill",
    description: "10 years experience independent",
  },
  {
    id: 12,
    coordinate: {
      latitude: LATITUDE + SPACE + 20,
      longitude: LONGITUDE + SPACE + 20,
    },
    amount: 180,
    avatar: require('../Assets/avatar6.png'),
    rating: 5,
    name: "Sarah Nelson",
    description: "12 years experience independent",
  },
];