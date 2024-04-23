import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { fetchPost, deletePost } from '../../services/postsService'

export default function PostDetails() {
    const [post, setPost] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const data = await fetchPost(id);
                setPost(data);
            } catch (error) {   
                console.error("Error fetching post", error);
            }
        };  
        fetchCurrentPost(); 
    }, [id]);

    const deletePostHandler = async () => {
        try {
            await deletePost(id);
            // navigate("/");
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
        <button onClick={deletePostHandler}>
            Delete
        </button>
    </div>
  )
}
