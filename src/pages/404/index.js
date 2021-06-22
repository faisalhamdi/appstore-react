import React from 'react';
import { Container, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(6),
        padding: theme.spacing(8),
        textAlign: 'center'
    }
}))

export default function NotFound() {
    const classes = useStyles();

    return (
        <Container maxWidth="xs">
            <Paper className={classes.paper}>
                <Typography variant="subtitle1">
                    Halaman tidak ditemukan!
                </Typography>
                <Typography variant="h3">
                    404
                </Typography>
                <Typography component={Link} to="/">
                    Kembali ke halaman Home
                </Typography>
            </Paper>
        </Container>
    )
}