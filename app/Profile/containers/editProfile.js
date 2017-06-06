'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ClientEditProfile from '../components/smart/clientEditProfile';
import ProfessionalEditProfile from '../components/smart/professionalEditProfile';
import * as CommonConstant from '../../Components/commonConstant';

import * as editProfileActions from '../actions';
import * as exploreActions from '../../Explore/actions';
import { connect } from 'react-redux';

class EditProfile extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.exploreActions.getProfessions();
  }
  render() {
    const { auth: { user } } = this.props;
    return (
      user.role === CommonConstant.user_client ?
        <ClientEditProfile />
        :
        <ProfessionalEditProfile />
    );
  }
}

export default connect(state => ({
    auth: state.auth
  }),
  (dispatch) => ({
    actions: bindActionCreators(editProfileActions, dispatch),
    exploreActions: bindActionCreators(exploreActions, dispatch)
  })
)(EditProfile);
