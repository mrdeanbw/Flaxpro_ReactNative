'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import WhoAreYouForm from '../components/smart/whoAreYouForm';
import { connect } from 'react-redux';

class WhoAreYou extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <WhoAreYouForm/>
    );
  }
}

export default connect(state => ({
  }),
  (dispatch) => ({
  })
)(WhoAreYou);
