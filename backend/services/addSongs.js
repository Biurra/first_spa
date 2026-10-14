import { supabase } from '../libraries/supabase.js';

export async function addSongs(link, songInfo, playlist) {
    const { data: existing } = await supabase
        .from('songs')
        .select('*')
        .eq('link', link)
        .maybeSingle()

    let song = existing;

    if (!song) {
        const { data: newSong, error } = await supabase
            .from('songs')
            .insert([{
                name: songInfo.title,
                artist: songInfo.artist,
                thumbnail: songInfo.thumbnail,
                link: link,
            }])
            .select()
            .single()
        if (error) {
            console.error('Error in "addSongs":', error);
            throw error;
        }
        song = newSong;
    }

    await addSongToPlaylist(song, playlist)
    return song
}

export async function addSongToPlaylist(song, playlist) {
    const { data: playlistData, error: playlistError } = await supabase
        .from('playlists')
        .select('id')
        .eq('playlistname', playlist)
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
    if (positionsError) {
        console.error('Error in "getPlaylistPosition":', positionsError);
        throw positionsError;
    }

    const position = positions.length > 0
        ? positions[0].position + 1
        : 1;

    const { data: existing, error: existingError } = await supabase
        .from('playlist_songs')
        .select('song_id')
        .eq('song_id', song.id)
        .eq('playlist_id', playlistData.id)
        .maybeSingle()
    if (existingError) {
        console.error('Error checking for duplicate:', existingError);
        throw existingError;
    }
    if (existing) {
        throw new Error('This song is already in the playlist.');
    }

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

    if (position === 1 && song.thumbnail) {
        const { error: thumbError } = await supabase
            .from('playlists')
            .update({ thumbnail: song.thumbnail })
            .eq('id', playlistData.id)
        if (thumbError) {
            console.warn('Could not set playlist thumbnail:', thumbError);
        }
    }

    return data;
}