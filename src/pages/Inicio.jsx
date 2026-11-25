import { Link } from 'react-router-dom'
import CardQuarto from '../components/CardQuarto'
import CardDepoimento from '../components/CardDepoimento'
import { IconeCafe, IconeCarro, IconePiscina, IconeWifi } from '../components/Icones'
import quartos from '../data/quartos'
import depoimentos from '../data/depoimentos'
import './Inicio.css'

const destaques = [
  {
    icone: <IconeCafe />,
    titulo: 'Café da manhã',
    texto: 'Mesa farta com pães caseiros, frutas da estação, queijos da região e geleias artesanais.',
  },
  {
    icone: <IconePiscina />,
    titulo: 'Piscina',
    texto: 'Piscina aquecida com vista para as montanhas, aberta todos os dias das 8h às 22h.',
  },
  {
    icone: <IconeWifi />,
    titulo: 'Wi-Fi grátis',
    texto: 'Internet rápida em todos os quartos e áreas comuns — para quem não consegue se desconectar.',
  },
  {
    icone: <IconeCarro />,
    titulo: 'Estacionamento',
    texto: 'Estacionamento privativo, coberto e gratuito para todos os hóspedes.',
  },
]

function Inicio() {
  const quartosEmDestaque = quartos.filter((quarto) => quarto.destaque).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__conteudo">
          <span className="hero__selo">Bem-vindo à serra</span>
          <h1 className="hero__titulo">
            Descanse onde a natureza <em>abraça</em> você
          </h1>
          <p className="hero__texto">
            Chalés aconchegantes, café da manhã caseiro e o ar puro das montanhas. Seu refúgio
            perfeito está a poucas horas da cidade.
          </p>
          <div className="hero__acoes">
            <Link to="/reservas" className="btn btn--madeira btn--grande">
              Reservar agora
            </Link>
            <Link to="/quartos" className="btn btn--claro btn--grande">
              Conhecer os quartos
            </Link>
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="secao">
        <div className="container">
          <div className="secao__topo">
            <span className="secao__selo">Comodidades</span>
            <h2 className="secao__titulo">Tudo para uma estadia tranquila</h2>
            <p className="secao__texto">
              Cuidamos de cada detalhe para que você só precise se preocupar em relaxar.
            </p>
          </div>

          <div className="destaques">
            {destaques.map((item) => (
              <article key={item.titulo} className="destaque">
                <div className="destaque__icone">{item.icone}</div>
                <h3>{item.titulo}</h3>
                <p>{item.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Prévia dos quartos */}
      <section className="secao secao--clara">
        <div className="container">
          <div className="secao__topo">
            <span className="secao__selo">Acomodações</span>
            <h2 className="secao__titulo">Nossos quartos favoritos</h2>
            <p className="secao__texto">
              Do chalé romântico ao quarto família, temos o espaço ideal para a sua viagem.
            </p>
          </div>

          <div className="grid-quartos">
            {quartosEmDestaque.map((quarto) => (
              <CardQuarto key={quarto.id} quarto={quarto} />
            ))}
          </div>

          <div className="centro inicio__ver-todos">
            <Link to="/quartos" className="btn btn--contorno">
              Ver todos os quartos
            </Link>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="secao secao--verde">
        <div className="container">
          <div className="secao__topo">
            <span className="secao__selo">Depoimentos</span>
            <h2 className="secao__titulo">O que dizem nossos hóspedes</h2>
          </div>

          <div className="grid-depoimentos">
            {depoimentos.map((depoimento) => (
              <CardDepoimento key={depoimento.id} depoimento={depoimento} />
            ))}
          </div>
        </div>
      </section>

      {/* Chamada final */}
      <section className="chamada">
        <div className="container chamada__conteudo">
          <div>
            <h2>Pronto para desacelerar?</h2>
            <p>Garanta já a sua reserva e venha viver dias inesquecíveis na serra.</p>
          </div>
          <Link to="/reservas" className="btn btn--verde btn--grande">
            Fazer minha reserva
          </Link>
        </div>
      </section>
    </>
  )
}

export default Inicio
