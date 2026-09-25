import { useState, useRef } from 'react';
import kaguyadance from '../../assets/img/kaguyadance.gif';
import './body.css';
import AlbumFrame from '../../components/albumFrames/albumFrames.jsx';
import assets from '../../components/utils/imgFetching.jsx';
import samples from '../../components/utils/mp3Fetching.jsx';

function Body() {

    return(
        <>
        <div className="pagebody">
            <h1>body</h1>

            <div className="elements">

                <div className="sideframes">
                    <AlbumFrame
                        cover={assets['worldisyours.webp']}
                        title="ワルドイズユアーズ"
                        artist="Mass of the Fermenting Dregs"
                        sample={samples['worldisyours.mp3']}
                    />
                    <AlbumFrame
                        cover={assets['mute.webp']}
                        title="Mute"
                        artist="Scars of Life"
                        sample={samples['mute.mp3']}
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
                    />
                    <AlbumFrame
                        cover={assets['pity.webp']}
                        title="Prowler In The Yard"
                        artist="Pig Destroyer"
                        sample={samples['pity.mp3']}
                    />
                </div>

            </div>
        </div>
        </>
    )
}

export default Body;