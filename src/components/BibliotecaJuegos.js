import { useEffect, useState } from "react";
import TarjetaJuego from "./TarjetaJuego";
import FormularioJuego from "./FormularioJuego";
import "../styles/biblioteca.css";

export default function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);

  // Obtener juegos al cargar
  useEffect(() => {
    fetch("http://localhost:5000/api/juegos")
      .then(res => res.json())
      .then(data => setJuegos(data));
  }, []);

  // Agregar un juego nuevo al estado
  const agregarJuego = (nuevoJuego) => {
    setJuegos([...juegos, nuevoJuego]);
  };

  // Eliminar juego del estado sin recargar
  const eliminarJuego = (id) => {
    setJuegos(juegos.filter(j => j._id !== id));
  };

  return (
    <div className="biblioteca">
      <h1>Mi Biblioteca de Juegos</h1>

      <FormularioJuego onJuegoCreado={agregarJuego} />

      <div className="contenedor-juegos">
        {juegos.map(j => (
          <TarjetaJuego 
            key={j._id} 
            juego={j}
            onEliminar={eliminarJuego}
          />
        ))}
      </div>
    </div>
  );
}
