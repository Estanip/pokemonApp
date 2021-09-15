import React from 'react';

import { Switch, Route } from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage';
import HomePage from '../pages/HomePage';

export default function AppRouter() {
    return (
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='*' component={NotFoundPage}/>
        </Switch>
    )
}