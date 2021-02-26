import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, NavLink } from "react-router-dom";
import { getDiscoverPageProjects } from '../../store/project';
import { getDiscoverPageProjectsByLocation } from '../../store/project';
import Navigation from '../Navigation/navigation';
import csc from "country-state-city";
import './discoverPage.css';


const DiscoverPage = ({setAuthenticated}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const userId = useSelector((state) => state.session.user.id);

    const mostPopular = useSelector((state) => state.project.mostPopular)
    const mostRecent = useSelector((state) => state.project.mostRecent)
    const trending = useSelector((state) => state.project.trending)
    const nearYou = useSelector((state) => state.project.nearYou)

    const [cardFilter, setCardFilter] = useState([]);
    const [loaded, setLoaded] = useState(false)
    const [selected, setSelected] = useState("")
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getDiscoverPageProjects("recent"))
        dispatch(getDiscoverPageProjects("popular"))
        dispatch(getDiscoverPageProjects("trending"))
        // dispatch(getDiscoverPageProjectsByLocation(userId))
        if(history.location.state.comingFrom && history.location.state.comingFrom === "popular") {
            setCardFilter(mostPopular)
            setSelected("mostPopular")
        } else if (history.location.state.comingFrom && history.location.state.comingFrom === "recent") {
            setCardFilter(mostRecent)
            setSelected("mostRecent")
        } else if(history.location.state.comingFrom && history.location.state.comingFrom === "trending") {
            setCardFilter(trending)
            setSelected("trending")
        }
    }, [dispatch])


    useEffect(() => {
        setLoaded(true)
    }, [cardFilter])


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

    const recentFunction = (param) => {
        setCardFilter(param)
        setSelected("mostRecent")
    }

    const popularFunction = (param) => {
        setCardFilter(param)
        setSelected("mostPopular")
    }

    const trendingFunction = (param) => {
        setCardFilter(param)
        setSelected("trending")
    }

    const nearYouFunction = (param) => {
        setCardFilter(param)
        setSelected("nearYou")
    }


    return (
        <>
          <div>
            <Navigation setAuthenticated={setAuthenticated} />
            <div className="discoverPage">
                <div className="discoverPage-grid">
                    <div className="discoverPage-grid-header">Discover new causes </div>
                    <div className="discoverPage-grid-header-description">People around the world are raising money to help those in need.</div>
                    <div className="discoverPage-filter-box">
                        <button id="discoverPage-filter-button" className={(selected === "mostPopular") ? "selected" : ""} onClick={(event) => popularFunction(mostPopular)}>Most Popular</button>
                        <button id="discoverPage-filter-button" className={(selected === "mostRecent") ? "selected" : ""} onClick={(event) => recentFunction(mostRecent)}>Recently Added</button>
                        <button id="discoverPage-filter-button" className={(selected === "trending") ? "selected" : ""} onClick={(event) => trendingFunction(trending)}>Trending</button>
                        <button id="discoverPage-filter-button" className={(selected === "nearYou") ? "selected" : ""} onClick={(event) => nearYouFunction(nearYou)}>Near You</button>
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
            </div>
        </>
    )
}

export default DiscoverPage;
