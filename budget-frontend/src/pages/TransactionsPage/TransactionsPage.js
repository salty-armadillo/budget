import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import { DataTable } from '../../components/DataTable';
import { Banner } from '../../components/Banner';

const styles = (theme) => ({
    title: {
        height: '3rem',
        backgroundColor: theme.palette.primary.light
    },
    overlap: {
        height: '3rem',
        backgroundColor: theme.palette.primary.light
    },
    table: {
        position: 'absolute',
        marginTop: '-3rem',
        width: '100%'
    }
});

export class TransactionsPage extends React.Component {

    constructor(props) {
        super(props);

        this.defaultPageSize = 10;
        this.headings = ["Date", "Amount", "Description", "Category"];

        this.state = {
            page: 0,
            data: []
        };
    }

    componentDidMount() {
        this.getTransactionData();
    }

    getTransactionData = () => {
        const { page } = this.state;

        const url = `http://localhost:5000/transactions/fetch?offset=${page*this.defaultPageSize}&length=${this.defaultPageSize}`;

        return (
            axios.get(url)
                .then((response) => {
                    this.setState({
                        data: response.data
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
                    fetchTransactions={this.getTransactionData}
                />
                <Grid className={classes.overlap} container />
                <Grid className={classes.table}>
                    <DataTable
                        columns={this.headings}
                        data={data}
                    />
                </Grid>
            </React.Fragment>
        )
    }

}

TransactionsPage.propTypes = {
    classes: PropTypes.object
}

TransactionsPage.defaultProps = {
    classes: {}
}

export default withStyles(styles)(TransactionsPage);