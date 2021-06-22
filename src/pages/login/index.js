import React, { useState } from 'react';

import { Container, Paper, Typography, TextField, Button, Grid } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom';

import UseStyles from './style';
import { useFirebase } from '../../components/FirebaseProvider';
import AppLoading from '../../components/AppLoading';

import { isEmail } from 'validator';

export default function Login(props) {

    const { location } = props;
    console.log(props);

    const classes = UseStyles();

    const { auth, user, loading } = useFirebase();

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState({
        email: '',
        password: ''
    })

    const [isSubmit, setSubmit] = useState(false);

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

    const validate = () => {
        const newError = { ...error }

        if (!form.email) {
            newError.email = 'Email wajib diisi!';
        } else if (!isEmail(form.email)) {
            newError.email = 'invalid email';
        }

        if (!form.password) {
            newError.password = 'Password wajib diisi!';
        }

        return newError;
    }

    if (loading) {
        return <AppLoading />
    }

    if (user) {
        console.log(user);
        const redirectTo = location.state &&
            location.state.from &&
            location.state.from.pathname ?
            location.state.from.pathname : '/';

        return <Redirect to={redirectTo} />
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const findErrors = validate();

        if (Object.values(findErrors).some(err => err !== '')) {
            setError(findErrors);
        } else {
            try {
                setSubmit(true)
                await auth.signInWithEmailAndPassword(form.email, form.password)
            } catch (e) {
                const newError = {};

                switch (e.code) {
                    case 'auth/invalid-email':
                        newError.email = 'email is not valid'
                        break;

                    case 'auth/user-not-found':
                        newError.email = 'email is not found'
                        break;

                    case 'auth/wrong-password':
                        newError.password = 'wrong password'
                        break;

                    case 'auth/user-disable':
                        newError.email = 'email is blocked'
                        break;

                    default:
                        newError.email = 'An error occurred please try again!'
                        break;
                }

                console.log(newError);
                setError(newError);
                setSubmit(false);

            }
        }
    }

    // console.log(user);

    return (
        <Container onSubmit={handleSubmit} maxWidth="xs">
            <Paper className={classes.paper}>
                <Typography
                    variant="h5"
                    component="h1"
                    className={classes.title}>
                    Halaman Login
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
                        // onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                        onChange={handleChange}
                        helperText={error.email}
                        error={error.email ? true : false}
                        disabled={isSubmit}
                    />

                    <TextField
                        id="password"
                        type="password"
                        name="password"
                        margin="normal"
                        label="Password"
                        fullWidth
                        required
                        value={form.password}
                        // onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                        onChange={handleChange}
                        helperText={error.password}
                        error={error.password ? true : false}
                        disabled={isSubmit}
                    />

                    <Grid container className={classes.buttons}>
                        <Grid item xs>
                            <Button
                                disable={isSubmit}
                                variant="contained"
                                size="large"
                                color="primary"
                                type="submit"
                            >Login
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button
                                disable={isSubmit}
                                variant="contained"
                                size='large'
                                component={Link}
                                to="/registrasi"
                            >Daftar
                            </Button>
                        </Grid>
                    </Grid>

                    <div className={classes.forgotPassword}>
                        <Typography component={Link} to="/lupa-password">
                            Lupa Password
                        </Typography>
                    </div>

                </form>

            </Paper>
        </Container >
    );
}