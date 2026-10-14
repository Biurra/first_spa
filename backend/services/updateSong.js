import { supabase } from '../libraries/supabase.js';

export async function updateSongField(songId, field, value) {
    const { data, error } = await supabase
        .from('songs')
        .update({ [field]: value })
        .eq('id', songId)
        .select()
        .single()
    if (error) {
        console.error(`Error updating song field "${field}":`, error);
        throw error;
    }
    return data;
}
