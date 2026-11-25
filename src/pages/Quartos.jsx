import { useState } from 'react'
import CabecalhoPagina from '../components/CabecalhoPagina'
import CardQuarto from '../components/CardQuarto'
import quartos from '../data/quartos'
import './Quartos.css'

const filtros = [
  { valor: 'todos', rotulo: 'Todos', testar: () => true },
  { valor: 'ate2', rotulo: 'Até 2 pessoas', testar: (q) => q.capacidade <= 2 },
  { valor: '3a4', rotulo: '3 a 4 pessoas', testar: (q) => q.capacidade >= 3 && q.capacidade <= 4 },
  { valor: '5mais', rotulo: '5 ou mais', testar: (q) => q.capacidade >= 5 },
]

function Quartos() {
  const [filtro, setFiltro] = useState('todos')
  const [ordem, setOrdem] = useState('padrao')

  const filtroAtual = filtros.find((f) => f.valor === filtro)

  const quartosFiltrados = quartos.filter(filtroAtual.testar).sort((a, b) => {
    if (ordem === 'menor') return a.preco - b.preco
    if (ordem === 'maior') return b.preco - a.preco
    return a.id - b.id
  })

  return (
    <>
      <CabecalhoPagina
        titulo="Nossos Quartos"
        subtitulo="Acomodações pensadas para o seu descanso, com o charme rústico da serra."
        imagem="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1920&q=70"
      />

      <section className="secao">
        <div className="container">
          <div className="filtros">
            <div className="filtros__grupo" role="group" aria-label="Filtrar por capacidade">
              <span className="filtros__rotulo">Capacidade:</span>
              {filtros.map((f) => (
                <button
                  key={f.valor}
                  className={`chip ${filtro === f.valor ? 'chip--ativo' : ''}`}
                  onClick={() => setFiltro(f.valor)}
                  aria-pressed={filtro === f.valor}
                >
                  {f.rotulo}
                </button>
              ))}
            </div>

            <div className="filtros__ordem">
              <label htmlFor="ordem" className="filtros__rotulo">
                Ordenar:
              </label>
              <select id="ordem" value={ordem} onChange={(e) => setOrdem(e.target.value)}>
                <option value="padrao">Recomendados</option>
                <option value="menor">Menor preço</option>
                <option value="maior">Maior preço</option>
              </select>
            </div>
          </div>

          <p className="filtros__resultado">
            {quartosFiltrados.length}{' '}
            {quartosFiltrados.length === 1 ? 'quarto encontrado' : 'quartos encontrados'}
          </p>

          {quartosFiltrados.length > 0 ? (
            <div className="grid-quartos">
              {quartosFiltrados.map((quarto) => (
                <CardQuarto key={quarto.id} quarto={quarto} />
              ))}
            </div>
          ) : (
            <p className="filtros__vazio">Nenhum quarto encontrado para essa capacidade.</p>
          )}
        </div>
      </section>
    </>
  )
}

export default Quartos
