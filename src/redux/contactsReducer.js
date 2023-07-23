import uniqid from 'uniqid';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [
    { id: uniqid(), name: 'Андрій', phone: '+38(050)512-98-75' },
    { id: uniqid(), name: 'Олексій', phone: '+38(068)365-87-45' },
  ],
};

function findByIndex(state, id) {
  return state.contacts.findIndex((index) => index.id === id);
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    contactAdded: (state, action) => {
      state.contacts.push(action.payload);
    },
    contactDeleted: (state, action) => {
      const index = findByIndex(state, action.payload);
      state.contacts.splice(index, 1);
    },
    contactDeletedAll: (state) => {
      state.contacts = [];
    },
    contactUpdated: (state, action) => {
      const index = findByIndex(state, action.payload.id);
      state.contacts[index] = action.payload;
    },
  },
});

export default contactsSlice.reducer;
export const {
  contactAdded,
  contactDeleted,
  contactUpdated,
  contactDeletedAll,
} = contactsSlice.actions;
