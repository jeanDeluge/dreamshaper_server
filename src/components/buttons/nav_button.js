import React from "react";

function NavButton(props){

    return(
        <li className="flex list-none bg-white m-2 w-32 items-center h-16">
            <a href={props.link} className="flex text-black text-base">{props.name}</a>
        </li>   
    )
}

export default NavButton;