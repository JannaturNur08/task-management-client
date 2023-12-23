import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Dashboard from "../layout/Dashboard";
import Task from "../Pages/Dashboard/Task/Task";
import DragDrop from "../Pages/Dashboard/Drag&Drop Test/DragNDrop";
import DragNDrop from "../Pages/Dashboard/Drag&Drop Test/DragNDrop";
import ListTasks from "../Pages/Dashboard/Task/ListTasks";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path:'/login',
            element: <Login></Login>
        }
      ]
    },
    {
        path: "/dashboard",
        element:<Dashboard></Dashboard>,
        errorElement: <ErrorPage></ErrorPage>,
        children:[
            {
                path: 'taskManagement',
                element: <ListTasks></ListTasks>
            },
        ]

    }
  ]);

