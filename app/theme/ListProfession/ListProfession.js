import React,{Component, PropTypes} from 'react';
import {
  Text ,
  View,
} from 'react-native';
import { ListItem } from "../index"
import styles from "./ListProfession_Style.js"
import EntypoIcons from 'react-native-vector-icons/Entypo';

class ListProfession extends Component {

  static propTypes = {
    cancelContract: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    role: PropTypes.string.isRequired,
    lastElement: PropTypes.bool,
    color: PropTypes.string,
  };

  static defaultProps = {
    lastElement: true,
    color: '#16c1f6',
  };

  render(){
    const {data, color, lastElement} = this.props;
    return (
      <View >
        <View style={[styles.borderRow,{backgroundColor: '#efefef'}]}>
          <View style={[styles.profession, data.professionColor && {backgroundColor: data.professionColor}]}>
            <Text style={[styles.titleSection, {color: '#fff'}]}>{ data.profession }</Text>
          </View>
        </View>
        {
          data.contracts.map( (rowData, index) => (
            <View style={styles.list} key={index}>
              <ListItem data={rowData} cancelContract={this.props.cancelContract} role={this.props.role} startChat={ this.props.startChat }/>
            </View>
          ))
        }
        {
          !lastElement &&
            <View style={ styles.borderRow }>
          <EntypoIcons
            name="dots-three-horizontal"
            size={ 24 }
            color={color}
            style={ styles.dotsIcon }
          />
            </View>
        }
      </View>
    )
  }
}

export default ListProfession;
