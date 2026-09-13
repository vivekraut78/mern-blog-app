import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function PostDetail() 
{
  const { id } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => { api.get(`/posts/${id}`).then((res) => setPost(res.data)); } , [id] );
  
  if (!post) return <p>Loading...</p>;
  return (
    <div className="container mt-4">
      <h2>{post.title}</h2> <p className="text-muted">By {post.author?.name}</p>
      <p>{post.content}</p>
    </div>
  );
}
export default PostDetail;
