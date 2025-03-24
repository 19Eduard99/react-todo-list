import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Box, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { editTodo } from '../../store/slices/todoSlice';

const validationSchema = Yup.object({
  title: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),
  body: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),
});

const EditTodo = ({ toggleDrawer, editingTodo }) => {
  const dispatch = useDispatch();

  return (
    <div role="presentation" style={{ padding: '20px' }}>
      <h2>Edit task</h2>
      <Formik
        initialValues={{
          title: editingTodo ? editingTodo.title : '',
          body: editingTodo ? editingTodo.body : '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(
            editTodo({ ...values, id: editingTodo.id })
          );
          setTimeout(() => {
            toggleDrawer(false)();
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <TextField
                fullWidth
                id="title"
                label="Task title"
                variant="outlined"
                color="primary"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                error={
                  touched.title && Boolean(errors.title)
                }
                helperText={touched.title && errors.title}
              />
              <TextField
                label="Task body"
                multiline
                id="body"
                rows={4}
                variant="outlined"
                fullWidth
                color="primary"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.body}
                error={touched.body && Boolean(errors.body)}
                helperText={touched.body && errors.body}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  type="submit"
                  color="primary"
                  sx={{
                    width: '100px',
                    height: '40px',
                    background: '#673AB7',
                    color: '#fff',
                    '&:hover': { background: '#FF5722' },
                  }}
                >
                  Save
                </Button>
                <Button
                  color="secondary"
                  onClick={toggleDrawer(false)}
                  sx={{
                    width: '100px',
                    height: '40px',
                    background: 'black',
                    color: '#fff',
                    '&:hover': { background: '#FF5722' },
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
};

EditTodo.propTypes = {
  toggleDrawer: PropTypes.func,
  editingTodo: PropTypes.object,
};

export default EditTodo;
