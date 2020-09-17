const TOGGLE_DETAILS = 'details/TOGGLE_DETAILS';

export const toggleDetails = (payload) => ({
    type: TOGGLE_DETAILS,
    payload
});

const initialState = {
    isDetailShow: false,
}

function details(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_DETAILS:
            return {
                ...state,
                isDetailShow: action.payload
            }
        default:
            return state;
    }
}

export default details;