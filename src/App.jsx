import * as React from "react";
import {Route, Routes} from 'react-router-dom';
import routes from './routes';

import RootContainer from "./components/RootContainer";
import AppContainer from "./components/AppContainer";
import AppSideBar from "./components/AppSideBar";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";

// Won't be change after render, fix it for reducing CPU usage
const AppRoutes = routes.map(({name, path, component: Component}) => (
    <Route key={name} path={path} element={<Component />}/>
));

export default function App() {
    return (
        <RootContainer>
            <AppSideBar/>
            <AppContainer>
                <AppHeader/>
                <Routes>
                    {AppRoutes}
                </Routes>
                <AppFooter/>
            </AppContainer>
        </RootContainer>
    )
}
