# 🌄 Pousada Recanto da Serra

Site institucional e de reservas para a **Pousada Recanto da Serra**, uma pousada fictícia localizada na serra. O projeto foi desenvolvido em React com Vite, totalmente responsivo, com navegação entre páginas, filtro de quartos, galeria com modal e um sistema de reservas que calcula diárias e valores automaticamente e salva os dados no navegador.

## ✨ Funcionalidades

- Navegação entre páginas com **React Router** (incluindo página 404)
- **Header** com logo e menu hambúrguer no celular; **Footer** com endereço, telefone e redes sociais
- **Filtro de quartos** por capacidade e ordenação por preço
- Botão **"Reservar"** em cada quarto que leva à página de reservas com o quarto já selecionado
- **Formulário de reserva** com validação de todos os campos e das datas (a saída deve ser depois da entrada, e a entrada não pode estar no passado)
- **Cálculo automático** do número de diárias e do valor total, com resumo ao vivo
- **Mensagem de confirmação** com código da reserva
- **Minhas reservas**: as reservas ficam salvas no `localStorage` e podem ser canceladas
- **Galeria** em grid com modal (navegação por setas, teclado e tecla Esc)
- **Formulário de contato** com validação e mensagem de sucesso
- Mapa de localização com **Google Maps** (iframe)

## 🛠️ Tecnologias

- [React](https://react.dev/) (hooks `useState`, `useEffect`, `useRef`, `useCallback`)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) (`react-router-dom`)
- CSS próprio, sem bibliotecas de estilo (paleta em verde-escuro, bege e madeira)
- Google Fonts (Playfair Display e Lato)
- Imagens do [Unsplash](https://unsplash.com/)
- `localStorage` para guardar as reservas

## 📄 Páginas

| Rota        | Página    | Conteúdo                                                                 |
| ----------- | --------- | ------------------------------------------------------------------------ |
| `/`         | Início    | Banner hero, destaques (café, piscina, Wi-Fi, estacionamento), prévia de 3 quartos e depoimentos |
| `/quartos`  | Quartos   | Lista de quartos com filtro por capacidade e botão de reserva            |
| `/reservas` | Reservas  | Formulário de reserva, resumo com valor total e lista "Minhas reservas"  |
| `/galeria`  | Galeria   | Grid de fotos com modal ao clicar                                        |
| `/sobre`    | Sobre     | História, missão, visão, valores e localização com mapa                  |
| `/contato`  | Contato   | Formulário com validação, telefone, WhatsApp e e-mail                    |

## 📁 Estrutura

```
src/
├── components/     # Header, Footer, CardQuarto, CardDepoimento, ModalImagem, Icones...
├── data/           # quartos.js, depoimentos.js, galeria.js, contato.js
├── pages/          # Inicio, Quartos, Reservas, Galeria, Sobre, Contato, NaoEncontrada
├── utils/          # funções de formatação e validação
├── App.jsx         # definição das rotas
├── main.jsx        # ponto de entrada (BrowserRouter)
└── index.css       # estilos globais e variáveis de cor
```

## ▶️ Como rodar

Pré-requisito: [Node.js](https://nodejs.org/) 20 ou superior.

```bash
# instalar as dependências
npm install

# rodar em modo de desenvolvimento (http://localhost:5173)
npm run dev

# gerar a versão de produção (pasta dist/)
npm run build

# visualizar a versão de produção localmente
npm run preview
```

## 🚀 Deploy na Vercel

O arquivo `vercel.json` na raiz redireciona todas as rotas para o `index.html`, para que as páginas do React Router funcionem ao acessar um endereço diretamente ou recarregar a página:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

Basta importar o repositório na Vercel. Ela detecta o Vite e usa `npm run build` com a pasta de saída `dist`.

## 👤 Autor

Desenvolvido por **João Pedro Rachid**.
