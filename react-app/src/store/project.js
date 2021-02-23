const CREATE_PROJECT = 'project/CREATE_PROJECT'
const SET_MOST_POPULAR = 'project/SET_MOST_POPULAR'
const SET_MOST_RECENT = 'project/SET_MOST_RECENT'
const SET_TRENDING = 'project/SET_TRENDING'
const SET_NEAR_YOU = 'project/SET_NEAR_YOU'
const SET_SEARCHED_FOR = 'project/SET_SEARCHED_FOR'


const createNewProject = (project) => {
  return {
    type: CREATE_PROJECT,
    project
  }
}

const setMostPopular = (projects) => {
  return {
    type: SET_MOST_POPULAR,
    projects
  }
}

const setMostRecent = (projects) => {
  return {
    type: SET_MOST_RECENT,
    projects
  }
}
const setTrending = (projects) => {
  return {
    type: SET_TRENDING,
    projects
  }
}
const setNearYou = (projects) => {
  return {
    type: SET_NEAR_YOU,
    projects
  }
}
const setSearchedFor = (projects) => {
  return {
    type: SET_SEARCHED_FOR,
    projects
  }
}





const initialState = {
  mostPopular: null,
  mostRecent: null,
  trending: null,
  nearYou: null,
  searchedFor: null
}


const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOST_POPULAR:
      return { ...state, mostPopular: action.projects }
    case SET_MOST_RECENT:
      return { ...state }
    case SET_TRENDING:
      return { ...state }
    case SET_NEAR_YOU:
      return { ...state }
    case SET_SEARCHED_FOR:
      return { ...state }
    default:
      return state
  }
}

export default projectReducer;
