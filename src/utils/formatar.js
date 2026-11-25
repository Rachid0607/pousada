export const formatarMoeda = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// Recebe "AAAA-MM-DD" e devolve "DD/MM/AAAA"
export const formatarData = (iso) => {
  if (!iso) return ''
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}

// Data de hoje no fuso local, no formato "AAAA-MM-DD" (usado no atributo min dos inputs)
export const hojeISO = () => {
  const d = new Date()
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mes}-${dia}`
}

// Diferença em dias entre duas datas "AAAA-MM-DD" (calculada em UTC para evitar problemas de horário de verão)
export const calcularDiarias = (entrada, saida) => {
  if (!entrada || !saida) return 0
  const [a1, m1, d1] = entrada.split('-').map(Number)
  const [a2, m2, d2] = saida.split('-').map(Number)
  const diff = Date.UTC(a2, m2 - 1, d2) - Date.UTC(a1, m1 - 1, d1)
  return Math.round(diff / 86400000)
}

// Máscara simples: (00) 00000-0000
export const mascararTelefone = (valor) => {
  const n = valor.replace(/\D/g, '').slice(0, 11)
  if (n.length <= 2) return n.length ? `(${n}` : ''
  if (n.length <= 6) return `(${n.slice(0, 2)}) ${n.slice(2)}`
  if (n.length <= 10) return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`
}

export const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)

export const telefoneValido = (tel) => {
  const n = tel.replace(/\D/g, '')
  return n.length === 10 || n.length === 11
}
