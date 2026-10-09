import { useState } from 'react';
import { createPlaylists } from '../../services/createPlaylists.js';
import { useEffect } from 'react';
import { supabase } from '../../libraries/supabase.js';


function AddNewPlaylist() {
    const [popUp, setPopUp] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
        console.log('Session:', data.session);
        console.log('Auth error:', error);
        });
    }, []);

    async function handleCreate() {
        if (!name.trim()) {
            return;
        }

        try {
            await createPlaylists(name.trim());
            setName('')
            setPopUp(false);
        } catch (error) {
            console.error('Failed to create playlist:', error);
        }
        
    }

    return(
        <>
            <button onClick={() => setPopUp(true)}>
                + New Playlist
            </button>

            {popUp && (
                <div className="playlist-popup">
                    <h2>Create Playlist</h2>

                    <input
                        type="text"
                        placeholder="Playlist name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button onClick={() => setPopUp(false)}>
                        Cancel
                    </button>

                    <button onClick={handleCreate}>
                        Create
                    </button>
                </div>
            )}
        </>
    )
}

export default AddNewPlaylist;