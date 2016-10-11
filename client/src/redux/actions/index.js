

export const setUser = (loggedInUser) =>{
  return {
    type: 'SET_USER',
    loggedInUser: loggedInUser
  }
}
