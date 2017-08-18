'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProfessionalProfileForm from '../components/smart/viewProfile/professionalProfileForm';
import ClientProfileForm from '../components/smart/viewProfile/clientProfileForm';
import * as profileActions  from '../actions';
import * as inboxActions from '../../Inbox/actions';
import * as exploreActions from '../../Explore/actions';
import * as CommonConstant from '../../Components/commonConstant';

class viewProfile extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.actions.getFullProfile(this.props.user);
  }

  render() {
    const { auth, user, actions, editable, profile, explore, inboxActions, contracts, exploreActions } = this.props;
    return (
      (user ? user.role : auth.user.role) === CommonConstant.user_client ?
        <ClientProfileForm { ...actions } editable={ editable } auth={ auth } profile={ profile } explore={ explore } user={ user } inboxActions={ inboxActions } exploreActions={ exploreActions }/>
        :
        <ProfessionalProfileForm { ...actions } editable={ editable } auth={ auth } profile={ profile } explore={ explore } user={ user } inboxActions={ inboxActions } exploreActions={ exploreActions }/>
    );
  }
}

export default connect(state => ({
    auth: state.auth,
    explore: state.explore,
    profile: state.profile,
  }),
  (dispatch) => ({
    actions: bindActionCreators(profileActions, dispatch),
    inboxActions: bindActionCreators(inboxActions, dispatch),
    exploreActions: bindActionCreators(exploreActions, dispatch),
  })
)(viewProfile);
