import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Switch, Route} from 'react-router'
import Index from './IndexPage'

export default class App extends React.Component {
	render() {
		return (<div>
			<header className="main-header">
				<h1>React JS API communication and list/sorting example</h1>
				<h2>Erik Lopez</h2>
				<a href="https://github.com/ErikTech">Back to Github</a>
			</header>
			<article className="main-content">
				<BrowserRouter>
					<Switch>
						<Route exact={true} path="/" component={Index}/>
						<Route exact={true} path="/page/" component={Index}/>
						<Route path="/page/:id" component={Index}/>
					</Switch>
				</BrowserRouter>
			</article>
			<footer className="main-footer">
				<h3>ReactJS example - Erik Lopez</h3>
			</footer>
		</div>)
	}
}
