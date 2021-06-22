import { makeStyles } from '@material-ui/styles'

const UseStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center',
        marginBottom: theme.spacing(3)
    },
    paper: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(6)
    },
    buttons: {
        marginTop: theme.spacing(5)
    },
    forgotPassword: {
        marginTop: theme.spacing(3)
    }
}))

export default UseStyles;