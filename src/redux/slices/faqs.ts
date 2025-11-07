// src/redux/slices/faqs.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFaqsData } from "../thunk/faqs";

interface FaqContent {
    id: number;
    title: string;
    description: string;
    created_at: string | null;
    updated_at: string;
}

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
    faqContent: FaqContent | null;
    data: Faq[];
}

const initialState: FaqsState = {
    isLoading: false,
    error: null,
    faqContent: null,
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
            .addCase(fetchFaqsData.fulfilled, (state, action: PayloadAction<{faqContent: FaqContent, faqs: Faq[]}>) => {
                state.isLoading = false;
                state.faqContent = action.payload.faqContent;
                state.data = action.payload.faqs;
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