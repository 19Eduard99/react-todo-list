import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todoList',
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },

    toggleTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            done: !todo.done,
          };
        }
        return todo;
      });
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (item) => item.id !== action.payload
      );
    },

    editTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            title: action.payload.title,
            body: action.payload.body,
          };
        }
        return todo;
      });
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
