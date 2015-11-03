import React, { Component } from 'react';

class Track extends Component {
	render() {
		return <div>{this.props.track.name}</div>
	}
}

export default Track;