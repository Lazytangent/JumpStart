const CREATE_PROJECT = 'session/CREATE_PROJECT'

const createNewProject = (project) => {
  return {
    type: CREATE_PROJECT,
    project
  }
}
