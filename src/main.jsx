import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import AuthProvider from "./AuthProviders/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<div className=" font-openSans">
      <RouterProvider router={router}></RouterProvider>
      </div>
		</AuthProvider>
	</React.StrictMode>
);
