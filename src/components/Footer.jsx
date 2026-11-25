import { Link } from 'react-router-dom'
import contato from '../data/contato'
import {
  IconeEmail,
  IconeFacebook,
  IconeInstagram,
  IconeLocal,
  IconeLogo,
  IconeTelefone,
  IconeWhatsapp,
} from './Icones'
import './Footer.css'

function Footer() {
  const ano = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__marca">
          <Link to="/" className="footer__logo">
            <IconeLogo />
            <span>Recanto da Serra</span>
          </Link>
          <p>
            Uma pousada cercada pela natureza, feita para quem busca descanso, boa comida e o
            silêncio da serra.
          </p>
          <div className="footer__redes">
            <a href={contato.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <IconeInstagram />
            </a>
            <a href={contato.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <IconeFacebook />
            </a>
            <a href={contato.whatsappLink} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <IconeWhatsapp />
            </a>
          </div>
        </div>

        <div>
          <h3 className="footer__titulo">Navegação</h3>
          <ul className="footer__lista">
            <li><Link to="/quartos">Quartos</Link></li>
            <li><Link to="/reservas">Reservas</Link></li>
            <li><Link to="/galeria">Galeria</Link></li>
            <li><Link to="/sobre">Sobre nós</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="footer__titulo">Contato</h3>
          <ul className="footer__lista footer__lista--icones">
            <li>
              <IconeLocal />
              <span>
                {contato.endereco}
                <br />
                {contato.cidade}
              </span>
            </li>
            <li>
              <IconeTelefone />
              <a href={contato.telefoneLink}>{contato.telefone}</a>
            </li>
            <li>
              <IconeWhatsapp />
              <a href={contato.whatsappLink} target="_blank" rel="noreferrer">
                {contato.whatsapp}
              </a>
            </li>
            <li>
              <IconeEmail />
              <a href={`mailto:${contato.email}`}>{contato.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__base">
        <div className="container footer__base-conteudo">
          <p>© {ano} Pousada Recanto da Serra. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por <strong>João Pedro Rachid</strong>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
