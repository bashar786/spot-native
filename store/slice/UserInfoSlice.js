// UserInfoSlice.js

import { createSlice } from '@reduxjs/toolkit';

const generateConfirmationCode = () => {
  // Generate a random string as a confirmation code
  return Math.random().toString(36).substring(2, 15);
};

const formatDate = (date) => {
  // Format the date as "dd/mm/yyyy"
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatTime = (date) => {
  // Format the time as "HH:MM"
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const initialState = {
  userInfo: {
    number: '+971 (00) 000-0000',
    email: 'random@gmail.com',
  },
  DebitCardInfo: {
    DebitCardNumber: '',
    FirstName: 'Saleh',
    LastName: 'Muhammad',
    ExpirationDate: '',
    CVV: '',
    number: '+971 (00) 000-0000',
  },
  DebitCardAddress: {
    Address: '',
    Apt: '',
    zipCode: '',
    City: '',
    State: '',
  },
  activities: [
    { id: 1, type: 'send', FirstName: 'Saleh', LastName: 'Muhammaddddd', details: 'Enrolled as Saleh Muhammad', amount: '500.00', time: '8:30 pm', date: 'Jul 22', number: '+971 (00) 000-0000', status: 'Completed', dates: '22/07/2024', memo: 'Parking Services', confirmation: 'ran3114fqffF' },
    { id: 2, type: 'receive', FirstName: 'Alexander', LastName: 'Johnson', details: 'Enrolled as Alexander Johnson', amount: '500.00', time: '8:30 pm', date: 'Jul 22', number: '+971 (00) 000-0000', status: 'Completed', dates: '22/07/2024', memo: 'Parking Services', confirmation: 'ran3114fqffF' },
    { id: 3, type: 'requested', FirstName: 'Benjamin', LastName: 'Smith', details: 'Enrolled as Benjamin Smith', amount: '500.00', time: '8:30 pm', date: 'Jul 22', number: '+971 (00) 000-0000', status: 'Pending', dates: '22/07/2024', memo: 'Parking Services', confirmation: 'ran3114fqffF', received: true },
    { id: 4, type: 'receive', FirstName: 'Lama', LastName: 'Essam', details: 'Enrolled as Daniel Brown', amount: '500.00', time: '8:30 pm', date: 'Jul 22', number: '+971 (00) 000-0000', status: 'Completed', dates: '22/07/2024', memo: 'Parking Services', confirmation: 'ran3114fqffF', received: true },
    { id: 5, type: 'send', FirstName: 'Daniel', LastName: 'Brownnnnnnnnnnnnnnnnnnnnnn', details: 'Enrolled as Daniel Brown', amount: '500.00', time: '8:30 pm', date: 'Jul 22', number: '+971 (00) 000-0000', status: 'Completed', dates: '22/07/2024', memo: 'Parking Services', confirmation: 'ran3114fqffF', received: true },
    { id: 6, type: 'requested', FirstName: 'Daniel', LastName: 'Brown', details: 'Enrolled as Daniel Brown', amount: '500.00', time: '8:30 pm', date: 'Jul 22', number: '+971 (00) 000-0000', status: 'Pending', dates: '22/07/2024', memo: 'Parking Services', confirmation: 'ran3114fqffF', received: true },
  ],
  receipts: [
   {id: 1, firstName: 'Saleh', lastName: 'Muhammad', phoneNumber: '+971 (00) 000-0000'},
   {id: 2, firstName: 'Lama', lastName: 'Essam', phoneNumber: '+971 (55) 050-0501'},
  ], // New section for receipts
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updatedUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    UpdatedDebitCardInfo: (state, action) => {
      state.DebitCardInfo = action.payload;
    },
    UpdatedDebitCardAddress: (state, action) => {
      state.DebitCardAddress = action.payload;
    },
    addActivity: (state, action) => {
      const newId = state.activities.length ? state.activities[state.activities.length - 1].id + 1 : 1;
      const now = new Date();
      const newActivity = {
        id: newId,
        time: formatTime(now),
        date: formatDate(now),
        confirmation: generateConfirmationCode(),
        ...action.payload
      };
      state.activities.push(newActivity);
    },
    updateActivity: (state, action) => {
      const index = state.activities.findIndex(activity => activity.id === action.payload.id);
      if (index !== -1) {
        state.activities[index] = action.payload;
      }
    },
    deleteActivity: (state, action) => {
      state.activities = state.activities.filter(activity => activity.id !== action.payload.id);
    },
    addReceipt: (state, action) => {
      const newId = state.receipts.length ? state.receipts[state.receipts.length - 1].id + 1 : 1;
      state.receipts.push({ id: newId, ...action.payload });
    },
    updateReceipt: (state, action) => {
      const index = state.receipts.findIndex(receipt => receipt.id === action.payload.id);
      if (index !== -1) {
        state.receipts[index] = action.payload;
      }
    },
    deleteReceipt: (state, action) => {
      state.receipts = state.receipts.filter(
        receipt => receipt.phoneNumber !== action.payload
      );
    }
  },
});

export const { 
  updatedUserInfo, 
  UpdatedDebitCardInfo, 
  UpdatedDebitCardAddress, 
  addActivity, 
  updateActivity, 
  deleteActivity, 
  addReceipt, 
  updateReceipt, // Added updateReceipt action
  deleteReceipt 
} = userSlice.actions;

export default userSlice.reducer;
