import { useState } from 'react';
import { createPlaylists } from '../../../../backend/services/createPlaylists.js';

function AddNewPlaylist({ onCreated }) {
    const [popUp, setPopUp] = useState(false);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleOpen() {
        setError(null);
        setName('');
        setPopUp(true);
    }

    function handleCancel() {
        setError(null);
        setName('');
        setPopUp(false);
    }

    async function handleCreate() {
        if (!name.trim()) return;

        setLoading(true);
        setError(null);

        try {
            await createPlaylists(name.trim());
            setName('');
            setPopUp(false);
            if (onCreated) onCreated();
        } catch (err) {
            console.error('Failed to create playlist:', {
                message: err?.message,
                code: err?.code,
                details: err?.details,
                hint: err?.hint,
                full: err,
            });
            setError(`${err?.message ?? 'Unknown error'} (code: ${err?.code ?? '?'})`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <button onClick={handleOpen}>
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
                        disabled={loading}
                    />

                    {error && (
                        <p style={{ color: 'red', fontSize: '0.85rem', margin: '4px 0' }}>
                            ⚠ {error}
                        </p>
                    )}

                    <button onClick={handleCancel} disabled={loading}>
                        Cancel
                    </button>

                    <button onClick={handleCreate} disabled={loading || !name.trim()}>
                        {loading ? 'Creating…' : 'Create'}
                    </button>
                </div>
            )}
        </>
    )
}

export default AddNewPlaylist;
