'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import MainForm from '../components/smart/mainForm';
import * as mainActions from '../actions';
import { connect } from 'react-redux';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, status, user_mode } = this.props;
console.log('>>>>>>>>>>',this.props)
    return (
      <MainForm { ...actions } status={ status } user_mode={ user_mode }/>
    );
  }
}

export default connect(state => ({
    status: state.auth.status
  }),
  (dispatch) => ({
    actions: bindActionCreators(mainActions, dispatch)
  })
)(Main);
