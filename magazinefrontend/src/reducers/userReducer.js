const defaultState = {
    loggedIn: false,
    user: {}
};

export default function userReducer(state = defaultState, action) {
    console.log("User Reducer");
    switch (action.type) {
        case "SET_USER":
            Object.assign(state, action);
            console.log("User is set to online");
            return {
                ...state,
                loggedIn: true,
                user: {...action.payload}
            };
        case "LOG_OUT":
            localStorage.clear();
            return {
                ...state,
                loggedIn: false,
                user: {}
            };
        default:
            return state
    }
};
