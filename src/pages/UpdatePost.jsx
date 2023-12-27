import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from 'jodit-react';

const URL = process.env.REACT_APP_CRUD;

const UpdatePost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState({ title: '', content: '', image: null });

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/api/blog/post/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBlog({ ...blog, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBlog({ ...blog, image: file });
  };



  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', blog.title);
      formData.append('content', stripHtml(blog.content));
      formData.append('image', blog.image);

      const res = await fetch(`${URL}/api/blog/update/${id}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        console.log(data);

        toast.success('Updated successfully');

        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
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
            Update Post
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
         <JoditEditor
          value={blog.content}
          config={{
            minHeight: 300, 
            toolbarAdaptive: false,
            defaultMode: '1',
          }}
          tabIndex={1}
          onBlur={(newContent) => setBlog({ ...blog, content: newContent })}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Update Post
        </Button>
      </Card>
    </>
  );
};

export default UpdatePost;