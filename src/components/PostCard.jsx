import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Actions from './Actions';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PostModal from './PostModal';
import { Button } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';

export default function PostCard(props) {
  const { user, _id, title, content, image, createdOn } = props.post;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleImageClick = (event) => {
    event.stopPropagation(); // Stop the event propagation to prevent navigation
    handleModalOpen();
  };

  const handleDownloadClick = async (event) => {
    event.stopPropagation(); // Stop the event propagation to prevent navigation
    event.preventDefault(); // Prevent the default behavior of the button

        // Use the image link from the props.post object
        const imageLink = props.post.image;
  
        // Check if the image link is available
        if (imageLink) {
          try {
            const response = await fetch(imageLink);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
      
            const a = document.createElement('a');
            a.href = url;
            a.download = 'image.jpg'; // You can set the desired file name here
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
      
            // Revoke the Object URL to free up resources
            window.URL.revokeObjectURL(url);
          } catch (error) {
            console.error('Error downloading image:', error);
          }
        } else {
          console.error('Image link not available for download.');
        }
  };

  return (
    <Card sx={{ width: '100%', boxShadow: '0 0 15px rgb(0, 0, 0, 0.2)', borderRadius: '4px' }} id={_id}>
      <CardHeader
        avatar={
          user && user.name && (
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {user.name.slice(0, 1)}
            </Avatar>
          )
        }
        action={props.onDelete && <Actions id={_id} onDelete={props.onDelete} />}
        title={title}
        subheader={moment(createdOn).fromNow()}
      />
      <Link to={`/post/${_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
          component="div" // Change component to 'div' to make it non-clickable
          height="100%"
          onClick={handleImageClick}
          style={{ cursor: 'pointer', position: 'relative' }}
        >
          <img src={image} alt={user ? `${user.name}'s post` : 'Post'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <Button
            onClick={handleDownloadClick}
            variant="outlined"
            size="small"
            sx={{
              position: 'absolute',
              bottom: '5px',
              right: '5px',
              zIndex: 2,
              backgroundColor: 'white',
              color: 'green',
              '&:hover': {
                backgroundColor: 'green',
                color: 'white',
              },
              display: 'flex',
              alignItems: 'center', // Center the icon and text
            }}
          >
            <GetAppIcon style={{ marginRight: '4px' }} /> Download
          </Button>
        </CardMedia>
      </Link>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>

      {isModalOpen && (
        <PostModal
          postId={_id}
          title={title}
          content={content}
          image={image}
          createdOn={createdOn}
          onClose={handleModalClose}
        />
      )}
    </Card>
  );
}
