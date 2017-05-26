'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainForm from '../components/smart/mainForm';
import * as mainActions from '../actions';
import * as CommonConstant from '../../Components/commonConstant';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    const { auth: { user }, getExploreClient, getExploreProfessional } = this.props;
    if(user && user.role === CommonConstant.user_client){
      getExploreClient();
    }
    if(user && user.role === CommonConstant.user_professional){
      getExploreProfessional();
    }
  }

  render() {
    const { actions, user_mode } = this.props;
    return (
      <MainForm { ...actions }  user_mode={ user_mode }/>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  getExploreClient: () => dispatch(mainActions.getExploreClient()),
  getExploreProfessional: () => dispatch(mainActions.getExploreProfessional()),
  actions: bindActionCreators(mainActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
