import { Link, useNavigate } from "react-router-dom";
function Navbar() 
{
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-light bg-light mb-3 px-3">
      {" "}
      <Link className="navbar-brand" to="/">
        Blog Platform
      </Link>{" "}
      <div>
        {" "}
        {token ? (
          <>
            {" "}
            <Link className="btn btn-sm btn-primary me-2" to="/create">
              New Post
            </Link>{" "}
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={handleLogout}
            >
              Logout
            </button>{" "}
          </>
        ) : (
          <>
            {" "}
            <Link className="btn btn-sm btn-outline-primary me-2" to="/login">
              Login
            </Link>{" "}
            <Link className="btn btn-sm btn-primary" to="/signup">
              Sign Up
            </Link>{" "}
          </>
        )}{" "}
      </div>{" "}
    </nav>
  );
}
export default Navbar;
