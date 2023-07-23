import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsReducer';
import messagesReducer from './messagesReducer';

export default configureStore({
  reducer: {
    contacts: contactsReducer,
    messages: messagesReducer,
  },
});
