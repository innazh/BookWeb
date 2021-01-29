import axios from 'axios';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { redirectSignIn } from '../../services/RedirectService';
import './RegistrationForm.css';

const API_BASE_URL = "http://127.0.0.1:5000";

function RegistrationForm(props) {
	const [state, setState] = useState({
		username: "",
		password: "",
		confirmPassword: "",
	})
	const [validation, setError] = useState("");

	const sendDetailsToServer = () => {
		const payload = {
			"username": state.username,
			"password": state.password,
		}

		axios.post(API_BASE_URL + '/signup', payload)
			.then(function (response) {
				if (response.status === 201) { //back-end sends back "status created"
					console.log("Success");
					redirectSignIn(props);
				} else {
					console.log("Some error ocurred");
				}
			})
			.catch(function (error) {
				console.log(error);
				if (error.response) {
					setError(error.response.data);
				}
			});
	}

	const handleChange = (e) => {
		const { id, value } = e.target

		setState(prevState => ({
			...prevState,
			[id]: value
		}))
	}

	const handleSubmitClick = (e) => {
		e.preventDefault();
		if (!state.username || !state.password || !state.confirmPassword) {
			console.log("All fields must be filled out.");
			setError("All fields must be filled out.");
		} else if (state.password.length < 6) {
			console.log("Password must have at least 6 symbols in it.");
			setError("Password must have at least 6 symbols in it.");
		} else if (state.password !== state.confirmPassword) {
			console.log('Passwords do not match.');
			setError("Passwords do not match.");
		} else if (state.password === state.confirmPassword) { //password is longer than 6 symbols and passwords match
			console.log("pass:" + state.password);
			console.log("confirmPas:" + state.confirmPassword);
			sendDetailsToServer(); //send a POST request to backend
		}
	}

	return (
		<div className="card">
			<article className="card-body">
				<h4 className="card-title text-center mb-4 mt-1">Sign up</h4>
				<hr />
				<p className="text-danger text-center">{validation}</p>
				<form>
					<div className="form-group">
						<div className="input-group">
							<div className="input-group-prepend">
								<span className="input-group-text"> <i className="fa fa-user"></i> </span>
							</div>
							{/* Ids gotta match the state */}
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
						<label className="float-left">Confirm Password:</label>
						<div className="input-group">
							<div className="input-group-prepend">
							</div>
							<input id="confirmPassword" className="form-control" placeholder="******" value={state.confirmPassword} onChange={handleChange} type="password" />
						</div>
					</div>
					<div className="form-group">
						<button className="btn btn-primary btn-block" onClick={handleSubmitClick}>Register</button>
					</div>
					{/* <p className="text-center"><a href="#" className="btn">Forgot password?</a></p> */}
					<div><p>Already have an account?</p><a href="" onClick={() => redirectSignIn(props)} className="float-center btn btn-outline-primary">Sign in</a></div>
				</form>
			</article>
		</div>
	)
}
export default withRouter(RegistrationForm);