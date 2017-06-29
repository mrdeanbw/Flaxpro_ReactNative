import React,{Component, PropTypes} from 'react';
import {
  Text ,
  View,
} from 'react-native';
import { ListItem } from "../index"
import styles from "./ListProfession_Style.js"

class ListProfession extends Component {

  static propTypes = {
    cancelContract: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    role: PropTypes.string.isRequired,
  };

  render(){
    const {data} = this.props;
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
              <ListItem data={rowData} cancelContract={this.props.cancelContract} role={this.props.role}/>
            </View>
          ))
        }
      </View>
    )
  }
}

export default ListProfession;
