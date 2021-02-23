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

export const getHomePageProjects = (optionalParameter) => async (dispatch) => {
  const response = await fetch(`/api/projects/homepage/${optionalParameter}`)
  const projects = await response.json();
  switch (optionalParameter) {
    case 'popular':
      dispatch(setMostPopular(projects))
      break
    case 'recent':
      dispatch(setMostRecent(projects))
      break
    case 'trending':
      dispatch(setTrending(projects))
      break
    case 'location':
      dispatch(setNearYou(projects))
      break
    case 'searchedFor':
      dispatch(setSearchedFor(projects))
      break
    default:
      return projects
  }
  return projects;
}


export const getDiscoverPageProjects = (optionalParameter) => async (dispatch) => {
  const response = await fetch(`/api/projects/discoverpage/${optionalParameter}`)
  const projects = await response.json();
  switch (optionalParameter) {
    case 'popular':
      dispatch(setMostPopular(projects))
      break
    case 'recent':
      dispatch(setMostRecent(projects))
      break
    case 'trending':
      dispatch(setTrending(projects))
      break
    case 'location':
      dispatch(setNearYou(projects))
      break
    case 'searchedFor':
      dispatch(setSearchedFor(projects))
      break
    default:
      return projects
  }
  return projects;
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
      return { ...state, mostRecent: action.projects }
    case SET_TRENDING:
      return { ...state, trending: action.projects }
    case SET_NEAR_YOU:
      return { ...state, nearYou: action.projects }
    case SET_SEARCHED_FOR:
      return { ...state, searchedFor: action.projects }
    default:
      return state
  }
}

export default projectReducer;
