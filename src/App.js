
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Feed from './pages/Feed';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import TestPage2 from './pages/TestPage2';
import Login from './pages/Login';
import Register from './pages/Register';
import PostJob from './pages/PostJob';
import Footer from './components/Footer';
import Job from './pages/Job';
import OtherProfile from './pages/OtherProfile';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/testpage2" element={<TestPage2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/postjob" element={<PostJob />} />
        <Route path="/job/:id" element={<Job />} />
        <Route path="/otherprofile/:id" element={<OtherProfile />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
