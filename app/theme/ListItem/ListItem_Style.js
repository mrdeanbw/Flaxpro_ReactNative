import { StyleSheet} from 'react-native';
import { WIDTH_SCREEN } from "../../Components/commonConstant"
export default StyleSheet.create({
  container: {
    borderBottomWidth:1,
    borderColor:"#f3f3f3"
  },
  content:{
    flexDirection:"row",
    alignItems:"center",
    marginHorizontal:10,
    marginBottom:10,
    marginTop:5,
  },
  name:{
    textAlign:"center",
    marginLeft:5,
    fontSize:13.5,
  },
  time:{
    textAlign:"center",
    fontSize:13.5
  },
  hiddenContainer:{
    height:50,
    backgroundColor:"#848383",
    marginTop:5,
    flexDirection:"row",
    justifyContent:"space-around"
  },
  icArrow:{
    position:"absolute",
    width:15,
    height:15,
    bottom:42,
    left:22,
    resizeMode:"contain"
  },
  iconShowMoreLess: {
    position: 'absolute',
    marginLeft: 0.5  * WIDTH_SCREEN - 10,
    bottom: -5,
  },
  borderRow:{
    borderBottomWidth:1,
    borderColor:"#d7d7d7",
  },
});
