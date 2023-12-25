import React, { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import PostCard from './PostCard';
import { useNavigate } from 'react-router-dom';

const URL = 'http://localhost:7000'; // Replace with your backend URL

const DisplayPost = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handlePostDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  const handleImageClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${URL}/api/blog/?page=${currentPage}&limit=3`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, searchQuery]);

  const handleSearch = async () => {
    try {
      const res = await fetch(`${URL}/api/blog/search?query=${searchQuery}`);
      const data = await res.json();
      if (res.ok) {
        setPosts(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error('Error searching data:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box sx={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', margin: 'auto', gap: 3, py: 2 }}>
      <TextField
        label="Search by Title"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />

      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>

      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={{
            ...post,
            image: post.image ? `${URL}/uploads/${post.image}` : null,
          }}
          onDelete={handlePostDelete}
          onImageClick={() => handleImageClick(post._id)}
        />
      ))}

      <div>
        <Button variant="outlined" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        <span style={{ margin: '0 10px' }}>Page {currentPage}</span>
        <Button variant="outlined" onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </Button>
      </div>
    </Box>
  );
};

export default DisplayPost;
