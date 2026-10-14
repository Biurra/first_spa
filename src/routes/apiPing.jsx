import fetchPosts from '../actions/fetchPosts.jsx';
import { useEffect, useState } from 'react';

export default function ApiPing() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPosts('https://jsonplaceholder.typicode.com/posts')
            .then(data => setPosts(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main>
            <h1>API Ping Test</h1>
            {posts.map((post) => (
                <article key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </article>
            ))}
        </main>
    )
}
