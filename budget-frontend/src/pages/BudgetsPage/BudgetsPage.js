import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';

import { Banner } from '../../components/Banner';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
    }
})

export class BudgetsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        this.getBudgetData();
    }

    getBudgetData = () => {

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