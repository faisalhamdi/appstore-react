import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './pages/404';
import Login from './pages/login';
import LupaPassword from './pages/lupa-password';
import Private from './pages/private';
import Registrasi from './pages/registrasi';
import PrivateRoute from './components/PrivateRoute';
import FirebaseProvider from './components/FirebaseProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './config/theme';

export default function App() {
    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <FirebaseProvider>
                    <Router>
                        <Switch>
                            <PrivateRoute path="/" exact component={Private} />
                            <PrivateRoute path="/pengaturan" component={Private} />
                            <PrivateRoute path="/produk" component={Private} />
                            <PrivateRoute path="/transaksi" component={Private} />
                            <Route path="/registrasi" component={Registrasi} />
                            <Route path="/login" component={Login} />
                            <Route path="/lupa-password" component={LupaPassword} />
                            <Route component={NotFound} />
                        </Switch>
                    </Router>
                </FirebaseProvider>
            </ThemeProvider>
        </>
    );
}
