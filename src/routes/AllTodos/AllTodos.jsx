import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Container,
  Drawer,
  Typography,
} from '@mui/material';

import {
  deleteTodo,
  toggleTodo,
} from '../../store/slices/todoSlice';
import EditTodo from '../../components/EditTodo';
import './style.scss';

const AllTodos = () => {
  const todos = useSelector((state) => state.todos);
  const [open, setOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const toggleDrawer =
    (open, todo = null) =>
    () => {
      setOpen(open);
      setEditingTodo(todo);
    };

  const dispatch = useDispatch();

  if (todos.length === 0) {
    return (
      <Container>
        <Box
          sx={{
            backgroundColor: '#fff',
            p: '20px',
            borderRadius: '10px',
            mt: '20px',
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{ color: '#673ab7', textAlign: 'center' }}
          >
            List is empty
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          mt: '20px',
          p: 0,
          borderRadius: '10px',
        }}
      >
        {todos.map((todo, index) => {
          const labelId = `checkbox-list-label-${index}`;

          return (
            <ListItem
              key={todo.id}
              secondaryAction={
                <div className="actions">
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={toggleDrawer(true, todo)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      dispatch(deleteTodo(todo.id))
                    }
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              }
              disablePadding
            >
              <ListItemButton
                onClick={() =>
                  dispatch(toggleTodo(todo.id))
                }
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    checked={todo.done}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <div>
                  <div className="todo">
                    <span className="title">Title:</span>
                    <ListItemText
                      id={labelId}
                      primary={todo.title}
                    />
                  </div>
                  <div className="todo">
                    <span className="body">Body:</span>
                    <ListItemText
                      id={labelId}
                      primary={todo.body}
                    />
                  </div>
                </div>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <EditTodo
          editingTodo={editingTodo}
          toggleDrawer={toggleDrawer}
        />
      </Drawer>
    </Container>
  );
};

export default AllTodos;
