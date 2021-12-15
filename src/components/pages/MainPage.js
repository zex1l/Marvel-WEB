import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const MainPage = (props) => {

    const [selectedChar, setChar] = useState(null);


    const onCharSelected = (id) => {
        setChar(id)
    }

    return(
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                    <CharInfo charId={selectedChar}/> 
                </ErrorBoundary>
                <img className="bg-decoration" src={decoration} alt="vision"/>
                
            </div>
        </>
    )
}

export default MainPage;