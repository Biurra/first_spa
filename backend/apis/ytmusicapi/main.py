from urllib.parse import urlparse, parse_qs

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from ytmusicapi import YTMusic

app = FastAPI(title="Veil Music API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

ytmusic = YTMusic()


def extract_video_id(url: str) -> str | None:
    parsed = urlparse(url)
    if parsed.netloc in ("youtu.be",):
        return parsed.path.lstrip("/")
    qs = parse_qs(parsed.query)
    if "v" in qs:
        return qs["v"][0]
    if parsed.scheme == "" and "/" not in url:
        return url
    return None


@app.get("/search")
def search(q: str, limit: int = 10):
    if not q:
        raise HTTPException(status_code=400, detail="Query param 'q' is required.")
    results = ytmusic.search(q, filter="songs", limit=limit)
    return [
        {
            "videoId":   r.get("videoId"),
            "title":     r.get("title"),
            "artist":    r["artists"][0]["name"] if r.get("artists") else None,
            "album":     r["album"]["name"] if r.get("album") else None,
            "thumbnail": r["thumbnails"][-1]["url"] if r.get("thumbnails") else None,
            "duration":  r.get("duration"),
        }
        for r in results
        if r.get("videoId")
    ]


@app.get("/song-info")
def song_info(url: str):
    video_id = extract_video_id(url)
    if not video_id:
        raise HTTPException(status_code=400, detail="Could not extract a video ID from the provided URL.")

    song = ytmusic.get_song(video_id)
    details = song.get("videoDetails", {})
    thumbnails = details.get("thumbnail", {}).get("thumbnails", [])

    return {
        "videoId":   details.get("videoId"),
        "title":     details.get("title"),
        "artist":    details.get("author"),
        "thumbnail": thumbnails[-1]["url"] if thumbnails else None,
        "duration":  details.get("lengthSeconds"),
    }
