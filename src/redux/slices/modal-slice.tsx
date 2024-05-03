import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ModalWindowTypes } from '../../constants/pages/feedbacks-page/feedbacks-page';

type ModalPayloadType = {
  type: ModalWindowTypes;
  isRepeat?: boolean;
  repeatVal?: {
    rating: number;
    message: string;
  };
};

const initialState = {
  isOpen: false,
  type: ModalWindowTypes.Feedback,
  repeatFeedback: {
    isRepeat: false,
    repeatVal: {
      rating: 0,
      message: '',
    },
  },
  formValidate: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    addModal: (state, action: PayloadAction<ModalPayloadType>) => {
      state.isOpen = true;
      state.formValidate = false;
      state.type = action.payload.type;

      if (action.payload.isRepeat && action.payload.repeatVal) {
        state.repeatFeedback.isRepeat = action.payload.isRepeat;
        state.repeatFeedback.repeatVal = action.payload.repeatVal;
      } else {
        state.repeatFeedback.isRepeat = false;
        state.repeatFeedback.repeatVal = {
          rating: 0,
          message: '',
        };
      }
    },
    removeModal: (state) => {
      state.isOpen = false;
    },
    changeFormValidate: (state, action: PayloadAction<{ formValidate: boolean }>) => {
      state.formValidate = action.payload.formValidate;
    },
  },
});

export const { addModal, removeModal, changeFormValidate } = modalSlice.actions;

export default modalSlice.reducer;
