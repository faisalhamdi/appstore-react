import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home';
import Pengaturan from './pengaturan';
import Produk from './produk';
import Transaksi from './transaksi';

function Private() {

    return (
        <Switch>
            <Route path="/pengaturan" component={Pengaturan} />
            <Route path="/produk" component={Produk} />
            <Route path="/transaksi" component={Transaksi} />
            <Route component={Home} />
        </Switch>
    )
}

export default Private;