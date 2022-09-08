const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

const personagens = [
    'ola',
    'triste',
    'covid',
    'dog',
    'ih',
    'legal',
    'lindo',
    'rockstar',
    'roxo',
    'sorrisinho',
]

const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element
}

let firstCard = ''
let secondCard = ''

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card')
    if(disabledCards.length === 20){
        clearInterval(this.loop)
        alert(`Parabéns, ${spanPlayer.innerHTML}, seu tempo para ganhar foi: ${timer.innerHTML}`)
    }
}

const checkCards = () => {
    const primeiroPersonagem = firstCard.getAttribute('data-personagem')
    const segundoPersonagem = secondCard.getAttribute('data-personagem')

    if(primeiroPersonagem === segundoPersonagem){
        firstCard.firstChild.classList.add('disabled-card')
        secondCard.firstChild.classList.add('disabled-card')
    
        firstCard = ''
        secondCard = ''

        checkEndGame()
    }
    else{
        setTimeout(() => {
        firstCard.classList.remove('reveal-card')
        secondCard.classList.remove('reveal-card')

        firstCard = ''
        secondCard = ''
        }, 500)
    }

}


const revealCard = ({ target }) => {

    if(target.parentNode.className.includes('reveal-card')){
        return
    }

    if(firstCard === ''){
        target.parentNode.classList.add('reveal-card')
        firstCard = target.parentNode
    }
    else if(secondCard === ''){
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode

        checkCards()
    }
}

const createCard = (personagem) => {
    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url('../images/${personagem}.png')`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealCard)
    card.setAttribute('data-personagem', personagem)

    return card
}

const loadGame = () => {

    const personagemDuplicado = [ ...personagens, ...personagens ]

    const shuffledArray = personagemDuplicado.sort( () => Math.random() - 0.5 )



    shuffledArray.forEach((personagem) => {
        const card = createCard(personagem)
        grid.appendChild(card)
    })
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = Number(timer.innerHTML)
        timer.innerHTML = currentTime + 1

    }, 1000)
}

window.onload = () => { 

    spanPlayer.innerHTML = localStorage.getItem('player')
    startTimer()
    loadGame()
}