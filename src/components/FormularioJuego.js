import { useState } from "react";
import "../styles/formulario.css";

export default function FormularioJuego({ onJuegoCreado }) {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [plataformas, setPlataformas] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [horas, setHoras] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoJuego = { 
      titulo, 
      genero, 
      plataformas, 
      descripcion, 
      imagen,
      horas: Number(horas)
    };

    try {
      const res = await fetch("http://localhost:5000/api/juegos", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // <- CORREGIDO
        body: JSON.stringify(nuevoJuego),
      });

      const data = await res.json();
      onJuegoCreado(data.juego);

      setTitulo("");
      setGenero("");
      setPlataformas("");
      setDescripcion("");
      setImagen("");
      setHoras(0);
    } catch (err) {
      console.error("Error guardando juego:", err);
      alert("Error al guardar el juego. Revisa la consola.");
    }
  };

  return (
    <form className="formulario-juego" onSubmit={handleSubmit}>
      <h2>🎮 Agregar Juego</h2>

      <div className="grupo-input">
        <input 
          type="text"
          placeholder="Título del juego"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          required
        />
      </div>

      <div className="grupo-input">
        <input 
          type="text"
          placeholder="Género"
          value={genero}
          onChange={e => setGenero(e.target.value)}
          required
        />
      </div>

      <div className="grupo-input">
        <input 
          type="text"
          placeholder="Plataformas"
          value={plataformas}
          onChange={e => setPlataformas(e.target.value)}
          required
        />
      </div>

      <div className="grupo-input">
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          required
        />
      </div>

      <div className="grupo-input">
        <input 
          type="text"
          placeholder="URL imagen"
          value={imagen}
          onChange={e => setImagen(e.target.value)}
          required
        />
      </div>

      <div className="grupo-input">
        <input 
          type="number"
          placeholder="Horas jugadas"
          value={horas}
          onChange={e => setHoras(e.target.value)}
          min={0}
        />
      </div>


      <button type="submit">Guardar Juego</button>
    </form>
  );
}