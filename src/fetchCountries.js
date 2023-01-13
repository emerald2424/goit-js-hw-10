import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";

export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`)
        .then(resp => {
            if (!resp.ok) {
                if (resp.status === 404) {
                    Notiflix.Notify.failure("Oops, there is no country with that name")
                }
                
                throw new Error(resp.statusText)
            }
            return resp.json();
        })
        
}
