import React from "react";
import "./style.scss";

const Genres = ({ data }) => {

    return (
        <div className="genres">
            {data?.map((g,index) => {
                if (![g]) return;
                return (
                    <div key={index} className="genre">
                        {g}
                    </div>
                );
            })}
        </div>
    );
};

export default Genres;