import { useState } from 'react';


function Playlist({name, songs, songCounter, cover, playlistLink}) {

    return (
        <div className="playlist-card-content">

            <img src={cover} alt={name} />

            <div className="playlist-info">
                <a href={playlistLink} target="_blank" rel="noopener noreferrer" className="playlist-name">
                    {playlistLink}
                </a>
                <p> {songs} songs </p>
            </div>
        </div>
    );
}

export default Playlist;