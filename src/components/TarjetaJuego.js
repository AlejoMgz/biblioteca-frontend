import { useState } from "react";
import ListaResenas from "./ListaResenas";
import "../styles/tarjeta.css";

export default function TarjetaJuego({ juego, onEliminar }) {

  const [eliminando, setEliminando] = useState(false);
  const [confirmando, setConfirmando] = useState(false);

  // Confirmación de eliminación
  const confirmarEliminar = () => {
    setConfirmando(true);
  };

  // Acción final de eliminar
  const eliminarJuego = async () => {
    setEliminando(true);

    await fetch(`http://localhost:5000/api/juegos/${juego._id}`, {
      method: "DELETE"
    });

    setTimeout(() => {
      onEliminar(juego._id);
    }, 400); // tiempo para animación
  };

  return (
    <div className={`tarjeta-juego ${eliminando ? "desaparecer" : ""}`}>

      <div className="tarjeta-header">
        <img src={juego.imagen} alt={juego.titulo} className="img-juego" />
      </div>

      <div className="tarjeta-body">
        <h2 className="titulo-juego">{juego.titulo}</h2>

        <div className="info-linea icono-genero-tarjeta">
          <span className="label">Género:</span>
          <span>{juego.genero}</span>
        </div>

        <div className="info-linea icono-plataforma-tarjeta">
          <span className="label">Plataformas:</span>
          <span>{juego.plataformas}</span>
        </div>

        <p className="descripcion-juego">{juego.descripcion}</p>
      </div>

      <div className="tarjeta-footer">

        <ListaResenas juegoId={juego._id} />

        {!confirmando && (
          <button 
            className="btn-eliminar"
            onClick={confirmarEliminar}
          >
            🗑 Eliminar
          </button>
        )}

        {confirmando && (
          <div className="confirmacion">
            <p>¿Eliminar?</p>
            <button className="btn-si" onClick={eliminarJuego}>Sí</button>
            <button className="btn-no" onClick={() => setConfirmando(false)}>No</button>
          </div>
        )}
      </div>

    </div>
  );
}

