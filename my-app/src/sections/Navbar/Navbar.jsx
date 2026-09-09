import { useState, useEffect } from 'react';
import './navbar.css';

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

    return(
        <>
        <nav className="navbar">
            
        { display && (
            <>
            <button>Promos</button>
            <button>Sucursales</button>
            <button>Menú</button>
            <button>Sobre nosotros</button>
            </>
        )}

        <button onClick={() => {setDisplay(!display)}} className="burger">
        { display && !landscape ? " X " : "三" }
        </button>                        
        </nav>
        </>
    );
}

export default Navbar;