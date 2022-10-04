const nome = document.querySelector('#nome');
const salvarScoreBtn = document.querySelector('#salvarScoreBtn');
const scoreFinal = document.querySelector('#scoreFinal');
const scoreMaisRecente = localStorage.getItem('scoreMaisRecente');

const scoreAltos = JSON.parse(localStorage.getItem('scoreAltos')) || [];

const MAX_SCORE_ALTOS = 5

scoreFinal.innerText = scoreMaisRecente

nome.addEventListener('keyup', () => {
    salvarScoreBtn.disabled = !nome.value
})

salvarScoreMaisAlto = e => {
    e.preventDefault()
    
    const score = {score: scoreMaisRecente, name: nome.value,
    }

    scoreAltos.push(score)

    scoreAltos.sort((a,b) => {
        return b.score - a.score
    })

    scoreAltos.splice(5)

    localStorage.setItem('scoreAltos', JSON.stringify(scoreAltos))
    window.location.assign('scores.html')
}