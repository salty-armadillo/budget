import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { NavigationBar } from './components/NavigationBar';
import { TransactionsPage } from './pages/TransactionsPage';
import { BudgetsPage } from './pages/BudgetsPage';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#009172'
        },
        secondary: {
            main: '#d3dbd9'
		},
        contrastThreshold: 3
    }
})

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<MuiPickersUtilsProvider utils={MomentUtils}>
						<NavigationBar/>
						<Switch>
							<Route exact path="/">
								<Redirect to="/transactions"/>
							</Route>
							<Route path="/budget" component={BudgetsPage} />
							<Route path="/transactions" component={TransactionsPage} />
						</Switch>
					</MuiPickersUtilsProvider>
				</ThemeProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
