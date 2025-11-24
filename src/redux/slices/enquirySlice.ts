import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendEnquiry } from "@/redux/thunk/enquiryThunk";

interface EnquiryState {
    data: Record<string, unknown> | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: EnquiryState = {
    data: null,
    isLoading: false,
    error: null,
};

const enquirySlice = createSlice({
    name: "enquiry",
    initialState,
    reducers: {
        resetEnquiryState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendEnquiry.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(sendEnquiry.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.data = action.payload?.data ?? action.payload;
            })
            .addCase(sendEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) || "Failed to send enquiry";
            });
    },
});

export const { resetEnquiryState } = enquirySlice.actions;
export default enquirySlice.reducer;
