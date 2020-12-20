import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { DataTable } from '../../components/DataTable';

const styles = () => ({
    loginButton: {
        float: 'right'
    }
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

    getTransactionData = () => {
        
    }

    render() {
        const { classes } = this.props;
        const { data } = this.state;

        return (
            <React.Fragment>
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