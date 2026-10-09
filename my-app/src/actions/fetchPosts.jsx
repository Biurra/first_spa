export default async function fetchPosts(link) {
    const response = await fetch(link);
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data.slice(0, 5);
}
