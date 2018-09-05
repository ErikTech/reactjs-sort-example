import React from 'react'
import PropTypes from 'prop-types';

import apiCall from './api/client';
import ItemReview from './components/ItemReview.js'
import SortBy from './components/SortBy.js'
import Pagination from './components/Pagination.js'
import "../scss/index.scss"

class Index extends React.Component {

	static propTypes = {
		match: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props)
		this.handler = this.handleChange.bind(this);

	}

	state = {
		reviews: {
			Results: [],
			TotalResults: 0
		},
		value: 'Rating:desc',
		loading: true
	}

	componentWillMount() {
		const {params: {id = 1, sort = 'Rating:desc'}} = this.props.match;
		this.getData(id,sort)
	}

	componentWillReceiveProps(nextProps) {
		const nextParams = {
			sort:'Rating:desc',
			...nextProps.match.params
		};
		const {params: {id = 0}} = this.props.match;
		if(nextParams.id  != id){
			this.getData(nextParams.id, this.state.value)
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const {params: {id = 0}} = this.props.match;

		if(this.state.value != prevState.value){
			this.getData(id, this.state.value)
		}
	}

	async getData(id,sort){
		try{
			this.setState({loading: true})
			const productID = 1000001
			const reviews = await apiCall(productID,id,sort)
			this.setState({reviews,loading: false})
		}catch(err){
			console.error(err)
		}
	}

	handleChange(event) {
		event.preventDefault();
		this.setState({
			value: event.target.value
		})
	}

	renderPagination(){

		const {reviews, value} = this.state;
		const {history,match} = this.props
		const {params: {id = 0}} = this.props.match;
		const {Results,TotalResults} = reviews
		return (
			<Pagination
				reviews={reviews}
				id={id}
				loading={this.state.loading}
				pageClick={(e, index) => {
					e.preventDefault();
					this.setState({'loading': true})
					history.push( '/page/' + ( index  ));
				}}
			 prevClick={e => {
					e.preventDefault();
					this.setState({'loading': true})
					history.push('/page/' + ( parseInt(id) - 1))
				}}
				nextClick={e => {
					e.preventDefault();
					// this.setState({'loading': true})
					history.push('/page/' + ( parseInt(id) + 1))
				}}
			/>
		)
	}

	render() {
		const {reviews, value} = this.state;
		const {history,match} = this.props
		const {params: {id = 0}} = this.props.match;
		const {Results,TotalResults} = reviews
		const page = parseInt(id) - 1;

		return (
			<section className="main">
				{ this.state.loading && <div className="loading"><span></span></div> }
				<header>
					<h1>All Customer Reviews</h1>

					{(Results.length != 0) && (
						<div className="show-count">Showing {(page * 10) + 1} - {Math.min((page+1) * 10,TotalResults)} of {TotalResults} reviews</div>
					)}
				</header>
				{Results.length != 0 && (
					<div className="sort-row">
						<SortBy handler={this.handler} value={value}/>
					</div>
				)}

				{
					Results.map((result, index) => (
						<div key={index}>
							<ItemReview result={result} />
						</div>
					))
				}

				{Results.length == 0 && <div className="no-results">There are no reviews for this product yet. Check back soon!</div>}

				{this.renderPagination()}

			</section>
		)
	}
}

export default Index
