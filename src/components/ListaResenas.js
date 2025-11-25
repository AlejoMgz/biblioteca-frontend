import { useEffect, useState } from "react";
import FormularioResena from "./FormularioResena";
import "../styles/resenas.css";

export default function ListaResenas({ juegoId }) {

  const [resenas, setResenas] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/resenas/${juegoId}`)
      .then(res => res.json())
      .then(data => setResenas(data));
  }, [juegoId]);

  const agregarResena = (nueva) => {
    if (!nueva) return;           // evita undefined
    if (!nueva.texto) return;     // evita reseñas sin texto
    setResenas([...resenas, nueva]);
  };

  return (
    <div className="contenedor-resenas">

      <h3 className="titulo-resenas">💬 Reseñas</h3>

      <FormularioResena 
        juegoId={juegoId}
        onResenaCreada={agregarResena}
      />

      <div className="lista-burbujas">
        {resenas.map((r) => (
          <div key={r._id} className="burbuja-resena">

            <div className="contenido-resena">
              <p className="texto-resena">{r.texto}</p>
              <p className="estrellas-resena">
                {"⭐".repeat(r.estrellas)}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}