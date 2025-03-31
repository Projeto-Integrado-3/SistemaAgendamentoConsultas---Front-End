'use strict'

const openModal = () => {
    document.getElementById('modal').classList.add('active');
}

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')

}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_prof')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_prof", JSON.stringify(dbClient))


// CRUD - Create, reed update delete

const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const readClient = (client) => getLocalStorage()

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}

const isvalidfields = () => {
    return document.getElementById('form').reportValidity()
}




const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

const saveClient = () => {
    if (isvalidfields()) {
        const client = {
            nome: document.getElementById('nome').value.trim(),
            cpf: document.getElementById('cpf').value.trim(),
            crm: document.getElementById('crm').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefone: document.getElementById('telefone').value.trim(),
            endereco: document.getElementById('endereco').value.trim(),
            especialidade: document.getElementById('especialidade').value.trim()
        };

        
        if (!client.nome || !client.cpf || !client.crm || !client.email || !client.telefone || !client.endereco || !client.especialidade) {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Todos os campos devem ser preenchidos corretamente.',
            });
            return; 
        }

        const index = document.getElementById('nome').dataset.index;

        if (index === 'new') {
            createClient(client);
        } else {
            updateClient(index, client); 
        }

        updateTable(); 

     
        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Profissional salvo com sucesso!',
            timer: 2000, 
            showConfirmButton: false
        });

        closeModal(); 
    } else {
        
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Preencha todos os campos corretamente antes de salvar.',
        });
    }
};
const createRow = (client, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td data-label="Nome">${client.nome}</td>
        <td data-label="CPF">${client.cpf}</td>
        <td data-label="CRM">${client.crm}</td>
        <td data-label="E-mail">${client.email}</td>
        <td data-label="Telefone">${client.telefone}</td>
        <td data-label="Endereço">${client.endereco}</td>
        <td data-label="Especialidade">${client.especialidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Excluir</button>
        </td>
    `;
    document.querySelector('#tableClient>tbody').appendChild(newRow);
};

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)

}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome;
    document.getElementById('cpf').value = client.cpf;
    document.getElementById('crm').value = client.crm;
    document.getElementById('email').value = client.email;
    document.getElementById('telefone').value = client.telefone;
    document.getElementById('endereco').value = client.endereco;
    document.getElementById('especialidade').value = client.especialidade;
    document.getElementById('nome').dataset.index = client.index;
};

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    document.querySelector(".modal-header>h2").textContent = `Editando profissional ${client.nome}`
    openModal()

}

const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')
        if (action == 'edit') {
            editClient(index)
        } else {
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o profissional ${client.nome}`)
            if (response) {
                deleteClient(index)
                updateTable()
            }

        }
    }
}
updateTable()

//eventos
document.getElementById('cadastrarCliente').addEventListener('click', () => {
    document.querySelector(".modal-header>h2").textContent = "Novo Profissional";
    clearFields(); 
    document.getElementById('nome').dataset.index = 'new';
    openModal();
});

document.getElementById('modalClose').addEventListener('click', closeModal)
document.getElementById('salvar').addEventListener('click', saveClient)
document.querySelector('#tableClient>tbody').addEventListener('click', editDelete)