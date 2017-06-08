import React,{Component} from 'react';
import {
  StyleSheet,
  Text ,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {Avatar,Session,Button} from "../index"
import styles from "./ListItem_Style.js"
class ListItem extends Component {

  constructor(props){
    super(props)
    this.state = {
      isShow:false,
      avatarType:"image"
    }
  }

  render(){
    var {data} = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.content} onPress={()=>this.setState({isShow:!this.state.isShow})}>
          <View style={{flexDirection:"row",flex:1,alignItems:"center"}}>
            <View style={{flexDirection:"row",alignItems:"center",flex:0.5}}>
              <Avatar type={data.type} backgroundColor={data.backgroundColor} text={data.text} source={data.image}/>
              <Text style={styles.name}>{data.name}</Text>
            </View>
            <View style={{marginLeft:5,flex:0.5}}>
              <Text style={styles.time}>{data.time}</Text>
            </View>
          </View>
          <Session style={{marginLeft:5}} progress={data.progress}/>
        </TouchableOpacity>
        {this.state.isShow && data.type=="image" && <View style={styles.hiddenContainer}>
            <Button type="image_text" source={require("../../Assets/images/icon/ic_message.png")} text="Message" onPress={()=>{}}/>
            <Button type="image_text" source={require("../../Assets/images/icon/ic_cancel.png")} text="Cancel" onPress={()=>{}}/>
            <Button type="image_text" source={require("../../Assets/images/icon/ic_reschedule.png")} text="Reschedule" onPress={()=>{}}/>
            <Button type="image_text" source={require("../../Assets/images/icon/ic_refund.png")} text="Refund" onPress={()=>{}}/>
          </View>}
          {this.state.isShow && data.type=="text" && <View style={styles.hiddenContainer}>
              <Button type="image_text" source={require("../../Assets/images/icon/ic_feedback@2x.png")} text="Send your Feedback" onPress={()=>{}}/>
            </View>}
          {this.state.isShow && <Image source={require("../../Assets/images/icon/ic_up_arrow@2x.png")} style={styles.icArrow}/>}
      </View>
    )
  }
}

export default ListItem;
