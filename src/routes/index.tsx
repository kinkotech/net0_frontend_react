import * as React from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import Home from '@/pages/Home';
import Foot from '@/pages/Foot';
import Reduction from '@/pages/Reduction';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "foot",
        element: <Foot/>,
    },
    {
        path: 'reduction',
        element: <Reduction/>
    }
]);

export default Router;
