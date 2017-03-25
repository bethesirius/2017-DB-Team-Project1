import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {syncHistoryWithStore} from "react-router-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
// -- import main component --
import reducers from "./redux";
import "./index.css";

import App from "./pages/App";
import Home from "./pages/Home";
import Rack from "./pages/Rack";
import NotFound from "./pages/NotFound";

const store = createStore(reducers, composeWithDevTools(
    // other store enhancers if any
    // applyMiddleware(),
));

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="rack" component={Rack}/>
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
