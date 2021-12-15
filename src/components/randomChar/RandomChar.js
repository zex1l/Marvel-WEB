import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = (props) => {
    
    const [char, setChar] = useState({});
    const {loading, error, getCharacter, clearError} = useMarvelService(); 


    useEffect(() => {
        updateChar()
    }, [])

    
        //timerId = setInterval(this.updateChar, 5000);
        //console.log("asdasd");


       // clearInterval(this.timerId);
    




    // Обновление стейта
    const onCharLoaded = (char) => {
        setChar(char);
    }
    

    // Генерация персонажа и вызов обновление стейта
    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        getCharacter(id)
            .then(onCharLoaded);
    }


    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;
    
    // Если в переменных будет null, то отображаться ничего не будет
    return (
        <div className="randomchar">
            
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
    
    
}


// Умный компонент, нужен для условия в render()
const View = ({char}) => {
    let {name, description, thumbnail, homepage, wiki} = char;


    if(description === '')
    {
        description = "Information not found";
    }

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;