import { supabase } from '../libraries/supabase.js';

export async function createPlaylists(name) {
    const { data, error } = await supabase
        .from('playlists')
        .insert([
            {playlistname: name}
        ])
        .select()
        .single()
    
    if (error) {
        console.error('Error in "createPlaylists"', error);
        throw error;
    }
    return data;
}