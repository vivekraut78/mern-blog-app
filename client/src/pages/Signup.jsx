import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
function Signup() 
{
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => 
    {
        e.preventDefault();
        try 
        {
            await api.post("/auth/signup", { name, email, password });
            navigate("/login");
        } 
        catch (err) 
        {
            alert(err.response?.data?.error || "Signup failed");
        }
    };
  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      {" "}
      <h2>Sign Up</h2>{" "}
      <form onSubmit={handleSubmit}>
        {" "}
        
        <input
          className="form-control mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />{" "}

        <input
          className="form-control mb-2"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />{" "}

        <input
          className="form-control mb-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />{" "}

        <button className="btn btn-primary w-100" type="submit">
          Sign Up
        </button>{" "}
      </form>{" "}
    </div>
  );
}
export default Signup;
