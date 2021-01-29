import React from 'react';
import { redirectSignIn, redirectSignUp } from '../../services/RedirectService';
const { withRouter } = require("react-router-dom");

function Home(props) {

	return (
		<div className="container">
			<div className="row">
				<div className="col text-center">
					<h1>Welcome to my website with books!</h1>
					<p>I made this website to practice my web development skills. This site fetches books from a remote REST API and renders them in React.js with a little bit of Bootstrap and CSS.
					In order to have access to this functionality, you must register and then sign-in. The back-end is written in Go and uses JWT tokens for authentication.
					For the database storage I'm using a NoSQL database - MongoDB.
					</p>
					<p>The functionality of this website includes adding books to the list, deleting them and editing them.</p>
					<p>Enjoy!</p>
				</div>
			</div>
			<div className="row">
				<div className="col md-4"></div>
				<div className="col">
					<a href="" onClick={() => redirectSignIn(props)} className="float-center btn btn-outline-primary">Login</a>

				</div>
				<div className="col">
					<a href="" onClick={() => redirectSignUp(props)} className="float-center btn btn-outline-primary">Register</a>
				</div>
				<div className="col md-4"></div>
			</div>
		</div>
	)
}
export default withRouter(Home);