import { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';

import ServiceDetails from './components/serviceDetails';
import Content from './components/Content';
import {
  SERVICE_DETAILS_API
} from './constants';

const App = () => {
  const [serviceDetails, setServiceDetails] = useState();
  const [content, setContent] = useState(null);
  const [showCycleHireContent, setShowCycleHireContent] = useState(false);

  const showContent = (data) => {
    setShowCycleHireContent(false);
    setContent(data);
  }

  const theme = createMuiTheme({}); //Added to avoid theme warning as this is not heavy on customize styling but theme is mandatory prop for ThemeProvider

  useEffect(() => {
    axios.get(SERVICE_DETAILS_API)
      .then(function (response) {
        setServiceDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container className="App">
        <ServiceDetails data={serviceDetails} showContent={showContent} setShowCycleHireContent={setShowCycleHireContent} />
        {(showCycleHireContent || !!content) && <Content data={content} showCycleHireContent={showCycleHireContent} />}
      </Grid>
    </ThemeProvider>

  );
}

export default App;
