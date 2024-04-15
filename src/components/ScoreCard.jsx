import { upload } from "@testing-library/user-event/dist/upload";
import React, { useEffect } from "react";

export const ScoreCard = ({ value, className, score }) => {
    return (
        <div className={className}>

            <div style={{"height": "min-content" }}>
                <h4 style={{ "margin": "0px" }}>
                    {value}
                </h4>
            </div>
            <div style={{"height": "min-content" }}>
                <h2 style={{ "margin": "0px" }}>
                    {score}
                </h2>
            </div>
        </div>
    );
}