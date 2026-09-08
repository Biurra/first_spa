
function Footer() {

    function links() {
        return "hello2"
    }

    return(
        <>
        <nav>
            <button onClick={() => {links()}} className="Footer">
                {"Hello"}        
            </button>    
        </nav>    
        </>
    );
}

export default Footer;