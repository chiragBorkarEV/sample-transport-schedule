
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  serviceName: {
    fontSize: 16,
    margin: '12px 0',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  disruptionIcon: {
    margin: '6px 0 0 12px'
  }
}));

export default styles;