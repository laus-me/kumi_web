import * as React from 'react';
import {matchRoutes, useLocation} from 'react-router-dom'
import {UserIcon} from "@heroicons/react/outline";
import routes from "../routes";

const useCurrentView = () => {
    const location = useLocation();
    const [{route}] = matchRoutes(routes, location);
    return route;
};

function AvatarButton(props) {
    const {userProfile} = props;
    return (
        <button className="flex">
            <div className="ml-2 w-10 h-10 ml-auto text-center leading-none text-gray-200">
                {
                    userProfile.pictureUrl ? (
                        <img className="border rounded-full" src={userProfile.pictureUrl}
                             alt={userProfile.displayName}/>
                    ) : (
                        <UserIcon className="border rounded-full"/>
                    )
                }
            </div>
            <div className="my-2 mx-2">
                {userProfile.displayName}
            </div>
        </button>
    )
}

export default function AppHeader(props) {
    const {userProfile} = props;
    const {name: viewName} = useCurrentView();
    return (
        <nav className="border-b bg-white px-6 py-2 flex items-center min-w-0 h-14">
            <h1 className="font-semibold text-lg">
                {viewName}
            </h1>
            <span className="flex-1"></span>
            <AvatarButton userProfile={userProfile}/>
        </nav>
    )
}
