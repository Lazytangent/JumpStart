import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, NavLink } from "react-router-dom";
import csc from "country-state-city";

import "./homePage.css";
import { getHomePageProjects } from "../../store/project.js";
import { useModalContext } from "../../context/Modal";
import { logout } from "../../store/session";
import SearchBar from "../SearchBar/SearchBar";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import { getDiscoverPageProjects } from "../../store/project";

// The debounce function receives our function as a parameter
const debounce = (fn) => {
  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame;

  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params) => {
    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) {
      cancelAnimationFrame(frame);
    }

    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {
      // Call our function and pass any params we received
      fn(...params);
    });
  };
};
// Reads out the scroll position and stores it in the data attribute
// so we can use it in our stylesheets
const storeScroll = () => {
  document.documentElement.dataset.scroll = window.scrollY;
};

// Listen for new scroll events, here we debounce our `storeScroll` function
document.addEventListener("scroll", debounce(storeScroll), { passive: true });

// Update scroll position for first time
storeScroll();

const HomePage = ({ setAuthenticated }) => {
  const {
    showLoginModal,
    setShowLoginModal,
    showSignUpModal,
    setShowSignUpModal,
    showSearchBarModal,
    setShowSearchBarModal,
  } = useModalContext();

  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getHomePageProjects("popular"));
    dispatch(getHomePageProjects("recent"));
    dispatch(getHomePageProjects("trending"));
  }, [dispatch]);

  const mostPopular = useSelector((state) => state.project.mostPopular);
  const mostRecent = useSelector((state) => state.project.mostRecent);
  const trending = useSelector((state) => state.project.trending);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (mostPopular && mostRecent && trending) {
      setIsLoaded(true);
    }
  }, [mostPopular, mostRecent, trending]);

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

  // const donateButton = (event) => {
  //     event.preventDefault()
  //     history.push("/discover")
  // };

  const seeMorePopular = async (event) => {
    event.preventDefault();
    await dispatch(getDiscoverPageProjects("popular"));
    history.push("/discover", { comingFrom: "popular" });
  };

  const seeMoreRecent = async (event) => {
    event.preventDefault();
    await dispatch(getDiscoverPageProjects("recent"));
    history.push("/discover", { comingFrom: "recent" });
  };

  const seeMoreTrending = async (event) => {
    event.preventDefault();
    await dispatch(getDiscoverPageProjects("trending"));
    history.push("/discover", { comingFrom: "trending" });
  };

  const onLogout = async (e) => {
    history.push("/");
    await dispatch(logout());
    setAuthenticated(false);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <nav>
        <ul className="navBar">
          <div className="navBar-first-fraction">
            <NavLink
              className="navBar-home"
              to="/"
              exact={true}
              onClick={() => {
                setShowSignUpModal(false);
                setShowLoginModal(false);
              }}
            >
              JumpStart
              <img className="navBar-logo" src="logo.png" alt=""></img>
            </NavLink>
          </div>
          <div className="navBar-second-fraction">
            <div id="navBar-button-container">
              <button
                className="navBar-buttons-create"
                onClick={() => {
                  if (user) {
                    setShowLoginModal(false);
                    setShowSignUpModal(false);
                    history.push("/new-project");
                  } else {
                    setShowLoginModal((prev) => !prev);
                    setShowSignUpModal(false);
                  }
                }}
              >
                Create a project
              </button>
            </div>
            {!user && (
              <div id="navBar-button-container">
                {!user && (
                  <button
                    id="navBar-buttons"
                    className="navBar-buttons-signup"
                    onClick={() => {
                      setShowLoginModal(false);
                      setShowSignUpModal((prev) => !prev);
                    }}
                  >
                    Sign up
                  </button>
                )}
                {showSignUpModal && (
                  <SignUpForm setAuthenticated={setAuthenticated} />
                )}
              </div>
            )}
            {!user && (
              <div id="navBar-button-container">
                {!user && (
                  <button
                    id="navBar-buttons"
                    className="navBar-buttons-login"
                    onClick={() => {
                      setShowSignUpModal(false);
                      setShowLoginModal((prev) => !prev);
                    }}
                  >
                    Login
                  </button>
                )}
                {showLoginModal && (
                  <LoginForm setAuthenticated={setAuthenticated} />
                )}
              </div>
            )}
            {user && (
              <div id="navBar-button-container">
                <button
                  id="navBar-buttons"
                  className="navBar-buttons-login"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </div>
            )}
            <div id="navBar-button-container">
              {
                <button
                  id="navBar-buttons"
                  className="navBar-buttons-search"
                  onClick={() => {
                    setShowSignUpModal(false);
                    setShowLoginModal(false);
                    setShowSearchBarModal((prev) => !prev);
                  }}
                >
                  <i className="far fa-search"></i>Search
                </button>
              }
              {showSearchBarModal && <SearchBar />}
            </div>
          </div>
        </ul>
      </nav>
      <div className="homePage">
        <div className="homePage-image-container">
          <img
            className="homePage-image"
            src="https://jumpstartjesse.s3.us-east-2.amazonaws.com/pexels-brett-sayles-2821225.jpg"
            alt=""
          ></img>
        </div>
        <div className="homePage-description-box">
          <img
            className="homePage-description-image"
            src="https://jumpstartjesse.s3.us-east-2.amazonaws.com/pexels-rodnae-productions-6647119.jpg"
            alt=""
          ></img>
          <p className="homePage-description-box-body">
            Fundraising for the people and places you care about. Joining is
            easy, start finding causes you care about, and give them a Jump!
          </p>
          <div className="homePage-description-box-button-container">
            <button
              onClick={(event) => seeMoreRecent(event)}
              className="homePage-description-box-button"
            >
              Donate
              <img className="description-box-logo" src="logo.png" alt=""></img>
            </button>
          </div>
        </div>
        <div className="homePage-grid">
          <h2 className="homePage-mostPopular-header">Most popular causes</h2>
          <div className="homePage-grid-most-popular">
            <div id="homePage-project-grid">
              {mostPopular &&
                mostPopular.map((project) => (
                  <Link
                    id="homePage-project-card-link"
                    key={project.id}
                    to={`${project.id}`}
                  >
                    <div id="homePage-project-card" value={project.id}>
                      <div className="project-card-image-container">
                        <img
                          id="projectCard-img"
                          src={project.thumbnailImgUrl}
                          alt=""
                          className="project-card-image"
                        ></img>
                      </div>
                      <div id="homePage-project-card-text">
                        <div id="projectCard-location">{`${
                          project.user.city
                        },${getStateAbbreviation(project)}`}</div>
                        <div id="projectCard-title">{project.name}</div>
                        <div id="projectCard-description">
                          {project.description}
                        </div>
                        <div id="meter">
                          <span
                            id="progressBar"
                            style={{ width: `${getPercentage(project)}%` }}
                          ></span>
                        </div>
                        <div id="projectCard-amount">{`$${getSum(
                          project
                        ).toLocaleString()} raised out of $${project.goalAmount.toLocaleString()}`}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              <div id="homePage-see-more">
                <button
                  onClick={(event) => seeMorePopular(event)}
                  id="homePage-see-more-text"
                >
                  See more{" "}
                  <i
                    id="homePage-right-arrow"
                    className="far fa-arrow-alt-circle-right"
                  ></i>
                </button>
              </div>
            </div>
          </div>
          <h2 className="homePage-mostRecent-header">
            Most recent fundraisers
          </h2>
          <div className="homePage-grid-most-recent">
            <div id="homePage-project-grid">
              {mostRecent &&
                mostRecent.map((project) => (
                  <Link
                    id="homePage-project-card-link"
                    key={project.id}
                    to={`${project.id}`}
                  >
                    <div id="homePage-project-card" value={project.id}>
                      <div className="project-card-image-container">
                        <img
                          id="projectCard-img"
                          src={project.thumbnailImgUrl}
                          alt=""
                          className="project-card-image"
                        ></img>
                      </div>
                      <div id="homePage-project-card-text">
                        <div id="projectCard-location">{`${
                          project.user.city
                        },${getStateAbbreviation(project)}`}</div>
                        <div id="projectCard-title">{project.name}</div>
                        <div id="projectCard-description">
                          {project.description}
                        </div>
                        <div id="meter">
                          <span
                            id="progressBar"
                            style={{ width: `${getPercentage(project)}%` }}
                          ></span>
                        </div>
                        <div id="projectCard-amount">{`$${getSum(
                          project
                        ).toLocaleString()} raised out of $${project.goalAmount.toLocaleString()}`}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              <div id="homePage-see-more">
                <button
                  id="homePage-see-more-text"
                  onClick={(event) => seeMoreRecent(event)}
                >
                  See more{" "}
                  <i
                    id="homePage-right-arrow"
                    className="far fa-arrow-alt-circle-right"
                  ></i>
                </button>
              </div>
            </div>
          </div>
          <h2 className="homePage-nearYou-header">Trending causes</h2>
          <div className="homePage-grid-near-you">
            <div id="homePage-project-grid">
              {trending &&
                trending.map((project) => (
                  <Link
                    id="homePage-project-card-link"
                    key={project.id}
                    to={`${project.id}`}
                  >
                    <div id="homePage-project-card" value={project.id}>
                      <div className="project-card-image-container">
                        <img
                          id="projectCard-img"
                          src={project.thumbnailImgUrl}
                          alt=""
                          className="project-card-image"
                        ></img>
                      </div>
                      <div id="homePage-project-card-text">
                        <div id="projectCard-location">{`${
                          project.user.city
                        },${getStateAbbreviation(project)}`}</div>
                        <div id="projectCard-title">{project.name}</div>
                        <div id="projectCard-description">
                          {project.description}
                        </div>
                        <div id="meter">
                          <span
                            id="progressBar"
                            style={{ width: `${getPercentage(project)}%` }}
                          ></span>
                        </div>
                        <div id="projectCard-amount">{`$${getSum(
                          project
                        ).toLocaleString()} raised out of $${project.goalAmount.toLocaleString()}`}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              <div id="homePage-see-more">
                <button
                  id="homePage-see-more-text"
                  onClick={(event) => seeMoreTrending(event)}
                >
                  See more{" "}
                  <i
                    id="homePage-right-arrow"
                    className="far fa-arrow-alt-circle-right"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
