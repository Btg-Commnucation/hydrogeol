import { createSlice } from '@reduxjs/toolkit'

export const menuSlice = createSlice({
    name: 'menu',
    initialState: {},
    reducers: {
        setMenu: ( state: { [key: string]: unknown }, action ) => {
            state.menu = action.payload
        }
    }
})

export const { setMenu } = menuSlice.actions
export default menuSlice.reducer