'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainForm from '../components/smart/mainForm';
import * as mainActions from '../actions';
import * as profileActions from '../../Profile/actions';

const Main = (props) => {
    const { actions, auth, unreadChats, main, profileActions, profile } = props;
    return (
      <MainForm
        { ...actions }  
        auth={ auth }
        unreadChats={ unreadChats }
        main={ main }
        { ...profileActions }
        profile={ profile }
      />
    );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  unreadChats: state.inbox.unreadChats,
  main: state.main,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(mainActions, dispatch),
  profileActions: bindActionCreators(profileActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
