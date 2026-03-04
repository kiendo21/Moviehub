const API_KEY = "f2fce195572f6d43e6bf3d417d104571";
const BASE = "https://api.themoviedb.org/3";
const LANG = "vi-VN";

export const IMG = "https://image.tmdb.org/t/p";
export const poster = (path, size = "w500") => path ? `${IMG}/${size}${path}` : null;
export const backdrop = (path, size = "w1280") => path ? `${IMG}/${size}${path}` : null;
export const profileImg = (path, size = "w185") => path ? `${IMG}/${size}${path}` : null;

// ─── helpers ────────────────────────────────────────────
async function get(endpoint, params = {}) {
    const url = new URL(`${BASE}${endpoint}`);
    url.searchParams.set("api_key", API_KEY);
    url.searchParams.set("language", LANG);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

    const res = await fetch(url);
    if (!res.ok) throw new Error(`TMDB ${res.status}`);
    return res.json();
}

/** Map raw TMDB movie → app-friendly shape */
export function mapMovie(m, genreMap = {}) {
    return {
        id: m.id,
        title: m.title || m.original_title,
        originalTitle: m.original_title || "",
        year: (m.release_date || "").slice(0, 4),
        rating: Math.round((m.vote_average || 0) * 10) / 10,
        duration: m.runtime ? `${Math.floor(m.runtime / 60)}h ${m.runtime % 60}m` : "",
        genres: (m.genres || []).map((g) => g.name || genreMap[g] || "").filter(Boolean),
        genreIds: m.genre_ids || (m.genres || []).map((g) => g.id),
        desc: m.overview || "Chưa có mô tả.",
        thumb: poster(m.poster_path),
        backdrop: backdrop(m.backdrop_path),
        cast: [],          // filled by detail endpoint
        popularity: m.popularity || 0,
        voteCount: m.vote_count || 0,
    };
}

/** Map raw with genre_ids (from list endpoints) */
export function mapMovieFromList(m, genreMap = {}) {
    const mapped = mapMovie(m, genreMap);
    mapped.genres = (m.genre_ids || []).map((id) => genreMap[id] || "").filter(Boolean);
    return mapped;
}

// ─── public API ─────────────────────────────────────────
export async function fetchGenres() {
    const data = await get("/genre/movie/list");
    return data.genres; // [{id, name}, ...]
}

export async function fetchTrending() {
    const data = await get("/trending/movie/week");
    return data.results;
}

export async function fetchTrendingDay(type = "movie") {
    const data = await get(`/trending/${type}/day`);
    return data;
}

export async function fetchTrendingWeek(type = "movie") {
    const data = await get(`/trending/${type}/week`);
    return data;
}

export async function fetchPopular(page = 1) {
    const data = await get("/movie/popular", { page });
    return data;
}

export async function fetchTopRated(page = 1) {
    const data = await get("/movie/top_rated", { page });
    return data;
}

export async function fetchNowPlaying(page = 1) {
    const data = await get("/movie/now_playing", { page });
    return data;
}

export async function fetchMovieDetail(id) {
    const data = await get(`/movie/${id}`, { append_to_response: "credits,recommendations,videos" });
    const movie = mapMovie(data);
    movie.duration = data.runtime ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m` : "";
    movie.genres = (data.genres || []).map((g) => g.name);
    movie.genreIds = (data.genres || []).map((g) => g.id);
    movie.genreDetails = (data.genres || []).map((g) => ({ id: g.id, name: g.name }));
    movie.cast = (data.credits?.cast || []).slice(0, 10).map((c) => c.name);
    movie.castFull = (data.credits?.cast || []).slice(0, 20).map((c) => ({
        id: c.id,
        name: c.name,
        character: c.character || "",
        photo: profileImg(c.profile_path),
    }));
    movie.tagline = data.tagline || "";
    movie.recommendations = (data.recommendations?.results || []).slice(0, 6);

    // Extract Trailer
    const videos = data.videos?.results || [];
    const trailer = videos.find(v => v.site === "YouTube" && v.type === "Trailer") || videos.find(v => v.site === "YouTube");
    movie.trailerKey = trailer ? trailer.key : null;

    return movie;
}

export async function fetchPersonMovies(personId) {
    const data = await get(`/person/${personId}/movie_credits`);
    return (data.cast || []).sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
}

export async function fetchPersonDetail(personId) {
    const data = await get(`/person/${personId}`);
    return {
        id: data.id,
        name: data.name,
        birthday: data.birthday || "",
        deathday: data.deathday || "",
        placeOfBirth: data.place_of_birth || "",
        biography: data.biography || "",
        photo: profileImg(data.profile_path, "w300"),
        knownFor: data.known_for_department || "",
    };
}

export async function searchPerson(query) {
    if (!query.trim()) return [];
    const data = await get("/search/person", { query });
    return data.results || [];
}

export async function searchMovies(query, page = 1) {
    if (!query.trim()) return { results: [], total_results: 0 };
    const data = await get("/search/movie", { query, page });
    return data;
}

export async function fetchByGenre(genreIds, page = 1, sortBy = "popularity.desc") {
    // genreIds can be a single id or comma-separated string
    const data = await get("/discover/movie", {
        with_genres: String(genreIds),
        sort_by: sortBy,
        page,
    });
    return data;
}
