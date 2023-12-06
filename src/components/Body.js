import React, { useEffect } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Login } from './Login'
import { Browse } from './Browse'
import { RouterProvider } from 'react-router-dom'

export const Body = () => {


    const appRouter = createBrowserRouter([
        {
            path : "/",
            element:<Login />
    },
    {
        path :"/browse",
        element:<Browse />

    }

])

  return (
    <div>
    <RouterProvider router={appRouter} />
    </div>
  )
}
