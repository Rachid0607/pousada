const unsplash = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

const quartos = [
  {
    id: 1,
    nome: 'Suíte Ipê',
    descricao:
      'Suíte aconchegante com cama queen, decoração rústica em madeira de demolição e varanda privativa com vista para o jardim.',
    capacidade: 2,
    preco: 380,
    comodidades: ['Cama queen', 'Varanda', 'Wi-Fi', 'Smart TV', 'Frigobar'],
    imagem: unsplash('1618773928121-c32242e63f39'),
    destaque: true,
  },
  {
    id: 2,
    nome: 'Chalé da Mata',
    descricao:
      'Chalé independente cercado pela mata nativa, com lareira, banheira de hidromassagem e deck para ver o nascer do sol.',
    capacidade: 2,
    preco: 520,
    comodidades: ['Lareira', 'Hidromassagem', 'Deck privativo', 'Wi-Fi', 'Cafeteira'],
    imagem: unsplash('1510798831971-661eb04b3739'),
    destaque: true,
  },
  {
    id: 3,
    nome: 'Quarto Família Araucária',
    descricao:
      'Espaçoso e iluminado, ideal para famílias: uma cama de casal e duas de solteiro, cantinho de leitura e muito conforto.',
    capacidade: 4,
    preco: 590,
    comodidades: ['Cama casal + 2 solteiro', 'Ar-condicionado', 'Wi-Fi', 'Smart TV', 'Frigobar'],
    imagem: unsplash('1595576508898-0ad5c879a061'),
    destaque: true,
  },
  {
    id: 4,
    nome: 'Chalé Vista da Serra',
    descricao:
      'No ponto mais alto da propriedade, oferece a vista mais bonita da serra através de amplas janelas panorâmicas.',
    capacidade: 3,
    preco: 640,
    comodidades: ['Vista panorâmica', 'Lareira', 'Cozinha compacta', 'Wi-Fi', 'Varanda com rede'],
    imagem: unsplash('1449158743715-0a90ebb6d2d8'),
    destaque: false,
  },
  {
    id: 5,
    nome: 'Quarto Jasmim',
    descricao:
      'Opção charmosa e econômica, com cama de casal, enxoval de algodão e todo o essencial para uma estadia tranquila.',
    capacidade: 2,
    preco: 290,
    comodidades: ['Cama de casal', 'Wi-Fi', 'TV', 'Ventilador de teto'],
    imagem: unsplash('1522771739844-6a9f6d5f14af'),
    destaque: false,
  },
  {
    id: 6,
    nome: 'Casa da Cachoeira',
    descricao:
      'Casa completa para grupos, com dois quartos, sala com lareira, cozinha equipada e trilha exclusiva até a cachoeira.',
    capacidade: 6,
    preco: 890,
    comodidades: ['2 quartos', 'Cozinha equipada', 'Lareira', 'Churrasqueira', 'Wi-Fi'],
    imagem: unsplash('1518780664697-55e3ad937233'),
    destaque: false,
  },
]

export default quartos
