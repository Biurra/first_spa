import { supabase } from '../libraries/supabase.js';

export async function namePlaylists(name, newName) {
    const { data, error } = await supabase
        .from('playlists')
        .update({playlistname: newName})
        .eq('playlistname', name)
    if (error) {
        console.error('Error in "namePlaylists", error');
        throw error;
    }
    return data;
}