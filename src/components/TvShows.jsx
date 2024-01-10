import { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import MovieList from "./MovieList";

const TvShows = () => {

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
            fetch(OMDB_URL + "&s=star&type=series")
                .then((response) => response.json())
                .then((responseObject) => {
                    if (responseObject.Response === "True") {
                        console.log(responseObject);
                        setGallery1(responseObject.Search)
                    } else {
                        setError(true);
                    }
                }),
            fetch(OMDB_URL + "&s=love&type=series")
                .then((response) => response.json())
                .then((responseObject) => {
                    if (responseObject.Response === "True") {
                        setGallery2(responseObject.Search);
                    } else {
                        setError(true);
                    }
                }),
            fetch(OMDB_URL + "&s=joe&type=series")
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
        <Container fluid className="px-4">
            {error && (
                <Alert variant="danger" className="text-center">
                    An error has occurred, please try again!
                </Alert>
            )}
            {!error && (
                <>
                    <MovieList
                        title="Sci-fi"
                        loading={loading}
                        fetchComments={fetchComments}
                        comments={comments}
                        movies={gallery1.slice(0, 6)}
                    />
                    <MovieList
                        title="Based on what you watched"
                        loading={loading}
                        fetchComments={fetchComments}
                        comments={comments}
                        movies={gallery2.slice(0, 6)}
                    />
                    <MovieList
                        title="More for you"
                        loading={loading}
                        fetchComments={fetchComments}
                        comments={comments}
                        movies={gallery3.slice(0, 6)}
                    />
                </>
            )}
        </Container>
    )
}

export default TvShows;