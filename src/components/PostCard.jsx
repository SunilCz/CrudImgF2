
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

export default function PostCard(props) {
  const { user, _id, title, content, image, createdOn } = props.post;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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
        <CardMedia component="img" height="100%" image={image} alt={user ? `${user.name}'s post` : 'Post'} onClick={handleModalOpen} style={{ cursor: 'pointer' }} />
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
