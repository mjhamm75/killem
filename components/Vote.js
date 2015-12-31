import React from 'react';

const Vote = ({update, sign}) => (
	<div onClick={update}>{sign}</div>
)

export default Vote;