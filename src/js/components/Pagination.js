import React from 'react'

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }


  render() {
    return (<div className="pagination">


		<ul>
			{
				this.props.id > 1 && <li className="prev">
						<a  href="" onClick={this.props.prevClick}>Previous</a>
					</li>
			}

			{
				this.props.reviews.TotalResults > 0 && Array(parseInt((this.props.reviews.TotalResults / 10) + (
					this.props.reviews.TotalResults % 10 > 0 ? 1 : 0
				))).fill(1).map((review, index) => (<li className={"count " + index} key={"page" + index}>
							<a
								className={(index == parseInt(this.props.id)-1  ? 'active' : '')}
								href=""
								onClick={e => this.props.pageClick(e, index+1)}>{index + 1}
							</a>
					</li>))
			}
			{
				this.props.id <= (parseInt(this.props.reviews.TotalResults)/10) && <li className="next">
						<a  href="" onClick={ this.props.nextClick} >Next</a>
					</li>
			}
		</ul>
	</div>)
}}

export default (Pagination)
