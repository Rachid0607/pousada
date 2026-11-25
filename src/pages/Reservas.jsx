import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import CabecalhoPagina from '../components/CabecalhoPagina'
import { IconeCheck } from '../components/Icones'
import quartos from '../data/quartos'
import {
  calcularDiarias,
  emailValido,
  formatarData,
  formatarMoeda,
  hojeISO,
  mascararTelefone,
  telefoneValido,
} from '../utils/formatar'
import './Reservas.css'

const CHAVE_STORAGE = 'recanto-da-serra:reservas'
const MAX_DIARIAS = 30
const CAPACIDADE_MAXIMA = Math.max(...quartos.map((q) => q.capacidade))

const formularioVazio = {
  nome: '',
  email: '',
  telefone: '',
  quartoId: '',
  entrada: '',
  saida: '',
  hospedes: '1',
}

// Lê as reservas salvas no navegador (com proteção caso o JSON esteja corrompido)
function carregarReservas() {
  try {
    const salvas = JSON.parse(localStorage.getItem(CHAVE_STORAGE))
    return Array.isArray(salvas) ? salvas : []
  } catch {
    return []
  }
}

// Soma dias a uma data "AAAA-MM-DD"
function somarDias(iso, dias) {
  const [ano, mes, dia] = iso.split('-').map(Number)
  const data = new Date(Date.UTC(ano, mes - 1, dia + dias))
  return data.toISOString().slice(0, 10)
}

function validar(dados, quarto) {
  const erros = {}
  const hoje = hojeISO()

  if (dados.nome.trim().length < 3) erros.nome = 'Informe seu nome completo.'

  if (!dados.email.trim()) erros.email = 'Informe seu e-mail.'
  else if (!emailValido(dados.email.trim())) erros.email = 'E-mail inválido.'

  if (!dados.telefone) erros.telefone = 'Informe seu telefone.'
  else if (!telefoneValido(dados.telefone)) erros.telefone = 'Telefone inválido. Use DDD + número.'

  if (!quarto) erros.quartoId = 'Escolha um quarto.'

  if (!dados.entrada) erros.entrada = 'Informe a data de entrada.'
  else if (dados.entrada < hoje) erros.entrada = 'A data de entrada não pode estar no passado.'

  if (!dados.saida) {
    erros.saida = 'Informe a data de saída.'
  } else if (dados.entrada) {
    const diarias = calcularDiarias(dados.entrada, dados.saida)
    if (diarias <= 0) erros.saida = 'A saída deve ser depois da entrada.'
    else if (diarias > MAX_DIARIAS) erros.saida = `A estadia máxima é de ${MAX_DIARIAS} diárias.`
  }

  const hospedes = Number(dados.hospedes)
  if (!hospedes || hospedes < 1) erros.hospedes = 'Informe o número de hóspedes.'
  else if (quarto && hospedes > quarto.capacidade)
    erros.hospedes = `Este quarto comporta no máximo ${quarto.capacidade} pessoas.`

  return erros
}

