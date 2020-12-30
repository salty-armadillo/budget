import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PaymentIcon from '@material-ui/icons/Payment';
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

const styles = (theme) => ({
    banner: {
        height: '5em',
        backgroundColor: theme.palette.primary.light
    },
    grid: {
        height: '100%'
    },
    button: {
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light
        }
    },
    dialog: {
        padding: '0.5em'
    }
});

export class Banner extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isAddTransactionOpen: false,
            transactionValue: '',
            date: moment(),
            description: ''
        };
    }

    toggleAddTransaction = () => {
        this.setState({ isAddTransactionOpen: !this.state.isAddTransactionOpen });
    }

    handleChange = (field) => (value) => {
        this.setState({
            [field]: value
        })
    }

    render() {
        const { classes } = this.props;
        const { isAddTransactionOpen, transactionValue, date, description } = this.state;

        return (
            <React.Fragment>
                <Paper className={classes.banner} square elevation={0}>
                    <Grid container className={classes.grid}>
                        <Grid item xs={4}>

                        </Grid>
                        <Grid item container xs={4} direction='column' justify='center' alignContent='center'>
                            <IconButton className={classes.button} onClick={this.toggleAddTransaction}>
                                <PaymentIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={4}>
                            
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
                                        value={date}
                                        onChange={this.handleChange('date')}
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
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    fullWidth
                                    value={description}
                                    onChange={this.handleChange('description')}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button>
                            Cancel
                        </Button>
                        <Button color='primary'>
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }

}

Banner.propTypes = {
    classes: PropTypes.object
}

Banner.defaultProps = {
    classes: {}
}

export default withStyles(styles)(Banner);