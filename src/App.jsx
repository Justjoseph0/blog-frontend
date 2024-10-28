import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Notfound from "./pages/Notfound";
import PostDetail from "./pages/PostDetail";
import WriteBlog from "./pages/WriteBlog";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateProfile from "./pages/UpdateProfile";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import UserPosts from "./pages/UserPosts";
import EditPost from "./pages/EditPost";
import SportBlog from "./pages/SportBlog";
import EntertainmentPage from "./pages/EntertainmentPage";
import SciencePage from "./pages/SciencePage";
import UserDetail from "./pages/UserDetail";


function RegisterUser() {
  localStorage.clear();
  return <Register />;
}

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
    <div className="font-sans"> 
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/post/:slug" element={<PostDetail />} />
        <Route path="/sport" element={<SportBlog />}/>
        <Route path="/entertainment" element={<EntertainmentPage />}/>
        <Route path="/science" element={<SciencePage />}/>
        <Route path="/user/:author" element={<UserDetail />}/>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Notfound />} />
        <Route
          path="/write"
          element={
            <ProtectedRoute>
              <WriteBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
         <Route
          path="/my-posts"
          element={
            <ProtectedRoute>
              <UserPosts />
            </ProtectedRoute>
          }
        />
         <Route
          path="/edit-post/:slug"
          element={
            <ProtectedRoute>
             <EditPost />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
