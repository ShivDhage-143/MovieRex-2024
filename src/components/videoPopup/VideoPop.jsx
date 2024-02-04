import React from "react";
import ReactPlayer from "react-player/youtube";

import "./style.scss";

export const VideoPop = ({ show, setShow, videoUrl}) => {
    const hidePopup = () => {
        setShow(false);
    };
    return (
        <div className={`videoPop ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopup}>
                    Close
                </span>
                <ReactPlayer
                    url={`/${videoUrl}`}
                    controls
                    width="100%"
                    height="100%"
                    // playing={true}
                />
            </div>
        </div>
    );
};

