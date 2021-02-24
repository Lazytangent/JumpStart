import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { getHomePageProjects } from '../../store/project.js';
import csc from "country-state-city";
import "./homePage.css";

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

    }
  }
  // Reads out the scroll position and stores it in the data attribute
  // so we can use it in our stylesheets
  const storeScroll = () => {
    document.documentElement.dataset.scroll = window.scrollY;
  }

  // Listen for new scroll events, here we debounce our `storeScroll` function
  document.addEventListener('scroll', debounce(storeScroll), { passive: true });

  // Update scroll position for first time
  storeScroll();


const HomePage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHomePageProjects("popular"));
        dispatch(getHomePageProjects("recent"));
        dispatch(getHomePageProjects("trending"));
    }, [dispatch])

    const mostPopular = useSelector((state) => state.project.mostPopular)
    const mostRecent = useSelector((state) => state.project.mostRecent)
    const trending = useSelector((state) => state.project.trending)

    const getPercentage = (project) => {
        // let sum = 0

        // for (let i = 0; i < project.donations.length; i++ ) {
        //     sum += project.donations[i].donationAmount;
        // }

        // return (sum/project.goalAmount) * 100
        return 50
    }

    const getSum = (project) => {
        let sum = 0

        for (let i = 0; i < project.donations.length; i++ ) {
            sum += project.donations[i].donationAmount;
        }
        return sum
    }

    const getStateAbbreviation = (project) => {
        let result;
        const allStates = csc.getStatesOfCountry('US')

        let stateName = project.user.state;

        allStates.forEach((state) => {
            if (state.name === stateName) {
                result = state.isoCode
            }
        })
        return result;
    }

    return (
        <div className="homePage">
            <div className="homePage-image-container">
                {/* <img className="homePage-image" src="" alt=""></img> */}
            </div>
            <div className="homePage-description-box">
                <img className="homePage-description-image" src="https://jumpstartjesse.s3.us-east-2.amazonaws.com/pexels-rodnae-productions-6647119.jpg" alt=""></img>

            </div>
            <div className="homePage-grid">
                <h2 className="homePage-mostPopular-header">Most popular causes</h2>
                <div className="homePage-grid-most-popular">
                    <div id="homePage-project-grid">
                        {mostPopular &&
                            mostPopular.map((project) => (
                                <Link id='homePage-project-card-link' key={project.id} to={`${project.id}`}>
                                    <div id="homePage-project-card" value={project.id}>
                                        <div>
                                            <img className="projectCard-img" src={project.thumbnailImgUrl} alt=""></img>
                                        </div>
                                        <div id="projectCard-location">{`${project.user.city},${getStateAbbreviation(project)}`}</div>
                                        <div id="projectCard-title">{project.name}</div>
                                        <div id="projectCard-description">{project.description}</div>
                                        <div id="meter">
                                            <span id="progressBar" style={{width: `${getPercentage(project)}%`}}></span>
                                        </div>
                                        <div id="projectCard-amount">{`$${getSum(project)} raised out of $${project.goalAmount}`}</div>
                                    </div>
                                </Link>
                            ))}
                        <Link id="homePage-see-more" to=''>See more<i id="homePage-right-arrow" className="far fa-arrow-alt-circle-right"></i></Link>
                    </div>
                </div>
                <h2 className="homePage-mostRecent-header">Most recent fundraisers</h2>
                <div className="homePage-grid-most-recent">
                    <div id="homePage-project-grid">
                        {mostRecent &&
                            mostRecent.map((project) => (
                                <Link id='homePage-project-card-link' key={project.id} to={`${project.id}`}>
                                    <div id="homePage-project-card" value={project.id}>
                                        <div>
                                            {/* <img>{project.thumbnailImgUrl}</img> */}
                                        </div>
                                        <div id="projectCard-location">{`${project.user.city},${getStateAbbreviation(project)}`}</div>
                                        <div id="projectCard-title">{project.name}</div>
                                        <div id="projectCard-description">{project.description}</div>
                                        <div id="meter">
                                            <span id="progressBar" style={{width: `${getPercentage(project)}%`}}></span>
                                        </div>
                                        <div id="projectCard-amount">{`$${getSum(project)} raised out of $${project.goalAmount}`}</div>
                                    </div>
                                </Link>
                            ))}
                        <Link id="homePage-see-more" to=''>See more<i id="homePage-right-arrow" className="far fa-arrow-alt-circle-right"></i></Link>
                    </div>
                </div>
                <h2 className="homePage-nearYou-header">Causes near you</h2>
                <div className="homePage-grid-near-you">
                    <div id="homePage-project-grid">
                        {trending &&
                            trending.map((project) => (
                                <Link id='homePage-project-card-link' key={project.id} to={`${project.id}`}>
                                    <div id="homePage-project-card" value={project.id}>
                                        <div>
                                            {/* <img>{project.thumbnailImgUrl}</img> */}
                                        </div>
                                        <div id="projectCard-location">{`${project.user.city},${getStateAbbreviation(project)}`}</div>
                                        <div id="projectCard-title">{project.name}</div>
                                        <div id="projectCard-description">{project.description}</div>
                                        <div id="meter">
                                            <span id="progressBar" style={{width: `${getPercentage(project)}%`}}></span>
                                        </div>
                                        <div id="projectCard-amount">{`$${getSum(project)} raised out of $${project.goalAmount}`}</div>
                                    </div>
                                </Link>
                            ))}
                        <Link id="homePage-see-more" to=''>See more<i id="homePage-right-arrow" className="far fa-arrow-alt-circle-right"></i></Link>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default HomePage;
