import { getPlaylistSongs as fetchPlaylistSongs } from './songs.js';
import { getPlaylistById as fetchPlaylistById, getPlaylists } from './playlists.js';

// Returns array of songs: { id, name, artist, thumbnail, link, favorite, must_practice }
export async function getPlaylistSongs(playlistId) {
  return fetchPlaylistSongs(playlistId);
}

export async function getPlaylistById(playlistId) {
  try {
    return await fetchPlaylistById(playlistId);
  } catch {
    const all = await getPlaylists();
    return all.find((p) => String(p.id) === String(playlistId)) ?? null;
  }
}
