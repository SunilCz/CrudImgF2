// pages/CreatePost.jsx
import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = process.env.REACT_APP_CRUD;

const CreatePost = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: '', content: '', image: null }); // Use null for image

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBlog({ ...blog, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBlog({ ...blog, image: file });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', blog.title);
      formData.append('content', blog.content);
      formData.append('image', blog.image); // Append the image file to the formData

      const res = await fetch(`${URL}/api/blog/create`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setBlog({ title: '', content: '', image: null }); // Reset image state

        toast.success('Created successfully');

        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error('Error creating:', error);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Card
        sx={{
          p: 4,
          py: 5,
          maxWidth: '670px',
          margin: '50px auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          borderRadius: '15px',
        }}
        elevation={10}
      >
        <CardContent sx={{ m: 0 }}>
          <Typography gutterBottom variant="h4" component="div" sx={{ m: 0 }}>
            Create a post
          </Typography>
        </CardContent>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          name="title"
          onChange={handleChange}
          value={blog.title}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ margin: '10px 0' }}
        />
        <TextField
          id="outlined-basic"
          label="Content"
          variant="outlined"
          name="content"
          rows={7}
          onChange={handleChange}
          value={blog.content}
          multiline
        />
        <Button variant="contained" onClick={handleSubmit}>
          Create Post
        </Button>
      </Card>
    </>
  );
};

export default CreatePost;