function Reservas() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [form, setForm] = useState(formularioVazio)
  const [tentouEnviar, setTentouEnviar] = useState(false)
  const [reservas, setReservas] = useState(carregarReservas)
  const [confirmada, setConfirmada] = useState(null)
  const confirmacaoRef = useRef(null)

  // Pré-seleciona o quarto vindo da página Quartos (/reservas?quarto=ID)
  useEffect(() => {
    const id = searchParams.get('quarto')
    const quarto = quartos.find((q) => String(q.id) === id)
    if (quarto) {
      setForm((atual) => ({
        ...atual,
        quartoId: id,
        hospedes: String(Math.min(Number(atual.hospedes), quarto.capacidade)),
      }))
    }
  }, [searchParams])

  // Salva as reservas no localStorage sempre que a lista muda
  useEffect(() => {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(reservas))
  }, [reservas])

  // Rola até a mensagem de confirmação quando uma reserva é feita
  useEffect(() => {
    if (confirmada) confirmacaoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [confirmada])

  const quartoSelecionado = quartos.find((q) => String(q.id) === form.quartoId)
  const diarias = calcularDiarias(form.entrada, form.saida)
  const diariasValidas = diarias > 0 && diarias <= MAX_DIARIAS
  const total = quartoSelecionado && diariasValidas ? diarias * quartoSelecionado.preco : 0

  // Os erros só aparecem depois da primeira tentativa de envio e se atualizam enquanto o usuário digita
  const erros = tentouEnviar ? validar(form, quartoSelecionado) : {}

  const hoje = hojeISO()
  const minimoSaida = form.entrada ? somarDias(form.entrada, 1) : somarDias(hoje, 1)
  const limiteHospedes = quartoSelecionado ? quartoSelecionado.capacidade : CAPACIDADE_MAXIMA

  const aoMudar = (e) => {
    const { name, value } = e.target

    setForm((atual) => {
      const novo = { ...atual, [name]: name === 'telefone' ? mascararTelefone(value) : value }

      // Ao trocar de quarto, ajusta o número de hóspedes à capacidade dele
      if (name === 'quartoId') {
        const quarto = quartos.find((q) => String(q.id) === value)
        if (quarto && Number(novo.hospedes) > quarto.capacidade) novo.hospedes = String(quarto.capacidade)
      }

      // Se a entrada passar a ser igual/depois da saída, limpa a saída
      if (name === 'entrada' && novo.saida && novo.saida <= value) novo.saida = ''

      return novo
    })
  }

  const aoEnviar = (e) => {
    e.preventDefault()
    setTentouEnviar(true)

    const errosEncontrados = validar(form, quartoSelecionado)
    const primeiroErro = Object.keys(errosEncontrados)[0]
    if (primeiroErro) {
      document.getElementById(primeiroErro)?.focus()
      return
    }

    const novaReserva = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      codigo: `RS-${Date.now().toString(36).toUpperCase().slice(-6)}`,
      nome: form.nome.trim(),
      email: form.email.trim(),
      telefone: form.telefone,
      quartoId: quartoSelecionado.id,
      quartoNome: quartoSelecionado.nome,
      quartoImagem: quartoSelecionado.imagem,
      entrada: form.entrada,
      saida: form.saida,
      hospedes: Number(form.hospedes),
      diarias,
      precoDiaria: quartoSelecionado.preco,
      total,
      criadaEm: new Date().toISOString(),
    }

    setReservas((atuais) => [novaReserva, ...atuais])
    setConfirmada(novaReserva)
    setForm(formularioVazio)
    setTentouEnviar(false)
    if (searchParams.has('quarto')) setSearchParams({}, { replace: true })
  }

  const cancelarReserva = (reserva) => {
    const ok = window.confirm(`Deseja cancelar a reserva ${reserva.codigo} (${reserva.quartoNome})?`)
    if (!ok) return
    setReservas((atuais) => atuais.filter((r) => r.id !== reserva.id))
    if (confirmada?.id === reserva.id) setConfirmada(null)
  }

  // Função auxiliar para exibir a mensagem de erro de um campo
  const mostrarErro = (campo) =>
    erros[campo] ? (
      <span className="campo__erro" id={`${campo}-erro`} role="alert">
        {erros[campo]}
      </span>
    ) : null

  const propsCampo = (campo) => ({
    id: campo,
    name: campo,
    value: form[campo],
    onChange: aoMudar,
    'aria-invalid': Boolean(erros[campo]),
    'aria-describedby': erros[campo] ? `${campo}-erro` : undefined,
  })

  const classeCampo = (campo) => `campo ${erros[campo] ? 'campo--erro' : ''}`

  return (
    <>
      <CabecalhoPagina
        titulo="Reservas"
        subtitulo="Escolha o quarto, as datas e garanta seus dias de descanso na serra."
        imagem="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=70"
      />

      <section className="secao">
        <div className="container">
          {confirmada && (
            <div className="alerta alerta--sucesso reservas__confirmacao" ref={confirmacaoRef} role="status">
              <span className="alerta__icone">
                <IconeCheck />
              </span>
              <div>
                <h3>Reserva confirmada!</h3>
                <p>
                  Obrigado, <strong>{confirmada.nome.split(' ')[0]}</strong>! Sua reserva{' '}
                  <strong>{confirmada.codigo}</strong> no <strong>{confirmada.quartoNome}</strong> de{' '}
                  {formatarData(confirmada.entrada)} a {formatarData(confirmada.saida)} ({confirmada.diarias}{' '}
                  {confirmada.diarias === 1 ? 'diária' : 'diárias'}) foi registrada. Valor total:{' '}
                  <strong>{formatarMoeda(confirmada.total)}</strong>. Enviaremos os detalhes para{' '}
                  {confirmada.email}.
                </p>
              </div>
              <button className="reservas__fechar-alerta" onClick={() => setConfirmada(null)} aria-label="Fechar mensagem">
                ×
              </button>
            </div>
          )}

          <div className="reservas__layout">
            <form className="formulario reservas__form" onSubmit={aoEnviar} noValidate>
              <h2 className="reservas__titulo">Dados da reserva</h2>

              <div className={classeCampo('nome')}>
                <label htmlFor="nome">Nome completo</label>
                <input type="text" placeholder="Seu nome" autoComplete="name" {...propsCampo('nome')} />
                {mostrarErro('nome')}
              </div>

              <div className="formulario__linha">
                <div className={classeCampo('email')}>
                  <label htmlFor="email">E-mail</label>
                  <input type="email" placeholder="voce@email.com" autoComplete="email" {...propsCampo('email')} />
                  {mostrarErro('email')}
                </div>

                <div className={classeCampo('telefone')}>
                  <label htmlFor="telefone">Telefone</label>
                  <input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    autoComplete="tel"
                    inputMode="numeric"
                    {...propsCampo('telefone')}
                  />
                  {mostrarErro('telefone')}
                </div>
              </div>

              <div className={classeCampo('quartoId')}>
                <label htmlFor="quartoId">Quarto</label>
                <select {...propsCampo('quartoId')}>
                  <option value="">Selecione um quarto</option>
                  {quartos.map((q) => (
                    <option key={q.id} value={q.id}>
                      {q.nome} — até {q.capacidade} pessoas — {formatarMoeda(q.preco)}/diária
                    </option>
                  ))}
                </select>
                {mostrarErro('quartoId')}
              </div>

              <div className="formulario__linha">
                <div className={classeCampo('entrada')}>
                  <label htmlFor="entrada">Data de entrada</label>
                  <input type="date" min={hoje} {...propsCampo('entrada')} />
                  {mostrarErro('entrada')}
                </div>

                <div className={classeCampo('saida')}>
                  <label htmlFor="saida">Data de saída</label>
                  <input type="date" min={minimoSaida} {...propsCampo('saida')} />
                  {mostrarErro('saida')}
                </div>
              </div>

              <div className={classeCampo('hospedes')}>
                <label htmlFor="hospedes">Número de hóspedes</label>
                <select {...propsCampo('hospedes')}>
                  {Array.from({ length: limiteHospedes }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'hóspede' : 'hóspedes'}
                    </option>
                  ))}
                </select>
                {quartoSelecionado && (
                  <span className="campo__ajuda">
                    O {quartoSelecionado.nome} comporta até {quartoSelecionado.capacidade} pessoas.
                  </span>
                )}
                {mostrarErro('hospedes')}
              </div>

              <button type="submit" className="btn btn--madeira btn--grande">
                Confirmar reserva
              </button>
            </form>

            <aside className="resumo" aria-live="polite">
              <h2 className="resumo__titulo">Resumo</h2>

              {quartoSelecionado ? (
                <>
                  <img className="resumo__imagem" src={quartoSelecionado.imagem} alt={quartoSelecionado.nome} />
                  <p className="resumo__quarto">{quartoSelecionado.nome}</p>
                </>
              ) : (
                <p className="resumo__vazio">
                  Selecione um quarto para ver o resumo. <Link to="/quartos">Conheça as opções</Link>.
                </p>
              )}

              <dl className="resumo__lista">
                <div>
                  <dt>Diária</dt>
                  <dd>{quartoSelecionado ? formatarMoeda(quartoSelecionado.preco) : '—'}</dd>
                </div>
                <div>
                  <dt>Entrada</dt>
                  <dd>{form.entrada ? formatarData(form.entrada) : '—'}</dd>
                </div>
                <div>
                  <dt>Saída</dt>
                  <dd>{form.saida ? formatarData(form.saida) : '—'}</dd>
                </div>
                <div>
                  <dt>Nº de diárias</dt>
                  <dd>{diariasValidas ? diarias : '—'}</dd>
                </div>
                <div>
                  <dt>Hóspedes</dt>
                  <dd>{form.hospedes}</dd>
                </div>
              </dl>

              <div className="resumo__total">
                <span>Total</span>
                <strong>{formatarMoeda(total)}</strong>
              </div>
              <p className="resumo__nota">Café da manhã incluso. Cancelamento gratuito.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="secao secao--clara" id="minhas-reservas">
        <div className="container">
          <div className="secao__topo">
            <span className="secao__selo">Suas estadias</span>
            <h2 className="secao__titulo">Minhas reservas</h2>
            <p className="secao__texto">As reservas ficam salvas neste navegador.</p>
          </div>

          {reservas.length === 0 ? (
            <p className="reservas__vazio">Você ainda não tem reservas. Que tal fazer a primeira?</p>
          ) : (
            <ul className="lista-reservas">
              {reservas.map((reserva) => (
                <li key={reserva.id} className="item-reserva">
                  <img src={reserva.quartoImagem} alt="" className="item-reserva__imagem" />
                  <div className="item-reserva__info">
                    <span className="item-reserva__codigo">{reserva.codigo}</span>
                    <h3>{reserva.quartoNome}</h3>
                    <p>
                      {formatarData(reserva.entrada)} → {formatarData(reserva.saida)} · {reserva.diarias}{' '}
                      {reserva.diarias === 1 ? 'diária' : 'diárias'} · {reserva.hospedes}{' '}
                      {reserva.hospedes === 1 ? 'hóspede' : 'hóspedes'}
                    </p>
                    <p className="item-reserva__titular">Em nome de {reserva.nome}</p>
                  </div>
                  <div className="item-reserva__acoes">
                    <strong className="item-reserva__total">{formatarMoeda(reserva.total)}</strong>
                    <button className="btn btn--perigo btn--pequeno" onClick={() => cancelarReserva(reserva)}>
                      Cancelar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}

export default Reservas
