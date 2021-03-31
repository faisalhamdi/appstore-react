import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './pages/404';
import Login from './pages/login';
import LupaPassword from './pages/lupa-password';
import Private from './pages/private';
import Produk from './pages/private/produk';
import Registrasi from './pages/registrasi';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/pengaturan" component={Private} />
                <Route path="/produk" component={Produk} />
                <Route path="/registrasi" component={Registrasi} />
                <Route path="/login" component={Login} />
                <Route path="/lupa-password" component={LupaPassword} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}

export default App;
