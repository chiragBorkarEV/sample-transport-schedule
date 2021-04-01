import { Grid, TextField } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { EMPTY_SEARCH_RESULT, SEARCH_BIKE_POINTS_API } from '../../constants';

const CycleContent = (props) => {
    const { classes } = props;
    const [userInput, setUserInput] = useState(null);
    const [searchResult, setSearchResult] = useState(null);
    const [searchHistory, setSearchHistory] = useState([]);

    const saveSearchResults = (searchTerm, data) => {
        let result = [...searchHistory];
        result.push({ name: searchTerm, value: data });
        setSearchHistory(result);
    }

    const fetchContent = (searchTerm) => {
        setUserInput(searchTerm);
        if (!!searchTerm) {
            const searchResult = searchHistory.filter((item) => item.name === searchTerm);
            if (!!searchResult && searchResult.length > 0) {
                setSearchResult(searchResult[0].value);
            } else {
                axios.get(`${SEARCH_BIKE_POINTS_API}?query=${searchTerm}`)
                    .then(function (response) {
                        setSearchResult(response.data);
                        saveSearchResults(searchTerm, response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        } else {
            setSearchResult(null);
        }
    }

    return (
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <Grid container className={classes.resultContainer}>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            label="Search For Bike"
                            variant="outlined"
                            className={classes.textField}
                            onChange={(event) => fetchContent(event.target.value)} />
                    </Grid>
                </Grid>
            </Grid>
            {!!searchResult && searchResult.length > 0 && searchResult.map((item, index) => (
                <Grid key={`result-${index}`} item xs={12} className={classes.result}>
                    {`${index + 1}. ${item.id.split('_')[1]} ${item.commonName} (${item.lat}, ${item.lon})`}
                </Grid>
            ))}
            {!!searchResult && searchResult.length === 0 && <Grid item xs={12} className={classes.result}>{`${EMPTY_SEARCH_RESULT} '${userInput}'`}</Grid>}

        </Grid>
    )
}

CycleContent.propTypes = {
    classes: PropTypes.object
}

export default CycleContent;