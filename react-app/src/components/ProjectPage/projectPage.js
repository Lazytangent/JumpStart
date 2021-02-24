import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import projectReducer, { getProjectById } from '../../store/project'
import './projectPage.css'


const ProjectPage = () => {

  const { projectId } = useParams()


  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getProjectById(projectId))
  }, [dispatch])

  return (
    <h1>Hello</h1>
  )
}

export default ProjectPage;
