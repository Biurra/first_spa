import { useState, useEffect } from 'react';
import './navbar.css';
import '../Footer/footer.css';

function Navbar() {
    const [display, setDisplay] = useState(true);
    const [landscape, setLandscape] = useState(window.matchMedia("(orientation: landscape)").matches);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(orientation: landscape)");
        const orientationChange = (event) => {
            setLandscape(event.matches);
        };

        mediaQuery.addEventListener("change", orientationChange);

        return () => {
            mediaQuery.removeEventListener("change", orientationChange);
        };
    }, []);

    return (
        <>
            <nav className="navbar">

                {display && (
                    <>
                        <button onClick={() => window.open("https://github.com/biurra", "_blank")}>
                            Github
                        </button>
                        <button onClick={() => document.getElementById("playlist").scrollIntoView()}>
                            Playlists
                        </button>
                        <button onClick={() => document.getElementById("bigfour").scrollIntoView()}>
                            The Big Four
                        </button>
                        <button onClick={() => document.getElementById("footer").scrollIntoView()}>
                            About
                        </button>
                    </>
                )}

                <button onClick={() => { setDisplay(!display) }} className="burger">
                    {display && !landscape ? " X " : "三"}
                </button>
            </nav>
        </>
    );
}

export default Navbar;