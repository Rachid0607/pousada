import { IconeEstrela } from './Icones'

function CardDepoimento({ depoimento }) {
  const iniciais = depoimento.nome
    .split(' ')
    .filter((parte) => parte.length > 1)
    .map((parte) => parte[0])
    .slice(0, 2)
    .join('')

  return (
    <figure className="depoimento">
      <div className="depoimento__estrelas" role="img" aria-label={`Nota ${depoimento.nota} de 5`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <IconeEstrela key={n} cheia={n <= depoimento.nota} />
        ))}
      </div>
      <blockquote className="depoimento__texto">“{depoimento.texto}”</blockquote>
      <figcaption className="depoimento__autor">
        <span className="depoimento__avatar" aria-hidden="true">
          {iniciais}
        </span>
        <span>
          <strong>{depoimento.nome}</strong>
          <small>{depoimento.cidade}</small>
        </span>
      </figcaption>
    </figure>
  )
}

export default CardDepoimento
