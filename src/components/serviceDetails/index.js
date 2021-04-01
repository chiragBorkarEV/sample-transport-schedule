import { Grid } from '@material-ui/core';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import PropTypes from 'prop-types';

import useStyles from './styles';
import { CYCLE_HIRE } from '../../constants';

const ServiceDetails = (props) => {
    const { data, showContent, setShowCycleHireContent } = props;
    const classes = useStyles();

    const isDisruptive = (lineStatuses) => {
        let disruptive = false;
        if (!!lineStatuses && lineStatuses.length > 0) {
            disruptive = lineStatuses.some((lineStatus) => lineStatus.statusSeverity !== 10);
        }
        return disruptive;
    }

    const isNightService = (serviceTypes) => {
        let nightService = false;
        if (!!serviceTypes && serviceTypes.length > 0) {
            nightService = serviceTypes.some((serviceType) => serviceType.name === 'Night');
        }
        return nightService;
    }

    const getInfo = (modeName, name, serviceTypes, lineStatuses) => (
        <>
            {`${modeName} ${name}`}
            {isDisruptive(lineStatuses) && <WatchLaterIcon htmlColor='#000' className={classes.disruptionIcon} />}
            {isNightService(serviceTypes) && <NightsStayIcon htmlColor='#000' className={classes.disruptionIcon} />}
        </>
    )

    return (
        <Grid container>
            {!!data && data.length > 0 && data.map((service, index) => (
                <Grid key={`serviceName-${index}`} item xs={12} md={6} className={classes.serviceName} onClick={() => showContent({
                    isDisruptive: isDisruptive(service.lineStatuses),
                    lineStatuses: service.lineStatuses
                })}>
                    {getInfo(service.modeName, service.name, service.serviceTypes, service.lineStatuses)}
                </Grid>
            ))}
            {/* Added unwanted conditional based rendering to avoid displaying Cycle Hire option before fetching data, just for better UX */}
            {!!data && <Grid item xs={12} md={6} className={classes.serviceName} onClick={() => setShowCycleHireContent(true)}>
                {CYCLE_HIRE}
            </Grid>}

        </Grid>

    )
}

ServiceDetails.propTypes = {
    data: PropTypes.array,
    showContent: PropTypes.func,
    setShowCycleHireContent: PropTypes.func
}

export default ServiceDetails;