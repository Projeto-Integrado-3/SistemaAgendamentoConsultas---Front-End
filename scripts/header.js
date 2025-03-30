
document.addEventListener('DOMContentLoaded', function() {
    const userLogado = JSON.parse(localStorage.getItem('userLogado'));
    const logado = document.querySelector('#logado');
    
    if (userLogado && userLogado.usuario) {
        if (logado) {
            const primeiroNome = userLogado.usuario.split(' ')[0];
            logado.innerHTML = `👋 Olá, ${primeiroNome}`;
        }
    }
});
