import { supabase } from '../libraries/supabase.js';

export async function addSongs(link, songInfo, playlist) {
    const { data: song, error } = await supabase
        .from('songs')
        .insert([{
            name: songInfo,
            link: link
        }])
        .select()
        .single()
    if (error) {
        console.error('Error in "addSongs":', error);
        throw error;
    }
    await addSongToPlaylist(song, playlist)
    return song
}

export async function addSongToPlaylist(song, playlist) {
    const { data: playlistData, error: playlistError } = await supabase
        .from('playlists')
        .select('id')
        .eq('playlist_name', playlist)
        .single()
    if (playlistError) {
        console.error('Error finding playlist:', playlistError);
        throw playlistError;
    }

    const { data: positions, error: positionsError } = await supabase
        .from('playlist_songs')
        .select('position')
        .eq('playlist_id', playlistData.id)
        .order('position', { ascending: false })
        .limit(1);
    if (error) {
        console.error('Error in "getPlaylistPosition":', positionsError);
        throw positionsError;
    }

    const position = positions.length > 0
        ? positions[0].position + 1
        : 1;

    const { data, error } = await supabase
        .from('playlist_songs')
        .insert([{
            song_id: song.id,
            playlist_id: playlistData.id,
            position: position
        }])
        .select()
        .single()
    if (error) {
        console.error('Error in "addSongToPlaylist":', error);
        throw error;
    }
    return data;
}