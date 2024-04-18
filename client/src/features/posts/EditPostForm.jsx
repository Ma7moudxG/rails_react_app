import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { API_URL } from '../../constants';

export default function EditPostForm() {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // fetch the current post by id
        const fetchCurrentPost = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                if(response.ok){
                    const data = await response.json();
                    setPost(data);
                } else {
                    throw response;
                }
            } catch (error) {   
                console.error("Error fetching post", error);
            }
        };
        fetchCurrentPost();
    } , [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: post.title,
                    body: post.body,
                }),
            });   
            if(response.ok){
                const json = await response.json();
                console.log("Success:", json);
                navigate(`/posts/${id}`);
            } else {
                throw response;
            }
        } catch (error) {
            console.error("Error updating post", error);
        }
    }   

    if(!post) return <h2>Loading...</h2>;

  return (
    <div>
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="post-title">Title:</label>
                <br />
                <input
                    id="post-title"
                    type="text"
                    value={post.title}
                    onChange={(e) => setPost({...post, title: e.target.value})}
                    required
                />
            </div>
            <div>
                <label htmlFor="post-body">Body:</label>
                <br />
                <textarea
                    id="post-body"
                    value={post.body}
                    onChange={(e) => setPost({...post, body: e.target.value})}
                    required
                />
            </div>
            <div>
                <button type="submit">Update Post</button>
            </div>
        </form>
    </div>
  )
}
