let labelNome = document.querySelector('#labelNome')
let nome = document.querySelector('#nome')
let validNome = false

let labelCPF = document.querySelector('#labelCPF')
let cpf = document.querySelector('#cpf')
let validCPF = false

let labelCRM = document.querySelector('#labelCRM')
let crm = document.querySelector('#crm')
let validCRM = false

let labelEmail = document.querySelector('#labelEmail')
let email = document.querySelector('#email')
let validEmail = false

let labelTelefone = document.querySelector('#labelTelefone')
let telefone = document.querySelector('#telefone')
let validTelefone = false

let labelEndereco = document.querySelector('#labelEndereco')
let endereco = document.querySelector('#endereco')
let validEndereco = false

let labelEspecialidade = document.querySelector('#labelEspecialidade')
let especialidade = document.querySelector('#especialidade')
let validEspecialidade = false

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}


nome.addEventListener('keyup', () => {
    if (nome.value == "") {
        labelNome.setAttribute('style', 'color: red')
        labelNome.innerHTML = `Nome precisa ser preenchido`
        nome.setAttribute('style', 'border-color: red')
        validNome = false

    } else {
        labelNome.setAttribute('style', 'color:green')
        labelNome.innerHTML = "Nome"
        nome.setAttribute('style', 'border-color: green')
        validNome = true
    }
})


cpf.addEventListener('keyup', () => {
    if (cpf.value.length !== 11) {
        labelCPF.setAttribute('style', 'color: red');
        labelCPF.innerHTML = `CPF precisa ter 11 dígitos`;
        cpf.setAttribute('style', 'border-color: red');
        validCPF = false;
    } else {
        labelCPF.setAttribute('style', 'color: green');
        labelCPF.innerHTML = "CPF";
        cpf.setAttribute('style', 'border-color: green');
        validCPF = true;
    }
});


crm.addEventListener('keyup', () => {
    if (crm.value == "") {
        labelCRM.setAttribute('style', 'color: red');
        labelCRM.innerHTML = `CRM deve ser prenchido`;
        crm.setAttribute('style', 'border-color: red');
        validCRM = false;
    } else {
        labelCRM.setAttribute('style', 'color: green');
        labelCRM.innerHTML = "CRM";
        crm.setAttribute('style', 'border-color: green');
        validCRM = true;
    }
});


email.addEventListener('keyup', () => {
    if (!validateEmail(email.value)) {
        labelEmail.setAttribute('style', 'color: red');
        labelEmail.innerHTML = `Email inválido`;
        email.setAttribute('style', 'border-color: red');
        validEmail = false;
    } else {
        labelEmail.setAttribute('style', 'color: green');
        labelEmail.innerHTML = "Email";
        email.setAttribute('style', 'border-color: green');
        validEmail = true;
    }
});


telefone.addEventListener('keyup', () => {
    if (telefone.value.length < 10) {
        labelTelefone.setAttribute('style', 'color: red');
        labelTelefone.innerHTML = `Telefone precisa ter pelo menos 10 dígitos`;
        telefone.setAttribute('style', 'border-color: red');
        validTelefone = false;
    } else {
        labelTelefone.setAttribute('style', 'color: green');
        labelTelefone.innerHTML = "Telefone";
        telefone.setAttribute('style', 'border-color: green');
        validTelefone = true;
    }
});


endereco.addEventListener('keyup', () => {
    if (endereco.value === "") {
        labelEndereco.setAttribute('style', 'color: red');
        labelEndereco.innerHTML = `Endereço precisa ser preenchido`;
        endereco.setAttribute('style', 'border-color: red');
        validEndereco = false;
    } else {
        labelEndereco.setAttribute('style', 'color: green');
        labelEndereco.innerHTML = "Endereço";
        endereco.setAttribute('style', 'border-color: green');
        validEndereco = true;
    }
});




especialidade.addEventListener('keyup', () => {
    if (especialidade.value.trim() === "") { 
        labelEspecialidade.setAttribute('style', 'color: red');
        labelEspecialidade.innerHTML = `Especialidade precisa ser preenchida`; 
        especialidade.setAttribute('style', 'border-color: red');
        validEspecialidade = false;
    } else {
        labelEspecialidade.setAttribute('style', 'color: green');
        labelEspecialidade.innerHTML = "Especialidade";
        especialidade.setAttribute('style', 'border-color: green');
        validEspecialidade = true;
    }
});


