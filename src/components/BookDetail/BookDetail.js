import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
	useParams
} from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import { redirectBooks, redirectSignIn } from '../../services/RedirectService';
import './BookDetail.css';
const { withRouter } = require("react-router-dom");


const API_BASE_URL = "http://127.0.0.1:5000";

function Book(props) {
	const [book, setBook] = useState([]);
	const [error, setError] = useState(null);
	const [validation, setValidationMsg] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	let { id } = useParams();

	const refreshPage = () => {
		window.location.reload();
	}

	const handleChange = (e) => {
		const { id, value } = e.target
		setBook(prevState => ({
			...prevState,
			[id]: value
		}))
	}

	useEffect(() => {
		let axiosConfig = {
			withCredentials: true,
			// headers: {
			// 'Cache-Control': 'max-age=0',
			// }
		};

		const fetchData = async () => {
			setIsLoading(true);
			await axios.get(API_BASE_URL + '/books/' + id, axiosConfig)
				.then((response) => {
					if (response.status === 200) { // "status OK"
						setBook(response.data);
						setIsLoading(false);
					}
					else {
						console.log("error");
					}
				})
				.catch((err) => {
					setError(err);
					if (err.response.status === 401) {
						redirectSignIn(props);
					}
					setIsLoading(false);
				});
		};
		fetchData();
	}, []);

	const handleUpdate = (e) => {
		e.preventDefault();// here, we actually need it to refresh
		if (book.year < 1 || book.year > new Date().getFullYear()) {
			setValidationMsg("Enter a valid year.");
			console.log(error);
		} else if (book.genre.includes('.') || book.genre.includes(':') || book.genre.includes('!') || book.genre.includes('-')
			|| book.genre.includes('/') || book.genre.includes('\\') || book.genre.includes('|') || book.genre.includes('?')
			|| book.genre.includes(';')) {
			setValidationMsg("Genres must be comma-separated.");
		} else {
			book._id = ""; //server requires the id to be empty
			book.year = parseInt(book.year); //year must be int (server docs)
			//put req
			axios.put(API_BASE_URL + '/books/' + id, book, { withCredentials: true })
				.then(function (response) {
					// console.log(response);
					if (response.status === 200) {
						refreshPage();
					}
				})
				.catch(function (error) {
					// console.log(error);
					setError(error.response.data);
				});
		}
	}

	const handleDelete = (e) => {
		e.preventDefault();
		axios.delete(API_BASE_URL + '/books/' + id, { withCredentials: true })
			.then(function (response) {
				// console.log(response);
				if (response.status === 200) {
					redirectBooks(props);
				}
			})
			.catch(function (error) {
				// console.log(error);
				if (error.response) {
					setError(error.response.data);
				}
			});
	}


	return (
		<div className="container">{isLoading ? (
			<FadeLoader></FadeLoader>
		) : [
				(error ? <div key='1' className="alert alert-danger" role="alert">
					<h4 className="alert-heading">error</h4>
				</div>
					:

					<div className="row" key='2'>
						<div className="col-12">
							<div className="card">
								<article className="card-body">
									<h4 className="card-title text-center mb-4 mt-1">Someone made a mistake? Edit "{book && book.title}"</h4>
									<hr />
									{/* <p className="text-success text-center">{successMessage}</p> */}
									<p className="text-danger text-center">{validation}</p>
									<form>
										<div className="form-group row">
											<label htmlFor="id" className="col-sm-4 col-form-label">Id</label>
											<div className="col-sm-8">
												<input type="text" className="form-control" id="id" disabled value={book && book._id} />
											</div>
										</div>
										<div className="form-group row">
											<label htmlFor="title" className="col-sm-4 col-form-label">Title</label>
											<div className="col-sm-8">
												<input type="text" className="form-control" id="title" onChange={handleChange} value={book && book.title} />
											</div>
										</div>
										<div className="form-group row">
											<label htmlFor="author" className="col-sm-4 col-form-label">Author</label>
											<div className="col-sm-8">
												<input type="text" className="form-control" id="author" onChange={handleChange} value={book && book.author} />
											</div>
										</div>
										<div className="form-group row">
											<label htmlFor="year" className="col-sm-4 col-form-label">Year</label>
											<div className="col-sm-8">
												<input type="number" pattern="\d*" maxLength="4" min="1" max="2021" className="form-control" id="year" onChange={handleChange} value={book && book.year} />
											</div>
										</div>
										<div className="form-group row">
											<label htmlFor="shortDesc" className="col-sm-4 col-form-label">Short Description</label>
											<div className="col-sm-8">
												<textarea type="text" rows='10' className="form-control" id="shortDesc" onChange={handleChange} value={book && book.shortDesc} />
											</div>
										</div>
										<div className="form-group row">
											<label htmlFor="genre" className="col-sm-4 col-form-label">Genres</label>
											<div className="col-sm-8">
												<input type="text" className="form-control" id="genre" onChange={handleChange} value={book && book.genre} />
											</div>
										</div>
										<div className="form-group">
											<div className="row">
												<div className="col">
													<button onClick={handleUpdate} type="submit" className="btn btn-primary btn-block">Update</button>

												</div>
												<div className="col">
													<button onClick={handleDelete} className="btn btn-danger btn-block">Delete</button>
												</div>

											</div>
										</div>
									</form>
								</article>
							</div>
						</div>
					</div>
				)]
		} </div>
	);
}

export default withRouter(Book);