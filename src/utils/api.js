import { getCountryCode, filterResults } from './helpers';

export const getCities = (country) => {
  const countryCode = getCountryCode(country);
  if (!countryCode) return;

  return fetch(`https://api.openaq.org/v1/cities/?country=${countryCode}&order_by=count&sort=desc&limit=10`)
    .then(res => res.json())
    .then(data => filterResults(data.results.map(el => el.city)));
};