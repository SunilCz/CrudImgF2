import React, { useEffect, useState, useRef } from 'react';
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
  const searchInputRef = useRef(null);
  const searchResultsRef = useRef([]);

  const handlePostDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  const handleImageClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleSearchChange = async (query) => {
    setSearchQuery(query);

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
          searchResultsRef.current = data.results; // Store the current search results
        } else {
          console.log(data);
        }
      }
    } catch (error) {
      console.error('Error searching data:', error);
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
        searchResultsRef.current = []; // Reset the previous search results when a new search is performed
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

  // Collapse search results when clicking outside the search bar
  const handleClickOutside = (event) => {
    if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    // Attach the click event listener when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Detach the click event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Box sx={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', margin: 'auto', gap: 3, py: 2, position: 'relative' }}>
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
        inputRef={searchInputRef}
        onFocus={() => setSearchResults(searchResultsRef.current || [])} // Restore search results when the search bar is focused
        
      />

      {searchResults.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: searchInputRef.current ? searchInputRef.current.offsetHeight + 20 : '70px', // Position below the search input
            left: 0,
            width: '100%',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            zIndex: 1,
          }}
        >
          {searchResults.map((result) => (
            <div key={result._id} onClick={() => handleImageClick(result._id)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', padding: '8px' }}>
              <img src={`${URL}/uploads/${result.image}`} alt={result.title} style={{ maxWidth: '50px', maxHeight: '50px' }} />
              <span>{result.title}</span>
            </div>
          ))}
        </div>
      )}

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
