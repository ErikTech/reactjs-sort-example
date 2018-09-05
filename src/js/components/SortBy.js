import React from 'react'

class SortBy extends React.Component {
  render() {
    return (
      <form>
        <label> Sort by
          <select id="sort-by" value={this.props.value} onChange={this.props.handler}>
            <option value="Rating:desc">Highest Rating</option>
            <option value="Rating:asc">Lowest Rating</option>
            <option value="SubmissionTime:asc">Oldest Rating</option>
            <option value="SubmissionTime:desc">Newest Rating</option>
          </select>
        </label>
      </form>
    );
  }
}

export default SortBy
