import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { MenuDrawer } from '../MenuDrawer';

const styles = () => ({
    loginButton: {
        float: 'right'
    }
});

export class NavigationBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isMenuOpen: false
        };
    }

    toggleMenu = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    render() {
        const { classes } = this.props;
        const { isMenuOpen } = this.state;

        return (
            <React.Fragment>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton 
                            edge="start" 
                            className={classes.menuButton} 
                            color="inherit" 
                            aria-label="menu"
                            onClick={this.toggleMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Transactions
                        </Typography>
                        <Grid container justify={'flex-end'}>
                            <Button 
                                className={classes.loginButton} 
                                color="inherit"
                            >
                                Login
                            </Button>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <MenuDrawer
                    toggleMenu={this.toggleMenu}
                    isMenuOpen={isMenuOpen}
                />
            </React.Fragment>
        )
    }
}

NavigationBar.propTypes = {
    classes: PropTypes.object
}

NavigationBar.defaultProps = {
    classes: {}
}

export default withStyles(styles)(NavigationBar);