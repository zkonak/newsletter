const quotesData = [{
  text: "Dans la vie on ne fait pas ce que l'on veut mais on est responsable de ce que l'on est.",
  author: 'Jean-Paul Sartre'
},
{
  text: "La vie est un mystère qu'il faut vivre, et non un problème à résoudre.",
  author: 'Gandhi'
},
{
  text: "La vie, c'est comme une bicyclette, il faut avancer pour ne pas perdre l'équilibre.",
  author: 'Albert Einstein'
},
{
  text: "Choisissez un travail que vous aimez et vous n'aurez pas à travailler un seul jour de votre vie.",
  author: 'Confucius'
},
{
  text: "S'aimer soi-même est le début d'une histoire d'amour qui durera toute une vie.",
  author: 'Oscar Wilde'
},
{
  text: "Soit A un succès dans la vie. Alors A = x + y + z, où x = travailler, y = s'amuser, z = se taire.",
  author: 'Albert Einstein'
},
{
  text: "Le courage, c'est de comprendre sa propre vie... Le courage, c'est d'aimer la vie et de regarder la mort d'un regard tranquille... Le courage, c'est d'aller à l'idéal et de comprendre le réel.",
  author: 'Jean Jaurès'
},
{
  text: "Le monde entier est un théâtre, Et tous, hommes et femmes, n'en sont que les acteurs. Et notre vie durant nous jouons plusieurs rôles.",
  author: 'William Shakespeare'
},
{
  text: "Rêve ta vie en couleur, c'est le secret du bonheur.",
  author: 'Walt Disney'
},
{
  text: "Qui a la même vision du monde à vingt ans qu'à cinquante, a perdu trente ans de sa vie.",
  author: 'Mohammed Ali'
},
{
  text: "Un petit verre de vin d'Alsace, c'est comme une robe légère, une fleur de printemps, c'est le rayon de soleil qui vient égayer la vie.",
  author: 'Christian Dior'
},
{
  text: "Pour atteindre la vérité, il faut une fois dans la vie se défaire de toutes les opinions qu'on a reçues, et reconstruire de nouveau tout le système de ses connaissances.",
  author: 'René Descartes'
},
{
  text: "La vie est une fleur. L'amour en est le miel.",
  author: 'Victor Hugo'
},
{
  text: "La vie n'est bonne qu'à étudier et à enseigner les mathématiques.",
  author: 'Blaise Pascal'
},
{
  text: 'La musique est la bande originale de la vie. Elle joue la mélodie de notre être.',
  author: 'Michael Jackson'
}

]

function getRandomQuote () {
  const randomQuote = quotesData[
    Math.floor(Math.random() * quotesData.length)
  ]

  return randomQuote
}

export default getRandomQuote
