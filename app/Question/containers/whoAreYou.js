'use strict';

import React, { Component } from 'react';
import WhoAreYouForm from '../components/smart/whoAreYouForm';
import * as exploreActions from '../../Explore/actions';
import { connect } from 'react-redux';

class WhoAreYou extends Component {
  componentDidMount(){
    this.props.getProfessions()
  }

  render() {
    return (
      <WhoAreYouForm/>
    );
  }
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  getProfessions: () => dispatch(exploreActions.getProfessions()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhoAreYou);

