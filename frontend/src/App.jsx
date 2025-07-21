import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import FindRoommate from "./pages/FindRommate";
import Chat from "./pages/Chat";
import Messages from "./pages/Messages";
import About from "./pages/About";
import Contact from "./pages/Contact";
import UpdateProfile from "./pages/UpdateProfile";
import { useSelector } from "react-redux";

function App() {
   let user=useSelector((store)=>store.auth.user);
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        {/* Main content area, will take up all available space */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/find-roommate" element={<FindRoommate />} />
             <Route path="/chat/:userId" element={<Chat user={user} />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
          </Routes>
        </div>

        {/* Footer always at the bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
