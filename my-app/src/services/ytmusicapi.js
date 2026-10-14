const YT_API = 'http://127.0.0.1:8000';

export async function searchYTMusic(query, limit = 10) {
    const res = await fetch(`${YT_API}/search?q=${encodeURIComponent(query)}&limit=${limit}`);
    if (!res.ok) {
        throw new Error(`YTMusic search failed: ${res.status}`);
    }
    return res.json();
}


export async function getSongInfo(url) {
    const res = await fetch(`${YT_API}/song-info?url=${encodeURIComponent(url)}`);
    if (!res.ok) {
        throw new Error(`YTMusic song-info failed: ${res.status}`);
    }
    return res.json();
}
