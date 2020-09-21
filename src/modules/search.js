const TOGGLE_SEARCH_BAR = 'search/TOGGLE_SEARCHBAR';
const CLOSE_SEARCH_BAR = 'search/CLOSE_SEARCH_BAR';
const TOGGLE_SEARCH_RESULT = 'search/TOGGLE_SEARCH_RESULT';
const UPDATE_INPUT_VALUE = 'search/UPDATE_INPUT_VALUE';
const UPDATE_SEARCH_DATA = 'search/UPDATE_SEARCH_DATA';

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

// export const updateSearchData = async(data) => ({
//         type: UPDATE_SEARCH_DATA,
//         payload: {
//             newData: data
//         }
// })

const initialState = {
    isBarShow: false,
    isResultShow: false,
    inputValue: '',
    // searchData: []
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
        // case UPDATE_SEARCH_DATA:
        //     return {
        //         ...state,
        //         searchData: action.payload.newData
        //     }
        default:
            return state;
    }
}

export default search;