import React from 'react';

const Track = ({addTrack, track}) => (
	<div onClick={() => addTrack(track.id)}>{track.name}</div>
)

export default Track;