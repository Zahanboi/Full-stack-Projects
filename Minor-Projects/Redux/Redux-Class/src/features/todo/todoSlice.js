import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    Todos: [{ id: "123" , task: "demo task" , isDone: false}],
  };

  export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers:{
        addTodo: (state, action) => {
            const newTodo = {
                id: nanoid(),
                task: action.payload,
                isDone: false,
            }
            state.Todos.push(newTodo);
        }
    }
  });