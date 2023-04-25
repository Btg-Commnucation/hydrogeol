import { configureStore } from '@reduxjs/toolkit'
import menuReducer from '../feature/menu.slice'

export default configureStore({
    reducer: { menu: menuReducer }
})