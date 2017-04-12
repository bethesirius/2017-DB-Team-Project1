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
import {AssetConfirm, AssetCreate, AssetEdit, AssetEditRack, AssetForm, AssetList} from "./pages/asset";
import NotFound from "./pages/NotFound";
import {ServiceSelectStorage} from "./pages/service/index";

const store = createStore(reducers, composeWithDevTools(
    // other store enhancers if any
    // applyMiddleware(),
));

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={NotFound}/>
                <Route path="asset">
                    <IndexRoute component={AssetList}/>
                    <Route path="form" component={AssetForm}>
                        <IndexRedirect to="create"/>
                        <Route path="create" component={AssetCreate}/>
                        <Route path="rack/:id/:asset_num" component={AssetEditRack}/>
                        <Route path="edit/:id/:asset_num" component={AssetEdit}/>
                        <Route path="confirm/:id" component={AssetConfirm}/>
                    </Route>
                    <Route path=":id" component={AssetConfirm}/>
                </Route>
                <Route path="service">
                    <IndexRoute component={ServiceList}/>
                    <Route path="form" component={ServiceForm}>
                        <IndexRedirect to="create"/>
                        <Route path="create" component={ServiceCreate}/>
                        <Route path="storage/:id" component={ServiceSelectStorage}/>
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




