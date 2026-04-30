import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: "rgba(15, 23, 42, 0.9)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            color: "#fff",
            backdropFilter: "blur(12px)",
          },
        }}
      />
    </div>
  );
}

export default App;
