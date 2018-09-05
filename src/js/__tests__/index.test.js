import React from 'react'
import {shallow, mount, render} from 'enzyme';

// import renderer from 'react-test-renderer'
import Index from '../IndexPage'
import ItemReview, {monthNames} from '../components/ItemReview.js'
import Pagination from '../components/Pagination.js'

describe('Index Testing ', () => {
	it('Index and Sort test, h1 prints and select options"', () => {
    const app = mount(
      <Index
        reviews={{
				  Results: [],
				  TotalResults: 0
        }}
        match={{
				  params: {
					  id: 1
          }
        }}
      />
    )
		expect(app.find('select').exists())
		expect(app.find('h1').text()).toEqual('All Customer Reviews')
	})

	it('Star Rating count check should be equal to 5, with 3 full stars and 2 empty stars', () => {
		const testRating = 3
		const testRatingRange = 5
		const testEmptyStars = testRatingRange - testRating

		const wrapper = mount(<ItemReview result={{
				SubmissionTime: '2011-01-31T13:50:17.000+00:00',
				Rating: testRating,
				RatingRange: testRatingRange
			}}/>);
		// check number of total stars
		expect(wrapper.find('.starCount')).toHaveLength(testRatingRange);
		// check filled stars printed
		expect(wrapper.find('.starCount.full')).toHaveLength(testRating);
		// Check empty stars printed
		expect(wrapper.find('.starCount.empty')).toHaveLength(testEmptyStars);

	})
	it('Pagination count should equal TotalResults / 10 + 1 (if remainder exists)', () => {
		const totalResultsCount = 151;
		const totalPageCount = parseInt((totalResultsCount / 10) + (
			totalResultsCount % 10 > 0
			? 1
			: 0))
		const wrapper = render(<Pagination reviews={{
				Results: [],
				TotalResults: totalResultsCount
			}} id="0"/>);

		expect(wrapper.find('li.count')).toHaveLength(totalPageCount);
		// if {id} is passed in as 1, it should render page 2, which should show both Next and Prev

	})
	it('Pagination list should only have 1 active state, should only have 1 next and 1 prev if on page 2-15', () => {
		const totalResultsCount = 151;
		const totalPageCount = parseInt((totalResultsCount / 10) + (
			totalResultsCount % 10 > 0
			? 1
			: 0))
		const wrapper = render(<Pagination reviews={{
				Results: [],
				TotalResults: totalResultsCount
			}} id="2"/>);

		// if {id} is passed in as 1, it should render page 2, which should show both Next and Prev
		expect(wrapper.find('li.next')).toHaveLength(1);
		expect(wrapper.find('li.prev')).toHaveLength(1);
		// Only 1 pagination link should contain active class
		expect(wrapper.find('li.count a.active')).toHaveLength(1);

	})
})
