import {StyleSheet,Platform} from 'react-native';
import { APP_COLOR, FONT_STYLES } from "../../../Components/commonConstant"

export default StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "white",
  },
  navi:{
    height:90,
    backgroundColor:APP_COLOR,
    justifyContent:"flex-end"
  },
  searchContainer:{
    height:38,
    marginLeft:15,
    marginRight:15,
    marginBottom:10,
    backgroundColor:"#4dd4fb",
    flexDirection:"row",
    alignItems:"center"
  },
  iconSearch:{
    width:25,
    height:25,
    resizeMode:"contain",
    marginLeft:10
  },
  inputSearch:{
    flex:1,
    marginLeft:10,
    marginRight:10,
    color:"white",
    fontSize:15
  },
  tabContainer:{
    height:50,
    ...Platform.select({
      ios: {
        shadowColor:"#e6e6e6",
        shadowOffset:{
          width:0,
          height:1
        },
        shadowRadius: 0,
        shadowOpacity: 1.0
      },
      android: {
        borderBottomWidth:1.5,
        borderColor:"#e6e6e6",
        borderRightWidth:1.5,
      },
    }),
    flexDirection:"row",
    alignItems:"center"
  },
  titleSection:{
    textAlign:"center",
    fontSize:14
  },
  list:{
    flex:1
  },
  bottomView:{
    // marginTop:10,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:"#d7d7d7",
    paddingBottom:10
  },
  line:{
    flexDirection:"row",
    justifyContent:"space-around",
    marginTop:10,
    alignItems:"center"
  },
  all:{
    height:26,
    width:100,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:13,
    backgroundColor:APP_COLOR,
    justifyContent:"center"
  },
  allText:{
    textAlign:"center",
    color:"white"
  },
  noRows:{
    ...FONT_STYLES,
    textAlign:"center",
    paddingVertical: 20,
  },
});
