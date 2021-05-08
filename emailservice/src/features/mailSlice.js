import { createSlice } from '@reduxjs/toolkit';

export const mailSlice = createSlice({
  name: 'mail',
  initialState: {
    selectedMail: null,
    sendMessageIsOpen: false,
    sendMailTo: "",
    mailSubject: "",
    mailMessage: ""
  },
  reducers: {
    selectMail : (state,action) => {
      state.selectedMail = action.payload;
    },
    openSendMessage: (state, action) => {
      state.sendMessageIsOpen = true;
      state.sendMailTo = action.payload?.email ? action.payload.email : ""
    },
    closeSendMessage: state => {
      state.sendMessageIsOpen = false;
    },
    setSubject: (state, action) => {
      state.mailSubject = action.payload?.subject ? action.payload.subject : "";
    },
    setMessage: (state, action) => {
      state.mailMessage = action.payload?.message ? action.payload.message: "";
    },
  },
});

export const { selectMail, openSendMessage, closeSendMessage, setSubject, setMessage} = mailSlice.actions;
export const selectOpenMail = (state) => state.mail.selectedMail;
export const selectSendMailTo = (state) => state.mail.sendMailTo;
export const selectSendMessageIsOpen = (state) => state.mail.sendMessageIsOpen;
export const selectSetSubject = (state) => state.mail.mailSubject;
export const selectSetMessage = (state) => state.mail.mailMessage;


export default mailSlice.reducer;
