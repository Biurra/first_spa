import { Link } from 'react-router-dom';

function Playlist({ id, name, songs, cover, onDelete }) {
    return (
        <Link to={`/playlist/${id}`} className="playlist-card-content">

            <img src={cover} alt={name} />

            <div className="playlist-info">
                <span className="playlist-name">{name}</span>
                <p>{songs} songs</p>
            </div>

            <button
                className="delete-btn"
                title="Delete playlist"
                onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete && await onDelete();
                }}
            >
                🗑️
            </button>

        </Link>
    );
}

export default Playlist;