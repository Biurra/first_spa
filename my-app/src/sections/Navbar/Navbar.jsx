import { useState } from 'react';
import './navbar.css';

function Navbar() {
    const [display, setDisplay] = useState(true);

    return(
        <>
        <button onClick={() => {setDisplay(!display); showNavbar(!display)}} className="burger">
            { display ? "X" : "三" }
        </button>

        { display && (
            <nav className="navbar">
                <button>Promos</button>
                <button>Sucursales</button>
                <button>Menú</button>
                <button>Sobre nosotros</button>
            </nav>
        )}
        </>
    );
}

export default Navbar;