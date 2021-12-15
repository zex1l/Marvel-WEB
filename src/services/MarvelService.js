import {useHttp} from '../hooks/http.hooks';

const useMarvelService = () => { // Работа с Api

    const {loading, request, error, clearError} = useHttp();

    // Свойства классов
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=5d46ad89683c6e752b4a85a037d55688';
    const _baseOffset = 210;

    


    


    const getAllCharacters = async (ofsset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${ofsset}&${_apiKey}`);
        
        return res.data.results.map(_transformCharacter);

    }


    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (ofsset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${ofsset}&${_apiKey}`);

        //console.log(res.data.results);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?&${_apiKey}`);
        //console.log(res);
        console.log(res.data.results[0]);
        return _transformComics(res.data.results[0])
    }


    const _transformComics = (comic) => {
        return {
            title: comic.title,
            description: comic.description || 'There is no description',
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            price: comic.prices[0].price + '$',
            id: comic.id,
            language: comic.textObjects.language || 'en-us',
            pageCount: comic.pageCount ? `${comic.pageCount} p.` : 'No information about the number of pages',
        }
    }

    const _transformCharacter = (char) => {
        //console.log(char.description.length);
        if(char.description.length > 210)
        {
            char.description = `${char.description.slice(0, 210)}...`;
        }
        else if(char.description.length === 0)
        {
            char.description =  "Information not found";
        }
        return {
            name: char.name,
            description: char.description ,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }

    return {getCharacter, getAllCharacters, loading, error, clearError, getAllComics, getComic};
}

export default useMarvelService;