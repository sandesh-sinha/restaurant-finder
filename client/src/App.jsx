import React, { Fragment } from 'react';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import { RestaurantsContextProvider } from './context/RestaurantsContext';
import Home from './routes/Home';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import UpdatePage from './routes/UpdatePage';
const App = () =>{
    return (
        <Fragment>
            <RestaurantsContextProvider>           
                <div className="container">
                    <Router>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/restaurants/:restaurantid/update' component={UpdatePage} />
                            <Route exact path='/restaurant/:restaurantid' component={RestaurantDetailPage} />
                        </Switch>
                    </Router>
                </div>
            </RestaurantsContextProvider>
        </Fragment>
    )
}
export default App;
