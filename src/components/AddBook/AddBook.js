import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { redirectSignIn } from '../../services/RedirectService';
const { withRouter } = require("react-router-dom");


const API_BASE_URL = "http://127.0.0.1:5000";

function AddBook(props) {
	const [book, setBook] = useState({
		_id: "",
		title: "",
		author: "",
		year: 2021,
		shortDesc: "",
		genre: "",
	});
	const [loggedIn, setLoggedIn] = useState(false);
	const [validation, setValidationMsg] = useState("");

	const handleChange = (e) => {
		const { id, value } = e.target;
		setBook(prevState => ({
			...prevState,
			[id]: value
		}));
	}

	useEffect(() => {
		let axiosConfig = {
			withCredentials: true,
		};

		const checkSignIn = async () => {
			await axios.get(API_BASE_URL + '/checksignin', axiosConfig)
				.then((response) => {
					if (response.status === 202) { // "status OK"
						setLoggedIn(true);//GREEEN LIGHT
					}
				})
				.catch((err) => {
					if (err.response.status === 401) {
						redirectSignIn(props);
					}
				});
		};
		checkSignIn();
	}, []);

	const handleCreate = (e) => {
		e.preventDefault();// here, we actually need it to refresh
		if (book.year == 0 || !book.title || !book.author || !book.shortDesc || !book.genre) {
			setValidationMsg("All fields must be filled out.");
		}
		else if (book.year < 1 || book.year > new Date().getFullYear()) {
			setValidationMsg("Enter a valid year.");
		} else if (book.genre.includes('.') || book.genre.includes(':') || book.genre.includes('!') || book.genre.includes('-')
			|| book.genre.includes('/') || book.genre.includes('\\') || book.genre.includes('|') || book.genre.includes('?')
			|| book.genre.includes(';')) {
			setValidationMsg("Genres must be comma-separated.");
		} else {
			book.year = parseInt(book.year); //year must be int (server docs)
			//put req
			axios.post(API_BASE_URL + '/books', book, { withCredentials: true })
				.then(function (response) {
					// console.log(response);
					if (response.status === 201) {
						// alert("Congratulations! You've successfully added a new book!")//add alert with the id / link to the book that's been created.
						//alert!
						if (window.confirm("Congratulations! You've successfully added a new book!\nWould you like to see it?")) {
							props.history.push("/books/" + response.data);
						} else {
							goBack(props);
						}
					}
				})
				.catch(function (error) {
					//add error handling
				});
		}
	}

	const goBack = function () {
		props.history.go(-1);
	}

	return (
		<div className="container">{!loggedIn ? (
			<div>You have to sign in to add a book.</div>
		) :

			<div className="row" key='2'>
				<div className="col-12">
					<div className="card">
						<article className="card-body">
							<h4 className="card-title text-center mb-4 mt-1">Add a book</h4>
							<hr />
							{/* <p className="text-success text-center">{successMessage}</p> */}
							<p className="text-danger text-center">{validation}</p>
							<form>
								<div className="form-group row">
									<label htmlFor="title" className="col-sm-4 col-form-label">Title</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" id="title" onChange={handleChange} value={book.title} placeholder="Title" />
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="author" className="col-sm-4 col-form-label">Author</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" id="author" onChange={handleChange} value={book.author} placeholder="First Last" />
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="year" className="col-sm-4 col-form-label">Year</label>
									<div className="col-sm-8">
										<input type="number" pattern="\d*" maxLength="4" min="1" max="2021"
											className="form-control" id="year" onChange={handleChange} value={book.year} placeholder="1999" />
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="shortDesc" className="col-sm-4 col-form-label">Short Description</label>
									<div className="col-sm-8">
										<textarea type="text" rows='10' className="form-control" id="shortDesc" onChange={handleChange} value={book.shortDesc} placeholder="Short description" />
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="genre" className="col-sm-4 col-form-label">Genres</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" id="genre" onChange={handleChange} value={book.genre} placeholder="Genres, comma-separated" />
									</div>
								</div>
								<div className="form-group">
									<div className="row">
										<div className="col">
											<button onClick={handleCreate} type="submit" className="btn btn-success btn-block">Create</button>

										</div>
										<div className="col">
											<button onClick={() => goBack()} type="button" className="btn btn-primary btn-block">Back</button>
										</div>

									</div>
								</div>
							</form>
						</article>
					</div>
				</div>
			</div>

		} </div>
	);
}

export default withRouter(AddBook);