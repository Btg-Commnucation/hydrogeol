import { createSlice } from "@reduxjs/toolkit";


const pageSlice = createSlice({
    name: 'page',
    initialState: {
        page: {}
    },
    reducers: {
        setPage: (state: { page: { [key: string]: any }}, action) => {
            state.page = action.payload
        }
    }
})

export const { setPage } = pageSlice.actions
export default pageSlice.reducer