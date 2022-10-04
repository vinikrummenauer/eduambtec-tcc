//constantes para selecionar os elementos do HTML
const input = document.querySelector('.login-input')
const button = document.querySelector('.login-button')
const form = document.querySelector('.login-form')

//função para verificar o valor do input, se for maior que dois
// vai remover o atributo disabled do botão, se ele for menor
// vai voltar a ficar desabilitado, (setAttribute precisa de dois valores)
const validateInput = ( {target}) => {
    if(target.value.length > 2){
        button.removeAttribute('disabled')
    }
    else {
        button.setAttribute('disabled', '')
    }
}

const handleSubmit = (event) => {
    event.preventDefault()

    localStorage.setItem('player', input.value)
    window.location = 'pages/game.html'
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);