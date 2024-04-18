// API_URL comes from the .env.development file
"use client"

// import { API_URL } from "../../constants"
import { API_URL }  from "../../constants"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"


 function PostsList() {
    
    const [posts, setPosts] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);
    // Fetch posts from the API

    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPosts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const deletePost = async (id) => {
        try {
            // DELETE request to: http://localhost:3000/api/v1/posts/:id
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setPosts(posts.filter((post) => post.id !== id));
            } else {
                throw response;
            }
        } catch (error) {
            console.error("Error deleting post", error);
        }
    }
  
    return (
    <div>
        {posts.map((post) => (
            <div key={post.id} className="post-container">
                <h2>
                    <Link to={`/posts/${post.id}`} className="post-title">
                        {post.title}
                    </Link>
                </h2>
                <div className="post-links">
                    <Link to={`/posts/${post.id}/edit`}>Edit</Link>
                    {" | "}
                    <button onClick={() => deletePost(post.id)}>
                        Delete
                    </button>    
                </div>
            </div>
        ))}  
    </div>
  )
}


export default PostsList;