import * as React from 'react';
import {matchRoutes, useLocation} from 'react-router-dom'
import routes from "../routes";

const useCurrentView = () => {
    const location = useLocation();
    const [{route}] = matchRoutes(routes, location);
    return route;
};

function AvatarButton() {
    return (
        <button
            className="ml-auto border rounded-full ml-2 w-10 h-10 text-center leading-none text-gray-200 bg-gray-400 hover:bg-gray-500"
        >
            <i className="fas fa-user fill-current"></i>
        </button>
    )
}

export default function AppHeader() {
    const {name: viewName} = useCurrentView();
    return (
        <nav className="border-b bg-white px-6 py-2 flex items-center min-w-0 h-14">
            <h1 className="font-semibold text-lg">
                {viewName}
            </h1>
            <span className="flex-1"></span>
            <AvatarButton/>
        </nav>
    )
}
