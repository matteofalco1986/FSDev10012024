import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/styles.css";
import { Container, Alert, Dropdown } from "react-bootstrap";
import Genre from "./components/Genre";
import Home from "./components/Home";
import Movies from "./components/Movies";
import RecentlyAdded from "./components/RecentlyAdded";
import TvShows from "./components/TvShows";
import MyList from "./components/MyList";
import NotFound from "./components/NotFound";
import MyNavbar from "./components/MyNavbar";
import MyFooter from "./components/MyFooter";
import MovieList from "./components/MovieList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

const App = () => {

	const [gallery1, setGallery1] = useState([]);
	const [gallery2, setGallery2] = useState([]);
	const [gallery3, setGallery3] = useState([]);
	const [searchResults, setsearchResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [comments, setComments] = useState([]);

	const OMDB_URL = "http://www.omdbapi.com/?apikey=7dcf0c13";

	useEffect(() => {
		fetchMovies();
	}, [])

	const fetchMovies = () => {
		Promise.all([
			fetch(OMDB_URL + "&s=harry%20potter")
				.then((response) => response.json())
				.then((responseObject) => {
					if (responseObject.Response === "True") {
						console.log(responseObject);
						setGallery1(responseObject.Search)
					} else {
						setError(true);
					}
				}),
			fetch(OMDB_URL + "&s=avengers")
				.then((response) => response.json())
				.then((responseObject) => {
					if (responseObject.Response === "True") {
						setGallery2(responseObject.Search);
					} else {
						setError(true);
					}
				}),
			fetch(OMDB_URL + "&s=star%20wars")
				.then((response) => response.json())
				.then((responseObject) => {
					if (responseObject.Response === "True") {
						setGallery3(responseObject.Search);
					} else {
						setError(true);
					}
				}),
		])
			.then(() =>
				setLoading(false))
			.catch((err) => {
				setError(true)
				console.error("An error has occurred:", err);
			});
	};

	const showSearchResult = async (searchString) => {
		if (searchString === "") {
			setError(false);
			setsearchResults([])
			fetchMovies();
		} else {
			try {
				const response = await fetch(
					OMDB_URL + "&s=" + searchString
				);
				if (response.ok) {
					const data = await response.json();
					if (data.Response === "True") {
						setsearchResults(data.Search);
						setError(false);
					} else {
						setError(true);
					}
				} else {
					setError(true);
					console.log("an error occurred");
				}
			} catch (error) {
				setError(true);
				console.log(error);
			}
		}
	};

	const fetchComments = async (movieID) => {
		const COMMENTS_URL =
			"https://striveschool-api.herokuapp.com/api/comments/";
		try {
			const response = await fetch(COMMENTS_URL + movieID, {
				headers: {
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTljMTVlYWUwZGQxZDAwMTgyZDE4MzUiLCJpYXQiOjE3MDQ3MjgwNDIsImV4cCI6MTcwNTkzNzY0Mn0.d3NYogX9x1Trv4HDeBugXlpKHp-yZ-GurJVZjxwKc_w",
				},
			});
			if (response.ok) {
				const comments = await response.json();
				setComments(comments);
			} else {
				console.log("an error occurred");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<BrowserRouter>
			<div>
				<MyNavbar showSearchResult={showSearchResult} />
				<Container fluid className="px-4">
					<Genre />
					{error && (
						<Alert variant="danger" className="text-center">
							An error has occurred, please try again!
						</Alert>
					)}
					{searchResults.length > 0 && (
						<MovieList
							title="Search results"
							fetchComments={fetchComments}
							comments={comments}
							movies={searchResults}
						/>
					)}
				</Container>
			</div>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/shows' element={<TvShows />} />
				<Route path='/movies' element={<Movies />} />
				<Route path='/recent' element={<RecentlyAdded />} />
				<Route path='/userlist' element={<MyList />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
			<MyFooter />
		</BrowserRouter>
	);
}

export default App;
