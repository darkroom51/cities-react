import { OPENAQ_BASE_URL, WIKIPEDIA_BASE_URL } from './config';
import { filterResults } from './helpers';

export const getCities = (countryCode) => {
  return fetch(`${OPENAQ_BASE_URL}cities/?country=${countryCode}&order_by=count&sort=desc&limit=10`)
    .then(res => res.json())
    .then(data => filterResults(data.results.map(el => el.city)));
};

export const getCityDesc = (cityName) => {
  return fetch(`${WIKIPEDIA_BASE_URL}page/summary/${cityName}`)
    .then(res => res.json())
    .then(data => data)
};