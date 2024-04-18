import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { API_URL } from '../../constants'

export default function PostDetails() {
    const [post, setPost] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
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
    }, [id]);

    const deletePost = async () => {
        try {
            // DELETE request to: http://localhost:3000/api/v1/posts/:id
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                // setPosts(posts.filter((post) => post.id !== id));
                navigate(`/`);
            } else {
                throw response;
            }
        } catch (error) {
            console.error("Error deleting post", error);
        }
    }


    if(!post) return <h2>Loading...</h2>;

  return (
    <div>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <Link to={`/posts/${post.id}/edit`}>Edit</Link>
        {" | "}
        <Link to="/">Back to Posts</Link>
        {" | "}
        <button onClick={deletePost}>
            Delete
        </button>
    </div>
  )
}
