import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

const CircleRating = ({ rating }) => {
    let numericRating = rating; // Default to rating if not a string

    // Check if the rating is a string, then parse it to a float
    if (typeof rating === "string") {
        numericRating = parseFloat(rating);
    }

    return (
        <div className="circleRating">
            <CircularProgressbar
                value={numericRating}
                maxValue={10}
                text={rating} // You can keep the original rating as text
                styles={buildStyles({
                    pathColor:
                        numericRating < 5 ? "red" : numericRating < 7 ? "orange" : "green",
                })}
            />
        </div>
    );
};

export default CircleRating;
