import React, { Component, PropTypes } from 'react';
import { activatePlaylist, createPlaylist, getPlaylists, getTokens } from './../actions/killem.actions.js';
import { connect } from 'react-redux';

class Create extends Component {
  constructor(props) {
    super(props);
    this.createPlaylist = this.createPlaylist.bind(this);
    this.props.dispatch(getTokens());
    this.props.dispatch(getPlaylists());
  }

  createPlaylist() {
    var name = this.refs.playlist.value;
    this.props.dispatch(this.props.createPlaylist(name));
    this.refs.playlist.value = '';
  }

  render() {
    var playlists = this.props.playlists.data ? this.props.playlists.data : [];
    var playlistDOM = this.renderPlaylists(playlists);
    return (
      <div>
        <h1>Create</h1>
        <input ref="playlist"/>
        <button onClick={this.createPlaylist}>Create Playlist</button>
        <br />
        <h2>Playlists</h2>
        {playlistDOM}
      </div>
    )
  }

  activatePlaylist(playlistId) {
    this.props.dispatch(activatePlaylist(playlistId));
  }

  renderPlaylists(playlists) {
    return playlists.map(playlist => {
      return <div key={playlist.playlist_id} onClick={this.activatePlaylist.bind(this, playlist.playlist_id)}>{playlist.playlist_name} - {playlist.active_playlist.toString()}</div>
    });
  }
}

function mapStateToProps(state) {
  return {
    createPlaylist,
    router: state.router,
    playlists: state.playlists
  }
}

export default connect(mapStateToProps)(Create);