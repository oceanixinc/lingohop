import {connect} from 'react-redux'

import {
    setUser,
    setLanguage,
    setCountry,
    setJourney,
    setRegion,
    setTrack,
    setCategory,
    setLesson,
    setPart
} from '../redux/actions/index'
import ContentPortalBuildSearchPage from '../pages/ContentPortalBuildSearchPage'

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser,
        language: state.language,
        country: state.country,
        journey: state.journey,
        region: state.region,
        track: state.track,
        category: state.category,
        lesson: state.lesson,
        part: state.part
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (a) => {
            dispatch(setUser(a))
        },
        setLanguage: (a) => {
            dispatch(setLanguage(a))
        },
        setCountry: (a) => {
            dispatch(setCountry(a))
        },
        setJourney: (a) => {
            dispatch(setJourney(a))
        },
        setRegion: (a) => {
            dispatch(setRegion(a))
        },
        setTrack: (a) => {
            dispatch(setTrack(a))
        },
        setCategory: (a) => {
            dispatch(setCategory(a))
        },
        setLesson: (a) => {
            dispatch(setLesson(a))
        },
        setPart: (a) => {
            dispatch(setPart(a))
        }
    }
}

const ReduxContentPortalBuildSearchPage = connect(mapStateToProps, mapDispatchToProps)(ContentPortalBuildSearchPage)

export default ReduxContentPortalBuildSearchPage
