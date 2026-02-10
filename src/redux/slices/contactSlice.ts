import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendContact } from "@/redux/thunk/contactThunk";

interface ContactState {
  data: Record<string, any> | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: ContactState = {
  data: null,
  isLoading: false,
  error: null,
  successMessage: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetContactState: () => initialState,
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(sendContact.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload?.data ?? action.payload;
        state.successMessage = action.payload?.message ?? "Thank you for contacting us!";
      })
      .addCase(sendContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Failed to send contact";
      });
  },
});

export const { resetContactState, clearMessages } = contactSlice.actions;
export default contactSlice.reducer;