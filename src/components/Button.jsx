import React from "react";

export const Button = ({text,onClick,className,icon}) => {
    return  (
            <button className={className} onClick={onClick}>{text}</button>
    );
}