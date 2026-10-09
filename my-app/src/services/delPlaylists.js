import { supabase } from '../libraries/supabase.js';

export async function delPlaylists(name) {
    const { data, error } = await supabase
        .from('playlists')
        .delete()
        .eq('playlistname', name)
    if (error) {
        console.error('Error in "delPlaylists"', error);
        throw error;
    }
    return data;
}