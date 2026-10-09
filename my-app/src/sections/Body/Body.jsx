import { useState, useRef } from 'react';
import kaguyadance from '../../assets/img/kaguyadance.gif';
import './body.css';
import AlbumFrame from '../../components/albumFrames/albumFrames.jsx';
import Playlist from '../../components/playlists/Playlists.jsx';
import assets from '../../components/utils/imgFetching.jsx';
import samples from '../../components/utils/mp3Fetching.jsx';
import blackchancery from '../../assets/fonts/BLKCHCRY.ttf';
import AddNewPlaylist from '../../components/playlists/AddNewPlaylist.jsx';

function Body() {

    return(
        <>
        <div className="pagebody">

            <div className="divider">
                <span></span>
            </div>

            <div className="divider">
                <span>—— The Big Four ——</span>
            </div>

            <div className="elements">

                <div className="sideframes">
                    <AlbumFrame
                        cover={assets['worldisyours.webp']}
                        title="ワルドイズユアーズ"
                        artist="Mass of the Fermenting Dregs"
                        sample={samples['worldisyours.mp3']}
                        titleLink="https://music.youtube.com/playlist?list=OLAK5uy_l5E-iQ5Qw6IQMP-uozdYF3Gz3a1y3ruCE&si=Hiy3chn6Wbs3FUnf"
                        artistLink="https://music.youtube.com/@motfdofficial"
                    />
                    <AlbumFrame
                        cover={assets['mute.webp']}
                        title="Mute"
                        artist="Scars of Life"
                        sample={samples['mute.mp3']}
                        titleLink="https://music.youtube.com/playlist?list=OLAK5uy_nJ1xDIhsQe--xU0qiGvowOHTsf8auqI-o&si=v5il8CunmqFhch_O"
                        artistLink="https://music.youtube.com/@ScarsOfLife"
                    />
                </div>

                <div className="kaguya">
                    <img src={kaguyadance} alt="kaguyita"></img>
                </div>

                <div className="sideframes"> 
                    <AlbumFrame
                        cover={assets['maria.webp']}
                        title="Silent Hill 2 OST"
                        artist="Akira Yamaoka"
                        sample={samples['maria.mp3']}
                        titleLink="https://music.youtube.com/playlist?list=OLAK5uy_ls-qYlTlPIgRyxuYPgNKSK7X-waaczQkw&si=yaD0jAnXtwii09-3"
                        artistLink="https://music.youtube.com/@AKIRAYAMAOKA_Official"
                    />
                    <AlbumFrame
                        cover={assets['pity.webp']}
                        title="Prowler In The Yard"
                        artist="Pig Destroyer"
                        sample={samples['pity.mp3']}
                        titleLink="https://music.youtube.com/playlist?list=OLAK5uy_lXB962KSKAFHNguzkvrttTJeBYzti9eHU&si=T69hVZj7T5GIQMmS"
                        artistLink="https://music.youtube.com/@PigDestroyerOfficial"
                    />
                </div>

            </div>

            <div className="divider">
                <span>—— + Your lists + ——</span>
            </div>

            <div className="playlists">
                
                <div className="addNewPlaylist">
                    <AddNewPlaylist />
                </div>

                <Playlist 
                    name="Drop B"
                    songs={17}
                    cover={assets['pity.webp']}
                    playlistLink={`https://www.google.com`}
                />

            </div>

            <div className="divider">
                <span></span>
            </div>

        </div>
        </>
    )
}

export default Body;