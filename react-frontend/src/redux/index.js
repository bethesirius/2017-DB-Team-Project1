/**
 * Created by rino0 on 2017-03-17.
 */
import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import {routerReducer} from "react-router-redux";

export default combineReducers({
    routing: routerReducer,
    form: formReducer,
});