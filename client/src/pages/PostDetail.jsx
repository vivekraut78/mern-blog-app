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
    const [comments, setComments] = useState([]); 
    const [commentText, setCommentText] = useState('');
    useEffect(() => { api.get(`/comments/${id}`).then((res) => setComments(res.data)); }, [id]);
    let currentUserId = null;

    const handleAddComment = async (e) => 
    { 
        e.preventDefault(); 
        try 
        { 
            const res = await api.post( `/comments/${id}`, { text: commentText }, 
            { 
                headers: { Authorization: `Bearer ${token}` } } ); 
                setComments([...comments, { ...res.data, author: { name: 'You' } }]); 
                setCommentText(''); 
        } 
        catch (err) 
        { 
            alert(err.response?.data?.error || 'Failed to add comment'); 
        } 
    };

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
        <hr className="my-4" /> <h4>Comments</h4> 
        {
            token && ( <form onSubmit={handleAddComment} className="mb-3"> 
            
            <textarea className="form-control mb-2" rows="2" placeholder="Write a comment..." 
            value={commentText} onChange={ (e) => setCommentText(e.target.value) } required />

            <button className="btn btn-primary btn-sm" type="submit">Post Comment</button> </form> )
        } 
        {
            comments.map((comment) => ( <div key={comment._id} className="border-bottom py-2"> <strong>{comment.author?.name}</strong> <p className="mb-0">{comment.text}</p> </div> ))
        }
    </div>
  );
}
export default PostDetail;
