import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';

import { DataTable } from '../../components/DataTable';
import { Banner } from '../../components/Banner';

const styles = () => ({
});

export class TransactionsPage extends React.Component {

    constructor(props) {
        super(props);

        this.defaultPageSize = 10;
        this.headings = ["Date", "Amount", "Description"];

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

        const url = `http://localhost:5000/transactions/fetch?offset=${page*this.defaultPageSize}&length=${this.defaultPageSize}`

        axios.get(url)
            .then((response) => {
                this.setState({
                    data: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        const { classes } = this.props;
        const { data } = this.state;

        return (
            <React.Fragment>
                <Banner />
                <DataTable
                    columns={this.headings}
                    data={data}
                />
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