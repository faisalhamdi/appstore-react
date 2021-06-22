import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Paper, Typography, TextField, Grid, Button, Snackbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { isEmail } from 'validator';
import { useFirebase } from '../../components/FirebaseProvider';
import Alert from '@material-ui/lab/Alert';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: 'center',
    },
    paper: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(6),
    },
    buttons: {
        marginTop: theme.spacing(5)
    }
}))

export default function LupaPassword() {
    const classes = useStyles();

    const { auth } = useFirebase();

    const [form, setForm] = useState({
        email: ''
    });

    const [error, setError] = useState({
        email: ''
    })

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setError({
            ...error,
            [e.target.name]: ''
        })
    }

    const [isSubmit, setSumbit] = useState(false)

    const validate = () => {
        const newError = { ...error }

        if (!form.email) {
            newError.email = 'email wajib diisi';
        } else if (!isEmail(form.email)) {
            newError.email = 'invalid email';
        }

        return newError;

    }

    const handleSubmit = async e => {
        e.preventDefault()
        const findErrors = validate();

        if (Object.values(findErrors).some(err => err !== '')) {
            setError(findErrors);
        } else {
            try {
                setSumbit(true);
                const actionCodeSettings = {
                    url: `${window.location.origin}/login`
                };
                await auth.sendPasswordResetEmail(form.email, actionCodeSettings);

                enqueueSnackbar(`check your email: ${form.email}, a link to reset password has sent`,
                    { variant: 'success' });
            } catch (e) {

                const newError = {};

                switch (e.code) {
                    case 'auth/invalid-email':
                        newError.email = 'email address is not valid.';
                        break;
                    case 'auth/user-not-found':
                        newError.email = 'email is not registered!';
                        break;
                    default:
                        newError.email = 'An error occurred please try again!';
                        break;
                }
            }

            setSumbit(false)
        };
    }

    const { enqueueSnackbar } = useSnackbar();

    // const [open, setOpen] = useState(false);

    // const handleClick = () => {
    //     setOpen(true);
    // };

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }

    //     setOpen(false);
    // };

    console.log(error);
    // console.log(form);

    return (

        <Container onSubmit={handleSubmit} maxWidth='xs'>

            {/* <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    This is a success message!
                </Alert>
            </Snackbar> */}
            <Paper className={classes.paper}>
                <Typography
                    component='h1'
                    variant='h5'
                    className={classes.title}
                >
                    Halaman Lupa Password
                </Typography>

                <form noValidate>
                    <TextField
                        id="email"
                        type="email"
                        name="email"
                        margin="normal"
                        label="Alamat Email"
                        fullWidth
                        required
                        value={form.email}
                        // onChange={(e) => { setForm({ ...form, [e.target.name]: e.target.value }) }}
                        onChange={handleChange}
                        helperText={error.email}
                        error={error.email ? true : false}
                        disabled={isSubmit}
                    />

                    <Grid container className={classes.buttons}>
                        <Grid item xs>
                            <Button
                                disabled={isSubmit}
                                variant="contained"
                                size="large"
                                type="submit"
                                color="primary"
                            // onClick={handleClick}
                            >Kirim
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button
                                disabled={isSubmit}
                                variant="contained"
                                size="large"
                                component={Link}
                                to="/login"
                            >Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>

            </Paper>
        </Container>
    );
}