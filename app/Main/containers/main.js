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
    const { actions, user_mode } = this.props;
    return (
      <MainForm { ...actions }  user_mode={ user_mode }/>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(state =>
  mapStateToProps,
  (dispatch) => ({
    actions: bindActionCreators(mainActions, dispatch)
  })
)(Main);
