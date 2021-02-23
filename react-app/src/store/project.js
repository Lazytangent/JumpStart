const CREATE_PROJECT = 'project/CREATE_PROJECT'
const GET_MOST_POPULAR = 'project/GET_MOST_POPULAR'
const GET_MOST_RECENT = 'project/GET_MOST_RECENT'
const GET_TRENDING = 'project/GET_TRENDING'
const GET_NEAR_YOU = 'project/GET_NEAR_YOU'
const GET_SEARCHED_FOR = 'project/GET_SEARCHED_FOR'


const createNewProject = (project) => {
  return {
    type: CREATE_PROJECT,
    project
  }
}

const getMostPopular = (projects) => {
  return {
    type: GET_MOST_POPULAR,
    projects
  }
}

const getMostRecent = (projects) => {
  return {
    type: GET_MOST_RECENT,
    projects
  }
}
const getTrending = (projects) => {
  return {
    type: GET_TRENDING,
    projects
  }
}
const getNearYou = (projects) => {
  return {
    type: GET_NEAR_YOU,
    projects
  }
}
const getSearchedFor = (projects) => {
  return {
    type: GET_SEARCHED_FOR,
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
    case GET_MOST_POPULAR:
      return { ...state, mostPopular: action.projects }
    case GET_MOST_RECENT:
      return { ...state }
    case GET_TRENDING:
      return { ...state }
    case GET_NEAR_YOU:
      return { ...state }
    case GET_SEARCHED_FOR:
      return { ...state }
    default:
      return state
  }
}

export default projectReducer;
