import { useEffect, useState } from "react";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalJuegos: 0,
    totalResenas: 0,
    promedioEstrellas: 0
  });

  const cargarStats = async () => {
    const res = await fetch("http://localhost:5000/api/dashboard/stats");
    const data = await res.json();
    setStats(data);
  };

  useEffect(() => {
    cargarStats();
  }, []);

  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">📊 Dashboard Gamer</h1>

      <button className="btn-actualizar" onClick={cargarStats}>
        🔄 Actualizar Dashboard
      </button>

      <div className="stats-grid">

        <div className="stat-card">
          <p className="stat-number">{stats.totalJuegos}</p>
          <p className="stat-label">Juegos en tu biblioteca</p>
        </div>

        <div className="stat-card">
          <p className="stat-number">{stats.totalResenas}</p>
          <p className="stat-label">Reseñas creadas</p>
        </div>

        <div className="stat-card">
          <p className="stat-number">{stats.promedioEstrellas.toFixed(1)}</p>
          <p className="stat-label">Promedio de estrellas</p>
        </div>

      </div>
    </div>
  );
}