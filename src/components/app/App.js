import { lazy, Suspense } from "react";


import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";


const MainPage = lazy(() => import('../pages/MainPage'));



const App = () => {

    

    return (
            <div className="app">
                <AppHeader/>
                <main>
                   <Suspense fallback={<Spinner/>}>
                                <MainPage/>
                                
                   </Suspense>    
                </main>
            </div>
    )
    
}

export default App;