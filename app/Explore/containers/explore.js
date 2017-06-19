'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import ExploreForm from '../components/smart/exploreForm';
import * as exploreActions from '../actions';

const { width, height } = Dimensions.get('window');

class Explore extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, auth, explore: {loading, error} } = this.props;
    return (
      <View >
        <ExploreForm { ...actions } auth={ auth }/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1abef2',
  }
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  explore: state.explore,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(exploreActions, dispatch),
});

export default connect(state =>
  mapStateToProps,
  mapDispatchToProps
)(Explore);
