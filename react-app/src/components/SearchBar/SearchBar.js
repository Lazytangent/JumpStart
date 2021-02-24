import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import logo_40x40 from "./logo_40x40.png";
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
      name: "Reed needs surgery to become less handsome",
      thumbnailImgUrl: "https://i.imgur.com/k2uKyYB.png",
      description: "Just trying to make it fair for everyone else",
      goalAmount: 0,
      minPledge: 10000,
    },
    {
      userId: 3,
      name: "Peter needs coding lessons",
      thumbnailImgUrl: "https://i.imgur.com/A4xP0LA.jpg",
      description: "I'm Peter and I'm not very talented.",
      goalAmount: 10000000,
      minPledge: 1,
    },
    {
      userId: 1,
      name: "Dillon needs $ for ballroom dancing",
      thumbnailImgUrl: "https://i.imgur.com/QfDRkkq.jpg",
      description: "I'm just into that sort of thing",
      goalAmount: 1000,
      minPledge: 4,
    },
    {
      userId: 4,
      name: "Jesse's state is irrelevant needs $ 2 move.",
      description: "Where is Wisconsin anyway?",
      goalAmount: 10040,
      minPledge: 3,
    },
    {
      userId: 3,
      name: "Trump needs $ for a wall",
      description: "Big Wall. Need money.",
      goalAmount: 9999999,
      minPledge: 2,
    },
    {
      userId: 2,
      name: "Matt Damon is a janitor with a gift for mathematics",
      description: "How 'bout them apples?",
      goalAmount: 33555,
      minPledge: 4,
    },
    {
      userId: 2,
      name: "Walter White needs money for chemstry supplies",
      description: "Looking to start an empire",
      goalAmount: 11555,
      minPledge: 3,
    },
    {
      userId: 5,
      name: "Family kidnaped by ninjas. Need $ 4 karate lessons",
      description:
        "I have excellent balance and revenge is my biggest motivator",
      goalAmount: 493021,
      minPledge: 5,
    },
    {
      userId: 4,
      name: "Dwight K. Schrute's Beet Farm Expansion",
      description: "Beets. Bears. Battlestar Galactica.",
      goalAmount: 72600,
      minPledge: 5,
    },
    {
      userId: 3,
      name: "Help me prove the earth is flat",
      description: "Maybe if we just keep going in a boat we'll fall",
      goalAmount: 72600,
      minPledge: 5,
    },
  ];
  const searchProjects = async (searchText) => {
    let projectMatches = projects.filter((project) => {
      const regex = new RegExp(`${searchText}`, "gi");
      return project.name.match(regex);
    });

    if (searchText.length === 0) {
      projectMatches = [];
    }

    setMatches(projectMatches);

    // if (searchText.length > 0 && projectMatches.length() === 0) {
    // }
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
                placeholder="Search by project... For testing purposes type: d, j, p, t, or r"
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
