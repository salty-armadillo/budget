import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
import clsx from 'clsx';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';

import { Banner } from '../../components/Banner';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import IconButton from '@material-ui/core/IconButton';

const styles = (theme) => ({
    overlap: {
        height: '3rem',
        backgroundColor: theme.palette.primary.light
    },
    paperGrid: {
        position: 'absolute',
        marginTop: '-3rem',
        width: '100%'
    },
    paper: {
        width: '90%',
        margin: 'auto',
        marginBottom: '2rem'
    },
    title: {
        color: theme.palette.secondary.dark,
        textAlign: 'left',
        padding: '1rem'
    },
    categoryCard: {
        width: '80%',
        margin: '2.5rem 1rem 1rem 1rem',
        outlineWidth: '0.1rem',
        outlineStyle: 'solid'
    },
    categoryCardError: {
        outlineColor: theme.palette.error.light
    },
    categoryCardWarning: {
        outlineColor: theme.palette.warning.light
    },
    categoryCardSuccess: {
        outlineColor: theme.palette.success.light
    },
    indicator: {
        position: 'absolute',
        padding: '0.25rem',
        marginTop: '-1rem',
        marginLeft: '0.5rem'
    },
    indicatorError: {
        backgroundColor: theme.palette.error.light
    },
    indicatorWarning: {
        backgroundColor: theme.palette.warning.light
    },
    indicatorSuccess: {
        backgroundColor: theme.palette.success.light
    },
    timeframeSelect: {
        minWidth: '8rem',
        margin: '1rem'
    },
    noDataText: {
        padding: '1rem'
    },
    navigateButton: {
        height: '3rem',
        width: '3rem',
        margin: '1rem 0'
    }
})

export class BudgetsPage extends React.Component {

    constructor(props) {
        super(props);

        this.length = 1;

        this.state = {
            timeframe: 'month',
            currTimeframeStart: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
            currTimeframeEnd: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss'),
            offset: 0,
            budgetData: [],
            transactionData: [],
        }
    }

    componentDidMount() {
        this.getBudgetData();
        this.getTransactionData();
    }

