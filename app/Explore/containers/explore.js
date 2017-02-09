'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ExploreForm from '../components/smart/exploreForm';
import * as exploreActions from '../actions';
import { connect } from 'react-redux';

class Explore extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, status } = this.props;
    return (
      <ExploreForm { ...actions } status/>
    );
  }
}

export default connect(state => ({
    status: state.auth.status
  }),
  (dispatch) => ({
    actions: bindActionCreators(exploreActions, dispatch)
  })
)(Explore);
