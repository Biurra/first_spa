import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPlaylistSongs, getPlaylistById } from '../services/playlistDetails.js';
import AddNewSong from '../components/songs/AddNewSong.jsx';
import { removeSongFromPlaylist, updateSongField } from '../services/songs.js';
import { delPlaylists } from '../services/playlists.js';
import './playlistPage.css';

export default function PlaylistPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [playlist, setPlaylist] = useState(null);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchData() {
        setLoading(true);
        setError(null);
        try {
            const [playlistData, songsData] = await Promise.all([
                getPlaylistById(id),
                getPlaylistSongs(id),
            ]);
            setPlaylist(playlistData);
            setSongs(songsData);
        } catch (err) {
            console.error('Failed to load playlist:', err);
            setError('Could not load playlist.');
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteSong(songId) {
        try {
            await removeSongFromPlaylist(songId, Number(id));
            await fetchData();
        } catch (err) {
            console.error('Failed to remove song:', err);
        }
    }

    async function handleDeletePlaylist() {
        if (!playlist) return;
        try {
            await delPlaylists(playlist.playlistname);
            navigate('/');
        } catch (err) {
            console.error('Failed to delete playlist:', err);
        }
    }

    async function handleToggle(song, field) {
        const newValue = !song[field];
        setSongs(prev => prev.map(s =>
            s.id === song.id ? { ...s, [field]: newValue } : s
        ));
        try {
            await updateSongField(song.id, field, newValue);
        } catch (err) {
            setSongs(prev => prev.map(s =>
                s.id === song.id ? { ...s, [field]: !newValue } : s
            ));
            console.error(`Failed to toggle ${field}:`, err);
        }
    }

    function artistLink(artist) {
        if (!artist) return null;
        const handle = artist.replace(/\s+/g, '');
        return `https://music.youtube.com/@${handle}`;
    }

    useEffect(() => {
        fetchData();
    }, [id]);

    if (loading) return <p className="page-status">Loading…</p>;
    if (error) return <p className="page-status">{error}</p>;
    if (!playlist) return <p className="page-status">Playlist not found.</p>;

    return (
        <div className="playlist-page-bg">
            <div className="playlist-page">
                <Link to="/" className="back-link">← Back</Link>
                <header className="playlist-hero">
                    {playlist.thumbnail
                        ? <img src={playlist.thumbnail} alt={playlist.playlistname} className="playlist-hero-thumb" />
                        : <div className="playlist-hero-thumb playlist-hero-thumb--empty" />
                    }
                    <div className="playlist-hero-info">
                        <h1 className="playlist-hero-title">{playlist.playlistname}</h1>
                        <p className="playlist-hero-count">{songs.length} song{songs.length !== 1 ? 's' : ''}</p>
                        <div className="playlist-hero-actions">
                            <AddNewSong playlist={playlist.playlistname} onCreated={fetchData} />
                            <button className="delete-btn" onClick={handleDeletePlaylist} title="Delete playlist">
                                🗑️
                            </button>
                        </div>
                    </div>
                </header>

                {songs.length === 0 && (
                    <p className="empty-msg">No songs yet. Add one above!</p>
                )}

                {songs.length > 0 && (
                    <table className="song-table">
                        <thead>
                            <tr className="song-table-head">
                                <th>#</th>
                                <th></th>
                                <th className="col-title">Title</th>
                                <th className="col-artist">Artist</th>
                                <th className="col-icon" title="Favorite">Favorite</th>
                                <th className="col-icon" title="Must practice">Done</th>
                                <th className="col-icon" title="Practice on Songsterr">Practice</th>
                                <th className="col-icon"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {songs.map((song, index) => (
                                <tr key={song.id} className="song-row">

                                    <td className="col-index">{index + 1}</td>

                                    <td className="col-thumb">
                                        {song.thumbnail && (
                                            <img src={song.thumbnail} alt={song.name} className="song-thumb" />
                                        )}
                                    </td>

                                    <td className="col-title">
                                        <a
                                            href={song.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="song-name-link"
                                        >
                                            {song.name}
                                        </a>
                                    </td>

                                    <td className="col-artist">
                                        {song.artist
                                            ? <a
                                                href={artistLink(song.artist)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="song-artist-link"
                                            >
                                                {song.artist}
                                            </a>
                                            : <span className="song-artist-empty">—</span>
                                        }
                                    </td>

                                    <td className="col-icon">
                                        <button
                                            className={`icon-btn heart-btn ${song.favorite ? 'active' : ''}`}
                                            onClick={() => handleToggle(song, 'favorite')}
                                            title="Favorite"
                                        >
                                            {song.favorite ? '♥' : '♡'}
                                        </button>
                                    </td>

                                    <td className="col-icon">
                                        <input
                                            type="checkbox"
                                            className="practice-checkbox"
                                            checked={!!song.must_practice}
                                            onChange={() => handleToggle(song, 'must_practice')}
                                            title="Must practice"
                                        />
                                    </td>

                                    <td className="col-icon">
                                        <a
                                            href={`https://www.songsterr.com/?pattern=${encodeURIComponent(song.name)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="icon-btn practice-link"
                                            title={`Practice "${song.name}" on Songsterr`}
                                        >
                                            P
                                        </a>
                                    </td>

                                    <td className="col-icon">
                                        <button
                                            className="icon-btn delete-btn"
                                            onClick={() => handleDeleteSong(song.id)}
                                            title="Remove from playlist"
                                        >
                                            🗑️
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

            </div>
        </div>
    );
}
