import axios from 'axios';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { redirectBooks, redirectSignUp } from '../../services/RedirectService';
import './LoginForm.css';

const API_BASE_URL = "http://127.0.0.1:5000";

function LoginForm(props) {
	const [state, setState] = useState({
		username: "",
		password: "",
	})
	const [errorMsg, setError] = useState("");

	const handleChange = (e) => {
		const { id, value } = e.target
		setState(prevState => ({
			...prevState,
			[id]: value
		}))
	}

	const handleSubmitClick = (e) => {
		e.preventDefault();
		//check if nothing is entered
		if (!state.username || !state.password) {
			setError("Please enter your username and password.");
		}
		else {
			const payload = {
				"username": state.username,
				"password": state.password,
			}

			axios.post(API_BASE_URL + '/signin', payload, { withCredentials: true })
				.then(function (response) {
					// console.log(response);
					if (response.status === 200) {
						alert("Access granted!\n your session will expire in 5 minutes.");
						redirectBooks(props);
					}
				})
				.catch(function (error) {
					console.log(error);
					if (error.response) {
						setError(error.response.data);
					}
				});
		}
	}

	return (

		<div className="card">
			<article className="card-body">
				<h4 className="card-title text-center mb-4 mt-1">Sign in</h4>
				<hr />
				{/* <p className="text-success text-center">{successMessage}</p> */}
				<p className="text-danger text-center">{errorMsg}</p>
				<form>
					<div className="form-group">
						<div className="input-group">
							<div className="input-group-prepend">
								<span className="input-group-text"> <i className="fa fa-user"></i> </span>
							</div>
							<input id="username" name="" className="form-control" placeholder="Username" value={state.username} onChange={handleChange} type="text" />
						</div>
					</div>
					<div className="form-group">
						<div className="input-group">
							<div className="input-group-prepend">
								<span className="input-group-text"> <i className="fa fa-lock"></i> </span>
							</div>
							<input id="password" className="form-control" placeholder="******" value={state.password} onChange={handleChange} type="password" />
						</div>
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary btn-block" onClick={handleSubmitClick}> Login  </button>
					</div>
					{/* <p className="text-center"><a href="#" className="btn">Forgot password?</a></p> */}
					<div><p>Don't have an account?</p><a href="" onClick={() => redirectSignUp(props)} className="float-center btn btn-outline-primary">Sign up</a></div>
				</form>
			</article>
		</div>
	)
}

export default withRouter(LoginForm);