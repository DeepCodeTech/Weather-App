import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./index.css";
import "./App.css";

const App = lazy(() => import("./App.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div className="loader"></div>}>
        <App />
      </Suspense>
    </Provider>
  </StrictMode>
);
