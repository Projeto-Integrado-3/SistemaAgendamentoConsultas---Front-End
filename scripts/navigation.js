// Carrega Header e Footer em todas as páginas
window.addEventListener("DOMContentLoaded", () => {
    // Carrega Header
    fetch("../components/header.html")
      .then(res => res.text())
      .then(data => document.getElementById("header-container").innerHTML = data);
  
    // Carrega Footer
    fetch("../components/footer.html")
      .then(res => res.text())
      .then(data => document.getElementById("footer-container").innerHTML = data);
  });