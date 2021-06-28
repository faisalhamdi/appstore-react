import React from 'react';

// import material-ui
import { Tabs, Tab, Paper } from '@material-ui/core';

import { Switch, Route, Redirect } from 'react-router-dom';
import Pengguna from './pengguna';
import Toko from './toko';
import styles from './styles';

// styles
import useStyles from './styles'

function Pengaturan(props) {

    const classes = useStyles();
    const { location, history } = props;

    const handleChangeTab = (event, value) => {
        history.push(value);
    }

    return (
        <Paper square>
            <Tabs
                value={location.pathname}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChangeTab}
            >
                <Tab label="Pengguna" value="/pengaturan/pengguna" />
                <Tab label="Toko" value="/pengaturan/toko" />
            </Tabs>
            <div className={classes.tabContent}>
                <Switch>
                    <Route path="/pengaturan/pengguna" component={Pengguna} />
                    <Route path="/pengaturan/toko" component={Toko} />
                    <Redirect to="/pengaturan/pengguna" />
                </Switch>
            </div>
        </Paper>
    )
}

export default Pengaturan;