import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import projectReducer, { getProjectById } from "../../store/project";
import logo_40x40 from "../SearchBar/logo_40x40.png";
import "./projectPage.css";
import Navigation from "../../components/Navigation/navigation"
import { useModalContext } from "../../context/Modal";
//a single change
const ProjectPage = ({ setAuthenticated }) => {

  const {
    showLoginModal,
    setShowLoginModal,
    showDonateModal,
    setShowDonateModal,
  } = useModalContext();

  const user = useSelector(state => state.session.user)
  const project = useSelector((state) => state.project.currentProject);
  const { projectId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectById(projectId));
  }, [dispatch]);

  // console.log(project)

  return (
    <>
      <Navigation setAuthenticated={setAuthenticated} />
      {project && (
        <div className="project-container">
          {/* <h1 className="project-header">{project.name}</h1>
          <img src={project.thumbnailImgUrl} className='thumbnail'></img>
          <div>{project.description}</div> */}

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
              <div class="sticky-container">
                Donations
                <button onClick={() => {
                  if (user) {
                    setShowDonateModal((prev) => !prev)
                  } else {
                    setShowLoginModal((prev) => !prev)
                  }
                }}>
                  Donate
                </button>
              </div>
            </div>
            <div class="item5 grid-div">
              <h1 className="comments-header">
                Comments ({project.donations.length})
              </h1>
              <ul className="donations-ul">
                {project.donations &&
                  project.donations.map((donation, idx) => (
                    <>
                      {!donation.anonymous && (
                        <li key={idx} className="donation-listItem">
                          <div className="donation-container">
                            <div className="comment-avatar">
                              {donation.donator.profileImageUrl ? (
                                <img
                                  src={donation.donator.profileImageUrl}
                                  className="userProfilePicture"
                                  alt="JumpStart User"
                                ></img>
                              ) : (
                                  <img
                                    src={logo_40x40}
                                    alt="JumpStart Logo"
                                  ></img>
                                )}
                            </div>
                            <div className="comment-header">
                              {donation.donator.username} donated $
                              <b>{donation.donationAmount}</b>
                            </div>
                            <div className="comment-content">
                              {donation.comment}
                            </div>
                            <div className="spacer"></div>
                            <div className="comment-footer"></div>
                          </div>
                        </li>
                      )}
                    </>
                  ))}
                <p>CHECKING</p>
                <p>TO</p>
                <p>MAKE</p>
                <p>SURE</p>
                <p>STICKY</p>
                <p>SLIDES</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
              </ul>
            </div>
            <div className="footer grid-div">
              <p>FOOTER</p>
            </div>
            {/* <div class="item6">Another Footer</div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectPage;
