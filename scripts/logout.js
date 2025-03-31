let userLogado = JSON.parse(localStorage.getItem('userLogado'));
let logado = document.querySelector('#logado');


if (!userLogado) {
    
    Swal.fire({
        icon: 'error',
        title: 'Acesso Negado',
        text: 'Você precisa estar logado para acessar essa página!',
        confirmButtonText: 'OK'
    }).then(() => {
        
        window.location.href = '../login.html';
    });
} else {
    logado.innerHTML = `👋 Olá, ${userLogado.usuario}`;
}


function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('userLogado');
    Swal.fire({
        icon: 'success',
        title: 'Logout realizado com sucesso!',
        text: 'Você será redirecionado para a página inicial.',
        timer: 2000,
        showConfirmButton: false
    }).then(() => {
        window.location.href = '../../index.html'; 
    });
}