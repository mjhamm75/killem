import React, { Component, PropTypes } from 'react';
import { createPlaylist, getMe, getTokens } from './../actions/killem.actions.js';
import { connect } from 'react-redux';

class Create extends Component {
  constructor(props) {
    super(props);
    this.createPlaylist = this.createPlaylist.bind(this);
    this.props.dispatch(getMe());
    this.props.dispatch(getTokens());
  }

  createPlaylist() {
    this.props.dispatch(this.props.createPlaylist());
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
    createPlaylist,
    router: state.router
  }
}

export default connect(mapStateToProps)(Create);