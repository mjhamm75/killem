import React from 'react';
import Vote from './Vote';

const Track = ({addTrack, track}) => (
	<div>
		<Vote sign="-"/><div onClick={() => addTrack(track.id)}>{track.name}</div><Vote sign="+"/>
	</div>
)

export default Track;