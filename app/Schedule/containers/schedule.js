'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ClientsProfessionals from '../components/smart/clientsProfessionals';
import * as scheduleActions from '../actions';
import * as CommonConstant from '../../Components/commonConstant';

class Schedule extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    const { auth: { user }, getExploreClient, getExploreProfessional } = this.props;
    // if(user && user.role === CommonConstant.user_client){
    //   getExploreClient();
    // }
    // if(user && user.role === CommonConstant.user_professional){
    //   getExploreProfessional();
    // }
  }

  render() {
    const { actions, user_mode } = this.props;
    return (
      <ClientsProfessionals { ...actions }  user_mode={ user_mode }/>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  // getExploreClient: () => dispatch(scheduleActions.getExploreClient()),
  // getExploreProfessional: () => dispatch(scheduleActions.getExploreProfessional()),
  actions: bindActionCreators(scheduleActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);
