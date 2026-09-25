import { useState, useRef, useEffect } from 'react';

function AlbumFrame({ artist, title, cover, sample }) {
    const [hovered, setHovered] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);

    const audioRef = useRef(null);

    useEffect(() => {
        const audioElement = audioRef.current;

        if (!audioElement) return;

        const updateProgress = () => {
            if (audioElement.duration) {
                setProgress(
                    (audioElement.currentTime / audioElement.duration) * 100
                ); 
            }
        };

        audioElement.addEventListener('timeupdate', updateProgress);
        return () => {
            audioElement.removeEventListener('timeupdate', updateProgress);
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (playing) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setPlaying(!playing);
    };

    const toggleMute = () => {
        if (!audioRef.current) return;

        audioRef.current.muted = !muted;
        setMuted(!muted);
    };

    const changeVolume = (x) => {
        const newVolume = Number(x.target.value);
        setVolume(newVolume);

        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }

        if (newVolume === 0) {
            setMuted(true);
            audioRef.current.muted = true;
        } else {
            setMuted(false);
            audioRef.current.muted = false;
        }
    };

    const changeProgress = (e) => {
        const newProgress = Number(e.target.value);

        if (audioRef.current?.duration) {
            audioRef.current.currentTime =
                (newProgress / 100 ) * audioRef.current.duration;
        }

        setProgress(newProgress);
    };

    const fadeAudio = (startVolume, targetVolume, duration = 250) => {
        const audio = audioRef.current;

        if (!audio) return;
        
        const startTime = performance.now();

        const fade = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            audio.volume = 
                startVolume + (targetVolume - startVolume) * progress;

            if (progress < 1) {
                requestAnimationFrame(fade);
            }
        };
        requestAnimationFrame(fade);
    };

    return (
        <div className={`album-wrapper ${hovered ? 'album-hovered' : ''}`}
            onMouseEnter={() => {
                setHovered(true);
                if (!audioRef.current) return;
                fadeAudio(0, volume);
                
                audioRef.current.volume = volume;
                
                audioRef.current.play();
                setPlaying(true);
            }}
            onMouseLeave={() => {
                setHovered(false);
                fadeAudio(audioRef.current.volume, 0);
                setTimeout(() => {
                    if (!audioRef.current) return;
                    audioRef.current.pause();
                    audioRef.current.volume = volume;
                    setPlaying(false);
                }, 250);
            }}
        >
            <div className="album-frame">
                <img src={cover} alt={title} />
            </div>

            <div className="album-lid">
                <div className="album-lid-content">

                <div className="album-info">
                    <h3>{title}</h3>
                    <p>{artist}</p>
                </div>

                <div className="album-controls">

                    <button onClick={togglePlay}>
                        {playing ? '❚❚' : '▶'}
                    </button>

                    <input 
                        className="progress"
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={changeProgress}
                        />
                    <div className="volume-control">

                        <button onClick={toggleMute}>
                            {muted || volume === 0 ? '🔇' : '🔊'}
                        </button>

                        <div className="volume-slider">
                            <input 
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={changeVolume}
                                />
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <audio ref={audioRef} src={sample}/>
        </div>
    );
}

export default AlbumFrame;