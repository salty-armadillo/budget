import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';

import { Banner } from '../../components/Banner';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';

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
        margin: 'auto'
    },
    title: {
        color: theme.palette.secondary.dark,
        textAlign: 'left',
        padding: '1rem'
    },
    categoryCard: {
        width: '80%',
        margin: '2.5rem 1rem 1rem 1rem'
    },
    box: {}
})

export class BudgetsPage extends React.Component {

    constructor(props) {
        super(props);

        this.length = 1;

        this.state = {
            timeframe: "month",
            offset: 0,
            data: []
        }
    }

    componentDidMount() {
        this.getBudgetData();
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
                        data: JSON.parse(response.data && response.data[0] && response.data[0].goals)
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        )

    }

    render() {
        const { classes } = this.props;
        const { data } = this.state;

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
                            { Object.keys(data).map((category) => {
                                return (
                                    <Grid item container xs={6} sm={4}>
                                        <Card className={classes.categoryCard}>
                                            <CardContent>
                                                <Typography variant='h2'>{data[category]}</Typography>
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