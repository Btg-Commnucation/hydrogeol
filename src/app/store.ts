import { configureStore } from '@reduxjs/toolkit'
import menuReducer from '../feature/menu.slice'
import pageReducer from '../feature/page.slice'

export default configureStore({
    reducer: { menu: menuReducer, page: pageReducer }
})