// API_URL comes from the .env.development file
"use client"

// import { API_URL } from "../../constants"
import { fetchAllPosts, deletePost  as deletePostService}  from "../../services/postService"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"


 function PostsList() {
    
    const [posts, setPosts] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    useEffect(() => {
        async function loadPosts() {
            try{
                const data = await fetchAllPosts();
                setPosts(data);
                setLoading(false);
            } catch (error){
                console.error("Error fetching posts", error)
                setLoading(false);
            }
        }
    }, []);

    const deletePost = async (id) => {
        try {
            await deletePostService(id);
            setPosts(posts.filter((post) => post.id !== id));
            // setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
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