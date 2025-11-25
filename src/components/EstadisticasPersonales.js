import { useEffect, useState } from "react";
import "../styles/estadisticas.css";

export default function EstadisticasPersonales() {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/juegos")
      .then(res => res.json())
      .then(data => setJuegos(data));
  }, []);

  if (juegos.length === 0) {
    return <p className="cargando-estadisticas">Cargando estadísticas...</p>;
  }

  // Cálculo de conteos por género
  const conteoGeneros = {};
  juegos.forEach(j => {
    conteoGeneros[j.genero] = (conteoGeneros[j.genero] || 0) + 1;
  });

  // Cálculo de conteos por plataforma
  const conteoPlataformas = {};
  juegos.forEach(j => {
    conteoPlataformas[j.plataformas] = (conteoPlataformas[j.plataformas] || 0) + 1;
  });

  const total = juegos.length;

  return (
    <div className="estadisticas-contenedor">
      <h2 className="titulo-estadisticas">Estadísticas Personales</h2>

      <div className="cuadros-metricas">
        <div className="cuadro-metrica">
          <h3>Total de Juegos</h3>
          <p className="numero-metrica">{total}</p>
        </div>

        <div className="cuadro-metrica">
          <h3>Géneros registrados</h3>
          <p className="numero-metrica">{Object.keys(conteoGeneros).length}</p>
        </div>

        <div className="cuadro-metrica">
          <h3>Plataformas registradas</h3>
          <p className="numero-metrica">{Object.keys(conteoPlataformas).length}</p>
        </div>
      </div>

      <h3 className="subtitulo">Distribución por género</h3>
      <div className="grafico-barras">
        {Object.keys(conteoGeneros).map((g) => (
          <div key={g} className="barra-contenedor">
            <span className="barra-label">{g}</span>
            <div
              className="barra"
              style={{ width: `${(conteoGeneros[g] / total) * 100}%` }}
            >
              {conteoGeneros[g]}
            </div>
          </div>
        ))}
      </div>

      <h3 className="subtitulo">Distribución por plataforma</h3>
      <div className="grafico-pastel">
        {Object.keys(conteoPlataformas).map((p) => {
          const porcentaje = ((conteoPlataformas[p] / total) * 360);
          return (
            <div
              key={p}
              className="slice"
              style={{ "--giro": `${porcentaje}deg` }}
            >
              <span>{p}</span>
            </div>
          );
        })}
      </div>

    </div>
  );
}
