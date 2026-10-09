import { supabase } from '../libraries/supabase.js';

export async function getPlaylists() {
    const { data, error } = await supabase
        .from('playlists')
        .select('*')
    if (error) {
        console.error('Error in "getPlaylists":', error);
        throw error;
    }    
    
    return data;
}

export default getPlaylists;