const questao = document.querySelector('#questao');
const escolhas = Array.from(document.querySelectorAll('.texto-escolha'));
const progressoTexto = document.querySelector('#progressoTexto');
const scoreTexto = document.querySelector('#score');
const progressoBarraCheia = document.querySelector('#progressoBarraCheia');

let questaoAtual = {}
let aceitandoQuestoes = true
let score = 0
let contadorQuestao = 0
let questoesDisponiveis = []

let questoes = [
    {
        questao: "Pergunta MAB",
        escolha1: "2",
        escolha2: "54",
        escolha3: "23",
        escolha4: "4",
        resposta: 2,
    },
    {
        questao: "teste teste",
        escolha1: "22",
        escolha2: "543",
        escolha3: "243",
        escolha4: "42",
        resposta: 3,
    },
    {
        questao: 'teeeeste',
        escolha1: "234",
        escolha2: "542",
        escolha3: "233",
        escolha4: "45",
        resposta: 1,
    },
    {
        questao: 'testeeee',
        escolha1: "26",
        escolha2: "514",
        escolha3: "273",
        escolha4: "41",
        resposta: 4,
    }
]

const SCORE_PONTOS = 100
const QUESTOES_MAX = 4

comecarQuiz = () => {
    contadorQuestao = 0
    score = 0
    questoesDisponiveis = [...questoes]
    getNovasQuestoes()
}

getNovasQuestoes = () => {
    if(questoesDisponiveis.length === 0 || contadorQuestao > QUESTOES_MAX){
        localStorage.setItem('scoreMaisRecente', score)

        return window.location.assign('../pages/end.html')
    }

    contadorQuestao++
    progressoTexto.innerText = `Questão ${contadorQuestao} de ${QUESTOES_MAX}`
    progressoBarraCheia.style.width = `${(contadorQuestao/QUESTOES_MAX) * 100}%`
    
    const questoesIndex = Math.floor(Math.random() * questoesDisponiveis.length)
    questaoAtual = questoesDisponiveis[questoesIndex]
    questao.innerText = questaoAtual.questao

    escolhas.forEach(escolha => {
        const numero = escolha.dataset['number']
        escolha.innerText = questaoAtual['escolha'+numero]
        console.log(escolha.innerText)
    })

    questoesDisponiveis.splice(questoesIndex, 1)

    aceitandoQuestoes = true
}

escolhas.forEach(escolha => {
    escolha.addEventListener('click', e => {
        if(!aceitandoQuestoes) return

        aceitandoQuestoes = false
        const escolhaSelecionada = e.target
        const respostaSelecionada = escolhaSelecionada.dataset['number']

        let classeAplicar = respostaSelecionada == questaoAtual.resposta ? 'correta' : 'incorreta'

        if(classeAplicar === 'correta'){
            incrementScore(SCORE_PONTOS)
        }

        escolhaSelecionada.parentElement.classList.add(classeAplicar)

        setTimeout(() => {
            escolhaSelecionada.parentElement.classList.remove(classeAplicar)
            getNovasQuestoes()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreTexto.innerText = score
}

comecarQuiz()