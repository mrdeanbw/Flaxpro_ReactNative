'use strict';

import React, { Component } from 'react';
import {
  AsyncStorage,
  AppRegistry,
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  NativeModules,
  DeviceEventEmitter,
  ActivityIndicator,
  CameraRoll,
  TouchableOpacity,
  Modal,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const RNUploader = NativeModules.RNUploader;
const edit_avatar = require('../Assets/images/edit_avatar.png');

export default class UploadFromCameraRoll extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      uploading: false,
      showUploadModal: false,
      uploadProgress: 0,
      uploadTotal: 0,
      uploadWritten: 0,
      uploadStatus: undefined,
      cancelled: false,
      images: [],
    }
  }

  componentDidMount() {
    this.emitter = DeviceEventEmitter.addListener('RNUploaderProgress', (data) => {
      let bytesWritten = data.totalBytesWritten;
      let bytesTotal   = data.totalBytesExpectedToWrite;
      let progress     = data.progress;
      this.setState({uploadProgress: progress, uploadTotal: bytesTotal, uploadWritten: bytesWritten});
    });
    this.loadInitialState().done();
  }
  componentWillUnmount(){
    this.emitter.remove();
  }

  loadInitialState = async () => {
    try {
      const state = {};
      const [[, apiUrl], [, token]] = await AsyncStorage.multiGet(['apiUrl', 'token']);

      if (apiUrl !== null){
        state.apiUrl = apiUrl;
      }
      if (token !== null){
        state.token = token;
      }
      this.setState(state);
    } catch (error) {
      Alert.alert('AsyncStorage error: ' + error.message);
    }
  };
  _addImage() {
    const optionsImagePicker = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    const { directlyUpload } = this.props;

    ImagePicker.showImagePicker(optionsImagePicker, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const source = { uri: response.uri };

        const images = this.state.images;
        images.push(source);

        this.setState({images: images});
        directlyUpload && this._uploadImages()

      }
    });
  }

  _closeUploadModal() {
    this.setState({showUploadModal: false, uploadProgress: 0, uploadTotal: 0, uploadWritten: 0, images: [], cancelled: false, });
  }

  _cancelUpload() {
    RNUploader.cancel();
    this.setState({uploading: false, cancelled: true});
  }

  _uploadImages() {
    const { addAvatarUri } = this.props;
    const files = this.state.images.map( (file) => {
      return {
        name: 'file',
        filename: _generateUUID() + '.png',
        filepath: file.uri,
        filetype: 'image/png',
      }
    });

    const opts = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': this.state.token
      },
      url: this.state.apiUrl+'/users/avatar',
      files: files,
      params: {name: 'test-app'}
    };

    this.setState({ uploading: true, showUploadModal: true, });
    RNUploader.upload(opts, (err, res) => {
      if (err) {
        Alert.alert('RNUploader Error: '+err);
        return;
      }

      const status = res.status;
      const responseString = res.data ? JSON.parse(res.data) : {};

      addAvatarUri(responseString.Location);
      this.setState({uploading: false, uploadStatus: status});
      if (status === 200){
        this._closeUploadModal();
      }
    });

  }

  uploadProgressModal() {
    let uploadProgress;

    if (this.state.cancelled) {
      uploadProgress = (
        <View style={{ margin: 5, alignItems: 'center', }}>
          <Text style={{ marginBottom: 10, }}>
            Upload Cancelled
          </Text>
          <TouchableOpacity style={ styles.button } onPress={ this._closeUploadModal.bind(this) }>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (!this.state.uploading && this.state.uploadStatus && this.state.uploadStatus !== 200) {
      uploadProgress = (
        <View style={{ margin: 5, alignItems: 'center', }}>
          <Text style={{ marginBottom: 10, }}>
            Upload complete with status: { this.state.uploadStatus }
          </Text>
          <TouchableOpacity style={ styles.button } onPress={ this._closeUploadModal.bind(this) }>
            <Text>{ this.state.uploading ? '' : 'Close' }</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.state.uploading) {
      uploadProgress = (
        <View style={{ alignItems: 'center', }}>
          <Text style={ styles.title }>Uploading { this.state.images.length } Image{ this.state.images.length == 1 ? '' : 's' }</Text>
          <ActivityIndicator
            animating={this.state.animating}
            style={[styles.centering, {height: 80}]}
            size="large" />
          <Text>{ this.state.uploadProgress.toFixed(0) }%</Text>
          <Text style={{ fontSize: 11, color: 'gray', marginTop: 5, }}>
            { ( this.state.uploadWritten / 1024 ).toFixed(0) }/{ ( this.state.uploadTotal / 1024 ).toFixed(0) } KB
          </Text>
          <TouchableOpacity style={ [styles.button, {marginTop: 5}] } onPress={ this._cancelUpload.bind(this) }>
            <Text>{ 'Cancel' }</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return uploadProgress;
  }

  render() {
    const { directlyUpload } = this.props;
    return (
      <View style={directlyUpload ? styles.containerEditAvatar : styles.container}>

        <Modal
          animationType={'fade'}
          transparent={false}
          visible={this.state.showUploadModal}>

          <View style={styles.modal}>
            {this.uploadProgressModal()}
          </View>

        </Modal>
        { directlyUpload &&
        <TouchableOpacity style={styles.noButton} onPress={this._addImage.bind(this)}>
          <Image source={ edit_avatar } style={ styles.imageEditAvatar } resizeMode="cover"/>
        </TouchableOpacity>
        }
        { !directlyUpload &&
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity style={styles.button} onPress={this._addImage.bind(this)}>
            <Text>Add Image</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.button} onPress={this._uploadImages.bind(this)}>
            <Text>Upload</Text>
          </TouchableOpacity>
        </View>
        }
        { !directlyUpload &&
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
          {this.state.images.map((image) => {
            return <Image key={_generateUUID()} source={{uri: image.uri}} style={styles.thumbnail} />
          })}
        </View>
        }
      </View>
    );
  }

}

function _generateUUID() {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 20,
    paddingTop: 40,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail: {
    width: 73,
    height: 73,
    borderWidth: 1,
    borderColor: '#DDD',
    margin: 5,
  },
  modal: {
    margin: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'lightyellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
  },
  button: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#EEE',
    marginHorizontal: 5,
  },
  imageEditAvatar: {
    height: 41,
    width: 41,
  },
  containerEditAvatar: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  noButton:{},
});

