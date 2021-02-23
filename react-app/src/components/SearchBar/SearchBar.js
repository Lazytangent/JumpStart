import React, { useState } from "react";
import logo_30x30 from "../../../public/logo_30x30.png";
import { SearchModal, useModalContext } from "../../context/Modal";
import "./SearchBar.css";

const SearchBar = () => {
  const { showSearchBarModal, setShowSearchBarModal } = useModalContext();
  const [search, setSearch] = useState("");
  const [matches, setMatches] = useState("");

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
      thumbnailImgUrl: "https://i.imgur.com/xg4C3F2.jpg",
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

  return (
    <>
      {showSearchBarModal && (
        <SearchModal onClose={() => setShowSearchBarModal(false)}>
          <div className="searchBar-container">
            <input
              type="search"
              name="search"
              className="searchBar-input"
              placeholder="Search by project or location?"
              value={search}
              onChange={(e) => {
                searchProjects(e.target.value);
                setSearch(e.target.value);
              }}
            />
          </div>
          <div>
            {matches &&
              matches.map((project) => (
                <li className="searchBar-matches">
                  {!project.thumbnailImgUrl && (
                    <div>
                      <img
                        className="logo_30x30"
                        src={logo_30x30}
                        alt="A small heart with an EKG graph of the electrical impulses that move through the heart displayed inside of it."
                      />
                    </div>
                  )}
                  <div>
                    <p>{project.name}</p>
                  </div>
                </li>
              ))}
          </div>
        </SearchModal>
      )}
    </>
  );
};

export default SearchBar;
