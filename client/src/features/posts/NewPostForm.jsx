"use client"

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../services/postsService'

export default function NewPostForm() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = { title, body };

        try{
            await createPost(postData);
            // navigate("/");
            navigate(`/posts/${respinse.id}`);
        } catch (error) {
            console.error("Failed creating post", error);
        }
    }
    
  return (
    <div>
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="titleInput">Title:</label>
                <input
                    id="titleInput"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="bodyInput">Body:</label>
                <textarea
                    id="bodyInput"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />
            </div>
            <div>
                <button type="submit">Create Post</button>
            </div>
        </form>
    </div>
  )
}
