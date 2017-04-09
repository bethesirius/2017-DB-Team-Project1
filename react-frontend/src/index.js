import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {syncHistoryWithStore} from "react-router-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {browserHistory, IndexRedirect, IndexRoute, Route, Router} from "react-router";
// -- import main component --
import reducers from "./redux";
import "./index.css";

import App from "./pages/App";
import Server from "./pages/Server";
import Switch from "./pages/Switch";
import Storage from "./pages/Storage";
import Rack from "./pages/Rack";
import {ServiceConfirm, ServiceCreate, ServiceEdit, ServiceForm, ServiceList} from "./pages/service";
import {AssetConfirm, AssetCreate, AssetEdit, AssetForm, AssetList} from "./pages/asset";
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
                <IndexRedirect to="asset/form"/>
                <Route path="asset">
                    <IndexRoute component={AssetList}/>
                    <Route path="form" component={AssetForm}>
                        <IndexRedirect to="create"/>
                        <Route path="create" component={AssetCreate}/>
                        <Route path="edit/:id" component={AssetEdit}/>
                        <Route path="confirm/:id" component={AssetConfirm}/>
                    </Route>
                    <Route path=":id" component={AssetConfirm}/>
                </Route>
                <Route path="service">
                    <IndexRoute component={ServiceList}/>
                    <Route path="form" component={ServiceForm}>
                        <IndexRedirect to="create"/>
                        <Route path="create" component={ServiceCreate}/>
                        <Route path="edit/:id" component={ServiceEdit}/>
                        <Route path="confirm/:id" component={ServiceConfirm}/>
                    </Route>
                    <Route path=":id" component={ServiceConfirm}/>
                </Route>
                <Route path="server" component={Server}/>
                <Route path="switch" component={Switch}/>
                <Route path="storage" component={Storage}/>
                <Route path="rack" component={Rack}/>
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
