import { useEffect } from 'react'
import { IconeFechar, IconeSeta } from './Icones'
import './ModalImagem.css'

function ModalImagem({ foto, aoFechar, aoAnterior, aoProxima, posicao, total }) {
  // Teclado: Esc fecha e as setas navegam. Também trava a rolagem da página.
  useEffect(() => {
    const aoTeclar = (e) => {
      if (e.key === 'Escape') aoFechar()
      if (e.key === 'ArrowLeft') aoAnterior()
      if (e.key === 'ArrowRight') aoProxima()
    }
    window.addEventListener('keydown', aoTeclar)
    document.body.classList.add('sem-rolagem')
    return () => {
      window.removeEventListener('keydown', aoTeclar)
      document.body.classList.remove('sem-rolagem')
    }
  }, [aoFechar, aoAnterior, aoProxima])

  const parar = (acao) => (e) => {
    e.stopPropagation()
    acao()
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={foto.legenda} onClick={aoFechar}>
      <button className="modal__botao modal__fechar" onClick={parar(aoFechar)} aria-label="Fechar" autoFocus>
        <IconeFechar />
      </button>

      <button
        className="modal__botao modal__nav modal__nav--anterior"
        onClick={parar(aoAnterior)}
        aria-label="Foto anterior"
      >
        <IconeSeta direcao="esquerda" />
      </button>

      <figure className="modal__conteudo" onClick={(e) => e.stopPropagation()}>
        <img key={foto.id} src={foto.grande} alt={foto.legenda} />
        <figcaption>
          <span>{foto.legenda}</span>
          <span className="modal__contador">
            {posicao} / {total}
          </span>
        </figcaption>
      </figure>

      <button
        className="modal__botao modal__nav modal__nav--proxima"
        onClick={parar(aoProxima)}
        aria-label="Próxima foto"
      >
        <IconeSeta />
      </button>
    </div>
  )
}

export default ModalImagem
