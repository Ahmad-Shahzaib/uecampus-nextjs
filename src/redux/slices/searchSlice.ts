import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSearchResults, CourseSearchItem } from "@/redux/thunk/searchCourses";

interface SearchState {
    data: CourseSearchItem[];
    isLoading: boolean;
    error: string | null;
}

const initialState: SearchState = {
    data: [],
    isLoading: false,
    error: null,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        resetSearchState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(
                fetchSearchResults.fulfilled,
                (state, action: PayloadAction<CourseSearchItem[]>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                }
            )
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) || "Failed to fetch search results";
            });
    },
});

export const { resetSearchState } = searchSlice.actions;
export default searchSlice.reducer;
