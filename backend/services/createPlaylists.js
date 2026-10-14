import { supabase } from '../libraries/supabase.js';

export async function createPlaylists(name) {
    const { error } = await supabase
        .from('playlists')
        .insert([
            { playlistname: name }
        ])

    if (error) {
        console.error('Error in "createPlaylists"', error);
        throw error;
    }
}