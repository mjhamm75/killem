import React, { PropTypes } from 'react';

class Login extends React.Component {
	static propType = {
		handleLogin: PropTypes.func.isRequired
	}
	static contextTypes = {
    	router: React.PropTypes.object
	}
	render() {
		return (	
			<div className="flex-container-center">
				<form>
					<div className="form-group">
						<button type="button" className="btn btn-success" onClick={this.props.handleLogin}>Log in to Spotify</button>
					</div>
				</form>
			</div>
		);
	}
}

module.exports = Login;