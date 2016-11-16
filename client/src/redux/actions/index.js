export const setUser = (loggedInUser) =>{
  return {
    type: 'SET_USER',
    loggedInUser: loggedInUser
  }
}

export const setLanguage = (language) =>{
  return {
    type: 'SET_LANGUAGE',
    language: language
  }
}

export const setCountry = (country) =>{
  return {
    type: 'SET_COUNTRY',
    country: country
  }
}

export const setJourney = (journey) =>{
  return {
    type: 'SET_JOURNEY',
    journey: journey
  }
}

export const setRegion = (region) =>{
  return {
    type: 'SET_REGION',
    region: region
  }
}

export const setTrack = (track) =>{
  return {
    type: 'SET_TRACK',
    track: track
  }
}

export const setCategory = (category) =>{
  return {
    type: 'SET_CATEGORY',
    category: category
  }
}

export const setLesson = (lesson) =>{
  return {
    type: 'SET_LESSON',
    lesson: lesson
  }
}
