import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import App from '../pages/App';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Rigister from '../pages/Register';

const Router = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" exact component={App}/>
                <Route path="/login" component={Login}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/register" component={Rigister}/>
                <Route component={NotFound}/>
            </Switch>
        </HashRouter>
    )
}

export default Router;