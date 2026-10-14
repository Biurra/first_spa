import { supabase } from '../libraries/supabase.js';

export async function removeSongFromPlaylist(songId, playlistId) {
    const { error } = await supabase
        .from('playlist_songs')
        .delete()
        .eq('song_id', songId)
        .eq('playlist_id', playlistId)
    if (error) {
        console.error('Error in "removeSongFromPlaylist":', error);
        throw error;
    }
}
