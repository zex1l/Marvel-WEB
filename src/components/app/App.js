import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";


const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));


const App = () => {

    

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                   <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={
                                <MainPage/>
                            }>
                            </Route>

                            <Route path="/comics/:comicId" element={
                                <SingleComicPage/>
                            }>
                                
                            </Route>

                            <Route path="/comics" element={
                                <ComicsPage/>
                            }>
                                
                            </Route>

                            <Route path="*" element={
                                <Page404/>
                            }>
                                
                        </Route>
                    </Routes>
                   </Suspense>
                    
                </main>
            </div>
        </Router>
    )
    
}

export default App;