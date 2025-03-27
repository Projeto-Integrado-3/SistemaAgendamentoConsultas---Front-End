'use strict'

const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => document.getElementById('modal').classList.remove('active')

const tempClient = {
    nome: "Joel",
    email: "valdeilson@gmail.com",
    cpf: "0721519489",
    telefone: "(83) 99196-7945",
    endereco: "Rua projetada, 135, Cajazeiras - PB, 58900-000"
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))


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

// Interação com o usuario


const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

const saveClient = () => {
    if (isvalidfields()){
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            cpf: document.getElementById('cpf').value,
            telefone: document.getElementById('telefone').value,
            endereco: document.getElementById('endereco').value
        }
        createClient(client)
        clearFields()
        closeModal()
        
       
    }
}



document.getElementById('salvar').addEventListener('click', saveClient)

//eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('modalClose').addEventListener('click', closeModal)