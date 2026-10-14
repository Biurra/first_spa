import { useState } from 'react';
import { addSongFromLink } from '../../services/addSong.js';

function AddNewSong({ playlist, onCreated }) {
    const [popUp, setPopUp] = useState(false);
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleOpen() {
        setError(null);
        setLink('');
        setPopUp(true);
    }

    function handleCancel() {
        setError(null);
        setLink('');
        setPopUp(false);
    }

    async function handleAdd() {
        if (!link.trim()) return;

        setLoading(true);
        setError(null);

        try {
            await addSongFromLink(link.trim(), playlist);
            setLink('');
            setPopUp(false);
            if (onCreated) onCreated();
        } catch (err) {
            console.error('Failed to add song:', {
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
                + Add Song
            </button>

            {popUp && (
                <div className="song-popup">
                    <h2>Add Song</h2>

                    <input
                        type="url"
                        placeholder="Paste a YouTube Music link…"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
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

                    <button onClick={handleAdd} disabled={loading || !link.trim()}>
                        {loading ? 'Adding…' : 'Add'}
                    </button>
                </div>
            )}
        </>
    );
}

export default AddNewSong;