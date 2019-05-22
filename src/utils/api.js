import { filterResults } from './helpers';

export const getCities = (countryCode) => {
  return fetch(`https://api.openaq.org/v1/cities/?country=${countryCode}&order_by=count&sort=desc&limit=10`)
    .then(res => res.json())
    .then(data => filterResults(data.results.map(el => el.city)));
};

export const getCityDesc = (cityName) => {
  return fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${cityName}`)
    .then(res => res.json())
    .then(data => data)
};