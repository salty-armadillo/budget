import React from 'react';

import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
    loginButton: {
        float: 'right'
    }
});

export class TransactionsPage extends React.Component {

    constructor(props) {
        super(props);

        const defaultPageSize = 10;

        this.state = {
            page: 0
        };
    }

    getTransactionData = () => {
        
    }

    render() {

        return (
            <React.Fragment>
                
            </React.Fragment>
        )
    }

}

export default withStyles(styles)(TransactionsPage);