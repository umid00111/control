
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TaskDetailPage from "./pages/TaskDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
        <Route path="*" element={<main className="container"><h1>Страница не найдена</h1></main>} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2500} />
    </BrowserRouter>
  );
}

export default App;
