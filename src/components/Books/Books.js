import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FadeLoader from "react-spinners/FadeLoader";
import { redirectAddBook, redirectSignIn } from '../../services/RedirectService';
import './Books.css';
const { withRouter } = require("react-router-dom");

const API_BASE_URL = "http://127.0.0.1:5000";

function Books(props) {
	const [data, setBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		let axiosConfig = {
			withCredentials: true,
			// headers: {
			// 	'Content-Type': 'application/json;charset=UTF-8',
			// 	"Access-Control-Allow-Origin": API_BASE_URL,
			// },
		};

		const fetchData = async () => {
			setIsLoading(true);
			await axios.get(API_BASE_URL + '/books', axiosConfig)
				.then(function (response) {
					if (response.status === 200) { // "status OK"
						setBooks(response.data);
						setIsLoading(false);
					}
				})
				.catch(function (er) {
					setError(er);
					setIsLoading(false);
					if (er.response.status === 401) {
						setErrorMsg("Please sign in to see this information");
						redirectSignIn(props);
					}
				});
		};
		fetchData();
	}, []);

	const handleBookClick = (e) => {
		// console.log(e.currentTarget);
		// console.log(e.currentTarget.id);//book id
		//redirect to book Detail with the id of the clicked book.
		props.history.push('/books/' + data[e.currentTarget.id]._id);
	}

	return (
		<div className="container">{isLoading ? (
			<FadeLoader></FadeLoader>
		) : [
				(error ? <div key='1' className="alert alert-danger" role="alert">
					<h4 className="alert-heading">{errorMsg}</h4>
				</div>
					:
					<div key='2' >
						<div className="row">
							<div className="col md-4 text-center">
							</div>
							<div className="col md-4 text-center">
								<h1>Books Available</h1>

							</div>
							<div className="col md-2 text-right">
								<button className="btn btn-success" title="Add a book" onClick={() => redirectAddBook(props)} >
									<i className="fas fa-plus"></i>
								</button>
							</div>
						</div>
						<table className="table table-hover">
							<thead className="thead-dark">
								<tr>
									<th scope="col">#</th>
									<th scope="col">Title</th>
									<th scope="col">Author</th>
									<th scope="col">Year</th>
									<th scope="col">Genres</th>
								</tr>
							</thead>
							<tbody>

								{data.map((item, i) => (
									<tr id={i} key={item._id} onClick={handleBookClick}>
										<th scope="row">{i + 1}</th>
										<td>{item.title}</td>
										<td>{item.author}</td>
										<td>{item.year}</td>
										<td>{item.genre}</td>
									</tr>
								))}
							</tbody>
						</table>
						{/* <button>Add a book</button> */}
					</div>
				)]
		}</div >
	);
}
export default withRouter(Books);