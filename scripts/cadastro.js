let btn = document.querySelector('.fa-eye')
let btnConfirmSenha = document.querySelector('#verConfirmSenha')

let nome = document.querySelector('#nome')
let sobrenome = document.querySelector('#sobrenome')
let labelNome = document.querySelector('#labelNome')
let labelSobrenome = document.querySelector('#labelSobrenome')
let validNome = false
let validSobrenome = false

let email = document.querySelector('#email')
let labelEmail = document.querySelector('#labelEmail')
let validEmail = false

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

let confirmarsenha = document.querySelector('#confirmarsenha')
let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let validConfirmSenha = false

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

nome.addEventListener('keyup', () => {
    if (nome.value.length <= 2) {
        labelNome.setAttribute('style', 'color:red')
        labelNome.innerHTML = `Nome *insira no minimo 3 caracteres`
        nome.setAttribute('style', 'border-color: red')
        validNome = false

    } else {
        labelNome.setAttribute('style', 'color:green')
        labelNome.innerHTML = "Nome"
        nome.setAttribute('style', 'border-color: green')
        validNome = true
    }
})


email.addEventListener('keyup', () => {
    if (!validateEmail(email.value)) {
        labelEmail.setAttribute('style', 'color:red')
        labelEmail.innerHTML = `Email inválido`
        email.setAttribute('style', 'border-color: red')
        validEmail = false
    } else {
        labelEmail.setAttribute('style', 'color:green')
        labelEmail.innerHTML = "Email"
        email.setAttribute('style', 'border-color: green')
        validEmail = true
    }
})


senha.addEventListener('keyup', () => {
    if (senha.value.length < 6) {
        labelSenha.setAttribute('style', 'color:red')
        labelSenha.innerHTML = `Senha *insira no mínimo 6 caracteres`
        senha.setAttribute('style', 'border-color: red')
        validSenha = false
    } else {
        labelSenha.setAttribute('style', 'color:green')
        labelSenha.innerHTML = "Senha"
        senha.setAttribute('style', 'border-color: green')
        validSenha = true
    }
})

confirmarsenha.addEventListener('keyup', () => {
    if (senha.value !== confirmarsenha.value) {
        labelConfirmSenha.setAttribute('style', 'color:red')
        labelConfirmSenha.innerHTML = `As senhas não coincidem`
        confirmarsenha.setAttribute('style', 'border-color: red')
        validConfirmSenha = false
    } else {
        labelConfirmSenha.setAttribute('style', 'color:green')
        labelConfirmSenha.innerHTML = "Confirmar senha"
        confirmarsenha.setAttribute('style', 'border-color: green')
        validConfirmSenha = true
    }
})

sobrenome.addEventListener('keyup', () => {
    if (sobrenome.value.length <= 2) {
        labelSobrenome.setAttribute('style', 'color:red')
        labelSobrenome.innerHTML = `Sobrenome *insira no minimo 3 caracteres`
        sobrenome.setAttribute('style', 'border-color: red')
        validSobrenome = false
    } else {
        labelSobrenome.setAttribute('style', 'color:green')
        labelSobrenome.innerHTML = "Sobrenome"
        sobrenome.setAttribute('style', 'border-color: green')
        validSobrenome = true
    }
})

function cadastrar() {
    if (validNome && validSobrenome && validEmail && validSenha && validConfirmSenha) {

        let listaUser = JSON.parse(localStorage.getItem('listaUser')) || []

        listaUser.push(
            {
                nome: nome.value,
                sobrenome: sobrenome.value,
                email: email.value,
                senha: senha.value
            }
        )

        localStorage.setItem('listaUser', JSON.stringify(listaUser))

        Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado com sucesso!',
            text: 'Você será redirecionado para a tela de login.',
            timer: 3000,
            showConfirmButton: false
        }).then(() => {
            // Redireciona para a tela de login
            window.location.href = '/pages/login.html';
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Erro no cadastro',
            text: 'Preencha todos os campos corretamente antes de continuar.',
            confirmButtonText: 'Ok'
        });
    }
}



btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha')
    console.log(inputSenha)

    if (inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }

})

btnConfirmSenha.addEventListener('click', () => {
    let inputSenha = document.querySelector('#confirmarsenha')
    console.log(inputSenha)

    if (inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})