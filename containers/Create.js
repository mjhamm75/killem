import React, { Component, PropTypes } from 'react';
import Login from './../components/Login';
import { login } from './../actions/killem.actions.js';
import { connect } from 'react-redux';

class Create extends Component {
  createPlaylist() {

  }

  render() {
    return (
      <div>
        <h1>Create</h1>
        <button onClick={this.createPlaylist}>Create Playlist</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    router: state.router
  }
}

export default connect(mapStateToProps, {
  login
})(Create);