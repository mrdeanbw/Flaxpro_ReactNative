import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import SummaryForm from '../components/smart/contract/summaryForm';
import Loader from '../../Components/fullScreenLoader';
import * as contractsActions from '../../Contracts/actions';
import { resetProps } from '../../Hire/actions';

class SummaryAcceptForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockedConfirm: true,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.hire.error) {
      alert(newProps.hire.error);
    }
  }

  componentWillUnmount() {
    this.props.resetHire();
  }

  successReplyCallback() {
    alert('Success');
    Actions.pop();
  }

  onReply(answer, paymentMethod) {
    const contractId = this.props.contractId;

    this.props.actions.replyToContract(contractId, answer, paymentMethod, this.successReplyCallback.bind(this));
  }

  onBack() {
    Actions.pop();
  }

  render() {
    if (this.props.hire.loadingForm) {
      return (<Loader />)
    }

    const { auth, hire } = this.props,
          { role, location } = auth.user,
          { numberOfSessions, 
            numberOfPeople, 
            selectedTimes,
            offerPrice,
            payment,
            status
          } = hire;
    
    const price = offerPrice || user.price;

    return (
            <SummaryForm
              price={ price }
              payment={ payment }
              userLocation={ location }
              numberOfSessions={ numberOfSessions }
              numberOfPeople={ numberOfPeople }
              selectedTimes={ selectedTimes }
              onBack={ this.onBack.bind(this) }
              role={ this.props.auth.user.role }
              blockedConfirm={ this.state.blockedConfirm }
              formType={ this.props.formType }
              onReply={ this.onReply.bind(this) }
              status={ status }
            />
      );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  hire: state.hire,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(contractsActions, dispatch),
  resetHire: () => dispatch(resetProps()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SummaryAcceptForm);