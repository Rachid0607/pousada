import { useCallback, useState } from 'react'
import CabecalhoPagina from '../components/CabecalhoPagina'
import ModalImagem from '../components/ModalImagem'
import galeria from '../data/galeria'
import './Galeria.css'

function Galeria() {
  // Índice da foto aberta no modal (null = modal fechado)
  const [indiceAberto, setIndiceAberto] = useState(null)

  const fechar = useCallback(() => setIndiceAberto(null), [])
  const anterior = useCallback(
    () => setIndiceAberto((i) => (i - 1 + galeria.length) % galeria.length),
    [],
  )
  const proxima = useCallback(() => setIndiceAberto((i) => (i + 1) % galeria.length), [])

  return (
    <>
      <CabecalhoPagina
        titulo="Galeria"
        subtitulo="Um pouquinho do que espera por você no Recanto da Serra."
        imagem="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=70"
      />

      <section className="secao">
        <div className="container">
          <div className="galeria">
            {galeria.map((foto, indice) => (
              <button
                key={foto.id}
                className="galeria__item"
                onClick={() => setIndiceAberto(indice)}
                aria-label={`Ampliar foto: ${foto.legenda}`}
              >
                <img src={foto.miniatura} alt={foto.legenda} loading="lazy" />
                <span className="galeria__legenda">{foto.legenda}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {indiceAberto !== null && (
        <ModalImagem
          foto={galeria[indiceAberto]}
          posicao={indiceAberto + 1}
          total={galeria.length}
          aoFechar={fechar}
          aoAnterior={anterior}
          aoProxima={proxima}
        />
      )}
    </>
  )
}

export default Galeria
