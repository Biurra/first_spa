import { getSongs } from '../../../backend/services/getSongs.js';
import { getPlaylists } from '../../../backend/services/getPlaylists.js';

// Tiro: { id, name, artist, thumbnail, link, favorite, must_practice }
export async function getPlaylistSongs(playlistId) {
    const rows = await getSongs(playlistId);
    return rows.map(row => row.songs);
}

export async function getPlaylistById(playlistId) {
    const all = await getPlaylists();
    return all.find(p => p.id === Number(playlistId)) ?? null;
}
