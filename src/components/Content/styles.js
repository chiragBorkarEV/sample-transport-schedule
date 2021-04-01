
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    container: {
        margin: '36px 0',
        padding: 12,
        height: 'auto',
        background: '#ccc'
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: '18px 0'
    },
    reason: {
        fontSize: 16,
        marginBottom: 18
    },
    resultContainer: {
        height: 100,
        background: '#FFF',
        margin: '12px 0',
        padding: 24
    },
    result: {
        marginBottom: 18
    },
    textField: {
        width: 320
    }
}));

export default styles;