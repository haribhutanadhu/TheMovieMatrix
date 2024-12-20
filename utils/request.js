const API_KEY = 'b238ecea6704784ae831dc12fbdd017e';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getTrendingMovies() {
    const res = await fetch(`${BASE_URL}/trending/movie/day?language=en-US&api_key=${API_KEY}`);
    if (!res.ok) {
        throw new Error('Failed to fetch movies');
    }
    const data = await res.json();
    return data.results;
  }

export async function getMovieDetails(id) {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    if (!res.ok) {
        throw new Error('Failed to fetch movie details');
    }
    const data = await res.json();
    return data;
}

export async function getMovieImage(id) {
    const res = await fetch(`${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`);
    if (!res.ok) {
        throw new Error('Failed to fetch movie details');
    }
    const data = await res.json();
    return data;
}

export async function getMoviesBySearch(query) {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    
    if (!res.ok) {
        throw new Error('Failed to search movies');
    }
    const data = await res.json();
    return data.results;
}

export async function getSimilarMovies(id) {
    const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
    if (!res.ok) {
        throw new Error('Failed to fetch similar movies');
    }
    const data = await res.json();
    return data.results;
}

export async function getNowPlayingMovies() {
    const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
    if (!res.ok) {
        throw new Error('Failed to fetch similar movies');
    }
    const data = await res.json();
    return data.results;
}

export async function getUpcomingMovies(){
    const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
    if(!res.ok){
        throw new Error('Failed to fetch upcoming Movies');
    }
    const data = await res.json();
    return data.results;
}


export async function getVideoDetails(id){
    const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
    if(!res.ok){
        throw new Error('Failed to fetch upcoming Movies');
    }
    const data = await res.json();
    return data;
}

//Favoutites data

export async function getFavourites(email) {
    const res = await fetch(`/api/favourites?email=${email}`);
    if (!res.ok) {
      throw new Error("Failed to fetch favourites");
    }
    const data = await res.json();
    return data.favouritesData;
  }

  

export async function getUserData(){
    const res = await fetch("/api/users");
    if(!res.ok){
        throw new Error("Failed to fetch");
    }
    const data = await res.json();
    return data.data;
}


