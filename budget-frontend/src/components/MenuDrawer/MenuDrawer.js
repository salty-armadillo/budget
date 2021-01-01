import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

const styles = (theme) => ({
    drawer: {
        width: '10em'
    },
    menuItem: {
        padding: '1em',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light
        }
    },
    closeButton: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: '0',
        paddingRight: '0.25rem',
        '&:hover': {
            backgroundColor: "#ffffff"
        }
    }
});

export class MenuDrawer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { classes, isMenuOpen, toggleMenu } = this.props;

        return (
            <Drawer classes={{ paper: classes.drawer }} open={isMenuOpen} onClose={toggleMenu} transitionDuration={200}>
                <MenuList className={classes.menu}>
                    <MenuItem className={classes.closeButton}>
                        <IconButton onClick={toggleMenu}>
                            <CloseIcon fontSize={'small'}/>
                        </IconButton>
                    </MenuItem>
                    <Divider />
                    <MenuItem className={classes.menuItem} component={Link} to="/transactions" onClick={toggleMenu}>
                        Transactions
                    </MenuItem>
                </MenuList>
            </Drawer>
        )
    }
}

MenuDrawer.propTypes = {
    isMenuOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    classes: PropTypes.object
}

MenuDrawer.defaultProps = {
    classes: {}
}

export default withStyles(styles)(MenuDrawer);

