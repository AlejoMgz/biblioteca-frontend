import { useState } from "react";
import "../styles/resenas.css";

export default function FormularioResena({ juegoId, onResenaCreada }) {

  const [texto, setTexto] = useState("");
  const [estrellas, setEstrellas] = useState(5);

  const enviarResena = async (e) => {
    e.preventDefault();

    const nueva = { juegoId, texto, estrellas };

    const res = await fetch("http://localhost:5000/api/resenas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nueva)
    });

    const data = await res.json();

    // IMPORTANTE: debe ser data.resena
    onResenaCreada(data.resena);

    setTexto("");
    setEstrellas(5);
  };

  return (
    <form className="form-resena" onSubmit={enviarResena}>
      <textarea
        placeholder="Escribe una reseña..."
        value={texto}
        onChange={e => setTexto(e.target.value)}
        required
        className="area-resena-grande"
      />

      <label>Calificación:</label>
      <select 
        value={estrellas}
        onChange={e => setEstrellas(Number(e.target.value))}
      >
        <option value="5">⭐⭐⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="2">⭐⭐</option>
        <option value="1">⭐</option>
      </select>

      <button type="submit" className="btn-enviar-resena">
        Guardar Reseña
      </button>
    </form>
  );
}