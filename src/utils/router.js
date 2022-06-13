import {matchRoutes, useLocation} from "react-router-dom";
import routes from "../routes";

const useCurrentView = () => {
    const location = useLocation();
    const [{route}] = matchRoutes(routes, location);
    return route;
};

export {useCurrentView};
