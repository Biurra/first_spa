import { apiFetch } from './apiConfig.js';

export async function getPlaylistSongs(playlistId) {
  return apiFetch(`/api/playlists/${playlistId}/songs`);
}

export async function addSongToPlaylist(playlistIdentifier, link, songInfo = null) {
  return apiFetch(`/api/playlists/${playlistIdentifier}/songs`, {
    method: 'POST',
    body: JSON.stringify({
      link,
      playlist: playlistIdentifier,
      songInfo,
    }),
  });
}

export async function removeSongFromPlaylist(songId, playlistId) {
  return apiFetch(`/api/playlists/${playlistId}/songs?songId=${songId}`, {
    method: 'DELETE',
  });
}

export async function updateSongField(songId, field, value) {
  return apiFetch(`/api/songs/${songId}`, {
    method: 'PATCH',
    body: JSON.stringify({ field, value }),
  });
}
