const scoreAltosLista = document.querySelector('#scoreAltosLista');
const scoreAltos = JSON.parse(localStorage.getItem('scoreAltos')) || [];

scoreAltosLista.innerHTML =
scoreAltos.map(score => {
    return `<li class="scoreAltos">${score.name} - ${score.score}<li>`
}).join('')
console.log(scoreAltos)