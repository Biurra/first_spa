import { getPlaylists as _getPlaylists } from '../../../backend/services/getPlaylists.js';

export async function getPlaylists() {
    return _getPlaylists();
}

export default getPlaylists;