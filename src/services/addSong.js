import { addSongToPlaylist } from './songs.js';

export async function addSongFromLink(link, playlist) {
  const result = await addSongToPlaylist(playlist, link);
  return result?.song || result;
}

export default addSongFromLink;