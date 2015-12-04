import React from 'react';

const Login = ({login}) => (
	<div className="flex-container">
		<form>
			<div className="form-group">
				<button type="button" className="btn btn-success" onClick={login}>Log in to Spotify</button>
			</div>
		</form>
	</div>
)

export default Login;