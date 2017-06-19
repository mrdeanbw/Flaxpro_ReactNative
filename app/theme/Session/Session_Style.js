import { StyleSheet} from 'react-native';
import * as Constants from "../../Components/commonConstant"
export default StyleSheet.create({
  container: {
    width:100,
    height:50,
  },
  progressContainer:{
    width:100,
    height:10,
    borderRadius:5,
    borderWidth:1,
    borderColor:"#cdcdcd",
    justifyContent:"center"
  },
  progress:{
    height:8,
    backgroundColor:Constants.APP_COLOR,
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5,
  },
  progressText:{
    marginBottom:4,
    fontSize:13,
    textAlign:"center",
  },
  sessionEnd:{
    marginTop:4,
    textAlign:"center",
    fontSize:13
  }
});
