let btn = document.querySelector('.fa-eye')

function entrar() {
    let usuario = document.querySelector('#usuario');
    let userLabel = document.querySelector('#userLabel');

    let senha = document.querySelector('#senha');
    let senhaLabel = document.querySelector('#senhaLabel');

    let msgError = document.querySelector('#msgError');
    let listaUser = [];

    let userValid = {
        usuario: '',
        email: '',
        senha: ''
    };

    // Recupera a lista de usuários do localStorage
    listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];

    // Percorre a lista de usuários e verifica se o usuário e senha correspondem
    listaUser.forEach((item) => {
        if (usuario.value === item.usuario && senha.value === item.senha) {
            userValid = {
                usuario: item.usuario,
                email: item.email,
                senha: item.senha
            };
        }
    });

    // Verifica se os campos estão preenchidos e se o usuário foi encontrado
    if (usuario.value !== '' && senha.value !== '' && usuario.value === userValid.usuario && senha.value === userValid.senha) {

        Swal.fire({
            icon: 'success',
            title: 'Login realizado com sucesso!',
            text: 'Você será redirecionado para a página inicial.',
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            // Redireciona para a página inicial
            window.location.href = '../pages/dashboard/dashboard.html';
        });
        

        // Gera o token e salva no localStorage
        let token = Math.random().toString(16).substring(2);
        localStorage.setItem('token', token);
        localStorage.setItem('userLogado', JSON.stringify(userValid));
        console.log('Token gerado:', token);

        
    } else {
        
        // Define os estilos para vermelho (erro)
        userLabel.setAttribute('style', 'color: red');
        usuario.setAttribute('style', 'border-color: red');
        senhaLabel.setAttribute('style', 'color: red');
        senha.setAttribute('style', 'border-color: red');
        usuario.focus();
        Swal.fire({
            icon: 'error',
            title: 'Erro no login',
            text: 'Usuário ou senha incorretos!',
            confirmButtonText: 'Tentar novamente'
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