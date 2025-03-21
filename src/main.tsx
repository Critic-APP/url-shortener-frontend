import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import NoMatch from "./components/404.tsx";
import { Toaster as Sonner } from "./components/ui/sonner.tsx";
import "./index.css";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "404", element: <NoMatch /> },
  { path: "*", element: <NoMatch /> },
]);
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route path="/" element={<App />}>
//         <Route path="404" element={<NoMatch />} />
//       </Route>
//       <Route path="*" element={<NoMatch />} />
//     </>
//   )
// );
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />

      {/* <Toaster /> */}
      <Sonner
        richColors
        closeButton={true}
        position="top-right"
        toastOptions={{}}
        // className="z-[9999]"
      />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
