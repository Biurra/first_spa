import { getSongInfo } from './ytmusicapi.js';
import { addSongs } from '../../../backend/services/addSongs.js';

export async function addSongFromLink(link, playlist) {
    const songInfo = await getSongInfo(link);
    // Lo que recibo: songInfo = { videoId, title, artist, thumbnail, duration }
    // Lo que devuelvo: songInfo = { videoId, title, link, thumbnail, artist }
    const song = await addSongs(link, songInfo, playlist);
    return song;
}
