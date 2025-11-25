import "./styles/global.css";
import BibliotecaJuegos from "./components/BibliotecaJuegos";
import Dashboard from "./components/Dashboard";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">

        {/* Barra de navegación */}
        <nav className="navbar">
          <Link to="/" className="nav-item">Biblioteca</Link>
          <Link to="/dashboard" className="nav-item">Dashboard</Link>
        </nav>

        {/* Contenido dependiendo de la ruta */}
        <main className="contenido">
          <Routes>

            <Route path="/" element={<BibliotecaJuegos />} />

            <Route path="/dashboard" element={<Dashboard />} />

          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;