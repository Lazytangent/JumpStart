import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import projectReducer, { getProjectById } from '../../store/project'
import './projectPage.css'

//a single change
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
      {project &&
        <div className="project-container">
          {/* <h1 className="project-header">{project.name}</h1>
          <img src={project.thumbnailImgUrl} className='thumbnail'></img>
          <div>{project.description}</div> */}
          <h1>Grid Layout</h1>
          <p>This grid layout contains six columns and three rows:</p>

          <div class="grid-container">
            <div class="item1"><h1 className="project-header">{project.name}</h1></div>
            {/* <div class="item2">Menu</div> */}
            <div class="item3">
              <div className="item3 thumbnail">
                <img src={project.thumbnailImgUrl}></img>
              </div>
              as;ldkjfa;slkdfja;sldkfja;sldfkj
              as;ldkjfa;slkdfja;sldkfja;sldfkj
              as;ldkjfa;slkdfja;sldkfja;sldfkj
              as;ldkjfa;slkdfja;sldkfja;sldfkj
              as;ldkjfa;slkdfja;sldkfja;sldfkj
              as;ldkjfa;slkdfja;sldkfja;sldfkj
              as;ldkjfa;slkdfja;sldkfja;sldfkj
              as;ldkjfa;slkdfja;sldkfja;sldfkj
              as;ldkjfa;slkdfja;sldkfja;sldfkj
              as;ldkjfa;slkdfja;sldkfja;sldfkj
              as;ldkjfa;slkdfja;sldkfja;sldfkj
            </div>
            {/* <div class="item3">Main</div> */}
            <div class="item4"><div class="sticky-container">Donations</div></div>
            <div class="item5">Comments</div>
            {/* <div class="item6">Another Footer</div> */}

          </div>
        </div>
      }
    </>
  )
}

export default ProjectPage;
