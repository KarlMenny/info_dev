import uniqid from 'uniqid';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [{ id: uniqid(), phone: '+38(050)512-98-75', text: 'Вітаю!' }],
};

function findByIndex(state, id) {
  return state.messages.findIndex((index) => index.id === id);
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messageAdded: (state, action) => {
      state.messages.push(action.payload);
    },
    messageDeleted: (state, action) => {
      const index = findByIndex(state, action.payload);
      state.messages.splice(index, 1);
    },
    messageDeletedAll: (state) => {
      state.messages = [];
    },
    messageUpdated: (state, action) => {
      const index = findByIndex(state, action.payload.id);
      state.messages[index] = action.payload;
    },
  },
});

export default messagesSlice.reducer;
export const {
  messageAdded,
  messageDeleted,
  messageUpdated,
  messageDeletedAll,
} = messagesSlice.actions;
