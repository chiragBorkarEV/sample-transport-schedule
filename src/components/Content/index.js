import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

import useStyles from './styles';
import { NO_DISRUPTION_HEADING, DISRUPTION_HEADING } from '../../constants';
import CycleContent from './cycleContent';

const Content = (props) => {
    const { data, showCycleHireContent } = props;
    const { isDisruptive, lineStatuses } = data || {};
    const classes = useStyles();

    return (
        <>
            {showCycleHireContent ?
                <CycleContent classes={classes} /> :
                <Grid container className={classes.container}>
                    <Grid item xs={12} className={classes.header}>
                        {isDisruptive ? DISRUPTION_HEADING : NO_DISRUPTION_HEADING}
                    </Grid>
                    {isDisruptive && lineStatuses.map((lineStatus, index) => (
                        <Grid key={`disruption-${index}`} item xs={12} className={classes.reason}>
                            {lineStatus.statusSeverity !== 10 ? lineStatus.reason : ''}
                        </Grid>
                    ))}</Grid>
            }
        </>
    )
}

Content.propTypes = {
    data: PropTypes.object,
    showCycleHireContent: PropTypes.bool
}

export default Content;