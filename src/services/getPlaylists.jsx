import { getPlaylists as fetchPlaylists, createPlaylists, delPlaylists, namePlaylists } from './playlists.js';

export async function getPlaylists() {
  return fetchPlaylists();
}

export { createPlaylists, delPlaylists, namePlaylists };
export default getPlaylists;