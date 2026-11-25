import { useNavigate } from 'react-router-dom'
import { formatarMoeda } from '../utils/formatar'
import { IconePessoas } from './Icones'
import './CardQuarto.css'

function CardQuarto({ quarto }) {
  const navigate = useNavigate()

  // Leva para a página de reservas com o quarto já selecionado
  const reservar = () => navigate(`/reservas?quarto=${quarto.id}`)

  return (
    <article className="card-quarto">
      <div className="card-quarto__imagem">
        <img src={quarto.imagem} alt={quarto.nome} loading="lazy" />
        <span className="card-quarto__capacidade">
          <IconePessoas /> Até {quarto.capacidade} {quarto.capacidade === 1 ? 'pessoa' : 'pessoas'}
        </span>
      </div>

      <div className="card-quarto__corpo">
        <h3 className="card-quarto__nome">{quarto.nome}</h3>
        <p className="card-quarto__descricao">{quarto.descricao}</p>

        <ul className="card-quarto__comodidades">
          {quarto.comodidades.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="card-quarto__rodape">
          <p className="card-quarto__preco">
            <span className="card-quarto__valor">{formatarMoeda(quarto.preco)}</span>
            <span className="card-quarto__por">por diária</span>
          </p>
          <button className="btn btn--verde" onClick={reservar}>
            Reservar
          </button>
        </div>
      </div>
    </article>
  )
}

export default CardQuarto
