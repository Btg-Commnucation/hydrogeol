import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, ScrollRestoration, RouterProvider } from 'react-router-dom'
import { Provider } from "react-redux"
import store from './app/store'
import App from './App.tsx'
import ErrorPage from './components/ErrorPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
