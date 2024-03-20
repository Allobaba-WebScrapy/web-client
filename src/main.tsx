import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// redux
import { Provider } from "react-redux";
import { store } from "./state/store.ts";


//react router
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

// Layouts
import RootLayout from "./layouts/RootLayout.tsx";
import ScrapyPagesLayout from "./layouts/ScrapyPagesLayout.tsx";


// Pages
// Root
import App from "./App.tsx";
// AutoScout24
import AutoScout24 from "./pages/AutoScout24.tsx";
// Orangge
import Orange from "./pages/Orange.tsx";
// PagesJaunes
import PagesJaunes from "./pages/PagesJaunes.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      // loader={rootLoader}
      // action={rootAction}
      // errorElement={<ErrorPage />}
    >
      <Route
        element={<RootLayout />}
        // errorElement={<ErrorPage />}
      >
        <Route index element={<App />} />
        <Route
          path="scrapy"
          element={<ScrapyPagesLayout />}
          
        >
          <Route path="orange" element={<Orange />} />
          <Route path="pagesjaunes" element={<PagesJaunes />} />
          <Route path="autoscout24" element={<AutoScout24 />} />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
