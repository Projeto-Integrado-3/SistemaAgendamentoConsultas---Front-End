let btn = document.querySelector('.fa-eye')

function entrar() {
    let email = document.querySelector('#email');
    let emailLabel = document.querySelector('#emailLabel');

    let senha = document.querySelector('#senha');
    let senhaLabel = document.querySelector('#senhaLabel');

    let msgError = document.querySelector('#msgError');
    let listaUser = [];

    let userValid = {
        email: '',
        senha: ''
    };

    
    listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];

   
    listaUser.forEach((item) => {
        if (email.value === item.email && senha.value === item.senha) {
            userValid = {
                email: item.email,
                senha: item.senha
            };
        }
    });

    
    if (email.value !== '' && senha.value !== '' && email.value === userValid.email && senha.value === userValid.senha) {

        Swal.fire({
            icon: 'success',
            title: 'Login realizado com sucesso!',
            text: 'Você será redirecionado para a página inicial.',
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
           
            window.location.href = '../pages/dashboard/dashboard.html';
        });
        

       
        let token = Math.random().toString(16).substring(2);
        localStorage.setItem('token', token);
        
       
        const user = listaUser.find(user => user.email === email.value);
        if (user) {
            userValid.usuario = user.nome;
        }
        localStorage.setItem('userLogado', JSON.stringify(userValid));
        console.log('Token gerado:', token);

        
    } else {
        
       
        emailLabel.setAttribute('style', 'color: red');
        email.setAttribute('style', 'border-color: red');
        senhaLabel.setAttribute('style', 'color: red');
        senha.setAttribute('style', 'border-color: red');
        email.focus();
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