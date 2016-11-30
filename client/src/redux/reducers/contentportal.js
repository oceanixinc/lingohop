const initialState = {
    loggedInUser: '',
    language: 'Hindi',
    country: 'India',
    journey: '',
    region: '',
    track: '',
    category: '',
    lesson: '',
    part: 'one'
}

const contentportalreducer = (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }

    switch (action.type) {
        case 'SET_USER':
            return Object.assign({}, state, {loggedInUser: action.loggedInUser})
        case 'SET_LANGUAGE':
            return Object.assign({}, state, {language: action.language})
        case 'SET_COUNTRY':
            return Object.assign({}, state, {country: action.country})
        case 'SET_JOURNEY':
            return Object.assign({}, state, {journey: action.journey})
        case 'SET_REGION':
            return Object.assign({}, state, {region: action.region})
        case 'SET_TRACK':
            return Object.assign({}, state, {track: action.track})
        case 'SET_CATEGORY':
            return Object.assign({}, state, {category: action.category})
        case 'SET_LESSON':
            return Object.assign({}, state, {lesson: action.lesson})
        case 'SET_PART':
            return Object.assign({}, state, {part: action.part})
        default:
            return state
    }
}

export default contentportalreducer
