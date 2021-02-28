import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import csc from "country-state-city";

import "./projectPage.css";
import { getProjectById } from "../../store/project";
import logo_40x40 from "../SearchBar/logo_40x40.png";
import Navigation from "../../components/Navigation/navigation";
import { useModalContext } from "../../context/Modal";
import DonateForm from "../../components/DonateForm/DonateForm";
import EditProjectForm from "../../components/EditProject/EditProject";
import EditComment from "../../components/EditComment/EditComment";
import DeleteButton from "./DeleteButton";

const ProjectPage = ({ setAuthenticated }) => {
  const {
    setShowLoginModal,
    showDonateModal,
    setShowDonateModal,
    showEditProjectModal,
    setShowEditProjectModal,
    showEditCommentModal,
    setShowEditCommentModal,
  } = useModalContext();

  const [topThree, setTopThree] = useState([]);

  const user = useSelector((state) => state.session.user);
  const project = useSelector((state) => state.project.currentProject);
  const session = useSelector((state) => state.session.user);
  const { projectId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectById(projectId));
  }, [dispatch, projectId]);

  const editProject = () => {
    setShowEditProjectModal(true);
  };

  useEffect(() => {
    if (project) {
      setTopThree(
        project.donations
          .sort((projectOne, projectTwo) => {
            return projectTwo.donationAmount - projectOne.donationAmount;
          })
          .slice(0, 3)
      );
    }
  }, [project]);

  const getPercentage = (project) => {
    let sum = 0

    for (let i = 0; i < project.donations.length; i++ ) {
        sum += project.donations[i].donationAmount;
    }

    const percentage = (sum/project.goalAmount) * 100;
    if (percentage < 100) return percentage;
    else return 100;
  };

  const getSum = (project) => {
    let sum = 0;

    for (let i = 0; i < project.donations.length; i++) {
      sum += project.donations[i].donationAmount;
    }
    return sum;
  };

  const getStateAbbreviation = (project) => {
    let result;
    const allStates = csc.getStatesOfCountry("US");

    let stateName = project.user.state;

    allStates.forEach((state) => {
      if (state.name === stateName) {
        result = state.isoCode;
      }
    });
    return result;
  };

  return (
    <>
      <Navigation setAuthenticated={setAuthenticated} />
      {showDonateModal && <DonateForm />}
      {showEditProjectModal && <EditProjectForm />}
      {project && (
        <div className="project-container">
          <div class="grid-container">
            <div class="projectHeader">
              <h1 className="bold">{project.name}</h1>
            </div>
            <div className="projectImage">
              <div className="thumbnail">
                <img
                  src={project.thumbnailImgUrl}
                  alt="Varies project to project"
                ></img>
              </div>
            </div>
            <div className="organizer grid-div">
              {project.user.username} is organizing this fundraiser
            </div>
            <div className="description">
              <div>{project.description}</div>
              {project.images.map((img, idx) => (
                <div className="image-description-container">
                  <img
                    alt=""
                    className="images-in-description"
                    src={img.imageUrl}
                  ></img>
                </div>
              ))}
            </div>
            <div class="donations grid-div" id="donations-slider">
              <div class="sticky-container">
                <h1 className="donations-box-header">Donations</h1>
                <div id="projectCard-amount-projectPage">{`$${getSum(
                  project
                )} raised out of $${project.goalAmount}`}</div>
                <div id="meter-productPage">
                  <span
                    id="progressBar"
                    style={{ width: `${getPercentage(project)}%` }}
                  ></span>
                </div>
                <button
                  className="donate-box-button"
                  onClick={() => {
                    if (user !== null) {
                      setShowDonateModal(true);
                    } else {
                      setShowLoginModal((prev) => !prev);
                    }
                  }}
                >
                  Donate
                </button>
                <p className="top-donors">Top Donors</p>
                <div className="top-donors-container">
                  {topThree &&
                    topThree.map((project) => (
                      <div className="comment-avatar-sticky">
                        {project.donator.profileImageUrl ? (
                          <div className="logoBackground-sticky">
                            <img
                              src={project.donator.profileImageUrl}
                              className="userProfilePictureSticky"
                              alt="JumpStart User"
                            ></img>
                          </div>
                        ) : (
                          <div className="logoBackground-sticky">
                            <img
                              className="sticky-logo"
                              src={logo_40x40}
                              alt="JumpStart Logo"
                            ></img>
                          </div>
                        )}
                        <div className="top-donor-name">{`${
                          project.donator.username
                        } $${Number(project.donationAmount)}`}</div>
                      </div>
                    ))}
                  <div className="numberOfDonators">
                    <h1 className="numberOfDonators-text">{`Total donations: ${project.donations.length}`}</h1>
                  </div>
                </div>
                {session && project.userId && session.id === project.userId && (
                  <>
                    <button
                      className="editYourProject-button"
                      onClick={editProject}
                    >
                    Edit Project
                    </button>
                    <DeleteButton />
                  </>
                )}
              </div>
            </div>
            <div class="comments grid-div">
              <h1 className="comments-header">
                {/* As of Thursday night, this won't exclude anonymous donations
              So the count will probably (not tested) display a higher number than comments shown*/}
                Donations ({project.donations.length})
              </h1>
              <ul className="donations-ul">
                {project.donations &&
                  project.donations.map((donation, idx) => (
                    <>
                      <li key={idx} className="donation-listItem">
                        <div className="donation-container">
                          <div className="comment-avatar">
                            {donation.donator.profileImageUrl ? (
                              <div className="logoBackground">
                                <img
                                  src={donation.donator.profileImageUrl}
                                  className="userProfilePicture"
                                  alt="JumpStart User"
                                ></img>
                              </div>
                            ) : (
                              <div className="logoBackground">
                                <img
                                  src={logo_40x40}
                                  alt="JumpStart Logo"
                                ></img>
                              </div>
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
                          <div className="comment-footer">
                            {session &&
                              donation.userId &&
                              session.id === donation.userId && (
                                <button
                                  className="editComment-button"
                                  onClick={() => {
                                    setShowEditCommentModal((prev) => !prev);
                                  }}
                                >
                                  Edit Comment
                                </button>
                              )}
                            {showEditCommentModal && <EditComment idx={idx} />}
                          </div>
                        </div>
                      </li>
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
          </div>
          <div>d</div>
        </div>
      )}
    </>
  );
};

export default ProjectPage;
