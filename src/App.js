// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import NotFound from './pages/NotFound';
import PostDetails from './pages/PostDetails'; // Import the new component

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Container sx={{ p: 1, mt: 10 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/update/:id" element={<UpdatePost />} />
          <Route path="/post/:id" element={<PostDetails />} /> {/* New route for post details */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
