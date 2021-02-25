import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, NavLink } from "react-router-dom";
import { getDiscoverPageProjects } from '../../store/project';
import { getDiscoverPageProjectsByLocation } from '../../store/project';
import Navigation from '../Navigation/navigation';
import csc from "country-state-city";
import './discoverPage.css';


const DiscoverPage = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.session.user.id);

    const mostRecent = useSelector((state) => state.project.mostRecent)
    const mostPopular = useSelector((state) => state.project.mostPopular)
    const trending = useSelector((state) => state.project.trending)
    const nearYou = useSelector((state) => state.project.nearYou)

    const [cardFilter, setCardFilter] = useState([]);
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(getDiscoverPageProjects("recent"))
        dispatch(getDiscoverPageProjects("popular"))
        dispatch(getDiscoverPageProjects("trending"))
        dispatch(getDiscoverPageProjectsByLocation(userId))
    }, [dispatch])

    useEffect(() => {
        setLoaded(true)
    }, [cardFilter])

    useEffect(() => {
        setCardFilter(mostRecent)
    }, [mostRecent])



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

        for (let i = 0; i < project.donations.length; i++) {
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

    if(!loaded) {
        return null;
    }


    console.log(cardFilter)
    return (
        <>
            <Navigation />
            <div className="discoverPage">
                <div className="discoverPage-grid">
                    <div className="discoverPage-grid-header">Discover new causes </div>
                    <div className="discoverPage-grid-header-description">People around the world are raising money to help those in need.</div>
                    <div className="discoverPage-filter-box">
                        <p>Filters:</p>
                        <button onClick={(event) => setCardFilter(nearYou)}>Near You</button>
                        <button>Recently Added</button>
                        <button>Most Popular</button>
                        <button>Trending</button>
                    </div>
                </div>
                <div className="discoverPage-project-card-grid">
                    {cardFilter &&
                        cardFilter.map((project) => (
                            <Link id='discoverPage-project-card-link' key={project.id} to={`${project.id}`}>
                                <div id="discoverPage-project-card" value={project.id}>
                                    <div>
                                        <img id="projectCard-img" src={project.thumbnailImgUrl} alt=""></img>
                                    </div>
                                    <div id="homePage-project-card-text">
                                        <div id="projectCard-location">{`${project.user.city},${getStateAbbreviation(project)}`}</div>
                                        <div id="projectCard-title">{project.name}</div>
                                        <div id="projectCard-description">{project.description}</div>
                                        <div id="meter">
                                            <span id="progressBar" style={{width: `${getPercentage(project)}%`}}></span>
                                        </div>
                                        <div id="projectCard-amount">{`$${getSum(project)} raised out of $${project.goalAmount}`}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </>
    )
}

export default DiscoverPage;
