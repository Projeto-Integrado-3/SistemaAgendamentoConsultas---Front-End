'use strict'

const openModal = () => {
    document.getElementById('modal').classList.add('active');
}

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')

}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_paci')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_paci", JSON.stringify(dbClient))


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
    if (isvalidfields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            cpf: document.getElementById('cpf').value,
            telefone: document.getElementById('telefone').value,
            endereco: document.getElementById('endereco').value
        }


        if (!client.nome || !client.email || !client.cpf || !client.telefone || !client.endereco) {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Todos os campos devem ser preenchidos.',
            });
            return;
        }

        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createClient(client)
            
            
        } else {
            updateClient(index, client)

        }

        updateTable()
        closeModal()

        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Paciente salvo com sucesso!',
            timer: 2000,
            showConfirmButton: false
        });

        closeModal()

    }

}


const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    
            <td data-label="Nome">${client.nome}</td>
            <td data-label="E-mail">${client.email}</td>
            <td data-label="CPF">${client.cpf}</td>
            <td data-label="Telefone">${client.telefone}</td>
            <td <td data-label="Endereço">${client.endereco}</td>
            
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
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)

}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('cpf').value = client.cpf
    document.getElementById('telefone').value = client.telefone
    document.getElementById('endereco').value = client.endereco
    document.getElementById('nome').dataset.index = client.index

}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    document.querySelector(".modal-header>h2").textContent = `Editando Paciente ${client.nome}`
    openModal()

}

const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-');
        if (action == 'edit') {
            editClient(index);
        } else if (action == 'delete') {
            const client = readClient()[index];

           
            Swal.fire({
                title: `Deseja realmente excluir o paciente ${client.nome}?`,
                text: "Esta ação não pode ser desfeita!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sim, excluir!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteClient(index);
                    updateTable();
                    Swal.fire({
                        icon: 'success',
                        title: 'Excluído!',
                        text: `O paciente ${client.nome} foi excluído com sucesso.`,
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            });
        }
    }
};
updateTable()




//eventos
document.getElementById('cadastrarCliente').addEventListener('click', () => {
    document.querySelector(".modal-header>h2").textContent = "Novo Paciente";
    clearFields();
    document.getElementById('nome').dataset.index = 'new';
    openModal();
});

document.getElementById('modalClose').addEventListener('click', closeModal)
document.getElementById('salvar').addEventListener('click', saveClient)
document.querySelector('#tableClient>tbody').addEventListener('click', editDelete)

