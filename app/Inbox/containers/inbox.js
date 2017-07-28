'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import InboxForm from '../components/smart/inboxForm';
import * as inboxActions from '../actions';
import { connect } from 'react-redux';

class Inbox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, inbox, auth, selectedTab } = this.props;
    return (
      <InboxForm 
        { ...actions }
        inbox={ inbox }
        auth={ auth }
        selectedTab={ selectedTab }
      />
    );
  }
}

export default connect(state => ({
    inbox: state.inbox,
    auth: state.auth,
    selectedTab: state.main.selectedTab,
  }),
  (dispatch) => ({
    actions: bindActionCreators(inboxActions, dispatch)
  })
)(Inbox);
