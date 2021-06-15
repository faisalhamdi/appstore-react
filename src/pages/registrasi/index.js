import React from 'react';
import Button from '@material-ui/core/Button';
import UseStyles from './styles';
import { Container, Paper, TextField, Typography } from '@material-ui/core';

export default function Registrasi() {
    
    const classes = UseStyles();

    return (
        <Container maxWidth="xs">
            <Paper className={classes.paper}>
                <Typography
                variant="h5"
                component="h1"
                className={classes.title}>Halaman Registrasi</Typography>
                
                <form>
                    <TextField
                        id="email"
                        type="email"
                        name="email"
                        margin="normal"
                        label="Alamat Email"
                        fullWidth
                        required
                    />

                    <TextField
                        id="password"
                        type="password"
                        name="password"
                        margin="normal"
                        label="Password"
                        fullWidth
                        required
                    />

                    <TextField
                        id="ulangi_password"
                        type="password"
                        name="ulangi_password"
                        margin="normal"
                        label="Ulangi Password"
                        fullWidth
                        required
                    />

                    
                </form>

                <Button color="primary" variant="contained">Click</Button>
            </Paper>
        </Container>
    );
}