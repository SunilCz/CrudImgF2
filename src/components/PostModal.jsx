import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import moment from 'moment';

const PostModal = (props) => {
  const { postId, title, content, image, createdOn, onClose } = props;

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby={`post-modal-${postId}`}
      aria-describedby={`post-modal-description-${postId}`}
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', maxWidth: '800px' }}>
        <CardMedia component="img" height="400" image={image} alt={title} />
        <Typography variant="h5" id={`post-modal-${postId}`} sx={{ mt: 2 }}>
          {title}
        </Typography>
        <Typography variant="body1" id={`post-modal-description-${postId}`} sx={{ mt: 1 }}>
          {content}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {moment(createdOn).fromNow()}
        </Typography>
      </Box>
    </Modal>
  );
};

export default PostModal;
