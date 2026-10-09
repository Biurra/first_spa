import { supabase } from './supabase.js';

export async function getSongs(playlist_id) {
    const { data, error } = await supabase
        .from('playlist_songs')
        .select(`
            position,
            songs(*)
        `)
        .eq('playlist_id', playlist_id)
        .order('position')
    
    if (error) {
        console.error('Error in "getSongs":', error);
        throw error;
    }
    return data;
}