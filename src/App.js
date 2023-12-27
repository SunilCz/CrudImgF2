
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import NotFound from './pages/NotFound';
import PostDetails from './pages/PostDetails';
// import SearchPage from './pages/SearchPage'; // Import the new component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container sx={{ p: 1, mt: 10 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/update/:id" element={<UpdatePost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          {/* <Route path="/search" element={<SearchPage />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
