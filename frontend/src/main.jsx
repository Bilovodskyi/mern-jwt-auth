import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import Home from "./pages/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/Profile.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} index={true} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="" element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </Provider>
);
