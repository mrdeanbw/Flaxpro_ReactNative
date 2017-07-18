import { StyleSheet } from 'react-native';
import { APP_COLOR } from "../../Components/commonConstant"
export default StyleSheet.create({
  profession: {
    height:26,
    marginHorizontal:20,
    paddingHorizontal:20,
    marginVertical:10,
    paddingVertical:10,
    borderRadius:13,
    backgroundColor:APP_COLOR,
    justifyContent:"center",
    alignSelf:"flex-start",
  },
  borderRow: {
    borderBottomWidth:1,
    borderColor:"#d7d7d7",
  },
  titleSection: {
    textAlign:"center",
    fontSize:14
  },
  list: {
    flex:1
  },
  dotsIcon: {
    alignSelf: 'center',
  },
});
