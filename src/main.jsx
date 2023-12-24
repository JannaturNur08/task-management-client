import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import AuthProvider from "./AuthProviders/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import  '../public/Font/AeonikTRIAL-Bold.woff';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<DndProvider backend={HTML5Backend}>
					<div className="font-mono">
						<RouterProvider router={router}></RouterProvider>
					</div>
				</DndProvider>
			</QueryClientProvider>
		</AuthProvider>
	</React.StrictMode>
);
