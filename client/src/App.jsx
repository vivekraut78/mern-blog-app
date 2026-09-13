import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PostList from "./pages/PostList";
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost'; 
import Navbar from './Navbar';

function App() 
{
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PostList/>} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/create" element={<CreatePost />} />

      </Routes>

    </BrowserRouter>
  );
}
export default App;
