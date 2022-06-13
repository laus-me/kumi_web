import * as React from "react";
import {Route, Routes} from 'react-router-dom';
import {openDB} from 'idb';
import routes from './routes';

import RootContainer from "./components/RootContainer";
import AppContainer from "./components/AppContainer";
import AppSideBar from "./components/AppSideBar";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";

const userProfile = {
    displayName: "C109156130 陳柏仰",
    pictureUrl: "https://avatars.githubusercontent.com/u/73846455"
}

const db = openDB('keisa', 1, {
    upgrade(db) {
        const store = db.createObjectStore('items', {
            keyPath: 'id',
            autoIncrement: true,
        });
        store.createIndex('date', 'date');
    },
});

// Won't be change after render, fix it for reducing CPU usage
const AppRoutes = routes.map(({name, path, component: Component}) => (
    <Route key={name} path={path} element={<Component db={db}/>}/>
));

export default function App() {
    return (
        <RootContainer>
            <AppSideBar/>
            <AppContainer>
                <AppHeader userProfile={userProfile}/>
                <Routes>
                    {AppRoutes}
                </Routes>
                <AppFooter/>
            </AppContainer>
        </RootContainer>
    )
}
