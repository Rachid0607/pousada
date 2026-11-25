// Ícones SVG inline (sem bibliotecas externas)
const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const IconeLogo = (props) => (
  <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true" {...props}>
    <circle cx="24" cy="24" r="23" fill="currentColor" opacity="0.12" />
    <path d="M6 36 L18 18 L24 26 L30 15 L42 36 Z" fill="currentColor" />
    <path d="M30 15 L34 22 L30 20 L27 22 Z" fill="#f4ede1" />
    <circle cx="36" cy="12" r="3.5" fill="#c08a5a" />
  </svg>
)

export const IconeCafe = () => (
  <svg {...base}>
    <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z" />
    <path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17" />
    <path d="M8 3c0 1.5 1 1.5 1 3M12 3c0 1.5 1 1.5 1 3" />
  </svg>
)

export const IconePiscina = () => (
  <svg {...base}>
    <path d="M2 18c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" />
    <path d="M8 15V5a2 2 0 0 1 4 0M16 15V5a2 2 0 0 0-4 0M8 9h8M8 12.5h8" />
  </svg>
)

export const IconeWifi = () => (
  <svg {...base}>
    <path d="M2 8.5a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0" />
    <circle cx="12" cy="19" r="1" fill="currentColor" />
  </svg>
)

export const IconeCarro = () => (
  <svg {...base}>
    <path d="M5 16v-5l2-5h10l2 5v5" />
    <path d="M3 16h18v3H3z" />
    <path d="M5 11h14" />
  </svg>
)

export const IconePessoas = () => (
  <svg {...base} width="18" height="18">
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
    <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" />
  </svg>
)

export const IconeLocal = () => (
  <svg {...base} width="20" height="20">
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)

export const IconeTelefone = () => (
  <svg {...base} width="20" height="20">
    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z" />
  </svg>
)

export const IconeEmail = () => (
  <svg {...base} width="20" height="20">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

export const IconeWhatsapp = () => (
  <svg {...base} width="20" height="20">
    <path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3 3l-4.5 1.5Z" />
    <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 1c-1-.5-2.5-2-3-3l1-1-1-2L9 8.5Z" />
  </svg>
)

export const IconeInstagram = () => (
  <svg {...base} width="20" height="20">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
  </svg>
)

export const IconeFacebook = () => (
  <svg {...base} width="20" height="20">
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z" />
  </svg>
)

export const IconeEstrela = ({ cheia = true }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill={cheia ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
  </svg>
)

export const IconeCheck = () => (
  <svg {...base} width="18" height="18">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)

export const IconeFechar = () => (
  <svg {...base}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const IconeSeta = ({ direcao = 'direita' }) => (
  <svg {...base} style={direcao === 'esquerda' ? { transform: 'rotate(180deg)' } : undefined}>
    <path d="m9 5 7 7-7 7" />
  </svg>
)
