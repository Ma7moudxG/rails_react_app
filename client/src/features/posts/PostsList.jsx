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
  
    return (
    <div>
        {posts.map((post) => (
            <div key={post.id} className="post-container">
                <h2>
                    <Link to={`/posts/${post.id}`} className="post-title">
                        {post.title}
                    </Link>
                </h2>
                <p>{post.body}</p>
            </div>
        ))}  
    </div>
  )
}


export default PostsList;