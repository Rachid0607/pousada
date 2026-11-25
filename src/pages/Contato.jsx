import { useEffect, useState } from 'react'
import CabecalhoPagina from '../components/CabecalhoPagina'
import { IconeCheck, IconeEmail, IconeLocal, IconeTelefone, IconeWhatsapp } from '../components/Icones'
import contato from '../data/contato'
import { emailValido, mascararTelefone, telefoneValido } from '../utils/formatar'
import './Contato.css'

const formularioVazio = { nome: '', email: '', telefone: '', assunto: '', mensagem: '' }

const assuntos = ['Reservas', 'Dúvidas sobre os quartos', 'Eventos e grupos', 'Elogios ou sugestões', 'Outro']

function validar(dados) {
  const erros = {}
  if (dados.nome.trim().length < 3) erros.nome = 'Informe seu nome (mínimo de 3 letras).'
  if (!dados.email.trim()) erros.email = 'Informe seu e-mail.'
  else if (!emailValido(dados.email.trim())) erros.email = 'E-mail inválido.'
  if (dados.telefone && !telefoneValido(dados.telefone)) erros.telefone = 'Telefone inválido.'
  if (!dados.assunto) erros.assunto = 'Escolha um assunto.'
  if (dados.mensagem.trim().length < 10) erros.mensagem = 'Escreva uma mensagem com pelo menos 10 caracteres.'
  return erros
}

function Contato() {
  const [form, setForm] = useState(formularioVazio)
  const [tentouEnviar, setTentouEnviar] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const erros = tentouEnviar ? validar(form) : {}

  // Esconde a mensagem de sucesso automaticamente depois de alguns segundos
  useEffect(() => {
    if (!enviado) return
    const timer = setTimeout(() => setEnviado(false), 8000)
    return () => clearTimeout(timer)
  }, [enviado])

  const aoMudar = (e) => {
    const { name, value } = e.target
    setForm((atual) => ({ ...atual, [name]: name === 'telefone' ? mascararTelefone(value) : value }))
  }

  const aoEnviar = (e) => {
    e.preventDefault()
    setTentouEnviar(true)

    const errosEncontrados = validar(form)
    const primeiroErro = Object.keys(errosEncontrados)[0]
    if (primeiroErro) {
      document.getElementById(`contato-${primeiroErro}`)?.focus()
      return
    }

    // Simula o envio para um servidor
    setEnviando(true)
    setTimeout(() => {
      setEnviando(false)
      setEnviado(true)
      setForm(formularioVazio)
      setTentouEnviar(false)
    }, 900)
  }

  const propsCampo = (campo) => ({
    id: `contato-${campo}`,
    name: campo,
    value: form[campo],
    onChange: aoMudar,
    'aria-invalid': Boolean(erros[campo]),
    'aria-describedby': erros[campo] ? `contato-${campo}-erro` : undefined,
  })

  const mostrarErro = (campo) =>
    erros[campo] ? (
      <span className="campo__erro" id={`contato-${campo}-erro`} role="alert">
        {erros[campo]}
      </span>
    ) : null

  const classeCampo = (campo) => `campo ${erros[campo] ? 'campo--erro' : ''}`

  const canais = [
    { icone: <IconeTelefone />, titulo: 'Telefone', texto: contato.telefone, link: contato.telefoneLink },
    { icone: <IconeWhatsapp />, titulo: 'WhatsApp', texto: contato.whatsapp, link: contato.whatsappLink, externo: true },
    { icone: <IconeEmail />, titulo: 'E-mail', texto: contato.email, link: `mailto:${contato.email}` },
  ]

  return (
    <>
      <CabecalhoPagina
        titulo="Contato"
        subtitulo="Ficou com alguma dúvida? Fale com a gente — respondemos rapidinho."
        imagem="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1920&q=70"
      />

      <section className="secao">
        <div className="container contato__layout">
          <aside className="contato__info">
            <h2>Canais de atendimento</h2>
            <p className="contato__intro">
              Atendimento todos os dias, das 8h às 20h. Para reservas urgentes, prefira o WhatsApp.
            </p>

            <ul className="contato__canais">
              {canais.map((canal) => (
                <li key={canal.titulo}>
                  <a
                    href={canal.link}
                    className="canal"
                    {...(canal.externo ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    <span className="canal__icone">{canal.icone}</span>
                    <span>
                      <small>{canal.titulo}</small>
                      <strong>{canal.texto}</strong>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <div className="canal">
                  <span className="canal__icone">
                    <IconeLocal />
                  </span>
                  <span>
                    <small>Endereço</small>
                    <strong>
                      {contato.endereco} — {contato.cidade}
                    </strong>
                  </span>
                </div>
              </li>
            </ul>

            <a href={contato.whatsappLink} target="_blank" rel="noreferrer" className="btn btn--verde contato__whats">
              <IconeWhatsapp /> Chamar no WhatsApp
            </a>
          </aside>

          <form className="formulario contato__form" onSubmit={aoEnviar} noValidate>
            <h2>Envie uma mensagem</h2>

            {enviado && (
              <div className="alerta alerta--sucesso" role="status">
                <span className="alerta__icone">
                  <IconeCheck />
                </span>
                <div>
                  <h3>Mensagem enviada!</h3>
                  <p>Obrigado pelo contato. Responderemos em até 24 horas.</p>
                </div>
              </div>
            )}

            <div className="formulario__linha">
              <div className={classeCampo('nome')}>
                <label htmlFor="contato-nome">Nome</label>
                <input type="text" placeholder="Seu nome" autoComplete="name" {...propsCampo('nome')} />
                {mostrarErro('nome')}
              </div>

              <div className={classeCampo('email')}>
                <label htmlFor="contato-email">E-mail</label>
                <input type="email" placeholder="voce@email.com" autoComplete="email" {...propsCampo('email')} />
                {mostrarErro('email')}
              </div>
            </div>

            <div className="formulario__linha">
              <div className={classeCampo('telefone')}>
                <label htmlFor="contato-telefone">
                  Telefone <span className="campo__opcional">(opcional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="(00) 00000-0000"
                  autoComplete="tel"
                  inputMode="numeric"
                  {...propsCampo('telefone')}
                />
                {mostrarErro('telefone')}
              </div>

              <div className={classeCampo('assunto')}>
                <label htmlFor="contato-assunto">Assunto</label>
                <select {...propsCampo('assunto')}>
                  <option value="">Selecione</option>
                  {assuntos.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                {mostrarErro('assunto')}
              </div>
            </div>

            <div className={classeCampo('mensagem')}>
              <label htmlFor="contato-mensagem">Mensagem</label>
              <textarea placeholder="Como podemos ajudar?" {...propsCampo('mensagem')} />
              <span className="campo__ajuda">{form.mensagem.trim().length} caracteres</span>
              {mostrarErro('mensagem')}
            </div>

            <button type="submit" className="btn btn--madeira btn--grande" disabled={enviando}>
              {enviando ? 'Enviando...' : 'Enviar mensagem'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contato
