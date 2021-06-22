import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import UseStyles from './styles';
import { Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { isEmail } from 'validator';

// import firebase
import { useFirebase } from '../../components/FirebaseProvider';

// import app component
import AppLoading from '../../components/AppLoading'

export default function Registrasi(props) {
    const classes = UseStyles();

    const [form, setForm] = useState({
        email: '',
        password: '',
        ulangi_password: ''
    })

    const [error, setError] = useState({
        email: '',
        password: '',
        ulangi_password: ''
    })

    const [isSubmitting, setSubmitting] = useState(false);

    const { auth, user, loading } = useFirebase();

    const handleChange = e => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

        setError({ ...error, [e.target.name]: '' })
    }

    const validate = () => {

        const newError = { ...error };

        if (!form.email) {
            newError.email = 'Email wajib diisi';
        } else if (!isEmail(form.email)) {
            newError.email = 'Email tidak valid';
        }

        if (!form.password) {
            newError.password = 'Password wajib diisi';
        }

        if (!form.ulangi_password) {
            newError.ulangi_password = 'Ulangi Password wajib diisi';
        } else if (form.ulangi_password !== form.password) {
            newError.ulangi_password = 'Ulangi Password tidak sama dengan Password';
        }

        return newError;

    }

    if (loading) {

        return <AppLoading />
    }

    if (user) {
        return <Redirect to="/" />
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const findErrors = validate();

        if (Object.values(findErrors).some(err => err !== '')) {
            setError(findErrors);
        } else {
            try {
                setSubmitting(true)
                await
                    auth.createUserWithEmailAndPassword(form.email, form.password)
            } catch (e) {

                const newError = {};

                switch (e.code) {
                    case 'auth/email-already-in-use':
                        newError.email = 'Email already exists';
                        break;

                    case 'auth/invalid-email':
                        newError.email = 'Email is not valid';
                        break;

                    case "auth/weak-password":
                        newError.password = 'The password is too weak.';
                        break;

                    case 'auth/operation-not-allowed':
                        newError.email = 'Email and Password accounts are not enabled';
                        break;

                    default:
                        newError.email = 'An error occurred please try again!'
                        break;
                }

                // return newError;

                setError(newError);
            }
            setSubmitting(false);
            // console.log(newError);
        }
    }

    // console.log(props)
    // console.log(user)

    return (
        <Container onSubmit={handleSubmit} maxWidth="xs">
            <Paper className={classes.paper}>
                <Typography
                    variant="h5"
                    component="h1"
                    className={classes.title}>
                    Halaman Registrasi
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
                    />

                    <TextField
                        id="ulangi_password"
                        type="password"
                        name="ulangi_password"
                        margin="normal"
                        label="Ulangi Password"
                        fullWidth
                        required
                        value={form.ulangi_password}
                        // onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                        onChange={handleChange}
                        helperText={error.ulangi_password}
                        error={error.ulangi_password ? true : false}
                        disabled={isSubmitting}
                    />

                    <Grid container className={classes.buttons}>
                        <Grid item xs>
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                color="primary"
                                variant="contained"
                                size="large"
                            >Daftar
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button
                                disabled={isSubmitting}
                                component={Link}
                                variant="contained"
                                size="large"
                                to="/login"
                            >Login
                            </Button>
                        </Grid>
                    </Grid>

                </form>

            </Paper>
        </Container >
    );
}