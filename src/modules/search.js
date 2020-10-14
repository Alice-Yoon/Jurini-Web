const TOGGLE_SEARCH_BAR = 'search/TOGGLE_SEARCHBAR';
const CLOSE_SEARCH_BAR = 'search/CLOSE_SEARCH_BAR';
const TOGGLE_SEARCH_RESULT = 'search/TOGGLE_SEARCH_RESULT';
const UPDATE_INPUT_VALUE = 'search/UPDATE_INPUT_VALUE';

export const toggleSearchBar = () => ({
    type: TOGGLE_SEARCH_BAR,
});

export const closeSearchBar = (payload) => ({
    type: CLOSE_SEARCH_BAR,
    payload
})

export const toggleSearchResult = (payload) => ({
    type: TOGGLE_SEARCH_RESULT,
    payload
})

export const updateInputValue = (value) => ({
    type: UPDATE_INPUT_VALUE,
    payload: {
        newValue: value
    }
})

const initialState = {
    isBarShow: false,
    isResultShow: false,
    inputValue: '',
}

function search(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_SEARCH_BAR:
            return {
                ...state,
                isBarShow: !state.isBarShow
            }
        case CLOSE_SEARCH_BAR:
            return {
                ...state,
                isBarShow: action.payload
            }
        case TOGGLE_SEARCH_RESULT:
            return {
                ...state,
                isResultShow: action.payload
            }
        case UPDATE_INPUT_VALUE:
            return {
                ...state,
                inputValue: action.payload.newValue
            }
        default:
            return state;
    }
}

export default search;