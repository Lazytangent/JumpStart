import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

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
  const [donations, setDonations] = useState([]);

  const user = useSelector((state) => state.session.user);
  const project = useSelector((state) => state.project.currentProject);
  const session = useSelector((state) => state.session.user);
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [donationId, setDonationId] = useState();

  useEffect(() => {
    dispatch(getProjectById(projectId));
  }, [dispatch, projectId]);

  const editProject = () => {
    setShowEditProjectModal(true);
  };

  useEffect(() => {
    if (project) {
      const arr = project.donations.slice();
      setTopThree(
        arr
          .sort((projectOne, projectTwo) => {
            return projectTwo.donationAmount - projectOne.donationAmount;
          })
          .slice(0, 3)
      );
      const sortedDonations = project.donations.slice();
      setDonations(
        sortedDonations.sort((projectOne, projectTwo) => {
          return projectTwo.id - projectOne.id;
        })
      );
    }
  }, [project]);

  const getPercentage = (project) => {
    let sum = 0;

    for (let i = 0; i < project.donations.length; i++) {
      sum += project.donations[i].donationAmount;
    }

    const percentage = (sum / project.goalAmount) * 100;
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

  return (
    <>
      <Navigation setAuthenticated={setAuthenticated} />
      {showDonateModal && <DonateForm />}
      {showEditProjectModal && <EditProjectForm />}
      {showEditCommentModal && <EditComment id={donationId} />}

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
                ).toLocaleString()} raised out of $${project.goalAmount.toLocaleString()}`}</div>
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
                          `${!project.anonymous ?
                              `${project.donator.username}` :
                              "Anonymous"}`
                        } $${Number(
                          project.donationAmount
                        ).toLocaleString()}`}</div>
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
                  donations.map((donation, idx) => (
                    <>
                      <li key={idx} className="donation-listItem">
                        <div className="donation-container">
                          <div className="comment-avatar">
                            {donation.donator.profileImageUrl &&
                            donation.anonymous === false ? (
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
                            {donation.anonymous === false
                              ? donation.donator.username
                              : "Anonymous"}{" "}
                            donated
                            <b> ${donation.donationAmount.toLocaleString()}</b>
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
                                    setDonationId(donation.id);
                                    setShowEditCommentModal((prev) => !prev);
                                  }}
                                >
                                  Edit Comment
                                </button>
                              )}
                            {/* {showEditCommentModal && <EditComment idx={donationId} />} */}
                          </div>
                        </div>
                      </li>
                    </>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectPage;
