import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import projectReducer, { getProjectById } from '../../store/project'
import './projectPage.css'


const ProjectPage = () => {

  const project = useSelector(state => state.project.currentProject)
  const { projectId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProjectById(projectId))
  }, [dispatch])


  // console.log(project)

  return (
    <>
      {project && <div>
        <h1>{project.name}</h1>
        <img src={project.thumbnailImgUrl} className='thumbnail'></img>
        <div>{project.description}</div>
      </div>
      }
    </>
  )
}

export default ProjectPage;
