import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await api.post(
        "/posts",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      navigate(`/posts/${res.data._id}`);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create post");
    }
  };
  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      {" "}
      <h2>Create a New Post</h2>{" "}
      <form onSubmit={handleSubmit}>
        {" "}
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />{" "}
        <textarea
          className="form-control mb-3"
          placeholder="Content"
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />{" "}
        <button className="btn btn-primary" type="submit">
          Publish
        </button>{" "}
      </form>{" "}
    </div>
  );
}
export default CreatePost;
