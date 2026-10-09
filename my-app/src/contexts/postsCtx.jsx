import { useState } from 'react';

export const [posts, setPosts] = useState([]);
export const [loading, setLoading] = useState(true);
export const [error, setError] = useState(null);

