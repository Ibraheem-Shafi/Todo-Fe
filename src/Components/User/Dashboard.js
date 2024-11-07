import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTodos, addNewTodo, updateTodo, deleteTodoById, toggleTodoStatus } from '../../redux/todoSlice';
import './Dashboard.scss';

const Dashboard = () => {
  const { userId } = useParams();
  const [newTodo, setNewTodo] = useState('');
  const [editTodoText, setEditTodoText] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);
  const loading = useSelector(state => state.todos.loading);
  const error = useSelector(state => state.todos.error);

  useEffect(() => {
    if (userId) {
      dispatch(fetchTodos(userId)); // Fetch todos for the user from the API
    }
  }, [dispatch, userId]);

  // Handle adding new todo
  const handleAddTodo = useCallback(() => {
    if (newTodo.trim()) {
      dispatch(addNewTodo({
        userId: userId, 
        id: Date.now(),
        text: newTodo,
        completed: false,
      }));
      setNewTodo('');
      setShowAddModal(false);
    }
  }, [newTodo, userId, dispatch]);

  // Handle editing existing todo
  const handleEditTodo = useCallback(() => {
    console.log('Editing todo with id:', editTodoId);
    if (editTodoText.trim()) {
      const updatedTodo = { text: editTodoText };
      dispatch(updateTodo(editTodoId, { text: editTodoText, id: editTodoId }));
      setEditTodoText('');
      setEditTodoId(null);
      setShowEditModal(false);
    }
  }, [editTodoText, editTodoId, dispatch]);

  const handleDeleteTodo = useCallback(() => {
    if (todoToDelete) {
      dispatch(deleteTodoById(todoToDelete));  // Dispatch the delete action
      setTodoToDelete(null);  // Reset the todoToDelete state
      setShowDeleteModal(false);  // Close the modal
    }
  }, [todoToDelete, dispatch]);

  // Handle toggling completion of todo
  const handleToggleTodo = useCallback((id) => {
    dispatch(toggleTodoStatus(id));
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <h2>Todo Dashboard</h2>

      {/* Error and Loading States */}
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <button className="btn-add" onClick={() => setShowAddModal(true)}>Add Todo</button>

      {/* Add Todo Modal */}
      {showAddModal && (
        <div className="custom-modal">
          <div className="modal-content">
            <h2>Add Todo</h2>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Enter new to-do"
            />
            <button onClick={handleAddTodo}>Add</button>
            <button onClick={() => setShowAddModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Edit Todo Modal */}
      {showEditModal && (
        <div className="custom-modal">
          <div className="modal-content">
            <h2>Edit Todo</h2>
            <input
              type="text"
              value={editTodoText}
              onChange={(e) => setEditTodoText(e.target.value)}
              placeholder="Edit your todo"
            />
            <button onClick={handleEditTodo}>Save Edit</button>
            <button onClick={() => setShowEditModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Delete Todo Confirmation Modal */}
      {showDeleteModal && (
        <div className="custom-modal">
          <div className="modal-content">
            <h2>Are you sure you want to delete this todo?</h2>
            <button onClick={handleDeleteTodo}>Yes, Delete</button>
            <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Todo List (Styled as large tiles) */}
      <div className="todo-grid">
        {todos.length === 0 ? <p>No Todos available</p> : todos.map(todo => (
          <div key={todo._id} className={`todo-tile ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-text" onClick={() => handleToggleTodo(todo._id)}>
              {todo.text}
            </div>

            {/* Toggle Completed */}
            <button className="btn-toggle" onClick={() => handleToggleTodo(todo._id)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>

            {/* Edit Todo Button */}
            <button onClick={() => {
              setEditTodoText(todo.text);
              setEditTodoId(todo._id);
              setShowEditModal(true);
            }}>Edit</button>

            {/* Delete Todo Button */}
            <button onClick={() => {
              setTodoToDelete(todo._id);
              setShowDeleteModal(true);
            }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
