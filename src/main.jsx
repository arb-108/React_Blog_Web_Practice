import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { BrowserRouter,Route,RouterProvider,createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout,LoginForm,PostForm,SignUp } from './components/index.js'
import Allposts from './pages/Allposts.jsx'
import Addpost from './pages/Addpost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
const router=createBrowserRouter(
   [
    {
      path: "/",
      element : <App/>,
      children:[
        {
          path: "/",
          element :<Home/>,
        },{
          path: "/login",
          element: (
            <AuthLayout authentication={false}>
              <LoginForm/>
            </AuthLayout>
          )
        },{
          path: "/signup",
          element: (
            <AuthLayout authentication={false}>
              <SignUp/>
            </AuthLayout>
          )
        },{
          path: "/allposts",
          element: (
            <AuthLayout authentication={true}>
              <Allposts/>
            </AuthLayout>
          )
        },{
          path: "/addpost",
          element: (
            <AuthLayout authentication={true}>
              <PostForm/>
            </AuthLayout>
          )
        },{
          path: "/edit-post/:slug",
          element: (
            <AuthLayout authentication={true}>
              <EditPost/>
            </AuthLayout>
          )
        },{
          path: "/post/:slug",
          element: (
              <Post/>
          )
        },

      ]
    }
   ]
  
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
