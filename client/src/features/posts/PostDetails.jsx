import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { API_URL } from '../../constants'

export default function PostDetails() {
    const [post, setPost] = useState(null);
    const {id} = useParams();

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

    if(!post) return <h2>Loading...</h2>;

  return (
    <div>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <Link to="/">Back to Posts</Link>
    </div>
  )
}
