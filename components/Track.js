import React from 'react';
import Vote from './Vote';

const Track = ({addTrack, track}) => (
	<div onClick={() => addTrack(track.id)}>{track.name}</div>
)

export default Track;