import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const API_KEY = '64b9d48df1f5249c2e8adb2dbe6fd5f9';
const LANG = 'ru';

export async function fectchUpcomingFilms() {
    return await axios.get(`/movie/upcoming?api_key=${API_KEY}&language=${LANG}&page=1`);
}

export async function fetchGenres() {
    return await axios.get(`/genre/movie/list?api_key=${API_KEY}&language=${LANG}`);
}

export async function fetchFilteredFilms(year, genre) {
    return await axios.get(`/discover/movie?api_key=${API_KEY}&language=${LANG}&primary_release_year=${year}&with_genres=${genre}&sort_by=popularity.desc`);
}