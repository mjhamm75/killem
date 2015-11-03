import React, { Component } from 'react';

class Track extends Component {
	constructor(props) {
		super(props);
		this.addTrack = this.addTrack.bind(this);
	}

	addTrack(track) {
		console.log(track)
	}

	render() {
		return <div onClick={this.addTrack}>{this.props.track.name}</div>
	}
}

export default Track;