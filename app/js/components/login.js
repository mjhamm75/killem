import React from 'react';

class Login extends React.Component {
	render() {
		return (	
			<div className="flex-container">
				<form>
					<div className="form-group">
						<button type="button" className="btn btn-success" onClick={this.props.handleLogin}>Log in to Spotify</button>
					</div>
				</form>
			</div>
		);
	}
};

export default Login;