
window.addEventListener('load', function () {
    const appointmentsDiv = document.getElementById('appointments');
    const appointments = JSON.parse(localStorage.getItem('appointments')) ?? [];

    if (appointments.length === 0) {
        appointmentsDiv.innerHTML = '<p>Não há agendamentos disponíveis.</p>';
        return;
    }

    
    let appointmentsHTML = '';
    appointments.forEach((appointment, index) => {
        appointmentsHTML += `
            <div class="appointment-card">
                <div class="appointment-info">
                    <p>Paciente: ${appointment.paciente}</p>
                    <p>Idade: ${appointment.idade} anos</p>
                    <p>Especialidade: ${appointment.especialidade}</p>
                    <p>Profissional: ${appointment.profissional}</p>
                    <p>Data: ${formatDate(appointment.data)}</p>
                    <p>Horário: ${appointment.horario}</p>
                    <p class="status pendente">Status: Pendente</p>
                </div>
                <div class="action-buttons">
                    <button class="btn-confirmar" onclick="handleAppointmentAction('confirmar', ${index}, event)">Confirmar</button>
                    <button class="btn-editar" onclick="handleAppointmentAction('editar', ${index}, event)">Editar</button>
                    <button class="btn-cancelar" onclick="handleAppointmentAction('cancelar', ${index}, event)">Cancelar</button>
                </div>
            </div>
        `;
    });

    appointmentsDiv.innerHTML = appointmentsHTML;
});

function formatDate(dateStr) {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('/');
    const months = {
        '01': 'jan.', '02': 'fev.', '03': 'mar.', '04': 'abr.',
        '05': 'mai.', '06': 'jun.', '07': 'jul.', '08': 'ago.',
        '09': 'set.', '10': 'out.', '11': 'nov.', '12': 'dez.'
    };
    return `${day} de ${months[month] || month} de ${year}`;
}

function handleAppointmentAction(action, appointmentIndex, event) {
    const appointments = JSON.parse(localStorage.getItem('appointments')) ?? [];
    const appointmentCard = event.target.closest('.appointment-card');
    const statusElement = appointmentCard.querySelector('.status');

    switch (action) {
        case 'confirmar':
            statusElement.textContent = 'Status: Confirmada';
            statusElement.className = 'status confirmada';
            appointmentCard.querySelector('.btn-confirmar').style.display = 'none';
            break;
        case 'cancelar':
            statusElement.textContent = 'Status: Cancelada';
            statusElement.className = 'status cancelada';
            appointmentCard.querySelector('.action-buttons').innerHTML = `
                <button class="btn-visualizar" onclick="handleAppointmentAction('visualizar', ${appointmentIndex}, event)">Visualizar</button>
            `;
            break;
        case 'editar':
            const appointment = appointments[appointmentIndex];
            appointmentCard.innerHTML = `
                <div class="edit-form">
                    <input type="text" id="edit-paciente" value="${appointment.paciente}" placeholder="Paciente">
                    <input type="number" id="edit-idade" value="${appointment.idade}" placeholder="Idade">
                    <select id="edit-especialidade">
                        <option value="${appointment.especialidade}">${appointment.especialidade}</option>
                        <option value="Cardiologia">Cardiologia</option>
                        <option value="Dermatologia">Dermatologia</option>
                        <option value="Pediatria">Pediatria</option>
                        <option value="Psicologia">Psicologia</option>
                    </select>
                    <input type="text" id="edit-profissional" value="${appointment.profissional}" placeholder="Profissional">
                    <input type="text" id="edit-data" value="${appointment.data}" placeholder="Data">
                    <input type="text" id="edit-horario" value="${appointment.horario}" placeholder="Horário">
                    <div class="edit-buttons">
                        <button onclick="saveEdit(${appointmentIndex})">Salvar</button>
                        <button onclick="cancelEdit(${appointmentIndex})">Cancelar</button>
                    </div>
                </div>
            `;
            break;
    }

    localStorage.setItem('appointments', JSON.stringify(appointments));
}

function saveEdit(index) {
    const appointments = JSON.parse(localStorage.getItem('appointments')) ?? [];
    
    appointments[index] = {
        paciente: document.getElementById('edit-paciente').value,
        idade: document.getElementById('edit-idade').value,
        especialidade: document.getElementById('edit-especialidade').value,
        profissional: document.getElementById('edit-profissional').value,
        data: document.getElementById('edit-data').value,
        horario: document.getElementById('edit-horario').value
    };

    localStorage.setItem('appointments', JSON.stringify(appointments));
    window.location.reload();
}

function cancelEdit(index) {
    window.location.reload();
}


document.getElementById('agendaFilter').addEventListener('change', function (e) {
    
    console.log('Filter changed to:', e.target.value);
});