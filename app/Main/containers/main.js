'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainForm from '../components/smart/mainForm';
import * as mainActions from '../actions';
import * as profileActions from '../../Profile/actions';

const Main = (props) => {
    const { actions, auth, profileActions, profile } = props;
    return (
      <MainForm { ...actions }  auth={ auth } { ...profileActions }  profile={ profile }/>
    );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(mainActions, dispatch),
  profileActions: bindActionCreators(profileActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
