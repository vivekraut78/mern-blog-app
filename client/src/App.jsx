import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PostList from "./pages/PostList";
 import PostDetail from './pages/PostDetail';

function App() 
{
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PostList/>} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>

    </BrowserRouter>
  );
}
export default App;
