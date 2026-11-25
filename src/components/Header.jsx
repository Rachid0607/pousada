import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { IconeLogo } from './Icones'
import './Header.css'

const links = [
  { to: '/', rotulo: 'Início' },
  { to: '/quartos', rotulo: 'Quartos' },
  { to: '/reservas', rotulo: 'Reservas' },
  { to: '/galeria', rotulo: 'Galeria' },
  { to: '/sobre', rotulo: 'Sobre' },
  { to: '/contato', rotulo: 'Contato' },
]

function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const [rolou, setRolou] = useState(false)
  const location = useLocation()

  // Fecha o menu sempre que a rota muda
  useEffect(() => {
    setMenuAberto(false)
  }, [location.pathname])

  // Adiciona sombra no header ao rolar a página
  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 10)
    aoRolar()
    window.addEventListener('scroll', aoRolar)
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  // Impede a rolagem do fundo enquanto o menu mobile está aberto
  useEffect(() => {
    document.body.classList.toggle('sem-rolagem', menuAberto)
    return () => document.body.classList.remove('sem-rolagem')
  }, [menuAberto])

  return (
    <header className={`header ${rolou ? 'header--rolou' : ''}`}>
      <div className="container header__conteudo">
        <Link to="/" className="logo" aria-label="Pousada Recanto da Serra — página inicial">
          <IconeLogo />
          <span className="logo__texto">
            <span className="logo__pequeno">Pousada</span>
            Recanto da Serra
          </span>
        </Link>

        <button
          className={`hamburguer ${menuAberto ? 'hamburguer--aberto' : ''}`}
          onClick={() => setMenuAberto((aberto) => !aberto)}
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="menu-principal" className={`nav ${menuAberto ? 'nav--aberto' : ''}`}>
          <ul className="nav__lista">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `nav__link ${isActive ? 'nav__link--ativo' : ''}`}
                >
                  {link.rotulo}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/reservas" className="btn btn--madeira nav__cta">
            Reservar
          </Link>
        </nav>
      </div>

      {menuAberto && <div className="nav__fundo" onClick={() => setMenuAberto(false)} />}
    </header>
  )
}

export default Header
