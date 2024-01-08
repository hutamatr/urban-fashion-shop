import { createSlice } from '@reduxjs/toolkit';

interface IModalState {
  isModalShow: boolean;
}

const initialState: IModalState = {
  isModalShow: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModalHandler: (state) => {
      state.isModalShow = !state.isModalShow;
    },
  },
});

const { actions, reducer } = modalSlice;

export const { showModalHandler } = actions;

export default reducer;
