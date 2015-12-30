import React from 'react';
import Vote from './Vote';

const Track = ({addTrack, track}) => (
	<div>
		<div onClick={() => addTrack(track.id)}>{track.name}</div><Vote />
	</div>
)

export default Track;