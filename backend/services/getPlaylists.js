import { supabase } from '../libraries/supabase.js';

export async function getPlaylists() {
    const { data, error } = await supabase
        .from('playlists')
        .select('*, playlist_songs(count)')
    if (error) {
        console.error('Error in "getPlaylists":', error);
        throw error;
    }

    return data.map(p => ({
        ...p,
        song_count: p.playlist_songs?.[0]?.count ?? 0,
    }));
}

export default getPlaylists;
