// Must use lazy loading, for loading as menu.
import loadable from '@loadable/component';

const routes = [
    {
        path: "/",
        name: "首頁",
        component: loadable(() => import("./views/HomeView")),
        sideBarButton: true
    },
    {
        path: "/list",
        name: "行事曆",
        component: loadable(() => import("./views/CalendarView")),
        sideBarButton: true
    },
    {
        path: "*",
        name: "嗯？",
        component: loadable(() => import("./views/NotFoundView"))
    }
];

export default routes;
