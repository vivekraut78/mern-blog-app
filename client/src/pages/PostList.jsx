import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

function PostList() 
{
  const [posts, setPosts] = useState([]);
  
    useEffect(() => { api.get("/posts").then((res) => setPosts(res.data)); }, [] );

  return (
    <div className="container mt-4">
      
      <h2>All Posts</h2>
      {posts.map((post) => 
      (
        <div key={post._id} className="card mb-3 post-card">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text text-muted">By {post.author?.name}</p>
            
            <Link to={`/posts/${post._id}`} className="btn btn-sm btn-outline-primary">
              Read more
            </Link>
          
          </div>
        </div>
      ))}
    </div>
  );
}
export default PostList;
