import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { getHomePageProjects } from '../../store/project.js'
import csc from "country-state-city"
import "./homePage.css"


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
                {/* <img className="homePage-image" src="homePage1.jpg" alt=""></img> */}
            </div>
            <div className="homePage-description-box">
                <img className="homePage-description-image" src="homePage-description.jpg" alt=""></img>

            </div>
            <div className="homePage-grid">
                <div className="homePage-grid-most-popular">
                    <div id="homePage-project-grid">
                        {mostPopular &&
                            mostPopular.map((project) => (
                                <Link id='homePage-project-card-link' key={project.id} to={`${project.id}`}>
                                    <div id="homePage-project-card" value={project.id}>
                                        <div>
                                            {/* <img>{project.thumbnailImgUrl}</img> */}
                                        </div>
                                        <div id="projectCard-location">{`${project.user.city},${getStateAbbreviation(project)}`}</div>
                                        <div id="projectCard-title">{project.name}</div>
                                        <div>{project.description}</div>
                                        {/* limit project description to two lines */}
                                        <div>
                                            {/* <span id="progressBar" style=width:getPercentage(project)></span> */}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        <Link id="homePage-see-more" to=''>See more<i id="homePage-right-arrow" className="far fa-arrow-alt-circle-right"></i></Link>
                    </div>
                </div>
                <div className="homePage-grid-most-recent">
                    <div id="homePage-project-grid">
                        {mostRecent &&
                            mostRecent.map((project) => (
                                <Link id='homePage-project-card-link' key={project.id} to={`${project.id}`}>
                                    <div id="homePage-project-card" value={project.id}>
                                        <div>
                                            {/* <img>{project.thumbnailImgUrl}</img> */}
                                        </div>
                                        <div>{`${project.user.city},${getStateAbbreviation(project)}`}</div>
                                        <div>{project.name}</div>
                                        <div>{project.description}</div> two lines
                                        <div>
                                            {/* <span id="progressBar" style={`width: ${}`}></span> */}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        <Link id="homePage-see-more" to=''>See more<i id="homePage-right-arrow" className="far fa-arrow-alt-circle-right"></i></Link>
                    </div>
                </div>
                <div className="homePage-grid-near-you">
                    <div id="homePage-project-grid">
                        {trending &&
                            trending.map((project) => (
                                <Link id='homePage-project-card-link' key={project.id} to={`${project.id}`}>
                                    <div id="homePage-project-card" value={project.id}>
                                        <div>
                                            {/* <img>{project.thumbnailImgUrl}</img> */}
                                        </div>
                                        <div>{`${project.user.city},${getStateAbbreviation(project)}`}</div>
                                        <div>{project.name}</div>
                                        <div>{project.description}</div> two lines
                                        <div>
                                            {/* <span id="progressBar" style=`width: ${}`></span> */}
                                        </div>
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
