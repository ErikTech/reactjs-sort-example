import React from 'react'


let starCount = []
const StarRating = props => {
		let starCount = []
		for(var i=1; i <= props.rating; i++){
			starCount.push(<span className="starCount full" key={i}><img src="/img/react-heart.svg" width="20" height="20" alt="" /></span>)
		}
		for(var i=1; i <= props.ratingRange - props.rating; i++){
			starCount.push(<span className="starCount empty" key={i+"b"}><img src="/img/react-open.svg" width="20" height="20" alt="" /></span>)
		}
		return starCount;
}

export default StarRating
