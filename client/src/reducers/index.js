import { combineReducers } from 'redux';
import user from './user_reducer';
import products from './products_reducer';
import trucks from './truck_reducer';

const rootReducer = combineReducers({
    user,
    products,
    trucks
});

export default rootReducer;