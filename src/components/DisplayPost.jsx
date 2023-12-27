import React, { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import PostCard from './PostCard';
import { useNavigate, useLocation } from 'react-router-dom';

const URL = process.env.REACT_APP_CRUD;

const DisplayPost = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const handlePostDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  const handleImageClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleSearchChange = async (query, keyPressed) => {
    setSearchQuery(query);

    // Check if Enter key is pressed
    if (keyPressed === 'Enter') {
      await handleSearch();
    } else {
      try {
        if (query.trim() === '') {
          // If the search query is empty, reset search results
          setSearchResults([]);
        } else {
          const res = await fetch(
            `${URL}/api/blog/search?q=${encodeURIComponent(query)}&page=1&limit=3`
          );
          const data = await res.json();
          if (res.ok) {
            setSearchResults(data.results);
          } else {
            console.log(data);
          }
        }
      } catch (error) {
        console.error('Error searching data:', error);
      }
    }
  };

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `${URL}/api/blog/search?q=${encodeURIComponent(searchQuery)}&page=1&limit=3`
      );
      const data = await res.json();
      if (res.ok) {
        setPosts(data.results);
        setTotalPages(1); // Reset totalPages for search results
        // Reset search results when search is successful
        setSearchResults([]);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error('Error searching data:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Update the URL with the new page
      navigate(`${location.pathname}?page=${newPage}&limit=3`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiEndpoint = `${URL}/api/blog/?page=${currentPage}&limit=3`;

        // Check if there's a search query in the URL
        const query = new URLSearchParams(location.search).get('q');
        if (query) {
          apiEndpoint = `${URL}/api/blog/search?q=${encodeURIComponent(query)}&page=${currentPage}&limit=3`;
          setSearchQuery(query);
        }

        const res = await fetch(apiEndpoint);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.blogs);
          setTotalPages(data.totalPages);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, location.search]);

  return (
    <Box sx={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', margin: 'auto', gap: 3, py: 2 }}>
      <TextField
        label="Search by Title"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />

      {/* Display search recommendations with smaller images */}
      {searchResults.map((result) => (
        <div key={result._id} onClick={() => handleImageClick(result._id)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={`${URL}/uploads/${result.image}`} alt={result.title} style={{ maxWidth: '50px', maxHeight: '50px' }} />
          <span>{result.title}</span>
        </div>
      ))}

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
        <Button variant="outlined" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </Box>
  );
};

export default DisplayPost;
