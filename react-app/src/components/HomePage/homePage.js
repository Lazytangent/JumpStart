import React from "react";
import "./homePage.css"



const HomePage = () => {

    return (
        <div className="homePage">
            <div className="homePage-image-container">
                <img className="homePage-image" src="homePage1.jpg" alt=""></img>
            </div>
            <div className="homePage-description-box">
                <img className="homePage-description-image" src="homePage-description.jpg" alt=""></img>
            </div>
            <div className="homePage-grid">
                <div className="homePage-grid-most-recent">
                    <div id="homePage-project-grid">
                        {/* map over the projects based upon query */}
                    </div>
                </div>
                <div className="homePage-grid-most-popular">
                    <div id="homePage-project-grid">
                        {/* map over the projects based upon query */}
                    </div>
                </div>
                <div className="homePage-grid-near-you">
                    <div id="homePage-project-grid">
                        {/* map over the projects based upon query */}
                    </div>
                </div>
            </div>
        </div>

  );

}

export default HomePage;
