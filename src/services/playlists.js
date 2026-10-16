import { apiFetch } from './apiConfig.js';

export async function getPlaylists() {
  return apiFetch('/api/playlists');
}

export async function getPlaylistById(id) {
  return apiFetch(`/api/playlists/${id}`);
}

export async function createPlaylists(name) {
  return apiFetch('/api/playlists', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export async function delPlaylists(name) {
  return apiFetch(`/api/playlists?name=${encodeURIComponent(name)}`, {
    method: 'DELETE',
  });
}

export async function namePlaylists(name, newName) {
  return apiFetch('/api/playlists', {
    method: 'PATCH',
    body: JSON.stringify({ name, newName }),
  });
}

export default getPlaylists;
