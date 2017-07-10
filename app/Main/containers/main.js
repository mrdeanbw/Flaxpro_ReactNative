'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainForm from '../components/smart/mainForm';
import * as mainActions from '../actions';

const Main = (props) => {
    const { actions, auth, unreadChats, main } = props;
    return (
      <MainForm
        { ...actions }  
        auth={ auth }
        unreadChats={ unreadChats }
        main={ main }
      />
    );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  unreadChats: state.inbox.unreadChats,
  main: state.main,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(mainActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
