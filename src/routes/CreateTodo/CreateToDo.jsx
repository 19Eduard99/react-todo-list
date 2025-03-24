import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import TextField from '@mui/material/TextField';
import { Box, Button, Container } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

import { addTodo } from '../../store/slices/todoSlice';
import './style.scss';

const validationSchema = Yup.object({
  title: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),
  body: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),
});

const CreateToDo = () => {
  const dispatch = useDispatch();

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
        <Formik
          initialValues={{
            title: '',
            body: '',
            id: '',
            done: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(
            values,
            { setSubmitting, resetForm }
          ) => {
            const id = uuidv4();
            values.id = id;
            dispatch(addTodo(values));
            setTimeout(() => {
              resetForm();
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
                  error={
                    touched.body && Boolean(errors.body)
                  }
                  helperText={touched.body && errors.body}
                />

                <Button
                  type="submit"
                  slots={{ root: 'span' }}
                  color="primary"
                  sx={{
                    width: '100px',
                    height: '40px',
                    background: '#673AB7',
                    color: '#fff',
                    '&:hover': {
                      background: '#FF5722',
                    },
                  }}
                >
                  Create
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default CreateToDo;
