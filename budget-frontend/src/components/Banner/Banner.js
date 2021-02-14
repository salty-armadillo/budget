import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';

import { EditableTable } from '../EditableTable';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { DateTimePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = (theme) => ({
    banner: {
        height: '6em',
        backgroundColor: theme.palette.primary.light
    },
    grid: {
        height: '100%'
    },
    button: {
        textTransform: 'none',
        backgroundColor: 'rgba(211, 219, 217, 0.6)',
        borderRadius: '1.5rem',
        padding: '0.5rem 2rem',
        border: 'solid 0.1rem',
        borderColor: theme.palette.secondary.dark,
        '&:hover': {
            backgroundColor: 'rgba(211, 219, 217, 1)'
        }
    },
    dialog: {
        padding: '0.5em'
    },
    error: {
        backgroundColor: theme.palette.error.main
    }
});

export class Banner extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isAddTransactionOpen: false,
            transactionValue: '',
            transactionDate: moment(),
            description: '',
            category: '',
            addTransactionError: false,
            isAddTransactionLoading: false,
            isAddGoalOpen: false,
            goalDate: moment(),
            goalTimeframe: '',
            goals: []
        };
    }

    toggleAddTransaction = () => {
        this.setState({ isAddTransactionOpen: !this.state.isAddTransactionOpen });
    }

    toggleAddGoal = () => {
        this.setState({ isAddGoalOpen: !this.state.isAddGoalOpen });
    }

    handleChange = (field) => (e) => {
        this.setState({
            [field]: e.target.value
        })
    }

    addTransaction = () => {
        const { fetchTransactions } = this.props;
        const { date, transactionValue, description, category } = this.state;

        this.setState({ isAddTransactionLoading: true });

        const payload = {
            date: moment(date).format('YYYY-MM-DD HH:mm:ss'),
            amount: transactionValue,
            description: description,
            category: category
        }

        const url = "http://localhost:5000/transactions/add";

        return (
            axios
                .post(url, payload)
                .then(() => {
                    this.setState({
                        date: moment(),
                        transactionValue: '',
                        description: '',
                        category: '',
                        isAddTransactionOpen: false
                    }, fetchTransactions)
                })
                .catch(() => {
                    this.setState({
                        addTransactionError: true
                    })
                })
                .finally(() => {
                    this.setState({
                        isAddTransactionLoading: false
                    })
                })
        )

    }

    onGoalChange = (goalIndex) => (e) => {
        const { goals } = this.state;

        goals[goalIndex]["Goal"] = e.target.value;
        this.setState({ goals });
    }

    onGoalValueChange = (goalIndex) => (e) => {
        const { goals } = this.state;

        goals[goalIndex]["Goal Value"] = e.target.value;

        this.setState({ goals });
    }

    onGoalRowAdd = () => {
        this.setState({
            goals: [
                ...this.state.goals,
                {
                    "Goal": "",
                    "Goal Value": ""
                }
            ]
        })
    }

    onGoalRowDelete = (index) => {
        const { goals } = this.state;

        goals.splice(index, 1);
        this.setState({ goals });
    }

    render() {
        const { classes } = this.props;
        const {
            isAddTransactionOpen,
            transactionValue,
            transactionDate,
            description,
            category,
            addTransactionError,
            isAddTransactionLoading,
            isAddGoalOpen,
            addGoalError,
            isAddGoalLoading,
            goalDate,
            goalTimeframe,
            goals
        } = this.state;

        return (
            <React.Fragment>
                <Paper className={classes.banner} square elevation={0}>
                    <Grid container className={classes.grid} spacing={2}>
                        <Grid item container xs={6} direction='column' justify='center' alignContent='flex-end'>
                            <Button 
                                className={classes.button}
                                onClick={this.toggleAddTransaction}
                            >
                                <Typography variant='h5'>Add Transaction</Typography>
                            </Button>
                        </Grid>
                        <Grid item container xs={6} direction='column' justify='center' alignContent='flex-start'>
                            <Button 
                                className={classes.button}
                                onClick={this.toggleAddGoal}
                            >
                                <Typography variant='h5'>Add Goal</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Dialog open={isAddTransactionOpen} onClose={this.toggleAddTransaction} maxWidth='md' fullWidth>
                    <DialogTitle>Add a transaction</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} className={classes.dialog}>
                            <Grid item container spacing={2}>
                                <Grid item xs={6}>
                                    <DateTimePicker
                                        label="Date"
                                        inputVariant="outlined"
                                        value={transactionDate}
                                        onChange={this.handleChange('transactionDate')}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth className={classes.margin}>
                                        <InputLabel >Amount</InputLabel>
                                        <Input
                                            id="transaction-value"
                                            value={transactionValue}
                                            onChange={this.handleChange('transactionValue')}
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            required
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Description"
                                    fullWidth
                                    value={description}
                                    onChange={this.handleChange('description')}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Category"
                                    fullWidth
                                    value={category}
                                    onChange={this.handleChange('category')}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={isAddTransactionLoading} onClick={this.toggleAddTransaction}>
                            Cancel
                        </Button>
                        { isAddTransactionLoading 
                            ? (
                                <CircularProgress size={'1rem'} />
                            ) : (
                                <Button color='primary' onClick={this.addTransaction}>
                                    Add
                                </Button>
                            )
                        }
                    </DialogActions>
                </Dialog>
                <Snackbar
                    ContentProps={{
                        classes: { root: classes.error }
                    }}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={addTransactionError}
                    onClose={() => { this.setState({ addTransactionError: false })}}
                    message="An error has occurred whilst adding a transaction. Please try again."
                    autoHideDuration={2000}
                />
                <Dialog open={isAddGoalOpen} onClose={this.toggleAddGoal} maxWidth='md' fullWidth>
                    <DialogTitle>Add a goal</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} className={classes.dialog}>
                            <Grid item container spacing={2}>
                                <Grid item xs={6}>
                                    <DateTimePicker
                                        label="Start date"
                                        inputVariant="outlined"
                                        value={goalDate}
                                        onChange={this.handleChange('date')}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth className={classes.margin}>
                                        <InputLabel>Timeframe</InputLabel>
                                        <Select
                                            id="goal-timeframe-select"
                                            value={goalTimeframe}
                                            onChange={this.handleChange('goalTimeframe')}
                                            required
                                            >
                                            <MenuItem value={"week"}>Week</MenuItem>
                                            <MenuItem value={"month"}>Month</MenuItem>
                                            <MenuItem value={"year"}>Year</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <EditableTable
                                    data={goals}
                                    columns={["Goal", "Goal Value"]}
                                    onChangeFuncs={[this.onGoalChange, this.onGoalValueChange]}
                                    onRowAdd={this.onGoalRowAdd}
                                    onRowDelete={this.onGoalRowDelete}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={isAddGoalLoading} onClick={this.toggleAddGoal}>
                            Cancel
                        </Button>
                        { isAddGoalLoading 
                            ? (
                                <CircularProgress size={'1rem'} />
                            ) : (
                                <Button color='primary' onClick={this.addGoal}>
                                    Add
                                </Button>
                            )
                        }
                    </DialogActions>
                </Dialog>
                <Snackbar
                    ContentProps={{
                        classes: { root: classes.error }
                    }}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={addGoalError}
                    onClose={() => { this.setState({ addGoalError: false })}}
                    message="An error has occurred whilst adding a goal. Please try again."
                    autoHideDuration={2000}
                />
            </React.Fragment>
        )
    }

}

Banner.propTypes = {
    classes: PropTypes.object,
    fetchTransactions: PropTypes.func
}

Banner.defaultProps = {
    classes: {},
    fetchTransactions: () => {}
}

export default withStyles(styles)(Banner);