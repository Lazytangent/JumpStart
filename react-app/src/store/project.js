const SET_MOST_POPULAR = 'project/SET_MOST_POPULAR'
const SET_MOST_RECENT = 'project/SET_MOST_RECENT'
const SET_TRENDING = 'project/SET_TRENDING'
const SET_NEAR_YOU = 'project/SET_NEAR_YOU'
const SET_SEARCHED_FOR = 'project/SET_SEARCHED_FOR'
const SET_CURRENT_PROJECT = 'project/SET_CURRENT_PROJECT'

const setCurrentProject = (project) => {
  return {
    type: SET_CURRENT_PROJECT,
    project
  }
};

const setMostPopular = (projects) => {
  return {
    type: SET_MOST_POPULAR,
    projects
  }
};

const setMostRecent = (projects) => {
  return {
    type: SET_MOST_RECENT,
    projects
  }
};

const setTrending = (projects) => {
  return {
    type: SET_TRENDING,
    projects
  }
};

const setNearYou = (projects) => {
  return {
    type: SET_NEAR_YOU,
    projects
  }
};

export const createProject = (name, description, goalAmount, minPledge, thumbnailImg, userId) => async (dispatch) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('goalAmount', goalAmount);
  formData.append('minPledge', minPledge);
  formData.append('userId', userId);
  if (thumbnailImg) formData.append('thumbnailImg', thumbnailImg);

  const response = await fetch('/api/projects/', {
    method: "POST",
    body: formData,
  });
  const project = await response.json();
  if (!project.errors) {
    dispatch(setCurrentProject(project));
  }
  return project;
};

export const getProjectById = (projectId) => async (dispatch) => {
  const response = await fetch(`/api/projects/${projectId}`)
  const projects = await response.json()
  dispatch(setCurrentProject(projects))
  return projects
};

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
    default:
      return projects
  }
  return projects;
};

export const getHomePageProjectsByLocation = (userId) => async (dispatch) => {
  const response = await fetch(`/api/projects/homepage/${userId}`)
  const projects = await response.json();
  dispatch(setNearYou(projects))
  return projects;
};

export const getDiscoverPageProjectsByLocation = (userId) => async (dispatch) => {
  const response = await fetch(`/api/projects/discoverpage/${userId}`)
  const projects = await response.json();
  dispatch(setNearYou(projects))
  return projects;
};

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
    default:
      return projects
  }
  return projects;
};

const initialState = {
  mostPopular: null,
  mostRecent: null,
  trending: null,
  nearYou: null,
  searchedFor: null,
  currentProject: null
};

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
    case SET_CURRENT_PROJECT:
      return { ...state, currentProject: action.project }
    default:
      return state
  }
};

export default projectReducer;
