import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// redux
import { Provider } from "react-redux";
import { store } from "./state/store.ts";

//react router
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Private routes
import PrivateRoute from './utils/PrivateRoute.tsx';

// Layouts
import RootLayout from "./layouts/RootLayout.tsx";
import ScrapyPagesLayout from "./layouts/ScrapyPagesLayout.tsx";

// Pages
// Root
import App from "./App.tsx";
// AutoScout24
import AutoScout24 from "./pages/AutoScout24.tsx";
// Orange
import Orange from "./pages/Orange.tsx";
// PagesJaunes
import PagesJaunes from "./pages/PagesJaunes.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import LoginPage from "./components/global/LoginPage.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/*" element={<PrivateRoute element={
              <Routes>
                <Route path="/" element={<RootLayout />}>
                  <Route path="scrapy" element={<ScrapyPagesLayout />}>
                    <Route path="" element={<App />} />
                    <Route path="orange/*" element={<Orange />} />
                    <Route path="pagesjaunes/*" element={<PagesJaunes />} />
                    <Route path="autoscout24" element={<AutoScout24 />} />
                  </Route>
                </Route>
              </Routes>
            } />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);