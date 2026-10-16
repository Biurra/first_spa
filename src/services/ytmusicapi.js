import { apiFetch } from './apiConfig.js';

export async function searchYTMusic(query, limit = 10) {
  return apiFetch(`/api/ytmusic/search?q=${encodeURIComponent(query)}&limit=${limit}`);
}

export async function getSongInfo(url) {
  return apiFetch(`/api/ytmusic/song-info?url=${encodeURIComponent(url)}`);
}

export default { searchYTMusic, getSongInfo };
