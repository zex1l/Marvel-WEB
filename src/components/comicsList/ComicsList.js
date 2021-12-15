import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { Link } from 'react-router-dom';


import './comicsList.scss';




const ComicsList = () => {

    const {error, loading, getAllComics} = useMarvelService();

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);


    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (offset, initial) => {

        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {

        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setOffset(offset => offset + 9 );
        setNewItemLoading(true);
        setComicsEnded(ended);
    }

    const renderItems = (arr) => {

        const items = arr.map((item, i) => {

            let price = '';
            /* if(item.price === 0) {
                noPrice = "NOT AVAILABEL";
            } */

            item.price === 0 ? price = "NOT AVAILABEL" : price = item.price;

            return(
                <li className="comics__item " key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img 
                            src={`${item.thumbnail}`} 
                            alt="ultimate war" 
                            className="comics__item-img"
                        />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            )
        });

        return(
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/>:null;

    const items = renderItems(comicsList);
    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display' : comicsEnded ? 'none' : 'block'}}>
                <div 
                    className="inner" 
                    onClick={() => onRequest(offset)}>load more
                </div>
            </button>
        </div>
    )
}

export default ComicsList;