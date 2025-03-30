let userLogado = JSON.parse(localStorage.getItem('userLogado'));
let logado = document.querySelector('#logado');

// Verifica se o usuário está logado
if (!userLogado) {
    // Exibe uma mensagem de erro personalizada usando SweetAlert2
    Swal.fire({
        icon: 'error',
        title: 'Acesso Negado',
        text: 'Você precisa estar logado para acessar essa página!',
        confirmButtonText: 'OK'
    }).then(() => {
        // Redireciona para a página de login após o alerta
        window.location.href = '../login.html';
    });
} else if (logado) {
    logado.innerHTML = `${userLogado.usuario}`;
}

// Função de logout
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
        window.location.href = '../../index.html'; // Redireciona para a página inicial
    });
}