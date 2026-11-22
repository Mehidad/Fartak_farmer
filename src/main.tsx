import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

/* ────────────────────────────────────────────────────────────────
   نقطه ورود اپ (Entry Point)

   این فایل در Next.js وجود نداشت چون Next خودش این کار را می‌کند.
   در React خالص ما خودمان React را به <div id="root"> وصل می‌کنیم:

   createRoot → یک ریشه React می‌سازد
   render     → کامپوننت <App /> را داخل آن رندر می‌کند
   StrictMode → در حالت dev خطاهای رایج را زودتر به ما نشان می‌دهد
   ──────────────────────────────────────────────────────────────── */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
