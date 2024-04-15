import React from "react";

export const Square = ({value, onClick,className}) => {
    return (
        <div className={className} onClick={onClick}>
            <h1>{value}</h1>
        </div>
    );
}