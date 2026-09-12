import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";


function Login() 
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => 
    {
        e.preventDefault();
        try 
        {
            const res = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/");
        } 
        catch (err) 
        {
            alert(err.response?.data?.error || "Login failed");
        }
    };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      {" "}
      <h2>Login</h2>{" "}
      <form onSubmit={handleSubmit}>
        {" "}
        
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
          Login
        </button>{" "}
      </form>{" "}
    </div>
  );
}
export default Login;
