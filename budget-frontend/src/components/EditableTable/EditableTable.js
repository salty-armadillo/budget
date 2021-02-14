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

const styles = (theme) => ({
    tableHeadings: {
        fontWeight: "bold"
    }
})

export class EditableTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {}
        }
    }

    onGoalChange = (goal) => (e) => {
        const { data } = this.state;
        const newGoalName = e.target.value;

        delete Object.assign(data, {[newGoalName]: data[goal] })[goal];

        this.setState({ data });
    }

    onGoalValueChange = (goal) => (e) => {
        const { data } = this.state;

        data[goal] = e.target.value;

        this.setState({ data });
    }

    onRowAdd = () => {
        this.setState({
            data: {
                ...this.state.data,
                "": ""
            }
        })
    }

    onRowDelete = (goal) => {
        const { data } = this.state;

        delete data[goal];
        this.setState({ data });
    }

    render() {
        const { classes, columns } = this.props;
        const { data } = this.state;

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
                        {Object.keys(data).map((row, i) => (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row" align="center">
                                    <TextField
                                        id={`${i}-goal`}
                                        key={`${i}-goal`}
                                        label="Goal"
                                        variant="outlined"
                                        value={row}
                                        onChange={this.onGoalChange(row)}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        id={`${i}-value`}
                                        key={`${i}-value`}
                                        label="Goal value"
                                        variant="outlined"
                                        value={data[row]}
                                        onChange={this.onGoalValueChange(row)}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => { this.onRowDelete(row) }}>
                                        <ClearIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow key="add-new-row">
                            <TableCell align="center" colSpan={columns.length + 1}>
                                <Button onClick={this.onRowAdd}>
                                    Add a new goal
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
    columns: PropTypes.array
}

EditableTable.defaultProps = {
    classes: {},
    data: {},
    columns: []
}

export default withStyles(styles)(EditableTable);

