'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ClientEditProfile from '../components/smart/editProfile/clientEditProfile';
import ProfessionalEditProfile from '../components/smart/editProfile/professionalEditProfile';
import * as CommonConstant from '../../Components/commonConstant';
import * as editProfileActions from '../actions';
import * as exploreActions from '../../Explore/actions';

class EditProfile extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.exploreActions.getProfessions();
  }
  render() {
    const { user } = this.props;
    return (
      user.role === CommonConstant.user_client ?
        <ClientEditProfile />
        :
        <ProfessionalEditProfile />
    );
  }
}

export default connect(state => ({
    user: state.auth.user
  }),
  (dispatch) => ({
    actions: bindActionCreators(editProfileActions, dispatch),
    exploreActions: bindActionCreators(exploreActions, dispatch)
  })
)(EditProfile);
