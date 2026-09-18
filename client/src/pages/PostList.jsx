import { useEffect, useState, useRef, useCallback } from "react";
import api from "../api";
import { Link } from "react-router-dom";

function PostList() 
{
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const observer = useRef();

  // Fetch posts whenever page or search changes
  useEffect(() => 
  {   
    setLoading(true); 
    api.get("/posts", { params: { page, limit: 5, search } }).then((res) => 
    {
      setPosts( (prev) => page === 1 ? res.data.posts : [...prev, ...res.data.posts] );
      setHasMore(res.data.hasMore);
    })
    .finally(() => setLoading(false));
  }, [page, search] );

  // Reset to page 1 whenever search term changes
  const handleSearchChange = (e) => 
  {
    setSearch(e.target.value);
    setPage(1);
    setPosts([]);
  };

  // Infinite scroll: observe the last post card
  const lastPostRef = useCallback( (node) => 
  {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => 
    {
      if (entries[0].isIntersecting && hasMore) 
      {
        setPage((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore] );

  return (
    <div className="container mt-4">
      <h2>All Posts</h2>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search posts by title..."
        value={search}
        onChange={handleSearchChange}
      />

      {
        posts.map((post, index) => 
        (
          <div
            key={post._id}
            ref={index === posts.length - 1 ? lastPostRef : null}
            className="card mb-3 post-card"
          >
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text text-muted">By {post.author?.name}</p>
              <Link to={`/posts/${post._id}`} className="btn btn-sm btn-outline-primary">
                Read more
              </Link>
            </div>
          </div>
        ))
      }

      {
        loading && <p className="text-center text-muted">Loading more posts...</p>
      }
      
      {
        !hasMore && posts.length > 0 && ( <p className="text-center text-muted">You've reached the end.</p> )
      }

      {
        !loading && posts.length === 0 && ( <p className="text-center text-muted">No posts found.</p>)
      }
    </div>
  );
}

export default PostList;