import React,{Component, PropTypes} from 'react';
import {
  Alert,
  Text ,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {Avatar,Session,Button} from "../index"
import styles from "./ListItem_Style.js"
import { Actions } from 'react-native-router-flux';
import * as Constants from "../../Components/commonConstant"
import FontIcons from 'react-native-vector-icons/FontAwesome';

class ListItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      isShow:false,
    }
  }

  static propTypes = {
    cancelContract: PropTypes.func.isRequired,

  };

  static defaultProps = {
    // customStyle: {},
  };

  onFeedback(){
    Alert.alert('Coming soon');
  }
  onMessage(){
    if (this.props.data.fake) return Alert.alert('It\'s fake data');

    const userId = this.props.data.userId,
          username = this.props.data.name;
    this.props.startChat(userId, username);
    Actions.ChatForm({});
  }
  onRefund(){
    Alert.alert('Coming soon');
  }
  onReschedule(){
    if(this.props.data.fake) return Alert.alert('It\'s fake data');
    Alert.alert('Coming soon');
  }
  onCancel(){
    if(this.props.data.fake) return Alert.alert('It\'s fake data');
    if(this.props.role === Constants.user_client) return Alert.alert('You aren\'t pros');
    this.props.cancelContract(this.props.data.contractId);
  }
  get showMoreOrLessButton() {
    return (
      <View style={styles.iconShowMoreLess}>
        <FontIcons
          name={ this.state.isShow ? "angle-double-up"  : "angle-double-down" }
          size={ 15 }
          color="#7e7e7e"
        />
      </View>
    );
  }

  render(){
    const {data} = this.props;
    return (
      <View style={[styles.list, styles.borderRow]}>
        <TouchableOpacity style={styles.content} onPress={()=>this.setState({isShow:!this.state.isShow})}>
          <View style={{flexDirection:"row",flex:1,alignItems:"center"}}>
            <Avatar type={data.type} backgroundColor={data.backgroundColor} text={data.text} source={data.image}/>
            <View style={{flexDirection:"row",alignItems:"center",flex:0.4}}>
              <Text style={styles.name} ellipsizeMode="tail" numberOfLines={2}>{data.name}</Text>
            </View>
            <View style={{marginLeft:5,flex:0.5}}>
              <Text style={styles.time} ellipsizeMode="tail" numberOfLines={2}>{data.time}</Text>
            </View>
          </View>
          { this.showMoreOrLessButton }
          <Session style={{marginLeft:5}} progress={data.progress} total={data.total}/>
        </TouchableOpacity>
        {
          this.state.isShow && data.progress!==data.total &&
          <View style={styles.hiddenContainer}>
            <Button type="image_text" source={require("../../Assets/images/icon/ic_message.png")} text="Message" onPress={()=>{this.onMessage()}}/>
            <Button type="image_text" source={require("../../Assets/images/icon/ic_cancel.png")} text="Cancel" onPress={()=>{this.onCancel()}}/>
            <Button type="image_text" source={require("../../Assets/images/icon/ic_reschedule.png")} text="Reschedule" onPress={()=>{this.onReschedule()}}/>
            <Button type="image_text" source={require("../../Assets/images/icon/ic_refund.png")} text="Refund" onPress={()=>{this.onRefund()}}/>
          </View>}
          {this.state.isShow && data.progress===data.total && <View style={styles.hiddenContainer}>
              <Button type="image_text" source={require("../../Assets/images/icon/ic_feedback@2x.png")} text="Send your Feedback" onPress={()=>{this.onFeedback()}}/>
            </View>}
          {this.state.isShow && <Image source={require("../../Assets/images/icon/ic_up_arrow@2x.png")} style={styles.icArrow}/>}
      </View>
    )
  }
}

export default ListItem;
