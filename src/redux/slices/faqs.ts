import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFaqsData } from "../thunk/faqs";

interface Faq {
    _id: string;
    question: string;
    answer: string;
    createdAt: string;
    updatedAt: string;
}

interface FaqsState {
    isLoading: boolean;
    error: string | null;
    data: Faq[];
}

const initialState: FaqsState = {
    isLoading: false,
    error: null,
    data: [],
};

const faqsSlice = createSlice({
    name: "faqs",
    initialState,
    reducers: {
        resetFaqsState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFaqsData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchFaqsData.fulfilled, (state, action: PayloadAction<Faq[]>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchFaqsData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to fetch FAQs";
            });
    },
});

export const { resetFaqsState } = faqsSlice.actions;

export default faqsSlice.reducer;
export const actions = faqsSlice.actions;
export { actions as faqsActions };
