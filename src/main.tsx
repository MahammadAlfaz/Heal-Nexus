
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppDataProvider } from "./components/AppDataContext";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AppDataProvider>
      <App />
    </AppDataProvider>
  </BrowserRouter>
);
  