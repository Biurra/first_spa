import './footer.css';

function Footer() {

    return(
        <>
        <footer id="footer" className="footer">
            <button onClick={() => window.location.reload()}>
                ここに
            </button>    
            <button onClick={() => window.open("https://github.com/biurra", "_blank")}>
                Github
            </button>
            <button onClick={() => window.open("https://music.youtube.com/watch?v=JK_hBk2f01k&si=5l7MKm7ZmhEvB6F0", "_blank")}>
                青い、濃い、橙色の日
            </button>
            <button onClick={() => window.open("https://music.youtube.com/watch?v=keE7LJ_rQpI&si=EKAgfakeLgMg5fDW", "_blank")}>
                このスピードの先へ
            </button>
            <button onClick={() => window.open("https://music.youtube.com/playlist?list=OLAK5uy_lm3hNmpsw8KoC5swnHsKYvfHn8i01fYwA&si=JoeVfLaj7MISSEoQ", "_blank")}>
                改めまして始めましてみどりです
            </button>
            <button onClick={() => window.open("https://music.youtube.com/watch?v=dxxBbwCtR_s&si=qj0ftC9FdiDP6bIh", "_blank")}>
                君のように生きらたら
            </button>

        </footer>    
        </>
    );
}

export default Footer;