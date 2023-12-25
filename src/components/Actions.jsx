import  React , {useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

const URL = process.env.REACT_APP_CRUD;

const Actions = ({ id, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = anchorEl !== null && anchorEl !== undefined;
  const navigator = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    console.log(id);
    navigator("/update/" + id);
  };

  const handleDelete = async () => {
    console.log(id);
    const res = await fetch(`${URL}/api/blog/delete/` + id, {
      method: 'DELETE',
      headers: {
        token: localStorage.getItem('token'),
      },
    });

    const data = await res.json();
    if (res.ok) {
      onDelete(id);
    } else {
      console.log(data);
    }
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleUpdate();
          }}
        >
          Update
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleDelete();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Actions;
