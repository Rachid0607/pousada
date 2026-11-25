import { Link } from 'react-router-dom'
import CabecalhoPagina from '../components/CabecalhoPagina'
import { IconeLocal } from '../components/Icones'
import contato from '../data/contato'
import './Sobre.css'

const valores = [
  {
    titulo: 'Missão',
    texto:
      'Oferecer hospedagem acolhedora e sustentável, proporcionando descanso, boa comida e contato verdadeiro com a natureza.',
  },
  {
    titulo: 'Visão',
    texto:
      'Ser reconhecida como a pousada mais acolhedora da serra, lembrada pelo carinho no atendimento e pelo respeito ao meio ambiente.',
  },
  {
    titulo: 'Valores',
    texto:
      'Hospitalidade, simplicidade, respeito à natureza, valorização dos produtores locais e atenção a cada detalhe.',
  },
]

const numeros = [
  { valor: '18', rotulo: 'anos de história' },
  { valor: '6', rotulo: 'acomodações' },
  { valor: '12 mil', rotulo: 'hóspedes recebidos' },
  { valor: '4,9', rotulo: 'nota média' },
]

function Sobre() {
  return (
    <>
      <CabecalhoPagina
        titulo="Sobre nós"
        subtitulo="Uma história de família, natureza e hospitalidade."
        imagem="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=70"
      />

      {/* História */}
      <section className="secao">
        <div className="container sobre__historia">
          <div className="sobre__imagens">
            <img
              src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80"
              alt="Chalé da pousada à beira do lago"
              className="sobre__imagem-principal"
            />
            <img
              src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=500&q=80"
              alt="Café da manhã servido na pousada"
              className="sobre__imagem-detalhe"
            />
          </div>

          <div className="sobre__texto">
            <span className="secao__selo">Nossa história</span>
            <h2 className="secao__titulo">Do sonho de família ao seu refúgio na serra</h2>
            <p>
              A Pousada Recanto da Serra nasceu em 2008, quando a família Albuquerque decidiu
              transformar o antigo sítio dos avós em um lugar para receber pessoas. A casa de
              madeira, construída à mão nos anos 70, virou a recepção — e o fogão a lenha continua
              lá, preparando o café da manhã todos os dias.
            </p>
            <p>
              Com o passar dos anos, vieram os chalés, a piscina e as trilhas pela mata nativa.
              Mas o essencial não mudou: receber cada hóspede como alguém da família, com comida
              caseira, conversa boa e o silêncio que só a serra oferece.
            </p>
            <p>
              Hoje, seguimos preservando mais de 20 hectares de mata atlântica e trabalhando com
              produtores da região, para que sua estadia seja boa para você e para a natureza.
            </p>
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="sobre__numeros">
        <div className="container sobre__numeros-grid">
          {numeros.map((n) => (
            <div key={n.rotulo}>
              <strong>{n.valor}</strong>
              <span>{n.rotulo}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Missão, visão e valores */}
      <section className="secao secao--clara">
        <div className="container">
          <div className="secao__topo">
            <span className="secao__selo">No que acreditamos</span>
            <h2 className="secao__titulo">Missão, visão e valores</h2>
          </div>

          <div className="sobre__valores">
            {valores.map((item, i) => (
              <article key={item.titulo} className="valor">
                <span className="valor__numero">0{i + 1}</span>
                <h3>{item.titulo}</h3>
                <p>{item.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="secao">
        <div className="container sobre__localizacao">
          <div>
            <span className="secao__selo">Localização</span>
            <h2 className="secao__titulo">Como chegar</h2>
            <p className="secao__texto">
              Estamos a 12 km do centro de Campos do Jordão, em uma estrada asfaltada e bem
              sinalizada. São cerca de 2h30 de São Paulo e 5h do Rio de Janeiro.
            </p>
            <p className="sobre__endereco">
              <IconeLocal />
              <span>
                {contato.endereco}
                <br />
                {contato.cidade}
              </span>
            </p>
            <Link to="/contato" className="btn btn--verde">
              Fale conosco
            </Link>
          </div>

          <div className="sobre__mapa">
            <iframe
              title="Mapa da localização da Pousada Recanto da Serra"
              src={contato.mapa}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Sobre
