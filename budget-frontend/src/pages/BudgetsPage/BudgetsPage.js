import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
import clsx from 'clsx';

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
    }
})

export class BudgetsPage extends React.Component {

    constructor(props) {
        super(props);

        this.length = 1;

        this.state = {
            timeframe: "month",
            offset: 0,
            budgetData: [],
            transactionData: []
        }
    }

    componentDidMount() {
        this.getBudgetData();
        this.getTransactionData();
    }

    getBudgetData = () => {
        const { timeframe } = this.state;

        const start = moment().startOf(timeframe).format('YYYY-MM-DD HH:mm:ss');
        const end = moment().endOf(timeframe).format('YYYY-MM-DD HH:mm:ss');

        const url = `http://localhost:5000/budgetgoals/fetch?timeframe=${timeframe}&start=${start}&end=${end}`;

        return (
            axios
                .get(url)
                .then((response) => {
                    this.setState({
                        budgetData: JSON.parse(response.data && response.data[0] && response.data[0].goals)
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        )

    }

    getTransactionData = () => {
        const { timeframe } = this.state;

        const start = moment().startOf(timeframe).format('YYYY-MM-DD HH:mm:ss');
        const end = moment().endOf(timeframe).format('YYYY-MM-DD HH:mm:ss');

        const url = `http://localhost:5000/transactions/fetch?start=${start}&end=${end}`;

        return (
            axios
                .get(url)
                .then((response) => {
                    console.log(response.data)
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

    render() {
        const { classes } = this.props;
        const { budgetData } = this.state;

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
                        <Grid container spacing={2}>
                            { Object.keys(budgetData).map((category) => {
                                const catLevel = this.getCategoryLevel(category);
                                return (
                                    <Grid item container xs={6} sm={4}>
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
                                                <WarningIcon />
                                            </Box>
                                            <CardContent>
                                                <Typography variant='h2'>{budgetData[category]}</Typography>
                                                <Typography>{category}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>
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