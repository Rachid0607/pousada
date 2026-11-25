import { Link } from 'react-router-dom'

function NaoEncontrada() {
  return (
    <section className="secao centro" style={{ padding: '7rem 0' }}>
      <div className="container">
        <span className="secao__selo">Erro 404</span>
        <h1 className="secao__titulo">Ops! Essa trilha não leva a lugar nenhum.</h1>
        <p className="secao__texto" style={{ marginBottom: '2rem' }}>
          A página que você procura não existe ou foi movida.
        </p>
        <Link to="/" className="btn btn--verde">
          Voltar para o início
        </Link>
      </div>
    </section>
  )
}

export default NaoEncontrada
