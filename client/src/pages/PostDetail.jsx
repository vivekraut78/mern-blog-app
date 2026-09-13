import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import api from "../api";
import { jwtDecode } from "jwt-decode";

function PostDetail() 
{
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    let currentUserId = null;

    if (token) 
    {
        currentUserId = jwtDecode(token).userId;
    }
    useEffect(() => { api.get(`/posts/${id}`).then((res) => setPost(res.data)); }, [id] );

    if (!post) 
    {
        return <p>Loading...</p>;
    }
        
    const handleDelete = async () => 
    {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        try 
        {
            await api.delete(`/posts/${id}`, 
            {
                headers: 
                {
                    Authorization: `Bearer ${token}` 
                },
            });
            navigate("/");
        } 
        catch (err) 
        {
            alert(err.response?.data?.error || "Failed to delete post");
        }
    };
  return (
    <div className="container mt-4 singlepost">
        <h2>{post.title}</h2> <p className="text-muted">By {post.author?.name}</p>
        <p>{post.content}</p>
        {
            currentUserId === post.author?._id && ( <div className="mt-3"> <Link to={`/edit/${id}`} className="btn btn-secondary me-2">Edit Post</Link> <button className="btn btn-danger" onClick={handleDelete}>Delete Post</button> </div> )
        }
    </div>
  );
}
export default PostDetail;
