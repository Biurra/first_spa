import Navbar from './sections/Navbar/Navbar.jsx';
import Footer from './sections/Footer/Footer.jsx';
import Body from './sections/Body/Body.jsx';
import './app.css';

function App() {

  return (
    <>
    <div className="page">
      <Navbar />
      <Body />
      <Footer />
    </div>
    </>
  )
}

export default App;
