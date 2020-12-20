import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { NavigationBar } from './components/NavigationBar';
import { TransactionsPage } from './pages/TransactionsPage'

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				{/* <ThemeProvider theme={darkMode ? darkTheme : lightTheme}> */}
					<NavigationBar/>
					<Switch>
						<Route exact path="/">
							<Redirect to="/transactions"/>
						</Route>
						<Route path="/transactions" component={TransactionsPage} />
						<Route path="/dashboard" component={TransactionsPage} />
					</Switch>
				{/* </ThemeProvider> */}
			</BrowserRouter>
		</div>
	);
}

export default App;
