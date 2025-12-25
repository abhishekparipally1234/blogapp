import React from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './fullpro/Root/Home';
import Login from './fullpro/Authenticate/Login';
import Register from './fullpro/Authenticate/Register';
import Root from './fullpro/Root/Root';
import Errorele from './fullpro/Root/Errorele';
import Userdash from './fullpro/Welcome/Userdash';
import Postlist from './fullpro/Welcome/Postlist';
import Createpost from './fullpro/Welcome/Createpost';
import AuthLay from './fullpro/Welcome/AuthLay';
import EditPost from './fullpro/Welcome/EditPost';
function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <Root />,
      errorElement: <Errorele />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
        }
      ]
    },
    {
      path: "",
      element: <AuthLay />,
      errorElement: <Errorele />,
      children: [
        {
          path: "user-dashboard/:name",
          element: <Userdash />
        },
        {
          path: "posts",
          element: <Postlist />
        },
        {
          path: "create-post",
          element: <Createpost />
        },
        {
          path: "edit-post/:id",
          element: <EditPost />
        }
      ]
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;