export default (state, action) => {
    switch(action.type) {
        case "SHOW_SEARCH":
            return {
                ...state,
                showSearchResults: action.payload
            }
        case "NO_SEARCH":
            return {
                ...state,
                showSearchResults: action.payload
            }
        default:
            return state;
    }
}