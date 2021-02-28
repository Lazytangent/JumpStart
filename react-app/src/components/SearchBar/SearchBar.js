import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo_40x40 from "./logo_40x40.png";
// import csc from "country-state-city";
import { SearchModal, useModalContext } from "../../context/Modal";
import "./SearchBar.css";

const SearchBar = () => {
  const { showSearchBarModal, setShowSearchBarModal } = useModalContext();
  const [search, setSearch] = useState("");
  const [matches, setMatches] = useState("");

  function focusSearchBar() {
    document.getElementById("searchModalInput").focus();
  }

  // const getStateAbbreviation = (project) => {
  //   let result;
  //   const allStates = csc.getStatesOfCountry("US");

  //   let stateName = project.user.state;

  //   allStates.forEach((state) => {
  //     if (state.name === stateName) {
  //       result = state.isoCode;
  //     }
  //   });
  //   return result;
  // };

  const searchProjects = async (searchText) => {
    const response = await fetch("/api/projects/all");
    const allProjects = await response.json();
    let stringCheck = searchText.replace(/[[\]']+/g, "");
    stringCheck = stringCheck.replaceAll("\\", "");
    let projectMatches = allProjects.filter((project) => {
      const regex = new RegExp(`${stringCheck}`, "gi");

      return (
        project.name.match(regex) ||
        project.description.match(regex) ||
        project.user.username.match(regex) ||
        project.user.city.match(regex) ||
        project.user.state.match(regex)
      );
    });

    if (searchText.length === 0) {
      projectMatches = [];
    }

    setMatches(projectMatches);
  };

  useEffect(() => {
    focusSearchBar();
  });

  return (
    <>
      {showSearchBarModal && (
        <SearchModal onClose={() => setShowSearchBarModal(false)}>
          <div className="searchBarMatches-container">
            <div className="searchBar-container">
              <button
                id="inputClose-button"
                onClick={() => setShowSearchBarModal((prev) => !prev)}
              >
                <i id="inputClose-icon" className="fa fa-times fa-2x"></i>
              </button>
              <input
                id="searchModalInput"
                type="search"
                name="search"
                className="searchBar-input"
                placeholder="Find projects by name, description, user, city, or state..."
                value={search}
                onChange={(e) => {
                  searchProjects(e.target.value);
                  setSearch(e.target.value);
                }}
              />
            </div>
            <div>
              {matches && (
                <div className="searchResults-container">
                  {matches.map((project, idx) => (
                    <NavLink key={idx} to={`/${project.id}`} className="a-link" onClick={() => setShowSearchBarModal(false)}>
                      <li key={idx} className="searchBarMatches">
                        {!project.thumbnailImgUrl && (
                          <div className="logo_30x30-container">
                            <img
                              className="logo_30x30"
                              src={logo_40x40}
                              alt="A small heart with an EKG graph of the electrical impulses that move through the heart displayed inside of it."
                            />
                          </div>
                        )}
                        {project.thumbnailImgUrl && (
                          <div className="logo_30x30-container">
                            <img
                              className="logo_30x30"
                              src={project.thumbnailImgUrl}
                              alt="A small heart with an EKG graph of the electrical impulses that move through the heart displayed inside of it."
                            />
                          </div>
                        )}
                        {search && (
                          <>
                            <div className="searchBarMatches-content">
                              <p className="projectName">{project.name}</p>
                              <p>By {project.user.username}</p>
                            </div>
                            {/* <div className="searchBarMatches-content">
                          <p>Created by: {project.user.username}</p>
                          <p>
                          Created by: {project.user.city},{" "}
                          {getStateAbbreviation(project)}
                          </p>
                        </div> */}
                          </>
                        )}
                      </li>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        </SearchModal>
      )}
    </>
  );
};

export default SearchBar;
