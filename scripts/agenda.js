// Display appointment data
window.addEventListener('load', function() {
    const appointmentsDiv = document.getElementById('appointments');
    const lastAppointment = localStorage.getItem('lastAppointment');

    // Fixed appointment
    const fixedAppointment = `
        <div class="appointment-card">
            <div class="appointment-info">
                <p>Paciente: Maria Silva</p>
                <p>Idade: 35 anos</p>
                <p>Especialidade: Psicologia</p>
                <p>Profissional: Dr. Assis Antônio</p>
                <p>Data: 22 de abr. de 2025</p>
                <p>Horário: 11:30</p>
                <p class="status pendente">Status: Pendente</p>
            </div>
            <div class="action-buttons">
                <button class="btn-confirmar" onclick="handleAppointmentAction('confirmar', 'fixed', event)">Confirmar</button>
                <button class="btn-editar" onclick="handleAppointmentAction('editar', 'fixed', event)">Editar</button>
                <button class="btn-cancelar" onclick="handleAppointmentAction('cancelar', 'fixed', event)">Cancelar</button>
            </div>
        </div>
    `;

    let appointments = fixedAppointment;

    if (lastAppointment) {
        const appointment = JSON.parse(lastAppointment);
        appointments += `
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
                    <button class="btn-confirmar" onclick="handleAppointmentAction('confirmar', 'new', event)">Confirmar</button>
                    <button class="btn-editar" onclick="handleAppointmentAction('editar', 'new', event)">Editar</button>
                    <button class="btn-cancelar" onclick="handleAppointmentAction('cancelar', 'new', event)">Cancelar</button>
                </div>
            </div>
        `;
    }

    appointmentsDiv.innerHTML = appointments;
});

function formatDate(dateStr) {
    const months = {
        '01': 'jan.', '02': 'fev.', '03': 'mar.', '04': 'abr.',
        '05': 'mai.', '06': 'jun.', '07': 'jul.', '08': 'ago.',
        '09': 'set.', '10': 'out.', '11': 'nov.', '12': 'dez.'
    };
    const [day, month] = dateStr.split('/');
    return `${day} de ${months[month]} de 2025`;
}

function handleAppointmentAction(action, appointmentId, event) {
    const appointmentCard = event.target.closest('.appointment-card');
    const statusElement = appointmentCard.querySelector('.status');

    switch(action) {
        case 'confirmar':
            statusElement.textContent = 'Status: Confirmada';
            statusElement.className = 'status confirmada';
            appointmentCard.querySelector('.btn-confirmar').style.display = 'none';
            break;
        case 'cancelar':
            statusElement.textContent = 'Status: Cancelada';
            statusElement.className = 'status cancelada';
            appointmentCard.querySelector('.action-buttons').innerHTML = `
                <button class="btn-visualizar" onclick="handleAppointmentAction('visualizar', '${appointmentId}', event)">Visualizar</button>
            `;
            break;
        case 'editar':
            window.location.href = '/pages/dashboard/formAgendamento.html';
            break;
    }
}

// Add filter functionality
document.getElementById('agendaFilter').addEventListener('change', function(e) {
    // Filter implementation can be added here
    console.log('Filter changed to:', e.target.value);
});