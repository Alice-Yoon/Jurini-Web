const TOGGLE_DETAILS = 'details/TOGGLE_DETAILS';
const UPDATE_DETAIL_SYMBOL = 'details/UPDATE_DETAIL_SYMBOL'

export const toggleDetails = (payload) => ({
    type: TOGGLE_DETAILS,
    payload
});

export const updateDetailSymbol = (payload) => ({
    type: UPDATE_DETAIL_SYMBOL,
    payload
})

const initialState = {
    isDetailShow: false,
    detailSymbol: ''
}

function details(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_DETAILS:
            return {
                ...state,
                isDetailShow: action.payload
            }
        case UPDATE_DETAIL_SYMBOL:
            return {
                ...state,
                detailSymbol: action.payload
            }
        default:
            return state;
    }
}

export default details;