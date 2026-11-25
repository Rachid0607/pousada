// Banner usado no topo das páginas internas
function CabecalhoPagina({ titulo, subtitulo, imagem }) {
  return (
    <section
      className="cabecalho-pagina"
      style={{
        backgroundImage: `linear-gradient(rgba(20, 38, 28, 0.55), rgba(20, 38, 28, 0.75)), url(${imagem})`,
      }}
    >
      <div className="container">
        <h1>{titulo}</h1>
        {subtitulo && <p>{subtitulo}</p>}
      </div>
    </section>
  )
}

export default CabecalhoPagina
