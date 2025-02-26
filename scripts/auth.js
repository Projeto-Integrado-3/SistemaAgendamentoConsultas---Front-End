// Simula usuário padrão para teste
const usuariosSimulados = [
    { email: "joana@exemplo.com", senha: "123456" }
  ];
  
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("input[type='email']").value;
    const senha = document.querySelector("input[type='password']").value;
  
    const usuarioValido = usuariosSimulados.find(
      u => u.email === email && u.senha === senha
    );
  
    if (usuarioValido) {
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));
      window.location.href = "pages/dashboard.html";
    } else {
      alert("Credenciais inválidas!");
    }
  });