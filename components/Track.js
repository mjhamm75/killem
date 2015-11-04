import React, { Component } from 'react';

class Track extends Component {
	constructor(props) {
		super(props);
		this.addTrack = this.addTrack.bind(this);
	}

	addTrack(track) {
		this.props.addTrack(track.id);
	}

	render() {
		return <div onClick={this.addTrack.bind(this, this.props.track)}>{this.props.track.name}</div>
	}
}

export default Track;