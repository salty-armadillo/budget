import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';

const styles = () => ({

})

export class BudgetsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return {}
    }


}

BudgetsPage.propTypes = {
    classes: PropTypes.object
}

BudgetsPage.defaultProps = {
    classes: {}
}

export default withStyles(styles)(BudgetsPage);