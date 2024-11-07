import { createSlice } from '@reduxjs/toolkit';
import { fetchTasksFromDatabase, addTaskToDatabase, editTaskInDatabase, deleteTaskFromDatabase, toggleTodoInDatabase } from './../Server/api'; 

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    editTodo: (state, action) => {
        const { id, updatedTodo } = action.payload;
        const index = state.todos.findIndex(todo => todo._id === id); // Use _id or whatever field is used to identify the todo
        if (index !== -1) {
          state.todos[index] = { ...state.todos[index], ...updatedTodo }; // Update the todo in the state
        }
    },
    deleteTodo: (state, action) => {
        state.todos = state.todos.filter(todo => todo._id !== action.payload);  // Make sure `id` matches correctly
    },
    toggleTodo: (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload);
        if (index !== -1) {
          state.todos[index].completed = !state.todos[index].completed; // Toggle the `completed` status
        }
    }
  },
});

export const {
  addTodo,
  editTodo,
  deleteTodo,
  toggleTodo,
  setLoading,
  setError,
  setTodos
} = todoSlice.actions;

// Async Thunks

export const fetchTodos = (userId) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await fetchTasksFromDatabase(userId); // Pass userId to the API call
      dispatch(setTodos(response.data)); // Store the todos in the Redux store
    } catch (error) {
      dispatch(setError('Failed to fetch todos'));
    } finally {
      dispatch(setLoading(false));
    }
};

export const addNewTodo = (todo) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await addTaskToDatabase(todo);
    dispatch(addTodo(response.data));
  } catch (error) {
    dispatch(setError('Failed to add todo'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateTodo = (id, updatedTodo) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await editTaskInDatabase(id, updatedTodo);
    dispatch(editTodo({ id, updatedTodo: response.data }));
  } catch (error) {
    dispatch(setError('Failed to edit todo'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteTodoById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await deleteTaskFromDatabase(id);
    dispatch(deleteTodo(id));
  } catch (error) {
    dispatch(setError('Failed to delete todo'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const toggleTodoStatus = (id) => async (dispatch) => {
    dispatch(setLoading(true)); // Set loading to true while the request is in progress
    try {
      // Call the backend API to toggle the todo's completion status
      const response = await toggleTodoInDatabase(id); // API call to toggle the todo status
      dispatch(toggleTodo(response.data.id)); // Dispatch the toggleTodo action with the id of the toggled todo
    } catch (error) {
      dispatch(setError('Failed to toggle todo status')); // Handle error
    } finally {
      dispatch(setLoading(false)); // Set loading to false once the request completes
    }
  };

export default todoSlice.reducer;
