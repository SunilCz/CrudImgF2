// pages/PostDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Fetch blog details based on id
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_CRUD}/api/blog/post/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      {blog.image && (
        <img
          src={`${process.env.REACT_APP_CRUD}/uploads/${blog.image}`}
          alt={`Image for ${blog.title}`}
          style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover' }}
        />
      )}
    </div>
  );
};

export default PostDetails;
