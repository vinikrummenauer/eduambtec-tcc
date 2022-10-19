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
        questao: "Quais materiais estão de acordo com as cores das lixeiras?",
        escolha1: "Plástico - Marrom; Metal - Verde; Papel - Azul; Vidro - Amarelo; Orgânico - Vermelho.",
        escolha2: "Plástico - Azul; Metal - Amarelo; Papel - Vermelho; Vidro - Verde; Orgânico - Marrom.",
        escolha3: "Plástico - Amarelo; Metal - Marrom; Papel - Verde; Vidro - Vermelho; Orgânico - Azul.",
        escolha4: "Nenhuma das alternativas.",
        resposta: 2,
    },
    {
        questao: "Quanto tempo o vidro leva para se decompor na natureza?",
        escolha1: "Aproximadamente 500 anos.",
        escolha2: "1000 anos.",
        escolha3: "3000 anos.",
        escolha4: "O vidro não é biodegradável.",
        resposta: 4,
    },
    {
        questao: 'Quais destes objetos NÃO podem ser reciclados?',
        escolha1: "Papelão e garrfas PET.",
        escolha2: "Prato de isopor e frascos de perfume.",
        escolha3: "Jornal e embalagens de alumínio.",
        escolha4: "Esponja de aço e embalagem de salgadinho.",
        resposta: 4,
    },
    {
        questao: 'Para enviar o lixo para a reciclagem, é necessário:',
        escolha1: "Colocá-lo em uma sacola.",
        escolha2: "Não precisa de cuidados específicos.",
        escolha3: "Cortar em pedaços.",
        escolha4: "Limpá-lo.",
        resposta: 4,
    },
    {
        questao: 'Qual é a consequência do descarte incorreto do lixo?',
        escolha1: "Não existem consequências.",
        escolha2: "Esgotamento dos reservatórios de água no planeta.",
        escolha3: "Existenção de alguns animais, plantas e bactérias.",
        escolha4: "Enchentes e doenças.",
        resposta: 4,
    },
    {
        questao: 'Qual é a porcentagem do lixo reciclado no Brasil?',
        escolha1: "2%",
        escolha2: "23%",
        escolha3: "46%",
        escolha4: "12%",
        resposta: 1,
    },
    {
        questao: 'Qual é a cidade que mais produz lixo no Brasil?',
        escolha1: "Taquara.",
        escolha2: "Rio de Janeiro.",
        escolha3: "São Paulo.",
        escolha4: "Santos.",
        resposta: 3,
    },
    {
        questao: 'Dos materiais abaixo, quais podem gerar algum tipo de combustível?',
        escolha1: "Óleo e metal.",
        escolha2: "Papel e plástico.",
        escolha3: "Apenas óleo de cozinha.",
        escolha4: "Plástico e óleo de cozinha.",
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