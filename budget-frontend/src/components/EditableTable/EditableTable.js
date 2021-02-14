import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = () => ({
    tableHeadings: {
        fontWeight: "bold"
    }
})

export class EditableTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        const { classes, columns, onChangeFuncs, onRowAdd, onRowDelete, data } = this.props;

        const colWidth = `${String(90/(columns.length))}%`;

        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <colgroup>
                        {columns.map(() => {
                            return (
                                <col width={colWidth} />
                            )
                        })}
                        <col width="10%" />
                    </colgroup>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => {
                                return (
                                    <TableCell align="center">
                                        <Typography className={classes.tableHeadings} variant='subtitle1'>{column}</Typography>
                                    </TableCell>
                                )
                            })}
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {columns.map((column, colIndex) => {
                                    console.log(row, column)
                                    return (
                                        <TableCell component="th" scope="row" align="center">
                                            <TextField
                                                id={`row${rowIndex}-col${colIndex}`}
                                                key={`row${rowIndex}-col${colIndex}`}
                                                label={column}
                                                variant="outlined"
                                                fullWidth
                                                value={row[column] ? row[column] : ""}
                                                onChange={onChangeFuncs[colIndex](rowIndex)}
                                                required
                                            />
                                        </TableCell>
                                    )
                                })}
                                <TableCell align="right">
                                    <IconButton onClick={() => { onRowDelete(rowIndex) }}>
                                        <ClearIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow key="add-new-row">
                            <TableCell align="center" colSpan={columns.length + 1}>
                                <Button onClick={onRowAdd}>
                                    Add a new goal category
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
          </TableContainer>
        )
    }

}

EditableTable.propTypes = {
    classes: PropTypes.object,
    data: PropTypes.array,
    columns: PropTypes.array,
    onChangeFuncs: PropTypes.array.isRequired,
    onRowAdd: PropTypes.func.isRequired,
    onRowDelete: PropTypes.func.isRequired
}

EditableTable.defaultProps = {
    classes: {},
    data: [],
    columns: []
}

export default withStyles(styles)(EditableTable);

