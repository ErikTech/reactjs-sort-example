import React from 'react'

import StarRating from './StarRating'

export const monthNames = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
	];


const ItemReview = props => {

	const date = new Date(props.result.SubmissionTime)
	const month = (
		monthNames[date.getMonth()]
	)


	const Review = (
	<div className="user-review">
		<header>
			<div className="title">
			<StarRating rating={props.result.Rating} ratingRange={props.result.RatingRange} /> {props.result.Title}
		</div>
		<div className="author">By: {props.result.UserNickname}&nbsp;
			on {month} {date.getDate().toString()}, {date.getFullYear().toString()}</div>
		</header>



		<p className="description">{props.result.ReviewText}</p>
	</div>)

	return Review;

}

export default ItemReview
