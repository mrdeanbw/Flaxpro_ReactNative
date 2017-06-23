'use strict';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import ContractFirstForm from '../components/smart/contract/contractFirstForm';
import ContractSecondForm from '../components/smart/contract/contractSecondForm';
import ContractSummaryForm from '../components/smart/contract/contractSummaryForm';
import * as contractActions from '../actions';
import { connect } from 'react-redux';

class ProposeTerms extends Component {
  static propTypes = {
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: false,
  };

  constructor(props) {
    super(props);
    props.getScheduleById(props.user, { byField: 'day' })
  }

  render() {
    const { actions, user, hire, editable } = this.props;

    switch(true) {
      case hire.firstForm: return <ContractFirstForm { ...actions } user={ user } hire={ hire } editable={ editable }/>;
      case hire.secondForm: return <ContractSecondForm { ...actions } user={ user } hire={ hire }/>;
      case hire.summaryForm: return <ContractSummaryForm { ...actions } user={ user } hire={ hire }/>;
    }
  }
}

export default connect(state => ({
    hire: state.hire,
  }),
  (dispatch) => ({
    getScheduleById: (user, options) => dispatch(contractActions.getScheduleById({ user, options })),
    actions: bindActionCreators(contractActions, dispatch)
  })
)(ProposeTerms);
