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

const styles = () => ({});

export class DataTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { classes, columns, data } = this.props;

        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            { columns.map((column) => {
                                return ( 
                                    <TableCell>{column}</TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    { data.map((row) => {
                        return (
                            <TableRow key={row.name}>
                            { row.map((item) => {
                                return (
                                    <TableCell>{item}</TableCell>
                                )
                            }) }
                            </TableRow>
                        )
                    }) }
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