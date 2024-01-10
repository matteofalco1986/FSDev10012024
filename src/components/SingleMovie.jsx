import {
	Col,
	Modal,
	Form,
	InputGroup,
	FormControl,
	Button,
} from "react-bootstrap";
import CommentsList from "./CommentsList";
import { useState } from "react";

const SingleMovie = (props) => {
	const [selected, setSelected] = useState(false);
	const [newComment, setNewComment] = useState({
		comment: "",
		rate: 0,
		elementId: props.data.imdbID,
	})

	const submitComment = async (e) => {
		e.preventDefault();
		const COMMENTS_URL =
			"https://striveschool-api.herokuapp.com/api/comments/";
		try {
			const response = await fetch(COMMENTS_URL, {
				method: "POST",
				body: JSON.stringify(newComment),
				headers: {
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTljMTVlYWUwZGQxZDAwMTgyZDE4MzUiLCJpYXQiOjE3MDQ3MjgwNDIsImV4cCI6MTcwNTkzNzY0Mn0.d3NYogX9x1Trv4HDeBugXlpKHp-yZ-GurJVZjxwKc_w",
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				alert("Comment added");
				setNewComment({
					comment: "",
					rate: 0,
					elementId: props.data.imdbID,
				})
			} else {
				alert("An error has occurred");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleRadioChange = (e) => {
		let newComment = newComment;
		newComment.rate = e.currentTarget.id;
		setNewComment(newComment);
	};

	const handleCommentText = (e) => {
		let newComment = newComment;
		newComment.comment = e.currentTarget.value;
		setNewComment(newComment);
	};

	return (
		<Col className="mb-2" key={props.data.imdbID}>
			<img
				className="img-fluid"
				src={props.data.Poster}
				alt="movie"
				onClick={() => {
					// this.setState({ selected: !selected });
					setSelected(!selected);
					props.fetchComments(props.data.imdbID);
				}}
			/>
			<Modal
				show={selected}
				onHide={() => 
					// this.setState({ selected: !this.state.selected })
					setSelected(!selected)
				}
			>
				<Modal.Header closeButton>
					<Modal.Title>Movie comments</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="my-3">
						{props.comments.length > 0 &&
							props.comments[0].elementId ===
							props.data.imdbID && (
								<CommentsList
									comments={props.comments}
								/>
							)}
						<div className="text-center">
							<h5 className="my-3">Add a comment</h5>
							<Form onSubmit={submitComment}>
								<div className="my-3 text-center">
									<Form.Check
										inline
										label="1"
										type="radio"
										id="1"
										name="rating"
										onClick={handleRadioChange}
									/>
									<Form.Check
										inline
										label="2"
										type="radio"
										id="2"
										name="rating"
										onClick={handleRadioChange}
									/>
									<Form.Check
										inline
										label="3"
										type="radio"
										id="3"
										name="rating"
										onClick={handleRadioChange}
									/>
									<Form.Check
										inline
										label="4"
										type="radio"
										id="4"
										name="rating"
										onClick={handleRadioChange}
									/>
									<Form.Check
										inline
										label="5"
										type="radio"
										id="5"
										name="rating"
										onClick={handleRadioChange}
									/>
								</div>
								<InputGroup className="mb-3">
									<FormControl
										placeholder="Write your comment"
										aria-label="comment"
										aria-describedby="basic-addon1"
										onChange={handleCommentText}
										value={newComment.comment}
									/>
								</InputGroup>
								<Button variant="primary" type="submit">
									Submit
								</Button>
							</Form>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</Col>
	);
}

export default SingleMovie;
