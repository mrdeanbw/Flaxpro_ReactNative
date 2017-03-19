'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ClientProfileForm from '../components/smart/clientProfileForm';
import * as clientProfileActions from '../actions';
import { connect } from 'react-redux';

class ClientProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, status, editable, user } = this.props;
    return (
      <ClientProfileForm { ...actions } status={ status } editable={ editable } user={ user }/>
    );
  }
}

export default connect(state => ({
    status: state.profile.status
  }),
  (dispatch) => ({
    actions: bindActionCreators(clientProfileActions, dispatch)
  })
)(ClientProfile);
