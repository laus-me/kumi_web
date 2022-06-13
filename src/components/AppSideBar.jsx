import React from "react";
import {Link} from "react-router-dom";

import Logo from "../assets/images/logo.svg";
import routes from "../routes";
import {useCurrentView} from "../utils/router";

function HeaderIcon() {
    return (
        <li className="border-b border-gray-900 hidden sm:block">
            <Link to="/" className="h-full w-full hover:bg-gray-700 block p-3">
                <img src={Logo} alt="Keisa"/>
            </Link>
        </li>
    )
}

function LinkItemIcon(props) {
    const {name, to, viewName} = props;
    return (
        <li className="sm:border-b border-gray-900 flex-1 sm:w-full" title={name}>
            <Link to={to} className={[
                "h-full",
                "w-full",
                "block p-3",
                "hover:bg-gray-700",
                name === viewName && "bg-gray-900"
            ].join(" ")}>
                <i className="fas fa-inbox fill-current">
                    {name}
                </i>
            </Link>
        </li>
    )
}

export default function AppSideBar() {
    const {name: viewName} = useCurrentView();
    const LinkItemIcons = routes
        .filter((i) => i.sideBarButton)
        .map(({name, path}) => (
            <LinkItemIcon key={name} name={name} to={path} viewName={viewName}/>
        ));
    return (
        <aside className="sm:h-full sm:w-20 w-full h-12 bg-gray-800 text-gray-200">
            <ul className="text-center flex flex-row sm:flex-col w-full">
                <HeaderIcon/>
                {LinkItemIcons}
            </ul>
        </aside>
    )
}
