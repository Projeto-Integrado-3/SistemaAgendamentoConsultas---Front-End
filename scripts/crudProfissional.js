
'use strict'

const openModal = () => {
    document.getElementById('modal').classList.add('active');
}

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_professionals')) ?? []
const setLocalStorage = (dbProfessional) => localStorage.setItem("db_professionals", JSON.stringify(dbProfessional))

const deleteClient = (index) => {
    const dbProfessional = readClient()
    dbProfessional.splice(index, 1)
    setLocalStorage(dbProfessional)
}

const updateClient = (index, client) => {
    const dbProfessional = readClient()
    dbProfessional[index] = client
    setLocalStorage(dbProfessional)
}

const readClient = () => getLocalStorage()

const createClient = (client) => {
    const dbProfessional = getLocalStorage()
    dbProfessional.push(client)
    setLocalStorage(dbProfessional)
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
            nome: document.getElementById('nome').value,
            cpf: document.getElementById('cpf').value,
            crm: document.getElementById('crm').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            endereco: document.getElementById('endereco').value,
            especialidade: document.getElementById('especialidade').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createClient(client)
            updateTable()
            closeModal()
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.cpf}</td>
        <td>${client.crm}</td>
        <td>${client.email}</td>
        <td>${client.telefone}</td>
        <td>${client.endereco}</td>
        <td>${client.especialidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Excluir</button>
        </td>   
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbProfessional = readClient()
    clearTable()
    dbProfessional.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('cpf').value = client.cpf
    document.getElementById('crm').value = client.crm
    document.getElementById('email').value = client.email
    document.getElementById('telefone').value = client.telefone
    document.getElementById('endereco').value = client.endereco
    document.getElementById('especialidade').value = client.especialidade
    document.getElementById('nome').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    document.querySelector(".modal-header>h2").textContent = `Editando ${client.nome}`
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

document.getElementById('cadastrarCliente').addEventListener('click', () => {
    document.querySelector(".modal-header>h2").textContent = "Novo Profissional";
    clearFields();
    document.getElementById('nome').dataset.index = 'new';
    openModal();
})

document.getElementById('modalClose').addEventListener('click', closeModal)
document.getElementById('salvar').addEventListener('click', saveClient)
document.querySelector('#tableClient>tbody').addEventListener('click', editDelete)
