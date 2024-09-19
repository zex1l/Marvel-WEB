import { createHashRouter } from "react-router-dom";
import App from "../components/app/App";
import MainPage from "../components/pages/MainPage";
import SingleComicPage from "../components/pages/SingleComicPage";
import ComicsPage from "../components/pages/ComicsPage";
import Page404 from "../components/pages/404";

export const router = createHashRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '',
                element: <MainPage/>
            }
        ]
    },
    {
        path: '*',
        element: <Page404/>
    },
    {
        path: '/comics',
        element: <ComicsPage/>
    },
    {
        path: '/comics/:comicId',
        element: <SingleComicPage/>
    },
])