import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
function EditPost() 
{
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => { api.get(`/posts/${id}`).then((res) => { setTitle(res.data.title); setContent(res.data.content); }); }, [id] );

    const handleSubmit = async (e) => { e.preventDefault();
        try 
        {
            await api.put
            (
                `/posts/${id}`,
                { title, content },
                { headers: { Authorization: `Bearer ${token}` } },
            );
            navigate(`/posts/${id}`);
        } 
        catch (err) 
        {
            alert(err.response?.data?.error || "Failed to update post");
        }
    };
    return (
        <div className="container mt-4" style={{ maxWidth: "600px" }}>
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>

            <input className="form-control mb-2" value={title} onChange={(e) => setTitle(e.target.value)} required />
            
            <textarea className="form-control mb-3" rows="6" value={content} onChange={(e) => setContent(e. target.value)} required
            />

            <button className="btn btn-primary" type="submit">
                Save Changes
            </button>
        </form>
        </div>
  );
}
export default EditPost;
