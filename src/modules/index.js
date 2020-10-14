import { combineReducers } from 'redux';
import details from './details';
import search from './search';
import calendar from './calendar';

const rootReducer = combineReducers({
    details,
    search,
    calendar
})

export default rootReducer;