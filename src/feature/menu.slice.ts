import { createSlice } from '@reduxjs/toolkit'

export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        menu: {},
        options: {}
    },
    reducers: {
        setMenu: ( state: { [key: string]: any }, action ) => {
            state.menu = action.payload
        },
        setOptions: (state: { [key: string]: any }, action) => {
            state.options = action.payload
         }
    }
})

export const { setMenu } = menuSlice.actions
export const { setOptions } = menuSlice.actions
export default menuSlice.reducer