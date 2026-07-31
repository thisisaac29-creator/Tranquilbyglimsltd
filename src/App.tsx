import { useState } from "react";
import { Routes, Route } from "react-router";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import Header from "./components/Header";
import MenuOverlay from "./components/MenuOverlay";
import CustomCursor from "./components/CustomCursor";
import NoiseGrainOverlay from "./components/NoiseGrainOverlay";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import FullMenuPage from "./pages/FullMenuPage";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SmoothScrollProvider>
      <div className="relative bg-black text-white min-h-screen">
        <CustomCursor />
        <NoiseGrainOverlay />
        <Header onMenuClick={() => setMenuOpen(true)} />
        <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<FullMenuPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
