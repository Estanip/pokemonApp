import React from 'react';

import { Switch, Route } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import Home from '../pages/Home/Home';
import Landing from '../pages/Landing/Landing';
import routes from '../helpers/routes';
import Form from '../pages/Form/Form';
import PokemonDetail from '../pages/PokemonDetail/PokemonDetail';

export default function AppRouter() {
    return (
        <Switch>
            <Route exact path={routes.landing} component={Landing} />
            <Route exact path={routes.home} component={Home} />
            <Route exact path={routes.form} component={Form} />
            <Route exact path={routes.pokemonById} component={PokemonDetail} />

            <Route path='*' component={NotFoundPage} />
        </Switch>
    )
}