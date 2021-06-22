import React from 'react';
import { Container, Typography, LinearProgress } from '@material-ui/core';
import UseStyles from './style';

export default function AppLoading() {

    const classes = UseStyles();

    return (
        <Container maxWidth='xs' className={classes.loadingBox}>
            <div className={classes.title}>
                <Typography
                    variant='h6'
                    component='h2'
                // align='center'
                // color='primary'
                >
                    Aplikasi Penjualan
                </Typography>
                <LinearProgress />
            </div >
        </Container >
    )
}