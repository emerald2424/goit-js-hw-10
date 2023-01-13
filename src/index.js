import './css/styles.css';
import debounce from 'lodash.debounce'; 
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";

import { fetchCountries } from './fetchCountries.js';


const DEBOUNCE_DELAY = 300;


const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


const input = document.querySelector('#search-box');
input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


function onSearch(evt) {
    evt.preventDefault();
    clearMarkup();
    
    const countryName = input.value.trim();
        
    if(!countryName) {
        
        return Notiflix.Notify.info("Enter the name of the country, please.")
    }

    

    fetchCountries(countryName)
    .then(data => {
        if (data.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        }
            
        if (data.length === 1) {
            createCountryInfoMarkup(data);
        }

        if (data.length <= 10 & data.length > 1) {
            createCountryListMarkup(data);
        }})
    .catch(err => console.log(err))
    // .finally(() => input.value = '');
}

function createCountryInfoMarkup(arr) {
    countryInfo.innerHTML = arr.map(({name: { official: name }, 
        capital, 
        population, 
        flags: { svg }, 
        languages}) => 
        `<div class="country-title">
            <img src=${svg} alt="flag of ${name}" width="40">
            <h2>${name}</h2>
        </div>
        <p><span>Capital: </span>${capital}</p>
        <p><span>Population: </span>${population}</p>
        <p><span>Languages: </span>${Object.values(languages).join(', ')}</p>`).join('');

        //Styles
        const span = document.querySelectorAll('span');
        span.forEach(p => p.style.fontWeight = '700');
        const countryTitle = document.querySelector('.country-title');
        countryTitle.style.display = 'flex';
        countryTitle.style.gap = '20px';
        countryTitle.style.alignItems = 'center';    
        
}

function createCountryListMarkup(arr) {
    countryList.innerHTML = arr.map(({name: { official: name }, 
        flags: { svg }}) => `<li>
        <img src=${svg} alt="flag of ${name}" width="40" height="auto">
        <h2>${name}</h2>`).join('')
    

    // Styles
    countryList.style.listStyle = 'none';
    const listItems = document.querySelectorAll('li');
    listItems.forEach(li => {
        li.style.display = 'flex';
        li.style.alignItems = 'center'
    });
    const countries = document.querySelectorAll('h2');
    countries.forEach(country => {
        country.style.fontSize = '24px';
        country.style.marginLeft = '20px';
    });    
}

function clearMarkup() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}