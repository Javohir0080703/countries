import React from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements,} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home, { fetchApi } from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import Detail, { fetchCountry } from './pages/Detail'

const App = () => {
   const router = createBrowserRouter(
    createRoutesFromElements(
      <Route  element={<MainLayout/>}>
        <Route path="/" element={<Home/>}  loader={fetchApi} />
        <Route path="*" element={<PageNotFound/>}/>
        <Route path="/:name" element={<Detail/>} loader={fetchCountry}  />
      </Route>
    )
   )

  return (
    <RouterProvider router={router}/>
  )
}

export default App