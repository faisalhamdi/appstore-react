import { makeStyles } from '@material-ui/styles'

const UseStyles = makeStyles(theme => ({
    title: {
        // color: theme.palette.primary.main
        textAlign: 'center',
        marginBottom: theme.spacing(3)
    },
    paper: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(6)
    }
}))

export default UseStyles;