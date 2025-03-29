
let btn = document.querySelector('.fa-eye')
let btnConfirmSenha = document.querySelector('#verConfirmSenha')

let usuario = document.querySelector('#usuario')
let labelUsuario = document.querySelector('#labelUsuario')
let validUsuario = false

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

usuario.addEventListener('keyup', () => {
    if (usuario.value.length <= 2) {
        labelUsuario.setAttribute('style', 'color:red')
        labelUsuario.innerHTML = `Usuario *insira no minimo 3 caracteres`
        usuario.setAttribute('style', 'border-color: red')
        validUsuario = false

    } else {
        labelUsuario.setAttribute('style', 'color:green')
        labelUsuario.innerHTML = "Usuario"
        usuario.setAttribute('style', 'border-color: green')
        validUsuario = true
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

function cadastrar() {
    if (validUsuario && validEmail && validSenha && validConfirmSenha) {

        let listaUser = JSON.parse(localStorage.getItem('listaUser')) || []

        listaUser.push(
            {
                usuario: usuario.value,
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
            window.location.href = '/pages/login/login.html';
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


