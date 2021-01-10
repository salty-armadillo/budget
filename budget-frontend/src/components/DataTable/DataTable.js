import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = () => ({
    table: {
        width: '90%',
        margin: 'auto'
    }
});

export class DataTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { classes, columns, data } = this.props;

        return (
            <TableContainer className={classes.table} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            { columns.map((column) => {
                                return ( 
                                    <TableCell align={'center'}>{column}</TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    { data.length > 0 
                        ? (
                            data.map((row) => {
                                return (
                                    <TableRow key={row.name}>
                                    { columns.map((column) => {
                                        return (
                                            <TableCell>{row[column]}</TableCell>
                                        )
                                    }) }
                                    </TableRow>
                                )
                            })
                        ) : (
                            <TableRow key='no-data-row'>
                                <TableCell colSpan={columns.length} align={'center'}>
                                    No data available.
                                </TableCell>
                            </TableRow>
                        )
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

DataTable.propTypes = {
    classes: PropTypes.object,
    columns: PropTypes.array,
    data: PropTypes.array
}

DataTable.defaultProps = {
    classes: {},
    columns: [],
    data: []
}

export default withStyles(styles)(DataTable);