    getBudgetData = () => {
        const { timeframe, currTimeframeStart, currTimeframeEnd } = this.state;

        const start = currTimeframeStart;
        const end = currTimeframeEnd;

        const url = `http://localhost:5000/budgetgoals/fetch?timeframe=${timeframe}&start=${start}&end=${end}`;

        return (
            axios
                .get(url)
                .then((response) => {
                    const data = (response.data.length > 0) ? JSON.parse(response.data[0] && response.data[0].goals) : response.data;
                    this.setState({
                        budgetData: data
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        )

    }

    getTransactionData = () => {
        const { currTimeframeStart, currTimeframeEnd } = this.state;

        const start = currTimeframeStart;
        const end = currTimeframeEnd;

        const url = `http://localhost:5000/transactions/fetch?start=${start}&end=${end}`;

        return (
            axios
                .get(url)
                .then((response) => {
                    this.setState({
                        transactionData: response.data
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        )

    }

    getCategoryLevel = (category) => {
        const { budgetData, transactionData } = this.state;

        const budgetValue = budgetData[category];
        
        var transactionTotal = 0;
        transactionData.forEach((t) => {
            if (t.category === category) {
                transactionTotal += -1*(t.amount);
            }
        })

        if (transactionTotal > budgetValue) {
            return "error";
        } else if (transactionTotal > budgetValue*0.75) {
            return "warning";
        } else {
            return "ok"
        }
    }

    onTimeframeChange = (e) => {
        this.setState({ 
            timeframe: e.target.value,
            currTimeframeStart: moment().startOf(e.target.value).format('YYYY-MM-DD HH:mm:ss'),
            currTimeframeEnd: moment().endOf(e.target.value).format('YYYY-MM-DD HH:mm:ss'),
            budgetData: [],
            transactionData: []
        }, () => {
            this.getBudgetData();
            this.getTransactionData();
        })
    }

    onNavBack = () => {
        this.setState(prevState => ({
            currTimeframeStart: moment(prevState.currTimeframeStart).subtract(1, this.state.timeframe).format('YYYY-MM-DD HH:mm:ss'),
            currTimeframeEnd: moment(prevState.currTimeframeEnd).subtract(1, this.state.timeframe).format('YYYY-MM-DD HH:mm:ss')
        }), () => {
            this.getBudgetData();
            this.getTransactionData();
        })
    }

    onNavNext = () => {
        this.setState(prevState => ({
            currTimeframeStart: moment(prevState.currTimeframeStart).add(1, this.state.timeframe).format('YYYY-MM-DD HH:mm:ss'),
            currTimeframeEnd: moment(prevState.currTimeframeEnd).add(1, this.state.timeframe).format('YYYY-MM-DD HH:mm:ss')
        }), () => {
            this.getBudgetData();
            this.getTransactionData();
        })
    }

    render() {
        const { classes } = this.props;
        const { budgetData, timeframe } = this.state;

        return (
            <React.Fragment>
                <Banner
                    fetchBudgetData={this.getBudgetData}
                />
                <Grid className={classes.overlap} container />
                <Grid className={classes.paperGrid}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} variant='h6'>Budget</Typography>
                        <Divider/>
                        <Grid container justify={'flex-end'}>
                            <FormControl className={classes.timeframeSelect}>
                                <InputLabel>Timeframe</InputLabel>
                                <Select id='timeframe-select' value={timeframe} onChange={this.onTimeframeChange}>
                                    <MenuItem key='timeframe-month' value={'week'}>Week</MenuItem>
                                    <MenuItem key='timeframe-week' value={'month'}>Month</MenuItem>
                                    <MenuItem key='timeframe-year' value={'year'}>Year</MenuItem>
                                </Select>
                            </FormControl>
                            <IconButton className={classes.navigateButton} onClick={this.onNavBack}>
                                <NavigateBeforeIcon />
                            </IconButton>
                            <IconButton className={classes.navigateButton} onClick={this.onNavNext}>
                                <NavigateNextIcon />
                            </IconButton>
                        </Grid>
                        <Divider/>
                        { (!_.isEmpty(budgetData))
                            ? (
                                <Grid container spacing={2} justify='center' align='center'>
                                    { Object.keys(budgetData).map((category) => {
                                            const catLevel = this.getCategoryLevel(category);
                                            return (
                                                <Grid item container xs={6} sm={4} key={`${category}-category-card`}>
                                                    <Card square elevation={3} className={clsx(classes.categoryCard, {
                                                                [classes.categoryCardError]: catLevel === "error",
                                                                [classes.categoryCardWarning]: catLevel === "warning",
                                                                [classes.categoryCardSuccess]: catLevel === "ok"
                                                            })}>
                                                        <Box
                                                            className={clsx(classes.indicator, {
                                                                [classes.indicatorError]: catLevel === "error",
                                                                [classes.indicatorWarning]: catLevel === "warning",
                                                                [classes.indicatorSuccess]: catLevel === "ok"
                                                            })}
                                                        >
                                                            { (catLevel === "error")
                                                                ? <ErrorIcon />
                                                                : (catLevel === "warning")
                                                                    ? <WarningIcon />
                                                                    : <CheckBoxIcon />
                                                            }
                                                        </Box>
                                                        <CardContent>
                                                            <Typography variant='h2'>{budgetData[category]}</Typography>
                                                            <Typography>{category}</Typography>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            )
                                        }) }
                                </Grid>
                            ) : (
                                <Grid item className={classes.noDataText}>
                                    <Typography>No data found</Typography>
                                </Grid>
                            )
                        }
                    </Paper>
                </Grid>
            </React.Fragment>
        )
    }


}

BudgetsPage.propTypes = {
    classes: PropTypes.object
}

BudgetsPage.defaultProps = {
    classes: {}
}

export default withStyles(styles)(BudgetsPage);