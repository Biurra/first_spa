import { useState } from 'react';


function Playlist({name, songs, songCounter, cover, playlistLink}) {



    return (
        <div className="playlist-card-content">
            <div className="playlist-info">
                <a href={{playlistLink}} target="_blank" rel="noopener noreferrer">
                    {{playlistLink}}
                </a>
            </div>
        </div>
    );
}

export default Playlist;