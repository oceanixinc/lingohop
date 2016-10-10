const initialState = {
    loggedInUser:''
}

const contentportalreducer = (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }

    switch (action.type) {
        case 'SET_USER':
            return Object.assign({}, state, {loggedInUser: action.loggedInUser})
        default:
            return state
    }
}

export default contentportalreducer
