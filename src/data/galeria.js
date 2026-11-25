const unsplash = (id, w) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

const fotos = [
  ['1470770841072-f978cf4d019e', 'Chalé à beira do lago'],
  ['1566073771259-6a8506099945', 'Piscina ao entardecer'],
  ['1504754524776-8f4f37790ca0', 'Café da manhã caseiro'],
  ['1506905925346-21bda4d32df4', 'Vista do alto da serra'],
  ['1618773928121-c32242e63f39', 'Suíte Ipê'],
  ['1441974231531-c6227db76b6e', 'Trilha pela mata'],
  ['1510798831971-661eb04b3739', 'Chalé da Mata'],
  ['1432405972618-c60b0225b8f9', 'Cachoeira da propriedade'],
  ['1595576508898-0ad5c879a061', 'Quarto Família Araucária'],
  ['1501785888041-af3ef285b470', 'Lago e montanhas'],
  ['1533089860892-a7c6f0a88666', 'Mesa do café'],
  ['1449158743715-0a90ebb6d2d8', 'Chalé Vista da Serra'],
]

const galeria = fotos.map(([id, legenda], i) => ({
  id: i + 1,
  legenda,
  miniatura: unsplash(id, 600),
  grande: unsplash(id, 1600),
}))

export default galeria
