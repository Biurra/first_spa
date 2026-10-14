import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App.jsx';
import ApiPing from './apiPing.jsx';
import PlaylistPage from './playlistPage.jsx';

export default function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/apiping" element={<ApiPing />} />
                <Route path="/playlist/:id" element={<PlaylistPage />} />
            </Routes>
        </BrowserRouter>
    );
}
