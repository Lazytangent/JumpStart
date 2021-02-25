import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import projectReducer, { getProjectById } from "../../store/project";
import "./projectPage.css";

//a single change
const ProjectPage = () => {
  const project = useSelector((state) => state.project.currentProject);
  const { projectId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectById(projectId));
  }, [dispatch]);

  // console.log(project)

  return (
    <>
      {project && (
        <div className="project-container">
          {/* <h1 className="project-header">{project.name}</h1>
          <img src={project.thumbnailImgUrl} className='thumbnail'></img>
          <div>{project.description}</div> */}
          <h1>Grid Layout</h1>
          <p>This grid layout contains six columns and three rows:</p>

          <div class="grid-container">
            <div class="item1 grid-div">
              <h1 className="project-header">{project.name}</h1>
            </div>
            {/* <div class="item2">Menu</div> */}
            <div className="item3">
              <div className="thumbnail">
                <img src={project.thumbnailImgUrl}></img>
              </div>
            </div>
            <div className="item2 grid-div">
              {project.user.username} is organizing this fundraiser
            </div>
            {/* <div class="item3">Main</div> */}
            <div class="item4 grid-div">
              <div class="sticky-container">Donations</div>
            </div>
            <div class="item5 grid-div">
              <ul>
                {project.donations &&
                  project.donations.map((donation, idx) => (
                    <li key={idx} className="donation-listItem">
                      <div className="donation-container">
                        <div className="comment-avatar"></div>
                        <div className="comment-header">
                          {donation.donator} donated $
                          <b>{donation.donationAmount}</b>
                        </div>
                        <div className="comment-content">
                          {donation.comment}
                        </div>
                        <div className="spacer"></div>
                        <div className="comment-footer"></div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            {/* <div class="item6">Another Footer</div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectPage;
