import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import logo_30x30 from "./logo_30x30.png";
import { getHomePageProjects } from "../../store/project";
import { SearchModal, useModalContext } from "../../context/Modal";
import "./SearchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { showSearchBarModal, setShowSearchBarModal } = useModalContext();
  const [search, setSearch] = useState("");
  const [matches, setMatches] = useState("");

  function focusSearchBar() {
    document.getElementById("searchModalInput").focus();
  }

  const projects = [
    {
      userId: 2,
      name: "Reed is the coding G.O.A.T.",
      thumbnailImgUrl: "https://i.imgur.com/xg4C3F2.jpg",
      description: "Big facts",
      goalAmount: 0,
      minPledge: 10000,
    },
    {
      userId: 3,
      name: "Peter needs coding lessons",
      thumbnailImgUrl: "https://i.imgur.com/xg4C3F2.jpg",
      description: "I'm Peter and I need money because I'm the worst",
      goalAmount: 10000000,
      minPledge: 1,
    },
    {
      userId: 1,
      name: "Dillon needs $ for ballroom dancing",
      thumbnailImgUrl: "https://i.imgur.com/xg4C3F2.jpg",
      description: "I just want to dance",
      goalAmount: 1000,
      minPledge: 4,
    },
    {
      userId: 3,
      name: "Jesse is dying",
      description: "Need money for new legs",
      goalAmount: 10040,
      minPledge: 3,
    },
    {
      userId: 3,
      name: "Trump needs $ for a wall",
      thumbnailImgUrl: "https://i.imgur.com/xg4C3F2.jpg",
      description: "Big Wall. Need money.",
      goalAmount: 9999999,
      minPledge: 2,
    },
    {
      userId: 2,
      name: "Juliet was in hang gliding accident",
      description: "Need money for surgery and my dog Juice",
      goalAmount: 33555,
      minPledge: 4,
    },
    {
      userId: 3,
      name: "Justin shattered femur skateboarding",
      description: "Kickflips are hard man.",
      goalAmount: 11555,
      minPledge: 3,
    },
  ];
  const searchProjects = async (searchText) => {
    let projectMatches = projects.filter((project) => {
      const regex = new RegExp(`^${searchText}`, "gi");
      return project.name.match(regex);
    });

    if (searchText.length === 0) {
      projectMatches = [];
    }

    setMatches(projectMatches);
  };

  useEffect(() => {
    focusSearchBar();
    getHomePageProjects("popular");
  }, [dispatch]);
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
                placeholder="Search by project or location?"
                value={search}
                onChange={(e) => {
                  searchProjects(e.target.value);
                  setSearch(e.target.value);
                }}
                autofocus
              />
            </div>
            <div>
              {matches &&
                matches.map((project) => (
                  <li className="searchBarMatches">
                    {!project.thumbnailImgUrl && (
                      <div>
                        <img
                          className="logo_30x30"
                          src={logo_30x30}
                          alt="A small heart with an EKG graph of the electrical impulses that move through the heart displayed inside of it."
                        />
                      </div>
                    )}
                    {search && (
                      <div className="searchBarMatches-content">
                        <p className="projectName">{project.name}</p>
                        <p>{project.description}</p>
                      </div>
                    )}
                  </li>
                ))}
            </div>
          </div>
        </SearchModal>
      )}
    </>
  );
};

export default SearchBar;
