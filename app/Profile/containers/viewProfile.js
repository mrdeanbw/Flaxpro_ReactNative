'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProfessionalProfileForm from '../components/smart/viewProfile/professionalProfileForm';
import ClientProfileForm from '../components/smart/viewProfile/clientProfileForm';
import * as profileActions  from '../actions';
import * as CommonConstant from '../../Components/commonConstant';

class viewProfile extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.actions.getFullProfile(this.props.user);
  }

  render() {
    const { auth, user, actions, editable } = this.props;
    return (
      (user ? user.role : auth.user.role) === CommonConstant.user_client ?
        <ClientProfileForm { ...actions } editable={ editable }/>
        :
        <ProfessionalProfileForm { ...actions } editable={ editable }/>
    );
  }
}

export default connect(state => ({
    auth: state.auth,
    status: state.profile.status,
  }),
  (dispatch) => ({
    actions: bindActionCreators(profileActions , dispatch)
  })
)(viewProfile);
