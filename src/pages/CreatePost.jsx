import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from 'jodit-react';

const URL = process.env.REACT_APP_CRUD;

const CreatePost = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: '', content: '', image: null });
  const [errorMessage, setErrorMessage] = useState('');


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBlog({ ...blog, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Check if the file size is within the limit (5MB)
    if (file && file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size exceeds the limit (5MB). Please choose a smaller file.');
      return;
    }

    setBlog({ ...blog, image: file });
    setErrorMessage(''); // Clear any previous error message
  };
  

  const stripPTags = (html) => {
    return html.replace(/<\/?p>/g, '');
  };

  const handleSubmit = async () => {
    try {
      // Check for the presence of an error message
      if (errorMessage) {
        console.error('Error: Cannot create post due to file size limit.');
        toast.error('Error: Cannot create post due to file size limit.');
        return;
      }
  
      const formData = new FormData();
      formData.append('title', blog.title);
      formData.append('content', stripPTags(blog.content));
      formData.append('image', blog.image);
  
      const res = await fetch(`${URL}/api/blog/create`, {
        method: 'POST',
        body: formData,
      });
  
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setBlog({ title: '', content: '', image: null });
  
        toast.success('Created successfully');
  
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error('Error creating:', error);
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
{errorMessage && <p style={{ color: 'red', fontSize: '12px', marginTop: '-30px' }}>{errorMessage}</p>}
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
          Create Post
        </Button>
      </Card>
    </>
  );
};

export default CreatePost;
