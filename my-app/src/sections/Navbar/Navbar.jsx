import { useState } from 'react';

function Navbar() {
    const [display, setDisplay] = useState(true);

    function showNavbar() {
        return(
        <div>
            <button>Promos</button>
            <button>Sucursales</button>
            <button>Menú</button>
            <button>Sobre nosotros</button>
        </div>
        )
    }

    return(
        <>
        <button onClick={() => {setDisplay(!display); showNavbar(!display)}}>
            { display ? "X" : "三" }
        </button>
        { display && showNavbar() }
        </>
    )

}

export default Navbar;