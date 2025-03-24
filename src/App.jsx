import { Routes, Route } from 'react-router';
import { CssBaseline } from '@mui/material';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';

import AllTodos from './routes/AllTodos';
import CreateToDo from './routes/CreateTodo/';
import Nav from './components/Nav';
import TodoList from './routes/TodoList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673AB7', // Фиолетовый цвет
    },
    secondary: {
      main: '#FF5722', // Оранжевый цвет
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Сброс стандартных стилей */}
      <Nav />
      <Routes>
        <Route path="/" element={<CreateToDo />} />
        <Route path="/all" element={<AllTodos />} />
        <Route
          path="/completed"
          element={<TodoList showCompleted={true} />}
        />
        <Route
          path="/uncompleted"
          element={<TodoList showCompleted={false} />}
        />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
