
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Feed from './pages/Feed';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import TestPage from './pages/TestPage';
import TestPage2 from './pages/TestPage2';
import Login from './pages/Login';
import Register from './pages/Register';
import PostJob from './pages/PostJob';
import Footer from './components/Footer';
import Job from './pages/Job';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/testpage" element={<TestPage />} />
        <Route path="/testpage2" element={<TestPage2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/postjob" element={<PostJob />} />
        <Route path="/job/:id" element={<Job />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
