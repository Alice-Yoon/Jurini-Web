const HIGHLIGHTED_DATE = 'calendar/HIGHLIGHTED_DATE';

export const updateHightlightedDate = (payload) => ({
    type: HIGHLIGHTED_DATE,
    payload
});


const initialState = {
    highlightedDate: ''
}

function calendar(state = initialState, action) {
    switch(action.type) {
        case HIGHLIGHTED_DATE:
            return {
                ...state,
                highlightedDate: action.payload
            }
        default:
            return state;
    }
}

export default calendar;